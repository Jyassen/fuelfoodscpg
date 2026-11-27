import crypto from 'crypto';

/**
 * Meta Conversions API - server-side events.
 *
 * Why this exists: checkout happens on Stripe's hosted page, so the browser
 * leaves our domain to pay. Ad blockers, ITP and abandoned return trips mean
 * the browser-side Purchase pixel misses a meaningful share of real orders.
 * The Stripe webhook is authoritative, so we also send Purchase from there.
 *
 * Both sides send the same `event_id`, so Meta deduplicates rather than
 * double-counting.
 */

const PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || '';
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN || '';
const API_VERSION = process.env.META_CAPI_VERSION || 'v21.0';
/** Set while validating in Events Manager > Test events. Leave unset in prod. */
const TEST_EVENT_CODE = process.env.META_CAPI_TEST_EVENT_CODE || '';

export function isCapiEnabled(): boolean {
  return Boolean(PIXEL_ID && ACCESS_TOKEN);
}

/** SHA-256 hex, as Meta requires for all PII fields. */
function hash(value: string): string {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function hashEmail(email?: string | null): string | undefined {
  if (!email) return undefined;
  const normalized = email.trim().toLowerCase();
  return normalized ? hash(normalized) : undefined;
}

function hashPhone(phone?: string | null): string | undefined {
  if (!phone) return undefined;
  // Meta expects digits only, including country code.
  const digits = phone.replace(/\D/g, '');
  return digits ? hash(digits) : undefined;
}

function hashText(value?: string | null): string | undefined {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase().replace(/\s+/g, '');
  return normalized ? hash(normalized) : undefined;
}

export interface MetaUserData {
  email?: string | null;
  phone?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  country?: string | null;
  /** Stable internal id (our Supabase user id). Hashed before sending. */
  externalId?: string | null;
  /** _fbp cookie - sent raw, never hashed. */
  fbp?: string | null;
  /** _fbc cookie - sent raw, never hashed. */
  fbc?: string | null;
  clientIpAddress?: string | null;
  clientUserAgent?: string | null;
}

export interface MetaServerEvent {
  eventName: string;
  /** Must match the browser event's eventID for deduplication. */
  eventId: string;
  /** Unix seconds. Defaults to now. Meta rejects events older than 7 days. */
  eventTime?: number;
  eventSourceUrl?: string;
  actionSource?: 'website' | 'system_generated' | 'other';
  userData: MetaUserData;
  customData?: Record<string, unknown>;
}

function buildUserData(u: MetaUserData): Record<string, unknown> {
  const data: Record<string, unknown> = {
    em: hashEmail(u.email),
    ph: hashPhone(u.phone),
    fn: hashText(u.firstName),
    ln: hashText(u.lastName),
    ct: hashText(u.city),
    st: hashText(u.state),
    zp: hashText(u.zip),
    country: hashText(u.country),
    external_id: u.externalId ? hash(u.externalId) : undefined,
    fbp: u.fbp || undefined,
    fbc: u.fbc || undefined,
    client_ip_address: u.clientIpAddress || undefined,
    client_user_agent: u.clientUserAgent || undefined,
  };

  // Meta rejects null/undefined members, so drop empty keys.
  for (const key of Object.keys(data)) {
    if (data[key] === undefined) delete data[key];
  }
  return data;
}

/**
 * Send one event to the Conversions API.
 *
 * Returns true when Meta accepted the event. Never throws: a tracking failure
 * must not fail the Stripe webhook, or Stripe will retry a processed order.
 */
export async function sendMetaEvent(event: MetaServerEvent): Promise<boolean> {
  if (!isCapiEnabled()) {
    return false;
  }

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: event.eventName,
        event_time: event.eventTime ?? Math.floor(Date.now() / 1000),
        event_id: event.eventId,
        action_source: event.actionSource ?? 'website',
        event_source_url: event.eventSourceUrl,
        user_data: buildUserData(event.userData),
        custom_data: event.customData,
      },
    ],
  };

  if (TEST_EVENT_CODE) {
    payload.test_event_code = TEST_EVENT_CODE;
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${encodeURIComponent(ACCESS_TOKEN)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      const body = await res.text().catch(() => '');
      console.error(
        `[meta-capi] ${event.eventName} rejected (${res.status}):`,
        body.slice(0, 500)
      );
      return false;
    }
    return true;
  } catch (error) {
    console.error(`[meta-capi] ${event.eventName} failed to send:`, error);
    return false;
  }
}
