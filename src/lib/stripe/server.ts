import Stripe from 'stripe';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

if (!STRIPE_SECRET_KEY) {
  // We avoid throwing at import time in production environments where envs might be injected later.
  // Route handlers should still validate and throw a clear error if missing.
  // eslint-disable-next-line no-console
  console.warn('[stripe] STRIPE_SECRET_KEY is not set');
}

export const stripe = new Stripe(STRIPE_SECRET_KEY || '');


