import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getStripe } from '@/lib/stripe/server';
import { getSupabaseServiceClient } from '@/lib/supabase/server';
import { sendMetaEvent } from '@/lib/analytics/meta-capi';

export const dynamic = 'force-dynamic';

async function linkStripeCustomer(userId: string, customerId: string) {
  const { data: profile, error } = await getSupabaseServiceClient()
    .from('profiles')
    .select('id, stripe_customer_id')
    .eq('id', userId)
    .maybeSingle();

  if (error || !profile) return;
  if (profile.stripe_customer_id === customerId) return;

  const { error: updateError } = await getSupabaseServiceClient()
    .from('profiles')
    .update({ stripe_customer_id: customerId })
    .eq('id', userId);
  if (updateError) throw updateError;
}

/**
 * Send Purchase to Meta's Conversions API.
 *
 * This is the authoritative purchase signal: it fires whether or not the
 * customer's browser made it back from Stripe's hosted checkout. The success
 * page sends the same event with the same `event_id` (the Stripe session id),
 * so Meta deduplicates the pair instead of counting two sales.
 *
 * Deliberately only on checkout.session.completed - NOT on invoice renewals.
 * A subscription renewal is not an ad-driven conversion, and feeding renewals
 * in would inflate reported ROAS and mislead campaign optimization.
 */
async function sendPurchaseToMeta(session: Stripe.Checkout.Session) {
  const details = session.customer_details;
  const address = details?.address;
  const nameParts = (details?.name || '').trim().split(/\s+/);

  await sendMetaEvent({
    eventName: 'Purchase',
    eventId: session.id,
    actionSource: 'website',
    eventSourceUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://fuelfoods.store'}/checkout/success`,
    userData: {
      email: details?.email,
      phone: details?.phone,
      firstName: nameParts[0],
      lastName: nameParts.length > 1 ? nameParts[nameParts.length - 1] : undefined,
      city: address?.city,
      state: address?.state,
      zip: address?.postal_code,
      country: address?.country,
      externalId: session.client_reference_id || session.metadata?.user_id,
      fbp: session.metadata?.fbp,
      fbc: session.metadata?.fbc,
    },
    customData: {
      // Stripe reports minor units; Meta expects a decimal amount.
      value: (session.amount_total ?? 0) / 100,
      currency: (session.currency || 'usd').toUpperCase(),
      content_type: 'product',
      ...(session.metadata?.plan_type
        ? { content_ids: [session.metadata.plan_type] }
        : {}),
    },
  });
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const userId = session.client_reference_id || session.metadata?.user_id;
  const customerId =
    typeof session.customer === 'string'
      ? session.customer
      : session.customer?.id;
  // Tracking first: a paid order should reach Meta even if the profile link
  // below is skipped or fails.
  await sendPurchaseToMeta(session);

  if (!userId || !customerId) {
    console.log('[webhook] checkout.session.completed missing user or customer', session.id);
    return;
  }
  await linkStripeCustomer(userId, customerId);
}

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not configured');
    return NextResponse.json(
      { error: 'Server misconfigured' },
      { status: 500 }
    );
  }

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'invalid signature';
    console.error('Webhook signature verification failed:', message);
    return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(
          event.data.object as Stripe.Checkout.Session
        );
        break;
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
      case 'invoice.payment_succeeded':
      case 'invoice.payment_failed':
        break;
      default:
        break;
    }

    return NextResponse.json({ received: true, handled: true });
  } catch (error) {
    console.error('Error processing webhook event:', error);
    return NextResponse.json(
      { received: true, handled: false, error: 'Processing failed' },
      { status: 500 }
    );
  }
}
