import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getStripe } from '@/lib/stripe/server';
import { getSupabaseServiceClient } from '@/lib/supabase/server';

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

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const userId = session.client_reference_id || session.metadata?.user_id;
  const customerId =
    typeof session.customer === 'string'
      ? session.customer
      : session.customer?.id;
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
