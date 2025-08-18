/**
 * Example usage of FuelFoods checkout system types and utilities
 * This file demonstrates how to use the checkout types in real-world scenarios
 */

import {
  CheckoutCartItem,
  CheckoutData,
  OrderSummary,
  PlanConfiguration,
  MicrogreensVariety,
  MICROGREENS_VARIETIES,
  PLAN_CONFIGURATIONS,
  FuelFoodsProduct,
} from './types';

import {
  createCheckoutCartItem,
  createPlanConfiguration,
  calculateOrderPricing,
  initializeCheckoutData,
  updateCheckoutData,
  validateCheckoutData,
} from './checkout-utils';

// ============================================================================
// EXAMPLE DATA
// ============================================================================

/**
 * Example FuelFoods products
 */
const EXAMPLE_PRODUCTS: Record<string, FuelFoodsProduct> = {
  'mega-mix': {
    id: 'prod_mega_mix_001',
    name: 'Mega Mix Microgreens',
    slug: 'mega-mix',
    description:
      'A powerful blend of nutrient-dense microgreens for maximum health benefits',
    shortDescription: 'High-protein microgreen blend',
    price: 12.99,
    salePrice: undefined,
    images: [
      {
        id: 'img_mega_001',
        url: '/images/mega-mix-product.png',
        alt: 'Mega Mix Microgreens',
        width: 800,
        height: 600,
        isPrimary: true,
      },
    ],
    categories: [
      {
        id: 'cat_microgreens',
        name: 'Microgreens',
        slug: 'microgreens',
        type: 'microgreens',
        nutritionalFocus: ['high-protein', 'vitamin-rich'],
      },
    ],
    inStock: true,
    sku: 'FUEL-MEGA-001',
    weight: 4,
    dimensions: {
      length: 5,
      width: 3,
      height: 2,
      unit: 'in',
    },
    attributes: [
      { name: 'Organic', value: 'Yes', visible: true },
      { name: 'Shelf Life', value: '7-10 days', visible: true },
    ],
    variant: 'mega-mix',
    microgreenTypes: ['broccoli', 'kale', 'arugula', 'radish'],
    nutritionalInfo: {
      vitamins: ['Vitamin C', 'Vitamin K', 'Folate'],
      minerals: ['Iron', 'Calcium', 'Potassium'],
      antioxidants: ['Sulforaphane', 'Beta-carotene'],
      protein: '4g per serving',
      fiber: '2g per serving',
      calories: 25,
      servingSize: '1 oz',
    },
    growingInfo: {
      growthTime: '7-14 days',
      difficulty: 'easy',
      lightRequirement: 'medium',
      wateringFrequency: 'Daily misting',
    },
    subscriptionOptions: [
      {
        id: 'sub_weekly_mega',
        frequency: 'weekly',
        tier: 'family',
        discount: 10,
        minCommitment: 4,
        benefits: ['10% discount', 'Free shipping'],
        price: 11.69,
        originalPrice: 12.99,
      },
    ],
    packageSizes: [
      {
        id: 'pkg_single',
        name: 'Single Pack',
        quantity: 1,
        price: 12.99,
        weight: 4,
        dimensions: { length: 5, width: 3, height: 2, unit: 'in' },
      },
      {
        id: 'pkg_3pack',
        name: '3-Pack',
        quantity: 3,
        price: 34.99,
        weight: 12,
        dimensions: { length: 15, width: 9, height: 6, unit: 'in' },
        isPopular: true,
      },
    ],
    freshnessDuration: '7-10 days refrigerated',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
  },
  // Additional products would follow the same pattern
};

// ============================================================================
// EXAMPLE 1: INDIVIDUAL PRODUCT PURCHASE
// ============================================================================

/**
 * Example: Customer buying individual packs (Starter plan)
 */
