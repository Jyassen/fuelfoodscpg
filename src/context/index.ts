// ============================================================================
// FUELFOODS CONTEXT MODULE
// ============================================================================

/**
 * Comprehensive context providers for the FuelFoods checkout system
 * 
 * This module provides:
 * - CartContext: Manages cart items, quantities, pricing
 * - CheckoutContext: Handles checkout state, customer info, shipping, payment
 * - FuelFoodsProvider: Combined provider with automatic cart-checkout sync
 * - Specialized hooks for different use cases
 * 
 * Usage:
 * 
 * 1. Wrap your app with FuelFoodsProvider:
 *    ```tsx
 *    import { FuelFoodsProvider } from '@/context';
 *    
 *    export default function App({ children }) {
 *      return (
 *        <FuelFoodsProvider>
 *          {children}
 *        </FuelFoodsProvider>
 *      );
 *    }
 *    ```
 * 
 * 2. Use hooks in components:
 *    ```tsx
 *    import { useCart, useCheckout, useFuelFoods } from '@/context';
 *    
 *    function ProductPage() {
 *      const { addItem } = useCart();
 *      const { startCheckout } = useFuelFoods();
 *      
 *      const handleAddToCart = () => {
 *        addItem(product, 1, 'individual');
 *        startCheckout();
 *      };
 *      
 *      return <button onClick={handleAddToCart}>Add to Cart</button>;
 *    }
 *    ```
 * 
 * 3. Use specialized hooks for specific functionality:
 *    ```tsx
 *    import { useCartSummary, useCheckoutProgress } from '@/context';
 *    
 *    function CartIcon() {
 *      const { itemCount, totalPrice } = useCartSummary();
 *      return <div>Cart ({itemCount}) - ${totalPrice}</div>;
 *    }
 *    
 *    function CheckoutProgress() {
 *      const { progress, currentStep } = useCheckoutProgress();
 *      return <div>Step: {currentStep} ({progress}%)</div>;
 *    }
 *    ```
 */

// ============================================================================
// MAIN EXPORTS
// ============================================================================

// Primary provider (recommended)
export { 
  FuelFoodsProvider,
  useFuelFoods 
} from './FuelFoodsProvider';

// Individual context providers
export { 
  CartProvider,
  CheckoutProvider 
} from './FuelFoodsProvider';

// Core context hooks
export { 
  useCart,
  useCheckout 
} from './FuelFoodsProvider';

// Specialized hooks
export {
  useCartOnly,
  useCheckoutOnly,
  useCartSummary,
  useCheckoutProgress,
  useDiscounts,
  useShipping
} from './FuelFoodsProvider';

// ============================================================================
// TYPE EXPORTS
// ============================================================================

// Context types
export type { 
  CartContextType,
  CheckoutContextType 
} from './FuelFoodsProvider';

// State types
export type { 
  CartState,
  CartAction 
} from './CartContext';

export type { 
  CheckoutState,
  CheckoutAction 
} from './CheckoutContext';

// ============================================================================
// UTILITY EXPORTS
// ============================================================================

// Checkout steps configuration
export { 
  CHECKOUT_STEPS 
} from './CheckoutContext';

// Direct context references (for advanced usage)
export { 
  CartContext 
} from './CartContext';

export { 
  CheckoutContext 
} from './CheckoutContext';

// ============================================================================
// EXAMPLE IMPLEMENTATIONS
// ============================================================================

