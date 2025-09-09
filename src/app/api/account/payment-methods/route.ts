import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe/server';
import { supabaseServer } from '@/lib/supabase/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 });

    const { data: profile, error: profileError } = await supabaseServer
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', userId)
      .single();
    if (profileError) throw profileError;
    if (!profile?.stripe_customer_id) return NextResponse.json({ paymentMethods: [] });

    const stripe = getStripe();
    const methods = await stripe.paymentMethods.list({ customer: profile.stripe_customer_id, type: 'card' });
    const mapped = methods.data.map(m => ({
      id: m.id,
      brand: m.card?.brand || 'unknown',
      last4: m.card?.last4 || '****',
      expiryMonth: m.card?.exp_month || null,
      expiryYear: m.card?.exp_year || null,
    }));
    return NextResponse.json({ paymentMethods: mapped });
  } catch (e: any) {
    console.error('[account/payment-methods] error:', e);
    return NextResponse.json({ error: e.message || 'Failed to fetch payment methods' }, { status: 500 });
  }
}


