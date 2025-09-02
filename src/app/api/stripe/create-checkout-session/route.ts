import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/server';
import { resolveSubscriptionPriceId } from '@/lib/stripe/prices';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      planType,
      quantity = 1,
      successUrl,
      cancelUrl,
      allowPromotionCodes = true,
      mode = 'subscription',
      metadata = {},
    } = body || {};

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Server misconfigured: STRIPE_SECRET_KEY is missing' },
        { status: 500 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const success_url = successUrl || `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancel_url = cancelUrl || `${siteUrl}/checkout`;

    const line_items: any[] = [];

    if (mode === 'subscription') {
      if (!planType) {
        return NextResponse.json({ error: 'planType is required' }, { status: 400 });
      }
      const priceId = resolveSubscriptionPriceId(planType);
      line_items.push({ price: priceId, quantity });
    } else {
      return NextResponse.json({ error: 'Only subscription mode supported for now' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode,
      line_items,
      allow_promotion_codes: allowPromotionCodes,
      automatic_tax: { enabled: true },
      billing_address_collection: 'auto',
      shipping_address_collection: { allowed_countries: ['US'] },
      success_url,
      cancel_url,
      metadata,
    });

    return NextResponse.json({ id: session.id, url: session.url });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}


