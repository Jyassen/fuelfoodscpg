import Stripe from 'stripe';

/**
 * Lazily initialize Stripe to avoid build-time errors when env vars
 * are not available during static analysis/compilation on hosts.
 */
export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('[stripe] STRIPE_SECRET_KEY is not set');
  }
  return new Stripe(key);
}

