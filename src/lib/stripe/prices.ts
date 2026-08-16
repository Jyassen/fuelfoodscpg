/**
 * Map app plan types to Stripe Price IDs.
 * Replace env values with real Price IDs (subscription or payment mode).
 */
export const STRIPE_PRICE_IDS = {
  subscription: {
    starter: process.env.STRIPE_PRICE_STARTER || '',
    pro: process.env.STRIPE_PRICE_PRO || '',
    elite: process.env.STRIPE_PRICE_ELITE || '',
  },
  // For any one-time items, add here later
  oneTime: {},
} as const;

export const SUBSCRIPTION_PLAN_TYPES = ['starter', 'pro', 'elite'] as const;
export type SubscriptionPlanType = (typeof SUBSCRIPTION_PLAN_TYPES)[number];

export function isSubscriptionPlanType(
  value: unknown
): value is SubscriptionPlanType {
  return (
    typeof value === 'string' &&
    (SUBSCRIPTION_PLAN_TYPES as readonly string[]).includes(value)
  );
}

export function resolveSubscriptionPriceId(planType: SubscriptionPlanType): string {
  const id = STRIPE_PRICE_IDS.subscription[planType];
  if (!id) {
    throw new Error(`Missing Stripe price id for plan: ${planType}. Set STRIPE_PRICE_${planType.toUpperCase()}`);
  }
  return id;
}