/**
 * Example: Product Add to Cart Component
 * 
 * ```tsx
 * import { useCart } from '@/context';
 * import { Button } from '@/components/ui/button';
 * 
 * interface AddToCartProps {
 *   product: FuelFoodsProduct;
 *   quantity?: number;
 *   planConfig?: PlanConfiguration;
 * }
 * 
 * export function AddToCartButton({ 
 *   product, 
 *   quantity = 1, 
 *   planConfig 
 * }: AddToCartProps) {
 *   const { addItem, isLoading } = useCart();
 *   
 *   const handleAdd = () => {
 *     if (planConfig) {
 *       addItem(product, quantity, 'subscription', planConfig, 'weekly');
 *     } else {
 *       addItem(product, quantity, 'individual');
 *     }
 *   };
 *   
 *   return (
 *     <Button 
 *       onClick={handleAdd}
 *       disabled={isLoading}
 *       variant="brand"
 *     >
 *       {isLoading ? 'Adding...' : 'Add to Cart'}
 *     </Button>
 *   );
 * }
 * ```
 */

/**
 * Example: Cart Summary Component
 * 
 * ```tsx
 * import { useCartSummary } from '@/context';
 * import { Button } from '@/components/ui/button';
 * 
 * export function CartSummary() {
 *   const { 
 *     itemCount, 
 *     totalPrice, 
 *     subtotal, 
 *     hasItems 
 *   } = useCartSummary();
 *   
 *   if (!hasItems) {
 *     return <div>Your cart is empty</div>;
 *   }
 *   
 *   return (
 *     <div className="space-y-4">
 *       <div>Items: {itemCount}</div>
 *       <div>Subtotal: ${subtotal.toFixed(2)}</div>
 *       <div>Total: ${totalPrice.toFixed(2)}</div>
 *       <Button variant="brand" fullWidth>
 *         Proceed to Checkout
 *       </Button>
 *     </div>
 *   );
 * }
 * ```
 */

/**
 * Example: Checkout Form Component
 * 
 * ```tsx
 * import { useCheckout } from '@/context';
 * import { Button } from '@/components/ui/button';
 * import { Input } from '@/components/ui/input';
 * 
 * export function CustomerInfoForm() {
 *   const { 
 *     customerInfo, 
 *     updateCustomerInfo, 
 *     errors,
 *     goToNextStep,
 *     validateCurrentStep
 *   } = useCheckout();
 *   
 *   const handleSubmit = (e: React.FormEvent) => {
 *     e.preventDefault();
 *     if (validateCurrentStep()) {
 *       goToNextStep();
 *     }
 *   };
 *   
 *   return (
 *     <form onSubmit={handleSubmit} className="space-y-4">
 *       <Input
 *         type="email"
 *         placeholder="Email"
 *         value={customerInfo.email || ''}
 *         onChange={(e) => updateCustomerInfo({ email: e.target.value })}
 *         error={errors.customerInfo.find(e => e.includes('email'))}
 *       />
 *       <Input
 *         placeholder="First Name"
 *         value={customerInfo.firstName || ''}
 *         onChange={(e) => updateCustomerInfo({ firstName: e.target.value })}
 *         error={errors.customerInfo.find(e => e.includes('firstName'))}
 *       />
 *       <Button type="submit" variant="brand" fullWidth>
 *         Continue to Shipping
 *       </Button>
 *     </form>
 *   );
 * }
 * ```
 */

/**
 * Example: Subscription Plan Builder
 * 
 * ```tsx
 * import { useCart } from '@/context';
 * import { createPlanConfiguration } from '@/lib/checkout-utils';
 * 
 * export function SubscriptionBuilder() {
 *   const { addSubscriptionPlan } = useCart();
 *   
 *   const handleCreatePlan = (planType: 'pro' | 'elite') => {
 *     const config = createPlanConfiguration(planType);
 *     addSubscriptionPlan(planType, config, 'weekly');
 *   };
 *   
 *   return (
 *     <div className="grid grid-cols-2 gap-4">
 *       <Button 
 *         onClick={() => handleCreatePlan('pro')}
 *         variant="brand"
 *       >
 *         Pro Plan (3 packs/week)
 *       </Button>
 *       <Button 
 *         onClick={() => handleCreatePlan('elite')}
 *         variant="orange"
 *       >
 *         Elite Plan (5 packs/week)
 *       </Button>
 *     </div>
 *   );
 * }
 * ```
 */