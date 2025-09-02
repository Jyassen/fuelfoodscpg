import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/server';

export const dynamic = 'force-dynamic'; // ensure no caching

export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return NextResponse.json(
      { error: 'Server misconfigured: STRIPE_WEBHOOK_SECRET is missing' },
      { status: 500 }
    );
  }

  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature' }, { status: 400 });
  }

  const rawBody = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as any;
        // TODO: persist order/subscription details based on session
        break;
      }
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        // Handle subscription lifecycle as needed
        break;
      }
      default:
        break;
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Error handling webhook:', e);
    return NextResponse.json({ received: true, handled: false });
  }

  return NextResponse.json({ received: true });
}

export const config = {
  api: {
    bodyParser: false,
  },
};


