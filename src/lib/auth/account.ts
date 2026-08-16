import { NextResponse } from 'next/server';
import type { User } from '@supabase/supabase-js';
import { getSessionUser } from '@/lib/supabase/session';
import { getSupabaseServiceClient } from '@/lib/supabase/server';

type AuthedAccount =
  | { error: NextResponse; user?: undefined; stripeCustomerId?: undefined }
  | { error?: undefined; user: User; stripeCustomerId: string | null };

export async function getAuthedStripeCustomer(): Promise<AuthedAccount> {
  const user = await getSessionUser();
  if (!user) {
    return {
      error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    };
  }

  const { data: profile, error } = await getSupabaseServiceClient()
    .from('profiles')
    .select('stripe_customer_id')
    .eq('id', user.id)
    .maybeSingle();

  if (error) {
    console.error('[account] profile lookup failed');
    return {
      error: NextResponse.json(
        { error: 'Failed to load account' },
        { status: 500 }
      ),
    };
  }

  return {
    user,
    stripeCustomerId: profile?.stripe_customer_id ?? null,
  };
}
