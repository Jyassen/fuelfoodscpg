import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { getStripe } from '@/lib/stripe/server';
import { prisma } from '@/lib/db/prisma';

export const dynamic = 'force-dynamic'; // ensure no caching

// Helper function to generate order number
function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `FF-${timestamp}-${random}`.toUpperCase();
}

// Handle checkout session completed
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  try {
    console.log('Processing checkout session:', session.id);

    // Find user by Stripe customer ID
    const user = await prisma.user.findUnique({
      where: { stripeCustomerId: session.customer as string },
    });

    if (!user) {
      console.error('User not found for customer:', session.customer);
      return;
    }

    // Create order record
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        orderNumber: generateOrderNumber(),
        stripeSessionId: session.id,
        stripePaymentIntentId: session.payment_intent as string,
        status: 'PROCESSING',
        subtotal: (session.amount_subtotal || 0) / 100,
        taxAmount: (session.total_details?.amount_tax || 0) / 100,
        shippingAmount: (session.total_details?.amount_shipping || 0) / 100,
        total: (session.amount_total || 0) / 100,
      },
    });

    // If this is a subscription, handle subscription creation
    if (session.mode === 'subscription' && session.subscription) {
      await handleSubscriptionCreated({
        id: session.subscription as string,
        customer: session.customer as string,
        status: 'active',
        current_period_start: Math.floor(Date.now() / 1000),
        current_period_end: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60), // 30 days
        cancel_at_period_end: false,
        items: {
          data: [
            {
              price: {
                id: '',
                metadata: session.metadata || {},
              },
            },
          ],
        },
        metadata: session.metadata || {},
      } as any);
    }

    console.log('Order created:', order.orderNumber);
  } catch (error) {
    console.error('Error handling checkout session completed:', error);
    throw error;
  }
}

// Handle subscription lifecycle events
async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  try {
    console.log('Processing subscription created:', subscription.id);

    // Find user by Stripe customer ID
    const user = await prisma.user.findUnique({
      where: { stripeCustomerId: subscription.customer as string },
    });

    if (!user) {
      console.error('User not found for customer:', subscription.customer);
      return;
    }

    // Extract plan type from subscription metadata or price ID
    let planType: 'STARTER' | 'PRO' | 'ELITE' = 'STARTER';
    
    if (subscription.metadata?.planType) {
      planType = subscription.metadata.planType.toUpperCase() as 'STARTER' | 'PRO' | 'ELITE';
    } else {
      // Determine plan type from price ID
      const priceId = subscription.items.data[0]?.price?.id;
      if (priceId === process.env.STRIPE_PRICE_PRO) {
        planType = 'PRO';
      } else if (priceId === process.env.STRIPE_PRICE_ELITE) {
        planType = 'ELITE';
      }
    }

    // Create or update subscription record
    await prisma.userSubscription.upsert({
      where: { stripeSubscriptionId: subscription.id },
      create: {
        userId: user.id,
        stripeSubscriptionId: subscription.id,
        planType,
        status: subscription.status,
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
      update: {
        status: subscription.status,
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
    });

    console.log('Subscription processed:', subscription.id);
  } catch (error) {
    console.error('Error handling subscription:', error);
    throw error;
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  await handleSubscriptionCreated(subscription); // Same logic
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  try {
    console.log('Processing subscription deleted:', subscription.id);

    await prisma.userSubscription.update({
      where: { stripeSubscriptionId: subscription.id },
      data: {
        status: 'cancelled',
        cancelAtPeriodEnd: true,
      },
    });

    console.log('Subscription cancelled:', subscription.id);
  } catch (error) {
    console.error('Error handling subscription deletion:', error);
    throw error;
  }
}

// Handle customer events
async function handleCustomerUpdated(customer: Stripe.Customer) {
  try {
    console.log('Processing customer updated:', customer.id);

    await prisma.user.update({
      where: { stripeCustomerId: customer.id },
      data: {
        firstName: customer.name?.split(' ')[0] || undefined,
        lastName: customer.name?.split(' ').slice(1).join(' ') || undefined,
        phone: customer.phone || undefined,
      },
    });

    console.log('Customer updated:', customer.id);
  } catch (error) {
    console.error('Error handling customer update:', error);
    // Don't throw - customer updates are not critical
  }
}

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = headers();
  const sig = headersList.get('stripe-signature');
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



