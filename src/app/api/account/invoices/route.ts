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
    if (!profile?.stripe_customer_id) return NextResponse.json({ invoices: [] });

    const stripe = getStripe();
    const invoices = await stripe.invoices.list({ customer: profile.stripe_customer_id, limit: 20 });
    const mapped = invoices.data.map(inv => ({
      id: inv.id,
      number: inv.number,
      amount_due: inv.amount_due ? inv.amount_due / 100 : 0,
      currency: inv.currency,
      hosted_invoice_url: inv.hosted_invoice_url,
      invoice_pdf: inv.invoice_pdf,
      status: inv.status,
      created: inv.created ? new Date(inv.created * 1000).toISOString() : null,
    }));
    return NextResponse.json({ invoices: mapped });
  } catch (e: any) {
    console.error('[account/invoices] error:', e);
    return NextResponse.json({ error: e.message || 'Failed to fetch invoices' }, { status: 500 });
  }
}


