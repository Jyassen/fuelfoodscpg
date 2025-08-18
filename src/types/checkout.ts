// TypeScript definitions for FuelFoods checkout system
// These types work seamlessly with the form components

export interface Customer {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ShippingAddress {
  id?: string;
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
  isDefault?: boolean;
}

export interface BillingAddress extends ShippingAddress {
  sameAsShipping?: boolean;
}

export interface PaymentMethod {
  id?: string;
  type: 'card' | 'paypal' | 'apple_pay' | 'google_pay';
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  nameOnCard?: string;
  isDefault?: boolean;
  last4?: string;
  brand?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  frequency: 'weekly' | 'bi-weekly' | 'monthly';
  productCount: number;
  discount: number;
  features: string[];
  isPopular?: boolean;
  description: string;
}

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  subscription?: SubscriptionPlan;
  image?: string;
  variant?: string;
}

export interface Cart {
  id?: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  currency: string;
  discountCode?: string;
  discountAmount?: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: Customer;
  shippingAddress: ShippingAddress;
  billingAddress: BillingAddress;
  paymentMethod: PaymentMethod;
  cart: Cart;
  status: OrderStatus;
  specialInstructions?: string;
  deliveryDate?: Date;
  trackingNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
}

export interface CheckoutFormData {
  // Customer Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Shipping Address
  shippingAddress1: string;
  shippingAddress2?: string;
  shippingCity: string;
  shippingState: string;
  shippingZipCode: string;
  shippingCountry: string;
  
  // Billing Information
  sameAsShipping: boolean;
  billingAddress1?: string;
  billingAddress2?: string;
  billingCity?: string;
  billingState?: string;
  billingZipCode?: string;
  billingCountry?: string;
  
  // Payment Information
  paymentMethod: 'card' | 'paypal' | 'apple_pay' | 'google_pay';
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  nameOnCard?: string;
  
  // Subscription & Preferences
  subscriptionPlan?: string;
  deliveryFrequency?: 'weekly' | 'bi-weekly' | 'monthly';
  preferredDeliveryTime?: 'morning' | 'afternoon' | 'evening';
  specialInstructions?: string;
  
  // Marketing & Communication
  emailUpdates: boolean;
  smsUpdates: boolean;
  marketingEmails: boolean;
  
  // Terms & Conditions
  termsAccepted: boolean;
  privacyPolicyAccepted: boolean;
  ageConfirmation: boolean;
}

export interface CheckoutFormErrors {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  shippingAddress?: string;
  billingAddress?: string;
  paymentMethod?: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  nameOnCard?: string;
  termsAccepted?: string;
  privacyPolicyAccepted?: string;
  ageConfirmation?: string;
}

export interface FormFieldOption {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
}

export interface ValidationRule {
  required?: boolean;
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  custom?: (value: any) => string | null;
}

export interface FormFieldConfig {
  name: keyof CheckoutFormData;
  label: string;
  type: 'text' | 'email' | 'tel' | 'password' | 'select' | 'textarea' | 'checkbox' | 'radio';
  placeholder?: string;
  helperText?: string;
  options?: FormFieldOption[];
  validation?: ValidationRule;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  autoComplete?: string;
  rows?: number; // for textarea
  grid?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
  };
}

export interface CheckoutStep {
  id: string;
  title: string;
  description?: string;
  icon?: React.ComponentType;
  fields: FormFieldConfig[];
  validation?: (data: Partial<CheckoutFormData>) => CheckoutFormErrors;
  isComplete?: (data: Partial<CheckoutFormData>) => boolean;
}

export interface CheckoutConfig {
  steps: CheckoutStep[];
  subscriptionPlans: SubscriptionPlan[];
  shippingRates: {
    standard: number;
    express: number;
    freeShippingThreshold: number;
  };
  taxRate: number;
  currency: string;
  supportedPaymentMethods: string[];
  availableStates: FormFieldOption[];
  deliveryAreas: string[];
}

// Utility types for form components
export type FormVariant = 'default' | 'error' | 'success';
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'destructive' | 'ghost' | 'orange' | 'yellow';
export type FormSize = 'sm' | 'default' | 'lg';
export type ValidationMessageType = 'error' | 'success' | 'warning' | 'info';

// API Response types
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  validationErrors?: Record<string, string>;
}

export interface CheckoutSession {
  id: string;
  customerId?: string;
  formData: Partial<CheckoutFormData>;
  cart: Cart;
  currentStep: number;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Event types for form interactions
export interface FormEvent<T = any> {
  type: string;
  field?: keyof CheckoutFormData;
  value?: T;
  step?: number;
  timestamp: Date;
}

export interface CheckoutEvents {
  stepStarted: FormEvent<number>;
  fieldChanged: FormEvent<string>;
  validationFailed: FormEvent<CheckoutFormErrors>;
  stepCompleted: FormEvent<number>;
  orderSubmitted: FormEvent<Order>;
  paymentProcessed: FormEvent<{ orderId: string; paymentId: string }>;
  orderConfirmed: FormEvent<Order>;
}

// State management types
export interface CheckoutState {
  currentStep: number;
  formData: Partial<CheckoutFormData>;
  errors: CheckoutFormErrors;
  loading: boolean;
  submitting: boolean;
  cart: Cart;
  customer?: Customer;
  session?: CheckoutSession;
  config: CheckoutConfig;
}

export type CheckoutAction = 
  | { type: 'SET_STEP'; payload: number }
  | { type: 'UPDATE_FIELD'; payload: { field: keyof CheckoutFormData; value: any } }
  | { type: 'SET_ERRORS'; payload: CheckoutFormErrors }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_SUBMITTING'; payload: boolean }
  | { type: 'UPDATE_CART'; payload: Cart }
  | { type: 'SET_CUSTOMER'; payload: Customer }
  | { type: 'RESET_FORM' };

// Hook types
export interface UseCheckoutForm {
  formData: Partial<CheckoutFormData>;
  errors: CheckoutFormErrors;
  loading: boolean;
  submitting: boolean;
  currentStep: number;
  isStepValid: (step: number) => boolean;
  updateField: (field: keyof CheckoutFormData, value: any) => void;
  nextStep: () => Promise<boolean>;
  previousStep: () => void;
  submitOrder: () => Promise<Order | null>;
  validateStep: (step: number) => CheckoutFormErrors;
}