'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser, loginUser, logoutUser, getCurrentUser, onAuthStateChange, resendVerificationEmail as resendVerification } from '@/lib/supabase/auth'
import type { RegisterData } from '@/lib/supabase/auth'

// User type definition
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  emailVerified: boolean;
  stripeCustomerId?: string;
  addresses: Address[];
  subscriptions: Subscription[];
  totalOrders: number;
  totalSpent: number;
}

export interface Address {
  id: string;
  type: 'shipping' | 'billing';
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  isDefault: boolean;
}

export interface Subscription {
  id: string;
  stripeSubscriptionId: string;
  status: 'active' | 'canceled' | 'past_due' | 'paused';
  plan: {
    id: string;
    name: string;
    price: number;
    frequency: 'weekly' | 'bi-weekly' | 'monthly';
  };
  nextDelivery?: Date;
  createdAt: Date;
}

// Auth context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<{ success: boolean; error?: string }>;
  changePassword: (data: { currentPassword: string; newPassword: string }) => Promise<{ success: boolean; error?: string }>;
  refreshUser: () => Promise<void>;
  isAuthenticated: boolean;
  resendVerificationEmail: (email: string) => Promise<{ success: boolean; error?: string }>
}

// RegisterData comes from Supabase auth helpers

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const normalizeUser = (u: any): User => ({
    id: u.id,
    email: u.email ?? '',
    firstName: u.firstName ?? '',
    lastName: u.lastName ?? '',
    phone: u.phone ?? undefined,
    emailVerified: !!u.emailVerified,
    stripeCustomerId: u.stripeCustomerId ?? undefined,
    addresses: [],
    subscriptions: [],
    totalOrders: 0,
    totalSpent: 0,
  });

  // Check authentication status on mount
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    setLoading(true);
    try {
      const currentUser = await getCurrentUser();
      if (currentUser) setUser(normalizeUser(currentUser));
    } catch (error) {
      console.error('Auth initialization error:', error);
    } finally {
      setLoading(false);
    }

    // Listen for auth changes
    const { data: { subscription } } = onAuthStateChange((user) => {
      if (user) setUser(normalizeUser(user));
      else setUser(null);
    });

    return () => subscription.unsubscribe();
  };

  const login = async (email: string, password: string, rememberMe = false): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true);
      const result = await loginUser({ email, password, rememberMe });
      if (result.success && result.user) {
        setUser(normalizeUser(result.user));
        return { success: true };
      } else {
        return { success: false, error: result.error || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true);
      const result = await registerUser(data);
      if (result.success && result.user) {
        setUser(normalizeUser(result.user));
        return { success: true };
      } else {
        return { success: false, error: result.error || 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      setUser(null);
    }
  };

  const updateProfile = async (data: Partial<User>): Promise<{ success: boolean; error?: string }> => {
    try {
      const updates: any = {};
      if (data.firstName !== undefined) updates.first_name = data.firstName;
      if (data.lastName !== undefined) updates.last_name = data.lastName;
      if (data.phone !== undefined) updates.phone = data.phone;

      if (Object.keys(updates).length === 0) {
        return { success: true };
      }

      const current = await getCurrentUser();
      if (!current) return { success: false, error: 'Not authenticated' };

      const { supabase } = await import('@/lib/supabase/client');
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', current.id);

      if (error) {
        return { success: false, error: error.message };
      }

      const refreshed = await getCurrentUser();
      if (refreshed) setUser(normalizeUser(refreshed));
      return { success: true };
    } catch (error) {
      console.error('Profile update error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const changePassword = async (data: { currentPassword: string; newPassword: string }): Promise<{ success: boolean; error?: string }> => {
    try {
      const { supabase } = await import('@/lib/supabase/client');
      
      const { error } = await supabase.auth.updateUser({
        password: data.newPassword
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Password change error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const refreshUser = async () => {
    try {
      const current = await getCurrentUser();
      if (current) setUser(normalizeUser(current));
    } catch (error) {
      console.error('User refresh error:', error);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    refreshUser,
    isAuthenticated: !!user,
    resendVerificationEmail: resendVerification,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Hook for protected routes
export function useRequireAuth() {
  const { user, loading } = useAuth();
  const isAuthenticated = !!user;

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      window.location.href = '/login';
    }
  }, [loading, isAuthenticated]);

  return { user, loading, isAuthenticated };
}