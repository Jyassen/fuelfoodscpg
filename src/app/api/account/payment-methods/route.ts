import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe/server';
import { getAuthedStripeCustomer } from '@/lib/auth/account';

export async function GET() {
  try {
    const result = await getAuthedStripeCustomer();
    if (result.error) return result.error;
    if (!result.stripeCustomerId) {
      return NextResponse.json({ paymentMethods: [] });
    }

    const stripe = getStripe();
    const methods = await stripe.paymentMethods.list({
      customer: result.stripeCustomerId,
      type: 'card',
    });
    const mapped = methods.data.map(m => ({
      id: m.id,
      brand: m.card?.brand || 'unknown',
      last4: m.card?.last4 || '****',
      expiryMonth: m.card?.exp_month || null,
      expiryYear: m.card?.exp_year || null,
    }));
    return NextResponse.json({ paymentMethods: mapped });
  } catch (e) {
    console.error('[account/payment-methods] error:', e);
    return NextResponse.json(
      { error: 'Failed to fetch payment methods' },
      { status: 500 }
    );
  }
}
