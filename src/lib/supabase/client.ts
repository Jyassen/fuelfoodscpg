import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Note: Supabase is configured but not used for authentication
// Authentication is handled via API routes with JWT tokens

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase environment variables:', {
    url: supabaseUrl,
    key: supabaseAnonKey ? 'Present' : 'Missing'
  })
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  },
  global: {
    headers: {
      'apikey': supabaseAnonKey,
    },
    fetch: (url, options = {}) => {
      if (process.env.NODE_ENV === 'development') {
        console.log('Supabase fetch request to:', url);
      }
      return fetch(url, {
        ...options,
        mode: 'cors',
        credentials: 'omit',
      });
    },
  },
  realtime: {
    params: {
      eventsPerSecond: 2,
    },
  },
})

// Test connection on module load
if (typeof window !== 'undefined') {
  // Delay to ensure proper initialization
  setTimeout(() => {
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.error('Supabase connection error:', error)
      } else {
        console.log('Supabase connection established')
      }
    }).catch(err => {
      console.error('Failed to connect to Supabase:', err)
      console.log('Environment check:', {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing',
        key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Missing'
      })
    })
  }, 500)
}

// Types for our database
export interface UserProfile {
  id: string
  email: string
  first_name: string | null
  last_name: string | null
  phone: string | null
  stripe_customer_id: string | null
  email_verified: boolean
  created_at: string
  updated_at: string
}

export interface Address {
  id: string
  user_id: string
  type: 'shipping' | 'billing'
  first_name: string
  last_name: string
  company: string | null
  address1: string
  address2: string | null
  city: string
  state: string
  postal_code: string
  country: string
  phone: string | null
  is_default: boolean
  created_at: string
}
