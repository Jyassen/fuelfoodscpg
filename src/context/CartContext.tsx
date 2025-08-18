'use client';

import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';

import {
  CheckoutCartItem,
  FuelFoodsProduct,
  PlanConfiguration,
  SubscriptionFrequency,
  OrderPricing,
  MICROGREENS_VARIETIES,
  PLAN_CONFIGURATIONS,
} from '@/lib/types';
import {
  createCheckoutCartItem,
  calculateOrderPricing,
  updateCheckoutData,
} from '@/lib/checkout-utils';

// ============================================================================
// CART STATE TYPES
// ============================================================================

interface CartState {
  items: CheckoutCartItem[];
  itemCount: number;
  pricing: OrderPricing;
  isLoading: boolean;
  error: string | null;
  sessionId: string;
  updatedAt: string;
}

// ============================================================================
// CART ACTION TYPES
// ============================================================================

type CartAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'ADD_ITEM'; payload: CheckoutCartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | {
      type: 'UPDATE_ITEM_CONFIG';
      payload: { id: string; config: Partial<CheckoutCartItem> };
    }
  | { type: 'CLEAR_CART' }
  | { type: 'CALCULATE_PRICING' }
  | { type: 'RESTORE_CART'; payload: CheckoutCartItem[] }
  | { type: 'SET_ITEMS'; payload: CheckoutCartItem[] };

// ============================================================================
// CART CONTEXT INTERFACE
// ============================================================================

interface CartContextType extends CartState {
  // Item management
  addItem: (
    product: FuelFoodsProduct,
    quantity: number,
    type?: 'individual' | 'subscription',
    packageConfiguration?: PlanConfiguration,
    subscriptionFrequency?: SubscriptionFrequency
  ) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  updateItemConfiguration: (
    itemId: string,
    config: Partial<CheckoutCartItem>
  ) => void;
  clearCart: () => void;

  // Utility functions
  getItemById: (itemId: string) => CheckoutCartItem | undefined;
  getItemsByProduct: (productId: string) => CheckoutCartItem[];
  getTotalItems: () => number;
  getTotalPrice: () => number;
  hasItems: () => boolean;

  // Subscription helpers
  addSubscriptionPlan: (
    planType: 'pro' | 'elite',
    configuration: PlanConfiguration,
    frequency: SubscriptionFrequency
  ) => void;

  // Persistence
  saveToStorage: () => void;
  loadFromStorage: () => void;
}

// ============================================================================
// CART REDUCER
// ============================================================================

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case 'ADD_ITEM': {
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(
        item =>
          item.productId === newItem.productId &&
          item.type === newItem.type &&
          JSON.stringify(item.packageConfiguration) ===
            JSON.stringify(newItem.packageConfiguration) &&
          item.subscriptionFrequency === newItem.subscriptionFrequency
      );

      let updatedItems: CheckoutCartItem[];

      if (existingItemIndex >= 0) {
        // Update existing item quantity
        updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? {
                ...item,
                quantity: item.quantity + newItem.quantity,
                totalPrice: (item.quantity + newItem.quantity) * item.unitPrice,
                addedAt: Date.now().toString(),
              }
            : item
        );
      } else {
        // Add new item
        updatedItems = [...state.items, newItem];
      }

      const itemCount = updatedItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      const pricing = calculateOrderPricing(updatedItems);

      return {
        ...state,
        items: updatedItems,
        itemCount,
        pricing,
        updatedAt: Date.now().toString(),
        error: null,
      };
    }

    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(
        item => item.id !== action.payload
      );
      const itemCount = updatedItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      const pricing = calculateOrderPricing(updatedItems);

      return {
        ...state,
        items: updatedItems,
        itemCount,
        pricing,
        updatedAt: Date.now().toString(),
      };
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;

      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: id });
      }

      const updatedItems = state.items.map(item =>
        item.id === id
          ? {
              ...item,
              quantity,
              totalPrice: quantity * item.unitPrice,
              addedAt: Date.now().toString(),
            }
          : item
      );

      const itemCount = updatedItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      const pricing = calculateOrderPricing(updatedItems);

      return {
        ...state,
        items: updatedItems,
        itemCount,
        pricing,
        updatedAt: Date.now().toString(),
      };
    }

    case 'UPDATE_ITEM_CONFIG': {
      const { id, config } = action.payload;

      const updatedItems = state.items.map(item =>
        item.id === id ? { ...item, ...config, addedAt: Date.now().toString() } : item
      );

      const itemCount = updatedItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      const pricing = calculateOrderPricing(updatedItems);

      return {
        ...state,
        items: updatedItems,
        itemCount,
        pricing,
        updatedAt: Date.now().toString(),
      };
    }

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        itemCount: 0,
        pricing: calculateOrderPricing([]),
        updatedAt: Date.now().toString(),
        error: null,
      };

    case 'CALCULATE_PRICING': {
      const pricing = calculateOrderPricing(state.items);
      return {
        ...state,
        pricing,
        updatedAt: Date.now().toString(),
      };
    }

    case 'RESTORE_CART':
    case 'SET_ITEMS': {
      const items = action.payload;
      const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
      const pricing = calculateOrderPricing(items);

      return {
        ...state,
        items,
        itemCount,
        pricing,
        updatedAt: Date.now().toString(),
        error: null,
      };
    }

    default:
      return state;
  }
}

// ============================================================================
// INITIAL STATE
// ============================================================================

