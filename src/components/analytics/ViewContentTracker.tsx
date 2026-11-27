'use client';

import { useEffect, useRef } from 'react';
import { track, CURRENCY } from '@/lib/analytics/meta-pixel';

interface ViewContentTrackerProps {
  contentId: string;
  contentName: string;
  value?: number;
  contentCategory?: string;
}

/**
 * Fires ViewContent on a product page. Product pages are server components,
 * so this client component is mounted inside them to do the tracking.
 */
export default function ViewContentTracker({
  contentId,
  contentName,
  value,
  contentCategory,
}: ViewContentTrackerProps) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    track('ViewContent', {
      content_ids: [contentId],
      content_name: contentName,
      content_type: 'product',
      ...(contentCategory ? { content_category: contentCategory } : {}),
      ...(value !== undefined ? { value, currency: CURRENCY } : {}),
    });
  }, [contentId, contentName, value, contentCategory]);

  return null;
}
