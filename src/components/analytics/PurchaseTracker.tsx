'use client';

import { useEffect, useRef } from 'react';
import { track, CURRENCY } from '@/lib/analytics/meta-pixel';

interface PurchaseTrackerProps {
  /** Stripe Checkout session id - doubles as the dedup key against the webhook. */
  eventId: string;
  value: number;
  currency?: string;
  contentIds?: string[];
}

/**
 * Browser-side Purchase. The Stripe webhook sends the same event with the same
 * eventId through the Conversions API, so Meta counts one sale, not two.
 */
export default function PurchaseTracker({
  eventId,
  value,
  currency = CURRENCY,
  contentIds,
}: PurchaseTrackerProps) {
  const fired = useRef(false);

  useEffect(() => {
    // React Strict Mode runs effects twice in development.
    if (fired.current) return;
    fired.current = true;

    track(
      'Purchase',
      {
        value,
        currency,
        content_type: 'product',
        ...(contentIds?.length ? { content_ids: contentIds } : {}),
      },
      eventId
    );
  }, [eventId, value, currency, contentIds]);

  return null;
}
