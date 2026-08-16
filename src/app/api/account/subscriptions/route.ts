import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe/server';
import { getAuthedStripeCustomer } from '@/lib/auth/account';

export async function GET() {
  try {
    const result = await getAuthedStripeCustomer();
    if (result.error) return result.error;
    if (!result.stripeCustomerId) {
      return NextResponse.json({ subscriptions: [] });
    }

    const stripe = getStripe();
    const subs = await stripe.subscriptions.list({
      customer: result.stripeCustomerId,
      status: 'all',
      expand: ['data.items'],
    });
    const mapped = subs.data.map(s => {
      const price = s.items?.data?.[0]?.price;
      const period = s.items?.data?.[0] as
        | { current_period_end?: number; current_period_start?: number }
        | undefined;
      return {
        id: s.id,
        status: s.status,
        price: price?.unit_amount ? price.unit_amount / 100 : null,
        currency: price?.currency || 'usd',
        product: price?.product || null,
        current_period_end: period?.current_period_end
          ? new Date(period.current_period_end * 1000).toISOString()
          : null,
        current_period_start: period?.current_period_start
          ? new Date(period.current_period_start * 1000).toISOString()
          : null,
      };
    });
    return NextResponse.json({ subscriptions: mapped });
  } catch (e) {
    console.error('[account/subscriptions] error:', e);
    return NextResponse.json(
      { error: 'Failed to fetch subscriptions' },
      { status: 500 }
    );
  }
}
