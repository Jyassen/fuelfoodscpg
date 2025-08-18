# FuelFoods Checkout Context System

A comprehensive React context system for managing cart and checkout functionality in the FuelFoods CPG application.

## Overview

This context system provides:

- **CartContext**: Manages cart items, quantities, pricing, and persistence
- **CheckoutContext**: Handles checkout flow, customer information, shipping, billing, and payment
- **Integrated Providers**: Automatic synchronization between cart and checkout states
- **TypeScript Support**: Full type safety with existing FuelFoods types
- **Validation**: Real-time form validation using checkout utilities
- **Persistence**: Local storage integration for cart persistence

## Quick Start

### 1. Wrap Your Application

```tsx
// app/layout.tsx
import { FuelFoodsProvider } from '@/context';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <FuelFoodsProvider>
          {children}
        </FuelFoodsProvider>
      </body>
    </html>
  );
}
```

### 2. Use Context Hooks in Components

```tsx
// components/ProductCard.tsx
import { useCart } from '@/context';
import { Button } from '@/components/ui/button';

export function ProductCard({ product }: { product: FuelFoodsProduct }) {
  const { addItem, isLoading } = useCart();

  const handleAddToCart = () => {
    addItem(product, 1, 'individual');
  };

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <Button 
        onClick={handleAddToCart}
        disabled={isLoading}
        variant="brand"
      >
        Add to Cart
      </Button>
    </div>
  );
}
```

### 3. Build Checkout Flow

```tsx
// components/CheckoutFlow.tsx
import { useCheckout, useCheckoutProgress } from '@/context';

export function CheckoutFlow() {
  const { currentStep, goToStep } = useCheckout();
  const { progress } = useCheckoutProgress();

  return (
    <div>
      <div className="progress-bar">
        <div style={{ width: `${progress}%` }} />
      </div>
      
      {currentStep === 'customer_info' && <CustomerInfoForm />}
      {currentStep === 'shipping' && <ShippingForm />}
      {currentStep === 'payment' && <PaymentForm />}
      {/* ... other steps */}
    </div>
  );
}
```

## Available Hooks

### Core Hooks

- `useCart()` - Full cart functionality
- `useCheckout()` - Full checkout functionality
- `useFuelFoods()` - Combined cart and checkout with utilities

### Specialized Hooks

- `useCartSummary()` - Cart display data (optimized for UI)
- `useCheckoutProgress()` - Checkout progress and validation
- `useDiscounts()` - Discount code management
- `useShipping()` - Shipping options management

### Individual Context Hooks

- `useCartOnly()` - Cart context only
- `useCheckoutOnly()` - Checkout context only

## Key Features

### Cart Management

```tsx
const { 
  addItem,           // Add product to cart
  removeItem,        // Remove item by ID
  updateQuantity,    // Update item quantity
  clearCart,         // Clear all items
  items,             // Current cart items
  itemCount,         // Total item count
  pricing,           // Price breakdown
  hasItems,          // Boolean helper
  addSubscriptionPlan // Add subscription plans
} = useCart();
```

### Checkout Flow

```tsx
const {
  currentStep,          // Current checkout step
  goToStep,            // Navigate to specific step
  goToNextStep,        // Move to next step
  goToPreviousStep,    // Move to previous step
  canProceedToStep,    // Check if step is accessible
  
  // Form data
  customerInfo,
  shippingInfo,
  billingInfo,
  paymentInfo,
  
  // Form updates
  updateCustomerInfo,
  updateShippingInfo,
  updateBillingInfo,
  updatePaymentInfo,
  
  // Validation
  errors,
  validateCurrentStep,
  clearErrors,
  
  // Processing
  processOrder,
  isProcessing
} = useCheckout();
```

### Subscription Plans

```tsx
const { addSubscriptionPlan } = useCart();

// Add Pro Plan (3 packs/week)
const proConfig = createPlanConfiguration('pro', [
  { varietyId: 'mega-mix', quantity: 2 },
  { varietyId: 'brassica-blend', quantity: 1 }
]);
addSubscriptionPlan('pro', proConfig, 'weekly');

// Add Elite Plan (5 packs/week)
const eliteConfig = createPlanConfiguration('elite');
addSubscriptionPlan('elite', eliteConfig, 'weekly');
```

### Form Validation

```tsx
const { errors, validateCurrentStep } = useCheckout();

// Validate current step
const isValid = validateCurrentStep();

// Check specific errors
if (errors.customerInfo.length > 0) {
  console.log('Customer info has errors:', errors.customerInfo);
}

// Clear specific section errors
clearErrors('customerInfo');
```

### Discount Codes

