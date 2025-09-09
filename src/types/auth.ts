export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  emailVerified: boolean;
  stripeCustomerId?: string;
  marketingEmails?: boolean;
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

export type MinimalProfile = {
  id: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  email_verified: boolean | null;
  stripe_customer_id: string | null;
  marketing_emails: boolean | null;
};

export type AuthUserLike = {
  id: string;
  email: string | null;
  email_confirmed_at: string | null;
};

export function mapProfileToUser(authUser: AuthUserLike, profile: Partial<MinimalProfile> = {}): User {
  return {
    id: authUser.id,
    email: authUser.email ?? '',
    firstName: profile.first_name ?? '',
    lastName: profile.last_name ?? '',
    phone: profile.phone ?? undefined,
    emailVerified: !!authUser.email_confirmed_at,
    stripeCustomerId: profile.stripe_customer_id ?? undefined,
    marketingEmails: profile.marketing_emails ?? false,
    addresses: [],
    subscriptions: [],
    totalOrders: 0,
    totalSpent: 0,
  };
}


