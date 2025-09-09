import { supabase } from './client'
import { AuthError, User } from '@supabase/supabase-js'
import { mapProfileToUser, type AuthUserLike } from '@/types/auth'

export interface AuthResponse {
  success: boolean
  error?: string
  user?: any
}

export interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
  marketingEmails?: boolean
}

export interface LoginData {
  email: string
  password: string
  rememberMe?: boolean
}

// Register new user
export const registerUser = async (data: RegisterData): Promise<AuthResponse> => {
  try {
    // 1. Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: typeof window !== 'undefined' ? `${window.location.origin}/my-account` : undefined,
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
          phone: data.phone || null,
          marketing_emails: data.marketingEmails ?? false,
        }
      }
    })

    if (authError) {
      return { success: false, error: authError.message }
    }

    if (!authData.user) {
      return { success: false, error: 'Failed to create user account' }
    }

    // 2. Create user profile
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: authData.user.id,
          email: data.email,
          first_name: data.firstName,
          last_name: data.lastName,
          phone: data.phone || null,
          email_verified: false,
          stripe_customer_id: null,
          marketing_emails: data.marketingEmails ?? false,
        }
      ])

    if (profileError) {
      console.error('Profile creation error:', profileError)
      // Don't fail registration if profile creation fails
    }

    const mapped = mapProfileToUser(
      {
        id: authData.user.id,
        email: authData.user.email,
        email_confirmed_at: authData.user.email_confirmed_at ?? null,
      },
      {
        first_name: data.firstName,
        last_name: data.lastName,
        phone: data.phone || null,
        stripe_customer_id: null,
        email_verified: false,
        marketing_emails: data.marketingEmails ?? false,
        id: authData.user.id,
        email: data.email,
      } as any
    )

    return {
      success: true,
      user: mapped,
    }
  } catch (error: any) {
    console.error('Registration error:', error)
    return { success: false, error: error.message || 'Registration failed' }
  }
}

// Login user
export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
  try {
    console.log('Attempting login for:', data.email)
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    console.log('Supabase auth response:', { authData, error })

    if (error) {
      console.error('Supabase auth error:', error)
      return { success: false, error: error.message }
    }

    if (!authData.user) {
      console.error('No user returned from Supabase')
      return { success: false, error: 'Login failed' }
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single()

    if (profileError) {
      console.error('Profile fetch error:', profileError)
    }

    const mapped = mapProfileToUser(
      {
        id: authData.user.id,
        email: authData.user.email,
        email_confirmed_at: authData.user.email_confirmed_at ?? null,
      },
      profile as any
    )

    return {
      success: true,
      user: mapped,
    }
  } catch (error: any) {
    console.error('Login error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      cause: error.cause
    })

    if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
      return { 
        success: false, 
        error: 'Network connection error. Please check your internet connection and try again.' 
      }
    }

    return { success: false, error: error.message || 'Login failed' }
  }
}

// Logout user
export const logoutUser = async (): Promise<AuthResponse> => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) {
      return { success: false, error: error.message }
    }
    return { success: true }
  } catch (error: any) {
    console.error('Logout error:', error)
    return { success: false, error: error.message || 'Logout failed' }
  }
}

// Resend verification email
export const resendVerificationEmail = async (email: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
    })
    if (error) {
      return { success: false, error: error.message }
    }
    return { success: true }
  } catch (error: any) {
    console.error('Resend verification email error:', error)
    return { success: false, error: error.message || 'Failed to resend verification email' }
  }
}

// Get current user
export const getCurrentUser = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return null
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    return mapProfileToUser(
      {
        id: user.id,
        email: user.email,
        email_confirmed_at: user.email_confirmed_at ?? null,
      },
      profile as any
    )
  } catch (error) {
    console.error('Get current user error:', error)
    return null
  }
}

// Listen to auth changes
export const onAuthStateChange = (callback: (user: any) => void) => {
  return supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session?.user) {
      const user = await getCurrentUser()
      callback(user)
    } else if (event === 'SIGNED_OUT') {
      callback(null)
    }
  })
}