export function createIndividualPurchaseExample(): CheckoutData {
  console.log('=== Individual Purchase Example ===');

  // Initialize checkout
  let checkout = initializeCheckoutData();

  // Add individual items to cart
  const megaMixItem = createCheckoutCartItem(
    'prod_mega_mix_001',
    EXAMPLE_PRODUCTS['mega-mix'],
    2, // quantity
    'individual'
  );

  console.log('Added individual item:', {
    product: megaMixItem.product.name,
    quantity: megaMixItem.quantity,
    unitPrice: megaMixItem.unitPrice,
    totalPrice: megaMixItem.totalPrice,
  });

  // Update checkout with items
  checkout = updateCheckoutData(checkout, {
    items: [megaMixItem],
    currentStep: 'customer_info',
  });

  // Add customer information
  checkout = updateCheckoutData(checkout, {
    customerInfo: {
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      phone: '(555) 123-4567',
      isNewCustomer: true,
      marketingOptIn: true,
    },
  });

  // Add shipping information
  checkout = updateCheckoutData(checkout, {
    shippingInfo: {
      firstName: 'John',
      lastName: 'Doe',
      address1: '123 Health St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      country: 'US',
      deliveryInstructions: 'Leave at front door',
      preferredDeliveryTime: 'morning',
    },
  });

  // Set billing same as shipping
  checkout = updateCheckoutData(checkout, {
    billingInfo: { sameAsShipping: true },
  });

  // Add payment information
  checkout = updateCheckoutData(checkout, {
    paymentInfo: {
      methodType: 'credit_card',
      cardholderName: 'John Doe',
      savePaymentMethod: false,
    },
    currentStep: 'review',
  });

  console.log('Final pricing:', checkout.pricing);
  console.log('Validation errors:', checkout.errors);
  console.log('Is valid:', checkout.isValid);

  return checkout;
}

// ============================================================================
// EXAMPLE 2: PRO SUBSCRIPTION PURCHASE
// ============================================================================

/**
 * Example: Customer creating a Pro subscription (3 packs weekly)
 */
export function createProSubscriptionExample(): CheckoutData {
  console.log('=== Pro Subscription Example ===');

  // Initialize checkout
  let checkout = initializeCheckoutData();

  // Create Pro plan configuration
  const proConfig = createPlanConfiguration('pro', [
    { varietyId: 'mega-mix', quantity: 2 },
    { varietyId: 'brassica-blend', quantity: 1 },
  ]);

  console.log('Pro plan configuration:', {
    planType: proConfig.planType,
    totalPacks: proConfig.totalPacks,
    varieties: proConfig.varieties,
    isValid: proConfig.isValid,
  });

  // Create subscription cart item
  const subscriptionItem = createCheckoutCartItem(
    'subscription_pro_001',
    {
      ...EXAMPLE_PRODUCTS['mega-mix'],
      id: 'subscription_pro_001',
      name: 'Pro Subscription - Weekly Microgreens',
      description: 'Weekly delivery of 3 microgreen packs',
    },
    3, // total packs
    'subscription',
    proConfig,
    'weekly'
  );

  console.log('Created subscription item:', {
    product: subscriptionItem.product.name,
    type: subscriptionItem.type,
    quantity: subscriptionItem.quantity,
    unitPrice: subscriptionItem.unitPrice,
    totalPrice: subscriptionItem.totalPrice,
    discountAmount: subscriptionItem.discountAmount,
  });

  // Update checkout with subscription
  checkout = updateCheckoutData(checkout, {
    items: [subscriptionItem],
    customerInfo: {
      email: 'sarah.smith@example.com',
      firstName: 'Sarah',
      lastName: 'Smith',
      phone: '(555) 987-6543',
      isNewCustomer: false,
      marketingOptIn: true,
    },
    shippingInfo: {
      firstName: 'Sarah',
      lastName: 'Smith',
      address1: '456 Wellness Ave',
      city: 'Austin',
      state: 'TX',
      zipCode: '78701',
      country: 'US',
    },
    billingInfo: { sameAsShipping: true },
    paymentInfo: {
      methodType: 'credit_card',
      cardholderName: 'Sarah Smith',
      savePaymentMethod: true,
    },
    currentStep: 'review',
  });

  console.log('Final pricing (with subscription discounts):', checkout.pricing);

  return checkout;
}

// ============================================================================
// EXAMPLE 3: ELITE SUBSCRIPTION WITH DISCOUNT CODE
// ============================================================================

/**
 * Example: Customer creating Elite subscription with discount code
 */
