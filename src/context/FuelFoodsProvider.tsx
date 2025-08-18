'use client';

import React, { ReactNode, useEffect } from 'react';
import { CartProvider, useCart } from './CartContext';
import { CheckoutProvider, useCheckout } from './CheckoutContext';

// ============================================================================
// COMBINED PROVIDER TYPES
// ============================================================================

interface FuelFoodsProviderProps {
  children: ReactNode;
  persistToStorage?: boolean;
}

// ============================================================================
// CART-CHECKOUT SYNC COMPONENT
// ============================================================================

/**
 * Internal component that syncs cart items with checkout
 * This ensures checkout always has the latest cart data
 */
function CartCheckoutSync() {
  const cart = useCart();
  const checkout = useCheckout();

  // Sync cart items to checkout whenever cart changes
  const { setCartItems, currentStep } = checkout;
  const { items, hasItems } = cart;

  useEffect(() => {
    // Avoid dispatch churn by only syncing when items actually change reference
    setCartItems(items);
  }, [items, setCartItems]);

  // Auto-navigate logic placeholder (kept but with stable deps)
  useEffect(() => {
    if (hasItems() && currentStep === 'cart') {
      return;
    }
    // Optional redirect logic can go here if desired
  }, [hasItems, currentStep]);

  return null; // This component only handles side effects
}

// ============================================================================
// COMBINED PROVIDER COMPONENT
// ============================================================================

/**
 * Combined provider that wraps both Cart and Checkout contexts
 * Automatically syncs cart state with checkout state
 */
export function FuelFoodsProvider({
  children,
  persistToStorage = true,
}: FuelFoodsProviderProps) {
  return (
    <CartProvider persistToStorage={persistToStorage}>
      <CheckoutProvider persistToStorage={persistToStorage}>
        <CartCheckoutSync />
        {children}
      </CheckoutProvider>
    </CartProvider>
  );
}

// ============================================================================
// COMBINED HOOK
// ============================================================================

/**
 * Combined hook that provides both cart and checkout functionality
 * Useful for components that need access to both contexts
 */
export function useFuelFoods() {
  const cart = useCart();
  const checkout = useCheckout();

  return {
    cart,
    checkout,

    // Combined utilities
    getTotalItems: () => cart.getTotalItems(),
    getTotalPrice: () => cart.getTotalPrice(),
    hasItems: () => cart.hasItems(),
    isCheckoutReady: () => cart.hasItems() && checkout.currentStep !== 'cart',

    // Quick actions that affect both contexts
    addToCartAndProceed: (
      product: Parameters<typeof cart.addItem>[0],
      quantity: Parameters<typeof cart.addItem>[1],
      type?: Parameters<typeof cart.addItem>[2],
      packageConfiguration?: Parameters<typeof cart.addItem>[3],
      subscriptionFrequency?: Parameters<typeof cart.addItem>[4]
    ) => {
      cart.addItem(
        product,
        quantity,
        type,
        packageConfiguration,
        subscriptionFrequency
      );
      // Optionally auto-navigate to checkout
      // checkout.goToStep('customer_info');
    },

    startCheckout: () => {
      if (cart.hasItems()) {
        checkout.goToStep('customer_info');
      }
    },

    clearAll: () => {
      cart.clearCart();
      checkout.resetCheckout();
    },
  };
}

// ============================================================================
// HELPER HOOKS
// ============================================================================

/**
 * Hook for components that only need cart functionality
 */
export function useCartOnly() {
  return useCart();
}

/**
 * Hook for components that only need checkout functionality
 */
export function useCheckoutOnly() {
  return useCheckout();
}

/**
 * Hook that provides cart summary data optimized for UI display
 */
export function useCartSummary() {
  const cart = useCart();

  return {
    itemCount: cart.itemCount,
    totalPrice: cart.pricing.total,
    subtotal: cart.pricing.subtotal,
    hasItems: cart.hasItems(),
    isLoading: cart.isLoading,
    items: cart.items.map(item => ({
      id: item.id,
      name: item.product.name,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      totalPrice: item.totalPrice,
      image: item.product.images[0]?.url,
      type: item.type,
    })),
  };
}

/**
 * Hook that provides checkout progress data optimized for UI display
 */
export function useCheckoutProgress() {
  const checkout = useCheckout();

  return {
    currentStep: checkout.currentStep,
    progress: checkout.getStepProgress(),
    canProceed: checkout.validateCurrentStep(),
    isProcessing: checkout.isProcessing,
    errors: checkout.errors,
    completedSteps: checkout.completedSteps,
  };
}

/**
 * Hook for managing discount codes
 */
export function useDiscounts() {
  const checkout = useCheckout();

  return {
    appliedDiscount: checkout.appliedDiscount,
    isValidating: checkout.isValidatingDiscount,
    errors: checkout.errors.discount,
    applyCode: checkout.applyDiscountCode,
    removeDiscount: checkout.removeDiscount,
    clearErrors: () => checkout.clearErrors('discount'),
  };
}

/**
 * Hook for managing shipping options
 */
export function useShipping() {
  const checkout = useCheckout();

  return {
    options: checkout.availableShippingOptions,
    selected: checkout.selectedShippingOption,
    isLoading: checkout.isLoadingShipping,
    loadOptions: checkout.loadShippingOptions,
    selectOption: checkout.selectShippingOption,
  };
}

// ============================================================================
// EXPORTS
// ============================================================================

export { CartProvider, useCart } from './CartContext';

export { CheckoutProvider, useCheckout } from './CheckoutContext';

export type { CartContextType } from './CartContext';

export type { CheckoutContextType } from './CheckoutContext';
