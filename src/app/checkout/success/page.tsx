import { Metadata } from 'next';
import Link from 'next/link';
import { getStripe } from '@/lib/stripe/server';
import PurchaseTracker from '@/components/analytics/PurchaseTracker';

export const metadata: Metadata = {
  title: 'Order Success | FuelFoods',
};

interface CheckoutSuccessPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

interface PurchaseDetails {
  eventId: string;
  value: number;
  currency: string;
  contentIds?: string[];
}

/**
 * Look up the completed Stripe session so the Purchase pixel reports the real
 * order value rather than a guess. Returns null when the session is missing,
 * unpaid, or Stripe is unreachable - tracking must never break this page.
 */
async function loadPurchase(
  sessionId?: string
): Promise<PurchaseDetails | null> {
  if (!sessionId) return null;

  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== 'paid') return null;

    return {
      // Same id the webhook sends to the Conversions API - this is what lets
      // Meta deduplicate the browser and server copies of this Purchase.
      eventId: session.id,
      value: (session.amount_total ?? 0) / 100,
      currency: (session.currency || 'usd').toUpperCase(),
      contentIds: session.metadata?.plan_type
        ? [session.metadata.plan_type]
        : undefined,
    };
  } catch (error) {
    console.error('[checkout/success] could not load session:', error);
    return null;
  }
}

export default async function CheckoutSuccessPage({
  searchParams,
}: CheckoutSuccessPageProps) {
  const { session_id: sessionId } = await searchParams;
  const purchase = await loadPurchase(sessionId);
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {purchase && (
        <PurchaseTracker
          eventId={purchase.eventId}
          value={purchase.value}
          currency={purchase.currency}
          contentIds={purchase.contentIds}
        />
      )}
      <div className="max-w-xl w-full text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
          <svg
            className="h-8 w-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Order Confirmed
        </h1>
        <p className="text-gray-600 mb-8">
          Thanks for your order! We’ve emailed your receipt and will notify you
          when it ships.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/my-account"
            className="border border-green-600 text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
          >
            View My Account
          </Link>
        </div>
      </div>
    </div>
  );
}