export function createEliteSubscriptionWithDiscountExample(): CheckoutData {
  console.log('=== Elite Subscription with Discount Example ===');

  // Initialize checkout
  let checkout = initializeCheckoutData();

  // Create Elite plan configuration
  const eliteConfig = createPlanConfiguration('elite', [
    { varietyId: 'mega-mix', quantity: 2 },
    { varietyId: 'brassica-blend', quantity: 2 },
    { varietyId: 'sunnies-snacks', quantity: 1 },
  ]);

  // Create subscription cart item
  const eliteItem = createCheckoutCartItem(
    'subscription_elite_001',
    {
      ...EXAMPLE_PRODUCTS['mega-mix'],
      id: 'subscription_elite_001',
      name: 'Elite Subscription - Weekly Microgreens',
      description: 'Weekly delivery of 5 microgreen packs',
    },
    5,
    'subscription',
    eliteConfig,
    'weekly'
  );

  // Apply discount code
  const appliedDiscount = {
    code: 'WELCOME20',
    type: 'percentage' as const,
    value: 20,
    description: '20% off first order',
    isValid: true,
    appliedAmount: Math.round(eliteItem.totalPrice * 0.2 * 100) / 100,
    minimumOrderAmount: 30,
    expiresAt: new Date('2024-12-31'),
  };

  // Update checkout
  checkout = updateCheckoutData(checkout, {
    items: [eliteItem],
    appliedDiscount,
    customerInfo: {
      email: 'mike.johnson@example.com',
      firstName: 'Mike',
      lastName: 'Johnson',
      phone: '(555) 555-0123',
      isNewCustomer: true,
      marketingOptIn: false,
    },
    shippingInfo: {
      firstName: 'Mike',
      lastName: 'Johnson',
      company: 'Healthy Corp',
      address1: '789 Nutrition Blvd',
      address2: 'Suite 100',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101',
      country: 'US',
      deliveryInstructions: 'Office building - call when arriving',
    },
    billingInfo: { sameAsShipping: true },
    paymentInfo: {
      methodType: 'paypal',
    },
    currentStep: 'review',
  });

  console.log('Elite subscription with discount:', {
    originalPrice: eliteItem.totalPrice,
    discountCode: appliedDiscount.code,
    discountAmount: appliedDiscount.appliedAmount,
    finalTotal: checkout.pricing.total,
  });

  return checkout;
}

// ============================================================================
// EXAMPLE 4: MIXED CART (INDIVIDUAL + SUBSCRIPTION)
// ============================================================================

/**
 * Example: Customer with both individual items and subscription
 */
export function createMixedCartExample(): CheckoutData {
  console.log('=== Mixed Cart Example ===');

  let checkout = initializeCheckoutData();

  // Individual items
  const individualItem1 = createCheckoutCartItem(
    'prod_mega_mix_001',
    EXAMPLE_PRODUCTS['mega-mix'],
    1,
    'individual'
  );

  const individualItem2 = createCheckoutCartItem(
    'prod_brassica_001',
    {
      ...EXAMPLE_PRODUCTS['mega-mix'],
      id: 'prod_brassica_001',
      name: 'Brassica Blend',
      variant: 'brassica-blend',
    },
    2,
    'individual'
  );

  // Pro subscription
  const proConfig = createPlanConfiguration('pro', [
    { varietyId: 'mega-mix', quantity: 1 },
    { varietyId: 'sunnies-snacks', quantity: 2 },
  ]);

  const subscriptionItem = createCheckoutCartItem(
    'subscription_pro_002',
    {
      ...EXAMPLE_PRODUCTS['mega-mix'],
      id: 'subscription_pro_002',
      name: 'Pro Subscription',
    },
    3,
    'subscription',
    proConfig,
    'weekly'
  );

  // Update checkout
  checkout = updateCheckoutData(checkout, {
    items: [individualItem1, individualItem2, subscriptionItem],
    customerInfo: {
      email: 'lisa.chen@example.com',
      firstName: 'Lisa',
      lastName: 'Chen',
      phone: '(555) 246-8135',
      isNewCustomer: false,
      marketingOptIn: true,
    },
    shippingInfo: {
      firstName: 'Lisa',
      lastName: 'Chen',
      address1: '321 Garden Way',
      city: 'Portland',
      state: 'OR',
      zipCode: '97201',
      country: 'US',
    },
    billingInfo: { sameAsShipping: true },
    paymentInfo: {
      methodType: 'apple_pay',
    },
    currentStep: 'review',
  });

  console.log('Mixed cart breakdown:');
  checkout.items.forEach((item, index) => {
    console.log(`Item ${index + 1}:`, {
      name: item.product.name,
      type: item.type,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      totalPrice: item.totalPrice,
    });
  });

  console.log('Total pricing:', checkout.pricing);

  return checkout;
}