```tsx
const { 
  applyCode, 
  removeDiscount, 
  appliedDiscount, 
  isValidating 
} = useDiscounts();

// Apply discount code
const success = await applyCode('SAVE10');
if (success) {
  console.log('Discount applied:', appliedDiscount);
}
```

### Shipping Options

```tsx
const { 
  loadOptions, 
  selectOption, 
  options, 
  selected, 
  isLoading 
} = useShipping();

// Load shipping options for ZIP code
await loadOptions('12345');

// Select shipping option
selectOption(options[0]);
```

## Integration Examples

### Product Pages

```tsx
// pages/products/[slug].tsx
import { useCart, useFuelFoods } from '@/context';

export function ProductPage({ product }: { product: FuelFoodsProduct }) {
  const { addItem } = useCart();
  const { startCheckout } = useFuelFoods();

  const handleBuyNow = () => {
    addItem(product, 1, 'individual');
    startCheckout(); // Navigates to checkout
  };

  return (
    <div>
      {/* Product details */}
      <Button onClick={handleBuyNow}>Buy Now</Button>
    </div>
  );
}
```

### Cart Page

```tsx
// pages/cart.tsx
import { useCartSummary, useCart } from '@/context';

export function CartPage() {
  const { items, totalPrice, hasItems } = useCartSummary();
  const { updateQuantity, removeItem } = useCart();

  if (!hasItems) {
    return <div>Your cart is empty</div>;
  }

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          <span>{item.name}</span>
          <span>${item.totalPrice}</span>
          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
            +
          </button>
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
      <div>Total: ${totalPrice}</div>
    </div>
  );
}
```

### Checkout Page

```tsx
// pages/checkout.tsx
import { useCheckout, useCheckoutProgress } from '@/context';

export function CheckoutPage() {
  const { currentStep } = useCheckout();
  const { progress } = useCheckoutProgress();

  return (
    <div>
      <ProgressBar progress={progress} />
      
      {currentStep === 'customer_info' && <CustomerInfoStep />}
      {currentStep === 'shipping' && <ShippingStep />}
      {currentStep === 'billing' && <BillingStep />}
      {currentStep === 'payment' && <PaymentStep />}
      {currentStep === 'review' && <ReviewStep />}
      {currentStep === 'complete' && <ThankYouStep />}
    </div>
  );
}
```

### Header Cart Icon

```tsx
// components/layout/Header.tsx
import { useCartSummary } from '@/context';

export function CartIcon() {
  const { itemCount, totalPrice } = useCartSummary();

  return (
    <div className="cart-icon">
      <span className="cart-count">{itemCount}</span>
      <span className="cart-total">${totalPrice.toFixed(2)}</span>
    </div>
  );
}
```

## Type Safety

All context functions are fully typed using the existing FuelFoods type definitions:

```tsx
import type { 
  CheckoutCartItem,
  FuelFoodsProduct,
  PlanConfiguration,
  CheckoutStep 
} from '@/lib/types';

// TypeScript will enforce correct usage
const { addItem } = useCart();
addItem(product, quantity, type, config, frequency); // All typed
```

## Error Handling

The context system includes comprehensive error handling:

```tsx
const { error, errors, isLoading } = useCart();
const { isProcessing, errors: checkoutErrors } = useCheckout();

// Handle cart errors
if (error) {
  console.error('Cart error:', error);
}

// Handle validation errors
if (errors.customerInfo.length > 0) {
  // Show validation errors to user
}
```

## Performance Considerations

- Context providers are optimized with `useCallback` and `useMemo`
- Cart data is persisted to localStorage automatically
- Validation runs on-demand, not on every keystroke
- Shipping calculations are debounced
- Large state objects are split across multiple contexts

## Testing

Test the context providers using the example component:

```tsx
// Import the example component
import { CheckoutExample } from '@/components/examples/CheckoutExample';

// Use in a test page or storybook
export default function TestPage() {
  return (
    <FuelFoodsProvider>
      <CheckoutExample />
    </FuelFoodsProvider>
  );
}
```

## Migration Guide

To integrate with existing pages:

1. **Wrap app with provider** in `app/layout.tsx`
2. **Replace existing cart logic** with `useCart()` hook
3. **Update product pages** to use `addItem()`
4. **Create checkout flow** using `useCheckout()`
5. **Update header/cart components** with `useCartSummary()`

## Next Steps

- Add payment processing integration
- Implement order persistence
- Add analytics tracking
- Create subscription management UI
- Integrate with inventory system

## Support

For questions or issues:
1. Check the TypeScript types in `/src/lib/types`
2. Review utility functions in `/src/lib/checkout-utils`
3. Test with the example component
4. Refer to existing FuelFoods patterns