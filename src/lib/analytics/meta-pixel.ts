/**
 * Meta (Facebook) Pixel - client-side event helpers.
 *
 * Every browser event we send carries an `eventID`. The Conversions API
 * (src/lib/analytics/meta-capi.ts) sends the same ID for the same action so
 * Meta deduplicates them instead of double-counting.
 */

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || '';

export const CURRENCY = 'USD';

/** Standard events we use. Keep in sync with the events configured in Events Manager. */
export type MetaStandardEvent =
  | 'PageView'
  | 'ViewContent'
  | 'AddToCart'
  | 'InitiateCheckout'
  | 'Purchase'
  | 'Subscribe'
  | 'Lead'
  | 'CompleteRegistration';

export interface MetaContent {
  id: string;
  quantity: number;
  item_price?: number;
}

export interface MetaEventParams {
  value?: number;
  currency?: string;
  content_ids?: string[];
  content_name?: string;
  content_type?: 'product' | 'product_group';
  content_category?: string;
  contents?: MetaContent[];
  num_items?: number;
  predicted_ltv?: number;
  [key: string]: unknown;
}

type Fbq = {
  (command: 'init', pixelId: string, advancedMatching?: Record<string, string>): void;
  (
    command: 'track' | 'trackCustom',
    event: string,
    params?: MetaEventParams,
    options?: { eventID: string }
  ): void;
  queue?: unknown[];
  loaded?: boolean;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

export function isPixelEnabled(): boolean {
  return Boolean(META_PIXEL_ID);
}

/** Read a cookie by name in the browser. Returns undefined on the server. */
export function readCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(
    new RegExp('(^|;\\s*)' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '=([^;]*)')
  );
  return match ? decodeURIComponent(match[2]) : undefined;
}

/**
 * Meta's browser cookies. Forwarding these to the Conversions API is the
 * single biggest lever on match quality, so we pass them through checkout.
 */
export function getMetaBrowserIds(): { fbp?: string; fbc?: string } {
  return { fbp: readCookie('_fbp'), fbc: readCookie('_fbc') };
}

/** Generate an ID used to deduplicate a browser event against its server twin. */
export function newEventId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

/**
 * Fire a standard event. No-ops when the pixel is not configured or has not
 * loaded yet, so tracking never breaks a user flow.
 */
export function track(
  event: MetaStandardEvent,
  params?: MetaEventParams,
  eventId?: string
): void {
  if (typeof window === 'undefined' || !window.fbq || !isPixelEnabled()) return;
  try {
    window.fbq('track', event, params, { eventID: eventId || newEventId() });
  } catch {
    // Never let an analytics failure surface to the customer.
  }
}

/** Fire a custom (non-standard) event, e.g. a holiday-specific micro-conversion. */
export function trackCustom(
  event: string,
  params?: MetaEventParams,
  eventId?: string
): void {
  if (typeof window === 'undefined' || !window.fbq || !isPixelEnabled()) return;
  try {
    window.fbq('trackCustom', event, params, { eventID: eventId || newEventId() });
  } catch {
    // Swallow - analytics must not break checkout.
  }
}

declare global {
  interface Window {
    /** Set once the base snippet's initial PageView has fired. */
    __fbPixelReady?: boolean;
  }
}
