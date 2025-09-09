import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getStripe } from '@/lib/stripe/server';
import { supabaseServer } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic'; // ensure no caching

// Helper function to generate order number
function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `FF-${timestamp}-${random}`.toUpperCase();
}

// Handle checkout session completed
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  // Temporarily disabled DB writes during migration to Supabase
  console.log('[webhook] checkout.session.completed received:', session.id);
}

// Handle subscription lifecycle events
async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  // Temporarily disabled DB writes during migration to Supabase
  console.log('[webhook] customer.subscription.created received:', subscription.id);
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  await handleSubscriptionCreated(subscription); // Same logic
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  // Temporarily disabled DB writes during migration to Supabase
  console.log('[webhook] customer.subscription.deleted received:', subscription.id);
}

// Handle customer events
async function handleCustomerUpdated(customer: Stripe.Customer) {
  try {
    const email = (customer.email || '').toLowerCase();
    if (!email) return;
    // Upsert stripe_customer_id into profiles by email
    const { data: profile } = await supabaseServer
      .from('profiles')
      .select('id, stripe_customer_id')
      .eq('email', email)
      .maybeSingle();

    if (!profile) {
      // No matching profile, skip silently
      return;
    }

    if (profile.stripe_customer_id !== customer.id) {
      const { error } = await supabaseServer
        .from('profiles')
        .update({ stripe_customer_id: customer.id })
        .eq('id', profile.id);
      if (error) throw error;
    }
  } catch (e) {
    console.error('[webhook] failed to sync customer to profiles:', e);
  }
}

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not configured');
    return NextResponse.json(
      { error: 'Server misconfigured: STRIPE_WEBHOOK_SECRET is missing' },
      { status: 500 }
    );
  }

  if (!sig) {
    console.error('Missing stripe-signature header');
    return NextResponse.json({ error: 'Missing stripe-signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  console.log('Received webhook event:', event.type, event.id);

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;

      case 'customer.updated':
        await handleCustomerUpdated(event.data.object as Stripe.Customer);
        break;

      case 'invoice.payment_succeeded':
        console.log('Invoice payment succeeded:', event.data.object.id);
        // Handle successful recurring payments
        break;

      case 'invoice.payment_failed':
        console.log('Invoice payment failed:', event.data.object.id);
        // Handle failed payments (send email, pause subscription, etc.)
        break;

      default:
        console.log('Unhandled event type:', event.type);
        break;
    }

    console.log('Webhook event processed successfully:', event.type, event.id);
    return NextResponse.json({ received: true, handled: true });
  } catch (error) {
    console.error('Error processing webhook event:', error);
    return NextResponse.json(
      { received: true, handled: false, error: 'Processing failed' },
      { status: 500 }
    );
  }
}



