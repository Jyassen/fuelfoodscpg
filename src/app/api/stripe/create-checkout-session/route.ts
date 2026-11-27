import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe/server';
import {
  isSubscriptionPlanType,
  resolveSubscriptionPriceId,
} from '@/lib/stripe/prices';
import { getSessionUser } from '@/lib/supabase/session';
import { clientIp, rateLimit } from '@/lib/auth/rate-limit';

const MAX_QUANTITY = 12;

/**
 * Meta's _fbp/_fbc cookies, stashed on the Stripe session so the webhook can
 * forward them to the Conversions API. They arrive from the browser, so treat
 * them as untrusted: accept only the documented shape and cap the length.
 */
const FB_COOKIE_PATTERN = /^fb[pc]\.[0-9]\.[0-9]+\.[A-Za-z0-9_-]+$/;

function sanitizeFbCookie(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  if (trimmed.length > 255 || !FB_COOKIE_PATTERN.test(trimmed))
    return undefined;
  return trimmed;
}

function siteOrigin() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fuelfoods.store';
  return siteUrl.replace(/\/$/, '');
}

export async function POST(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const ip = clientIp(req);
    if (!rateLimit(`checkout:${user.id}:${ip}`, 10, 10 * 60 * 1000)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Checkout is temporarily unavailable' },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => null);
    const planType = body?.planType;
    const quantity = Number(body?.quantity ?? 1);
    const fbp = sanitizeFbCookie(body?.fbp);
    const fbc = sanitizeFbCookie(body?.fbc);

    if (!isSubscriptionPlanType(planType)) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }
    if (
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > MAX_QUANTITY
    ) {
      return NextResponse.json({ error: 'Invalid quantity' }, { status: 400 });
    }

    const origin = siteOrigin();
    const priceId = resolveSubscriptionPriceId(planType);
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity }],
      allow_promotion_codes: true,
      automatic_tax: { enabled: true },
      billing_address_collection: 'auto',
      shipping_address_collection: { allowed_countries: ['US'] },
      client_reference_id: user.id,
      customer_email: user.email || undefined,
      metadata: {
        user_id: user.id,
        plan_type: planType,
        ...(fbp ? { fbp } : {}),
        ...(fbc ? { fbc } : {}),
      },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
    });

    return NextResponse.json({ id: session.id, url: session.url });
  } catch (e) {
    console.error('[create-checkout-session] error:', e);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
