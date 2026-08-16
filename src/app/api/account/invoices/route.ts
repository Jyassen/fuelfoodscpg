import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe/server';
import { getAuthedStripeCustomer } from '@/lib/auth/account';

export async function GET() {
  try {
    const result = await getAuthedStripeCustomer();
    if (result.error) return result.error;
    if (!result.stripeCustomerId) {
      return NextResponse.json({ invoices: [] });
    }

    const stripe = getStripe();
    const invoices = await stripe.invoices.list({
      customer: result.stripeCustomerId,
      limit: 20,
    });
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
  } catch (e) {
    console.error('[account/invoices] error:', e);
    return NextResponse.json(
      { error: 'Failed to fetch invoices' },
      { status: 500 }
    );
  }
}