// ============================================================================
// EXAMPLE 5: ORDER SUMMARY GENERATION
// ============================================================================

/**
 * Example: Generating order summary from checkout data
 */
export function createOrderSummaryExample(
  checkoutData: CheckoutData
): OrderSummary {
  console.log('=== Order Summary Example ===');

  // Generate order summary
  const orderSummary: OrderSummary = {
    items: checkoutData.items.map(item => ({
      productName: item.product.name,
      productImage: item.product.images[0]?.url || '/images/placeholder.png',
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      totalPrice: item.totalPrice,
      type: item.type,
      subscriptionDetails:
        item.type === 'subscription'
          ? {
              frequency: item.subscriptionFrequency!,
              planType: item.packageConfiguration!.planType,
              varietyBreakdown: item.packageConfiguration!.varieties.map(v => ({
                varietyName: MICROGREENS_VARIETIES[v.varietyId].name,
                quantity: v.quantity,
              })),
            }
          : undefined,
    })),
    totalItems: checkoutData.itemCount,
    customer: checkoutData.customerInfo as any,
    shippingAddress: checkoutData.shippingInfo as any,
    billingAddress: checkoutData.billingInfo as any,
    shippingOption: {
      id: 'standard',
      name: 'Standard Shipping',
      description: '5-7 business days',
      price: checkoutData.pricing.shippingCost,
      estimatedDays: 6,
      carrierName: 'FedEx',
      trackingIncluded: true,
      isDefault: true,
    },
    paymentMethod: {
      type: checkoutData.paymentInfo.methodType!,
      lastFour: '****',
    },
    pricing: checkoutData.pricing,
    appliedDiscount: checkoutData.appliedDiscount,
    subscriptions: checkoutData.items
      .filter(item => item.type === 'subscription')
      .map(item => ({
        planType: item.packageConfiguration!.planType,
        frequency: item.subscriptionFrequency!,
        nextDeliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
        varieties: item.packageConfiguration!.varieties.map(v => ({
          name: MICROGREENS_VARIETIES[v.varietyId].name,
          quantity: v.quantity,
        })),
        recurringAmount: item.totalPrice,
        commitmentPeriod: 4, // 4 weeks minimum
      })),
    estimatedDelivery: {
      earliest: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days
      latest: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      businessDays: 6,
    },
    orderNumber: `FF${Date.now().toString().slice(-6)}`,
    createdAt: new Date(),
  };

  console.log('Generated order summary:', {
    orderNumber: orderSummary.orderNumber,
    totalItems: orderSummary.totalItems,
    total: orderSummary.pricing.total,
    subscriptions: orderSummary.subscriptions.length,
    estimatedDelivery: orderSummary.estimatedDelivery,
  });

  return orderSummary;
}

// ============================================================================
// EXAMPLE USAGE
// ============================================================================

/**
 * Run all examples to demonstrate the system
 */
export function runAllExamples() {
  console.log('🌱 FuelFoods Checkout System Examples\n');

  // Example 1: Individual purchase
  const individualCheckout = createIndividualPurchaseExample();
  console.log('\n');

  // Example 2: Pro subscription
  const proCheckout = createProSubscriptionExample();
  console.log('\n');

  // Example 3: Elite subscription with discount
  const eliteCheckout = createEliteSubscriptionWithDiscountExample();
  console.log('\n');

  // Example 4: Mixed cart
  const mixedCheckout = createMixedCartExample();
  console.log('\n');

  // Example 5: Order summary
  const orderSummary = createOrderSummaryExample(eliteCheckout);
  console.log('\n');

  console.log('✅ All examples completed successfully!');

  return {
    individualCheckout,
    proCheckout,
    eliteCheckout,
    mixedCheckout,
    orderSummary,
  };
}

// Functions are already exported above with 'export function'
