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
    if (!profile?.stripe_customer_id) return NextResponse.json({ subscriptions: [] });

    const stripe = getStripe();
    const subs = await stripe.subscriptions.list({ customer: profile.stripe_customer_id, status: 'all', expand: ['data.items'] });
    const mapped = subs.data.map((s: any) => ({
      id: s.id,
      status: s.status,
      price: s.items?.data?.[0]?.price?.unit_amount ? s.items.data[0].price.unit_amount / 100 : null,
      currency: s.items?.data?.[0]?.price?.currency || 'usd',
      product: s.items?.data?.[0]?.price?.product || null,
      current_period_end: s.current_period_end ? new Date(s.current_period_end * 1000).toISOString() : null,
      current_period_start: s.current_period_start ? new Date(s.current_period_start * 1000).toISOString() : null,
    }));
    return NextResponse.json({ subscriptions: mapped });
  } catch (e: any) {
    console.error('[account/subscriptions] error:', e);
    return NextResponse.json({ error: e.message || 'Failed to fetch subscriptions' }, { status: 500 });
  }
}


