import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      firstName?: string | null;
      lastName?: string | null;
      emailVerified?: Date | null;
      stripeCustomerId?: string | null;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    firstName?: string | null;
    lastName?: string | null;
    emailVerified?: Date | null;
    stripeCustomerId?: string | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    firstName?: string | null;
    lastName?: string | null;
    emailVerified?: Date | null;
    stripeCustomerId?: string | null;
  }
}

// User management types
export interface CreateUserData {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  password: string;
  marketingOptIn: boolean;
}

export interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  marketingOptIn?: boolean;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Address types
export interface CreateAddressData {
  type: 'billing' | 'shipping';
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface UpdateAddressData extends Partial<CreateAddressData> {
  id: string;
}

// User preferences
export interface UserPreferences {
  emailMarketing: boolean;
  emailOrderUpdates: boolean;
  emailDeliveryNotifications: boolean;
  smsNotifications: boolean;
  language: string;
  timezone: string;
}

// Authentication errors
export type AuthError = 
  | 'invalid_credentials'
  | 'user_not_found'
  | 'email_not_verified'
  | 'account_disabled'
  | 'too_many_attempts'
  | 'email_already_exists'
  | 'weak_password'
  | 'invalid_token'
  | 'token_expired';

export interface AuthErrorResponse {
  error: AuthError;
  message: string;
  field?: string;
}

// API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: AuthErrorResponse;
}

// User profile with related data
export interface UserProfile {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  emailVerified: Date | null;
  marketingOptIn: boolean;
  stripeCustomerId: string | null;
  createdAt: Date;
  updatedAt: Date;
  addresses: UserAddress[];
  _count: {
    orders: number;
    subscriptions: number;
  };
}

export interface UserAddress {
  id: string;
  type: 'billing' | 'shipping';
  firstName: string;
  lastName: string;
  company: string | null;
  address1: string;
  address2: string | null;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
  createdAt: Date;
}

// Subscription data
export interface UserSubscription {
  id: string;
  stripeSubscriptionId: string;
  planType: 'starter' | 'pro' | 'elite';
  status: string;
  currentPeriodStart: Date | null;
  currentPeriodEnd: Date | null;
  cancelAtPeriodEnd: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Order data
export interface UserOrder {
  id: string;
  orderNumber: string;
  stripeSessionId: string | null;
  stripePaymentIntentId: string | null;
  status: string;
  subtotal: number;
  taxAmount: number;
  shippingAmount: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
  items: OrderItem[];
  billingAddress: UserAddress | null;
  shippingAddress: UserAddress | null;
}

export interface OrderItem {
  id: string;
  productName: string;
  productImage: string | null;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  subscriptionDetails: {
    frequency: string;
    planType: string;
  } | null;
}

// Dashboard summary data
export interface DashboardSummary {
  user: {
    firstName: string;
    lastName: string;
    nextDeliveryDate: Date | null;
  };
  stats: {
    totalOrders: number;
    activeSubscriptions: number;
    totalSaved: number;
  };
  subscriptions: UserSubscription[];
  recentOrders: UserOrder[];
}

// Form validation schemas
export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  marketingOptIn: boolean;
  terms: boolean;
}

export interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface ResetPasswordFormData {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ProfileFormData {
  firstName: string;
  lastName: string;
  phone: string;
  marketingOptIn: boolean;
}

export interface AddressFormData {
  type: 'billing' | 'shipping';
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}