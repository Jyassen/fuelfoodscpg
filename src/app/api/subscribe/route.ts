import { NextResponse } from 'next/server';

type MailchimpList = {
  id: string;
};

const getAuthHeader = () => {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  if (!apiKey) throw new Error('MAILCHIMP_API_KEY is not set');
  const token = Buffer.from(`any:${apiKey}`).toString('base64');
  return `Basic ${token}`;
};

const getDataCenter = () => {
  const dc = process.env.MAILCHIMP_DC;
  if (!dc) throw new Error('MAILCHIMP_DC is not set');
  return dc;
};

async function resolveAudienceId(): Promise<string> {
  if (process.env.MAILCHIMP_AUDIENCE_ID && process.env.MAILCHIMP_AUDIENCE_ID.trim() !== '') {
    return process.env.MAILCHIMP_AUDIENCE_ID.trim();
  }
  // Fallback: pick the first list
  const dc = getDataCenter();
  const res = await fetch(`https://${dc}.api.mailchimp.com/3.0/lists`, {
    headers: { Authorization: getAuthHeader() },
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch Mailchimp lists');
  }
  const data = await res.json();
  const lists: MailchimpList[] = data?.lists ?? [];
  if (!lists.length) throw new Error('No Mailchimp audiences found');
  return lists[0].id;
}

export async function POST(req: Request) {
  try {
    const { email, firstName } = await req.json();
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const dc = getDataCenter();
    const listId = await resolveAudienceId();

    // Try create new member
    const createRes = await fetch(`https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getAuthHeader(),
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
        merge_fields: { FNAME: firstName ?? '' },
      }),
    });

    if (createRes.ok) {
      return NextResponse.json({ ok: true });
    }

    const error = await createRes.json().catch(() => ({}));
    if (error?.title === 'Member Exists') {
      // Update existing member
      const crypto = await import('crypto');
      const hash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');
      const patchRes = await fetch(`https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members/${hash}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: getAuthHeader(),
        },
        body: JSON.stringify({ status: 'subscribed', merge_fields: { FNAME: firstName ?? '' } }),
      });
      if (patchRes.ok) return NextResponse.json({ ok: true, updated: true });
      const patchError = await patchRes.text();
      return NextResponse.json({ error: patchError || 'Failed to update member' }, { status: 500 });
    }

    return NextResponse.json({ error: error?.detail || 'Failed to subscribe' }, { status: 500 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Server error' }, { status: 500 });
  }
}