const initialState: CartState = {
  items: [],
  itemCount: 0,
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
  isLoading: false,
  error: null,
  sessionId: `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  updatedAt: Date.now().toString(),
};

// ============================================================================
// CONTEXT CREATION
// ============================================================================

const CartContext = createContext<CartContextType | undefined>(undefined);

// ============================================================================
// CART PROVIDER COMPONENT
// ============================================================================

interface CartProviderProps {
  children: ReactNode;
  persistToStorage?: boolean;
}

export function CartProvider({
  children,
  persistToStorage = true,
}: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Storage helpers
  const saveToStorage = useCallback(() => {
    if (!persistToStorage || typeof window === 'undefined') return;

    try {
      const cartData = {
        items: state.items,
        sessionId: state.sessionId,
        updatedAt: state.updatedAt,
      };
      localStorage.setItem('fuelfoods_cart', JSON.stringify(cartData));
    } catch (error) {
      console.warn('Failed to save cart to storage:', error);
    }
  }, [state.items, state.sessionId, state.updatedAt, persistToStorage]);

  const loadFromStorage = useCallback(() => {
    if (!persistToStorage || typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem('fuelfoods_cart');
      if (stored) {
        const cartData = JSON.parse(stored);
        if (cartData.items && Array.isArray(cartData.items)) {
          // Validate and restore items
          const validItems = cartData.items.filter(
            (item: any) => item.id && item.productId && item.quantity > 0
          );
          dispatch({ type: 'RESTORE_CART', payload: validItems });
        }
      }
    } catch (error) {
      console.warn('Failed to load cart from storage:', error);
    }
  }, [persistToStorage]);

  // Load cart from storage on mount
  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  // Save cart to storage when it changes
  useEffect(() => {
    if (state.items.length > 0 || state.sessionId !== initialState.sessionId) {
      saveToStorage();
    }
  }, [state.items, state.sessionId, saveToStorage]);

  // Cart management functions
  const addItem = useCallback(
    (
      product: FuelFoodsProduct,
      quantity: number,
      type: 'individual' | 'subscription' = 'individual',
      packageConfiguration?: PlanConfiguration,
      subscriptionFrequency?: SubscriptionFrequency
    ) => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });

        const cartItem = createCheckoutCartItem(
          product.id,
          product,
          quantity,
          type,
          packageConfiguration,
          subscriptionFrequency
        );

        dispatch({ type: 'ADD_ITEM', payload: cartItem });
      } catch (error) {
        dispatch({
          type: 'SET_ERROR',
          payload:
            error instanceof Error
              ? error.message
              : 'Failed to add item to cart',
        });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },
    []
  );

  const removeItem = useCallback((itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity } });
  }, []);

  const updateItemConfiguration = useCallback(
    (itemId: string, config: Partial<CheckoutCartItem>) => {
      dispatch({ type: 'UPDATE_ITEM_CONFIG', payload: { id: itemId, config } });
    },
    []
  );

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  // Utility functions
  const getItemById = useCallback(
    (itemId: string) => {
      return state.items.find(item => item.id === itemId);
    },
    [state.items]
  );

  const getItemsByProduct = useCallback(
    (productId: string) => {
      return state.items.filter(item => item.productId === productId);
    },
    [state.items]
  );

  const getTotalItems = useCallback(() => {
    return state.itemCount;
  }, [state.itemCount]);

  const getTotalPrice = useCallback(() => {
    return state.pricing.total;
  }, [state.pricing.total]);

  const hasItems = useCallback(() => {
    return state.items.length > 0;
  }, [state.items.length]);

  // Subscription helper
  const addSubscriptionPlan = useCallback(
    (
      planType: 'pro' | 'elite',
      configuration: PlanConfiguration,
      frequency: SubscriptionFrequency
    ) => {
      // Create a representative product for the subscription plan
      const planConfig = PLAN_CONFIGURATIONS[planType];
      const baseVariety = MICROGREENS_VARIETIES['mega-mix']; // Use as base

      const subscriptionProduct: FuelFoodsProduct = {
        id: `subscription_${planType}`,
        name: planConfig.name,
        slug: `subscription-${planType}`,
        description: planConfig.description,
        shortDescription: planConfig.description,
        price: planConfig.pricePerPack,
        images: [
          {
            id: 'sub-1',
            url: baseVariety.image,
            alt: planConfig.name,
            width: 400,
            height: 400,
            isPrimary: true,
          },
        ],
        categories: [
          {
            id: 'subscription',
            name: 'Subscription Plans',
            slug: 'subscriptions',
            type: 'bundles' as const,
          },
        ],
        inStock: true,
        sku: `SUB-${planType.toUpperCase()}`,
        attributes: [],
        createdAt: Date.now().toString(),
        updatedAt: Date.now().toString(),
        variant: 'mega-mix' as const,
        microgreenTypes: ['arugula', 'broccoli', 'kale'] as const,
        nutritionalInfo: {
          vitamins: ['Vitamin C', 'Vitamin K', 'Folate'],
          minerals: ['Iron', 'Calcium', 'Potassium'],
          antioxidants: ['Sulforaphane', 'Beta-carotene'],
        },
        subscriptionOptions: [],
        packageSizes: [],
        freshnessDuration: '7-10 days refrigerated',
      };

      addItem(
        subscriptionProduct,
        configuration.totalPacks,
        'subscription',
        configuration,
        frequency
      );
    },
    [addItem]
  );

  // Context value
  const contextValue: CartContextType = {
    ...state,
    addItem,
    removeItem,
    updateQuantity,
    updateItemConfiguration,
    clearCart,
    getItemById,
    getItemsByProduct,
    getTotalItems,
    getTotalPrice,
    hasItems,
    addSubscriptionPlan,
    saveToStorage,
    loadFromStorage,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

// ============================================================================
// CART HOOK
// ============================================================================

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

// ============================================================================
// EXPORTS
// ============================================================================

export type { CartContextType, CartState, CartAction };
export { CartContext };
