import {
  CheckoutCartItem,
  CheckoutCustomerInfo,
  CheckoutShippingInfo,
  CheckoutBillingInfo,
  CheckoutPaymentInfo,
  CheckoutData,
  CheckoutValidationErrors,
  CheckoutValidationSchema,
  OrderPricing,
  TaxCalculation,
  PlanConfiguration,
  PlanType,
  MicrogreensVarietySelection,
  MICROGREENS_VARIETIES,
  PLAN_CONFIGURATIONS,
  ValidationRule,
  PaymentMethodType,
} from './types';

// ============================================================================
// VALIDATION SCHEMAS
// ============================================================================

/**
 * Email validation pattern
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Phone validation pattern (flexible for different formats)
 */
const PHONE_PATTERN = /^[\+]?[1-9][\d]{0,15}$/;

/**
 * ZIP code validation pattern (US format)
 */
const ZIP_PATTERN = /^\d{5}(-\d{4})?$/;

/**
 * Credit card validation pattern (basic)
 */
const CREDIT_CARD_PATTERN = /^\d{13,19}$/;

/**
 * CVV validation pattern
 */
const CVV_PATTERN = /^\d{3,4}$/;

/**
 * Validation schema for checkout forms
 */
export const CHECKOUT_VALIDATION_SCHEMA: CheckoutValidationSchema = {
  customerInfo: {
    email: {
      required: true,
      pattern: EMAIL_PATTERN,
      custom: (value: string) => {
        if (typeof value !== 'string') return 'Email is required';
        if (!value) return 'Email is required';
        if (!EMAIL_PATTERN.test(value))
          return 'Please enter a valid email address';
        return true;
      },
    },
    firstName: {
      required: true,
      minLength: 2,
      maxLength: 50,
      custom: (value: string) => {
        if (typeof value !== 'string') return 'First name is required';
        if (!value.trim()) return 'First name is required';
        if (value.trim().length < 2)
          return 'First name must be at least 2 characters';
        return true;
      },
    },
    lastName: {
      required: true,
      minLength: 2,
      maxLength: 50,
      custom: (value: string) => {
        if (typeof value !== 'string') return 'Last name is required';
        if (!value.trim()) return 'Last name is required';
        if (value.trim().length < 2)
          return 'Last name must be at least 2 characters';
        return true;
      },
    },
    phone: {
      required: true,
      pattern: PHONE_PATTERN,
      custom: (value: string) => {
        if (typeof value !== 'string') return 'Phone number is required';
        if (!value) return 'Phone number is required';
        const cleaned = value.replace(/\D/g, '');
        if (cleaned.length < 10) return 'Please enter a valid phone number';
        return true;
      },
    },
    isNewCustomer: { required: false },
    marketingOptIn: { required: false },
  },

  shippingInfo: {
    firstName: {
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    lastName: {
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    company: {
      required: false,
      maxLength: 100,
    },
    address1: {
      required: true,
      minLength: 5,
      maxLength: 100,
      custom: (value: string) => {
        if (typeof value !== 'string') return 'Street address is required';
        if (!value.trim()) return 'Street address is required';
        return true;
      },
    },
    address2: {
      required: false,
      maxLength: 100,
    },
    city: {
      required: true,
      minLength: 2,
      maxLength: 50,
      custom: (value: string) => {
        if (typeof value !== 'string') return 'City is required';
        if (!value.trim()) return 'City is required';
        return true;
      },
    },
    state: {
      required: true,
      minLength: 2,
      maxLength: 2,
      custom: (value: string) => {
        if (typeof value !== 'string') return 'State is required';
        if (!value.trim()) return 'State is required';
        if (value.trim().length !== 2)
          return 'Please enter a valid state abbreviation';
        return true;
      },
    },
    zipCode: {
      required: true,
      pattern: ZIP_PATTERN,
      custom: (value: string) => {
        if (typeof value !== 'string') return 'ZIP code is required';
        if (!value) return 'ZIP code is required';
        if (!ZIP_PATTERN.test(value)) return 'Please enter a valid ZIP code';
        return true;
      },
    },
    country: {
      required: true,
      custom: (value: string) => {
        if (typeof value !== 'string') return 'Country is required';
        if (!value.trim()) return 'Country is required';
        return true;
      },
    },
    deliveryInstructions: {
      required: false,
      maxLength: 500,
    },
    preferredDeliveryTime: {
      required: false,
    },
  },

  billingInfo: {
    firstName: {
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    lastName: {
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    company: {
      required: false,
      maxLength: 100,
    },
    address1: {
      required: true,
      minLength: 5,
      maxLength: 100,
    },
    address2: {
      required: false,
      maxLength: 100,
    },
    city: {
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    state: {
      required: true,
      minLength: 2,
      maxLength: 2,
    },
    zipCode: {
      required: true,
      pattern: ZIP_PATTERN,
    },
    country: {
      required: true,
    },
    sameAsShipping: {
      required: false,
    },
  },

  paymentInfo: {
    methodType: {
      required: true,
      custom: (value: PaymentMethodType) => {
        const validTypes: PaymentMethodType[] = [
          'credit_card',
          'debit_card',
          'paypal',
          'apple_pay',
          'google_pay',
        ];
        if (!validTypes.includes(value))
          return 'Please select a valid payment method';
        return true;
      },
    },
    cardholderName: {
      required: false, // Only required for card payments
      minLength: 2,
      maxLength: 100,
    },
    cardNumber: {
      required: false, // Only required for card payments
      pattern: CREDIT_CARD_PATTERN,
    },
    expiryMonth: {
      required: false, // Only required for card payments
      pattern: /^(0[1-9]|1[0-2])$/,
    },
    expiryYear: {
      required: false, // Only required for card payments
      pattern: /^\d{4}$/,
    },
    cvv: {
      required: false, // Only required for card payments
      pattern: CVV_PATTERN,
    },
    savePaymentMethod: {
      required: false,
    },
    paymentToken: {
      required: false,
    },
  },
};

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

/**
 * Validates a checkout form section
 */
export function validateFormSection<T extends Record<string, any>>(
  data: Partial<T>,
  schema: Record<keyof T, ValidationRule>,
  requiredFields?: (keyof T)[]
): string[] {
  const errors: string[] = [];

  // Check required fields
  if (requiredFields) {
    for (const field of requiredFields) {
      if (!data[field]) {
        errors.push(`${String(field)} is required`);
      }
    }
  }

  // Validate each field
  for (const [field, rule] of Object.entries(schema) as [
    keyof T,
    ValidationRule,
  ][]) {
    const value = data[field];

    if (
      rule.required &&
      (value === undefined ||
        value === null ||
        (typeof value === 'string' && !value.trim()))
    ) {
      errors.push(`${String(field)} is required`);
      continue;
    }

    if (value) {
      if (
        rule.minLength &&
        typeof value === 'string' &&
        (value as string).length < rule.minLength
      ) {
        errors.push(
          `${String(field)} must be at least ${rule.minLength} characters`
        );
      }

      if (
        rule.maxLength &&
        typeof value === 'string' &&
        (value as string).length > rule.maxLength
      ) {
        errors.push(
          `${String(field)} must be no more than ${rule.maxLength} characters`
        );
      }

      if (
        rule.pattern &&
        typeof value === 'string' &&
        !rule.pattern.test(value)
      ) {
        errors.push(`${String(field)} format is invalid`);
      }

      if (rule.custom) {
        const result = rule.custom(value as any);
        if (result !== true) {
          errors.push(
            typeof result === 'string' ? result : `${String(field)} is invalid`
          );
        }
      }
    }
  }

  return errors;
}

/**
 * Validates complete checkout data
 */
export function validateCheckoutData(
  data: CheckoutData
): CheckoutValidationErrors {
  const errors: CheckoutValidationErrors = {
    customerInfo: [],
    shippingInfo: [],
    billingInfo: [],
    paymentInfo: [],
    items: [],
    discount: [],
    general: [],
  };

  // Validate customer info
  errors.customerInfo = validateFormSection(
    data.customerInfo,
    CHECKOUT_VALIDATION_SCHEMA.customerInfo,
    ['email', 'firstName', 'lastName', 'phone']
  );

  // Validate shipping info
  errors.shippingInfo = validateFormSection(
    data.shippingInfo,
    CHECKOUT_VALIDATION_SCHEMA.shippingInfo,
    ['firstName', 'lastName', 'address1', 'city', 'state', 'zipCode', 'country']
  );

  // Validate billing info (if not same as shipping)
  if (!data.billingInfo.sameAsShipping) {
    errors.billingInfo = validateFormSection(
      data.billingInfo,
      CHECKOUT_VALIDATION_SCHEMA.billingInfo,
      [
        'firstName',
        'lastName',
        'address1',
        'city',
        'state',
        'zipCode',
        'country',
      ]
    );
  }

  // Validate payment info
  const paymentErrors = validateFormSection(
    data.paymentInfo,
    CHECKOUT_VALIDATION_SCHEMA.paymentInfo,
    ['methodType']
  );

  // Additional payment validation for card payments
  if (
    data.paymentInfo.methodType === 'credit_card' ||
    data.paymentInfo.methodType === 'debit_card'
  ) {
    const cardFields = [
      'cardholderName',
      'cardNumber',
      'expiryMonth',
      'expiryYear',
      'cvv',
    ] as const;
    for (const field of cardFields) {
      if (!data.paymentInfo[field]) {
        paymentErrors.push(`${field} is required for card payments`);
      }
    }
  }

  errors.paymentInfo = paymentErrors;

  // Validate cart items
  if (!data.items || data.items.length === 0) {
    errors.items.push('Cart cannot be empty');
  } else {
    for (const item of data.items) {
      if (item.quantity <= 0) {
        errors.items.push(`Invalid quantity for ${item.product.name}`);
      }
      if (
        item.type === 'subscription' &&
        !validatePlanConfiguration(item.packageConfiguration)
      ) {
        errors.items.push(
          `Invalid subscription configuration for ${item.product.name}`
        );
      }
    }
  }

  return errors;
}

// ============================================================================
// PLAN CONFIGURATION HELPERS
// ============================================================================

/**
 * Validates a plan configuration
 */
export function validatePlanConfiguration(config?: PlanConfiguration): boolean {
  if (!config) return false;

  const planConfig = PLAN_CONFIGURATIONS[config.planType];

  // Check total packs
  if (
    planConfig.packsRequired > 0 &&
    config.totalPacks !== planConfig.packsRequired
  ) {
    return false;
  }

  // Check varieties total
  const varietyTotal = config.varieties.reduce((sum, v) => sum + v.quantity, 0);
  if (varietyTotal !== config.totalPacks) {
    return false;
  }

  // Check each variety
  for (const variety of config.varieties) {
    if (variety.quantity <= 0) return false;
    if (!MICROGREENS_VARIETIES[variety.varietyId]) return false;
  }

  return true;
}

/**
 * Creates a valid plan configuration with default values
 */
export function createPlanConfiguration(
  planType: PlanType,
  varieties?: MicrogreensVarietySelection[]
): PlanConfiguration {
  const planConfig = PLAN_CONFIGURATIONS[planType];
  const totalPacks = planConfig.packsRequired;

  let finalVarieties: MicrogreensVarietySelection[] = [];

  if (planType === 'starter') {
    // For starter, allow any varieties
    finalVarieties = varieties || [];
  } else {
    // For pro/elite, ensure we have the right number of packs
    if (varieties && varieties.length > 0) {
      finalVarieties = varieties;
    } else {
      // Default: distribute evenly among all varieties
      const varietyIds = Object.keys(
        MICROGREENS_VARIETIES
      ) as (keyof typeof MICROGREENS_VARIETIES)[];
      const baseAmount = Math.floor(totalPacks / varietyIds.length);
      const remainder = totalPacks % varietyIds.length;

      finalVarieties = varietyIds
        .map((id, index) => ({
          varietyId: id,
          quantity: baseAmount + (index < remainder ? 1 : 0),
        }))
        .filter(v => v.quantity > 0);
    }
  }

  return {
    planType,
    totalPacks:
      planType === 'starter'
        ? finalVarieties.reduce((sum, v) => sum + v.quantity, 0)
        : totalPacks,
    varieties: finalVarieties,
    isValid: validatePlanConfiguration({
      planType,
      totalPacks:
        planType === 'starter'
          ? finalVarieties.reduce((sum, v) => sum + v.quantity, 0)
          : totalPacks,
      varieties: finalVarieties,
      isValid: true,
    }),
  };
}

// ============================================================================
// PRICING CALCULATIONS
// ============================================================================

/**
 * Calculates tax for an order
 */
export function calculateTax(
  taxableAmount: number,
  taxRate: number = 0.03, // 3% sales tax per requirements
  jurisdiction: string = 'Default'
): TaxCalculation {
  const amount = Math.round(taxableAmount * taxRate * 100) / 100;

  return {
    rate: taxRate,
    amount,
    taxableAmount,
    jurisdiction,
    isTaxExempt: false,
  };
}

/**
 * Calculates shipping cost based on items and location
 */
export function calculateShipping(
  items: CheckoutCartItem[],
  zipCode?: string
): number {
  // Flat $10 shipping for all orders per requirements
  return 10;
}

/**
 * Calculates complete order pricing
 */
export function calculateOrderPricing(
  items: CheckoutCartItem[],
  discountAmount: number = 0,
  zipCode?: string,
  taxRate?: number
): OrderPricing {
  // Calculate subtotal
  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);

  // Apply discount
  const discountedSubtotal = Math.max(0, subtotal - discountAmount);

  // Calculate shipping
  const shippingCost = calculateShipping(items, zipCode);

  // Calculate tax on discounted subtotal + shipping
  const taxableAmount = discountedSubtotal + shippingCost;
  const taxCalculation = calculateTax(taxableAmount, taxRate);

  // Calculate total
  const total = discountedSubtotal + shippingCost + taxCalculation.amount;

  // Calculate savings
  const savings =
    discountAmount +
    items.reduce((sum, item) => sum + (item.discountAmount || 0), 0);

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    discountAmount: Math.round(discountAmount * 100) / 100,
    discountedSubtotal: Math.round(discountedSubtotal * 100) / 100,
    shippingCost: Math.round(shippingCost * 100) / 100,
    taxCalculation,
    total: Math.round(total * 100) / 100,
    savings: Math.round(savings * 100) / 100,
  };
}

// ============================================================================
// CART ITEM HELPERS
// ============================================================================

/**
 * Calculates the price for a cart item based on its configuration
 */
export function calculateCartItemPrice(
  basePrice: number,
  quantity: number,
  planType?: PlanType,
  subscriptionDiscount?: number
): { unitPrice: number; totalPrice: number; discountAmount: number } {
  let unitPrice = basePrice;
  let discountAmount = 0;

  // Apply plan-based discount
  if (planType && planType !== 'starter') {
    const planConfig = PLAN_CONFIGURATIONS[planType];
    unitPrice = planConfig.pricePerPack;
    discountAmount = (basePrice - unitPrice) * quantity;
  }

  // Apply additional subscription discount
  if (subscriptionDiscount) {
    const additionalDiscount = unitPrice * (subscriptionDiscount / 100);
    unitPrice -= additionalDiscount;
    discountAmount += additionalDiscount * quantity;
  }

  const totalPrice = unitPrice * quantity;

  return {
    unitPrice: Math.round(unitPrice * 100) / 100,
    totalPrice: Math.round(totalPrice * 100) / 100,
    discountAmount: Math.round(discountAmount * 100) / 100,
  };
}

/**
 * Creates a checkout cart item from product and configuration
 */
export function createCheckoutCartItem(
  productId: string,
  product: any, // FuelFoodsProduct
  quantity: number,
  type: 'individual' | 'subscription' = 'individual',
  packageConfiguration?: PlanConfiguration,
  subscriptionFrequency?: string
): CheckoutCartItem {
  const basePrice =
    MICROGREENS_VARIETIES[product.variant as keyof typeof MICROGREENS_VARIETIES]
      ?.price || product.price;

  const pricing = calculateCartItemPrice(
    basePrice,
    quantity,
    packageConfiguration?.planType
  );

  return {
    id: `${productId}_${Date.now()}`,
    productId,
    quantity,
    product,
    type,
    packageConfiguration,
    subscriptionFrequency: subscriptionFrequency as any,
    unitPrice: pricing.unitPrice,
    totalPrice: pricing.totalPrice,
    discountAmount: pricing.discountAmount,
    addedAt: Date.now().toString(),
  };
}

// ============================================================================
// CHECKOUT DATA HELPERS
// ============================================================================

/**
 * Initializes empty checkout data
 */
export function initializeCheckoutData(): CheckoutData {
  return {
    items: [],
    itemCount: 0,
    customerInfo: {},
    shippingInfo: {},
    billingInfo: { sameAsShipping: true },
    paymentInfo: {},
    pricing: {
      subtotal: 0,
      discountAmount: 0,
      discountedSubtotal: 0,
      shippingCost: 0,
      taxCalculation: {
        rate: 0,
        amount: 0,
        taxableAmount: 0,
        jurisdiction: '',
        isTaxExempt: false,
      },
      total: 0,
    },
    isValid: false,
    errors: {
      customerInfo: [],
      shippingInfo: [],
      billingInfo: [],
      paymentInfo: [],
      items: [],
      discount: [],
      general: [],
    },
    currentStep: 'shipping',
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
    sessionId: `checkout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  };
}

/**
 * Updates checkout data and recalculates pricing
 */
export function updateCheckoutData(
  currentData: CheckoutData,
  updates: Partial<CheckoutData>
): CheckoutData {
  const updatedData = {
    ...currentData,
    ...updates,
    updatedAt: Date.now().toString(),
  };

  // Recalculate pricing if items changed
  if (updates.items) {
    updatedData.itemCount = updates.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    updatedData.pricing = calculateOrderPricing(
      updates.items,
      updatedData.appliedDiscount?.appliedAmount || 0,
      updatedData.shippingInfo.zipCode
    );
  }

  // Validate the updated data
  updatedData.errors = validateCheckoutData(updatedData);
  updatedData.isValid = Object.values(updatedData.errors).every(
    errors => errors.length === 0
  );

  return updatedData;
}
