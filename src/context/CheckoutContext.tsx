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
  CheckoutData,
  CheckoutCustomerInfo,
  CheckoutShippingInfo,
  CheckoutBillingInfo,
  CheckoutPaymentInfo,
  CheckoutDiscount,
  CheckoutValidationErrors,
  CheckoutStep,
  ShippingOption,
  OrderPricing,
  CheckoutCartItem,
  PaymentMethodType,
} from '@/lib/types';
import {
  initializeCheckoutData,
  updateCheckoutData,
  validateCheckoutData,
  calculateOrderPricing,
  CHECKOUT_VALIDATION_SCHEMA,
} from '@/lib/checkout-utils';

// ============================================================================
// CHECKOUT STATE TYPES
// ============================================================================

interface CheckoutState extends CheckoutData {
  isProcessing: boolean;
  isLoadingShipping: boolean;
  isValidatingDiscount: boolean;
  availableShippingOptions: ShippingOption[];
  completedSteps: CheckoutStep[];
}

// ============================================================================
// CHECKOUT ACTION TYPES
// ============================================================================

type CheckoutAction =
  | { type: 'SET_PROCESSING'; payload: boolean }
  | { type: 'SET_LOADING_SHIPPING'; payload: boolean }
  | { type: 'SET_VALIDATING_DISCOUNT'; payload: boolean }
  | { type: 'SET_CURRENT_STEP'; payload: CheckoutStep }
  | { type: 'UPDATE_CUSTOMER_INFO'; payload: Partial<CheckoutCustomerInfo> }
  | { type: 'UPDATE_SHIPPING_INFO'; payload: Partial<CheckoutShippingInfo> }
  | { type: 'UPDATE_BILLING_INFO'; payload: Partial<CheckoutBillingInfo> }
  | { type: 'UPDATE_PAYMENT_INFO'; payload: Partial<CheckoutPaymentInfo> }
  | { type: 'SET_ITEMS'; payload: CheckoutCartItem[] }
  | { type: 'SET_SHIPPING_OPTIONS'; payload: ShippingOption[] }
  | { type: 'SELECT_SHIPPING_OPTION'; payload: ShippingOption }
  | { type: 'APPLY_DISCOUNT'; payload: CheckoutDiscount }
  | { type: 'REMOVE_DISCOUNT' }
  | { type: 'VALIDATE_FORM'; payload?: CheckoutStep }
  | { type: 'MARK_STEP_COMPLETED'; payload: CheckoutStep }
  | { type: 'RESET_CHECKOUT' }
  | { type: 'SET_ERRORS'; payload: Partial<CheckoutValidationErrors> }
  | { type: 'CLEAR_ERRORS'; payload?: keyof CheckoutValidationErrors }
  | { type: 'CALCULATE_PRICING' };

// ============================================================================
// CHECKOUT CONTEXT INTERFACE
// ============================================================================

interface CheckoutContextType extends CheckoutState {
  // Step navigation
  goToStep: (step: CheckoutStep) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  canProceedToStep: (step: CheckoutStep) => boolean;

  // Form updates
  updateCustomerInfo: (info: Partial<CheckoutCustomerInfo>) => void;
  updateShippingInfo: (info: Partial<CheckoutShippingInfo>) => void;
  updateBillingInfo: (info: Partial<CheckoutBillingInfo>) => void;
  updatePaymentInfo: (info: Partial<CheckoutPaymentInfo>) => void;

  // Cart integration
  setCartItems: (items: CheckoutCartItem[]) => void;

  // Shipping
  loadShippingOptions: (zipCode: string) => Promise<void>;
  selectShippingOption: (option: ShippingOption) => void;

  // Discounts
  applyDiscountCode: (code: string) => Promise<boolean>;
  removeDiscount: () => void;

  // Validation
  validateCurrentStep: () => boolean;
  validateStep: (step: CheckoutStep) => boolean;
  clearErrors: (section?: keyof CheckoutValidationErrors) => void;

  // Processing
  processOrder: () => Promise<boolean>;

  // Utilities
  getStepProgress: () => number;
  isStepCompleted: (step: CheckoutStep) => boolean;

  // Reset
  resetCheckout: () => void;
}

// ============================================================================
// CHECKOUT REDUCER
// ============================================================================

function checkoutReducer(
  state: CheckoutState,
  action: CheckoutAction
): CheckoutState {
  switch (action.type) {
    case 'SET_PROCESSING':
      return {
        ...state,
        isProcessing: action.payload,
      };

    case 'SET_LOADING_SHIPPING':
      return {
        ...state,
        isLoadingShipping: action.payload,
      };

    case 'SET_VALIDATING_DISCOUNT':
      return {
        ...state,
        isValidatingDiscount: action.payload,
      };

    case 'SET_CURRENT_STEP':
      return {
        ...state,
        currentStep: action.payload,
        updatedAt: Date.now().toString(),
      };

    case 'UPDATE_CUSTOMER_INFO': {
      const updatedCustomerInfo = { ...state.customerInfo, ...action.payload };
      const updatedData = updateCheckoutData(state, {
        customerInfo: updatedCustomerInfo,
      });

      return {
        ...state,
        ...updatedData,
      };
    }

    case 'UPDATE_SHIPPING_INFO': {
      const updatedShippingInfo = { ...state.shippingInfo, ...action.payload };
      let updatedBillingInfo = state.billingInfo;

      // If billing is same as shipping, update billing info too
      if (state.billingInfo.sameAsShipping) {
        updatedBillingInfo = {
          ...updatedShippingInfo,
          sameAsShipping: true,
        };
      }

      const updatedData = updateCheckoutData(state, {
        shippingInfo: updatedShippingInfo,
        billingInfo: updatedBillingInfo,
      });

      return {
        ...state,
        ...updatedData,
      };
    }

    case 'UPDATE_BILLING_INFO': {
      const updatedBillingInfo = { ...state.billingInfo, ...action.payload };
      const updatedData = updateCheckoutData(state, {
        billingInfo: updatedBillingInfo,
      });

      return {
        ...state,
        ...updatedData,
      };
    }

    case 'UPDATE_PAYMENT_INFO': {
      const updatedPaymentInfo = { ...state.paymentInfo, ...action.payload };
      const updatedData = updateCheckoutData(state, {
        paymentInfo: updatedPaymentInfo,
      });

      return {
        ...state,
        ...updatedData,
      };
    }

    case 'SET_ITEMS': {
      const updatedData = updateCheckoutData(state, { items: action.payload });

      return {
        ...state,
        ...updatedData,
      };
    }

    case 'SET_SHIPPING_OPTIONS':
      return {
        ...state,
        availableShippingOptions: action.payload,
      };

    case 'SELECT_SHIPPING_OPTION': {
      const updatedData = updateCheckoutData(state, {
        selectedShippingOption: action.payload,
      });

      return {
        ...state,
        ...updatedData,
      };
    }

    case 'APPLY_DISCOUNT': {
      const updatedData = updateCheckoutData(state, {
        appliedDiscount: action.payload,
      });

      return {
        ...state,
        ...updatedData,
      };
    }

    case 'REMOVE_DISCOUNT': {
      const updatedData = updateCheckoutData(state, {
        appliedDiscount: undefined,
      });

      return {
        ...state,
        ...updatedData,
      };
    }

    case 'VALIDATE_FORM': {
      const errors = validateCheckoutData(state);
      // De-duplicate messages per section to avoid stacked repeats in UI
      const deduped = {
        customerInfo: Array.from(new Set(errors.customerInfo)),
        shippingInfo: Array.from(new Set(errors.shippingInfo)),
        billingInfo: Array.from(new Set(errors.billingInfo)),
        paymentInfo: Array.from(new Set(errors.paymentInfo)),
        items: Array.from(new Set(errors.items)),
        discount: Array.from(new Set(errors.discount)),
        general: Array.from(new Set(errors.general)),
      } as CheckoutValidationErrors;

      return {
        ...state,
        errors: deduped,
        isValid: Object.values(deduped).every(
          sectionErrors => sectionErrors.length === 0
        ),
      };
    }

    case 'MARK_STEP_COMPLETED': {
      const completedSteps = [...state.completedSteps];
      if (!completedSteps.includes(action.payload)) {
        completedSteps.push(action.payload);
      }

      return {
        ...state,
        completedSteps,
      };
    }

    case 'SET_ERRORS':
      return {
        ...state,
        errors: { ...state.errors, ...action.payload },
      };

    case 'CLEAR_ERRORS': {
      if (action.payload) {
        return {
          ...state,
          errors: { ...state.errors, [action.payload]: [] },
        };
      } else {
        return {
          ...state,
          errors: {
            customerInfo: [],
            shippingInfo: [],
            billingInfo: [],
            paymentInfo: [],
            items: [],
            discount: [],
            general: [],
          },
        };
      }
    }

    case 'CALCULATE_PRICING': {
      const pricing = calculateOrderPricing(
        state.items,
        state.appliedDiscount?.appliedAmount || 0,
        state.shippingInfo.zipCode
      );

      return {
        ...state,
        pricing,
      };
    }

    case 'RESET_CHECKOUT':
      return {
        ...initializeCheckoutData(),
        isProcessing: false,
        isLoadingShipping: false,
        isValidatingDiscount: false,
        availableShippingOptions: [],
        completedSteps: [],
      } as CheckoutState;

    default:
      return state;
  }
}

// ============================================================================
// CHECKOUT STEPS CONFIGURATION
// ============================================================================

const CHECKOUT_STEPS: CheckoutStep[] = [
  'cart',
  'shipping',
  'payment',
  'review',
  'processing',
  'complete',
];

const SHIPPING_OPTIONS: ShippingOption[] = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    description: '5-7 business days',
    price: 5.99,
    estimatedDays: 6,
    carrierName: 'USPS',
    trackingIncluded: true,
    isDefault: true,
  },
  {
    id: 'express',
    name: 'Express Shipping',
    description: '2-3 business days',
    price: 12.99,
    estimatedDays: 3,
    carrierName: 'FedEx',
    trackingIncluded: true,
    isDefault: false,
  },
  {
    id: 'overnight',
    name: 'Overnight Shipping',
    description: 'Next business day',
    price: 24.99,
    estimatedDays: 1,
    carrierName: 'FedEx',
    trackingIncluded: true,
    isDefault: false,
  },
];

// ============================================================================
// INITIAL STATE
// ============================================================================

const initialState: CheckoutState = {
  ...initializeCheckoutData(),
  isProcessing: false,
  isLoadingShipping: false,
  isValidatingDiscount: false,
  availableShippingOptions: [],
  completedSteps: [],
};

// ============================================================================
// CONTEXT CREATION
// ============================================================================

const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined
);

// ============================================================================
// CHECKOUT PROVIDER COMPONENT
// ============================================================================

interface CheckoutProviderProps {
  children: ReactNode;
  persistToStorage?: boolean;
}

export function CheckoutProvider({
  children,
  persistToStorage = true,
}: CheckoutProviderProps) {
  const [state, dispatch] = useReducer(checkoutReducer, initialState);

  // Step navigation
  const goToStep = useCallback((step: CheckoutStep) => {
    dispatch({ type: 'SET_CURRENT_STEP', payload: step });
  }, []);

  const goToNextStep = useCallback(() => {
    const currentIndex = CHECKOUT_STEPS.indexOf(state.currentStep);
    if (currentIndex < CHECKOUT_STEPS.length - 1) {
      const nextStep = CHECKOUT_STEPS[currentIndex + 1];
      dispatch({ type: 'SET_CURRENT_STEP', payload: nextStep });
    }
  }, [state.currentStep]);

  const goToPreviousStep = useCallback(() => {
    const currentIndex = CHECKOUT_STEPS.indexOf(state.currentStep);
    if (currentIndex > 0) {
      const previousStep = CHECKOUT_STEPS[currentIndex - 1];
      dispatch({ type: 'SET_CURRENT_STEP', payload: previousStep });
    }
  }, [state.currentStep]);

  const canProceedToStep = useCallback(
    (step: CheckoutStep) => {
      const stepIndex = CHECKOUT_STEPS.indexOf(step);
      const currentIndex = CHECKOUT_STEPS.indexOf(state.currentStep);

      // Can always go backward or to current step
      if (stepIndex <= currentIndex) return true;

      // Check if all previous steps are completed
      for (let i = 0; i < stepIndex; i++) {
        const checkStep = CHECKOUT_STEPS[i];
        if (!state.completedSteps.includes(checkStep)) {
          return false;
        }
      }

      return true;
    },
    [state.currentStep, state.completedSteps]
  );

  // Form updates
  const updateCustomerInfo = useCallback(
    (info: Partial<CheckoutCustomerInfo>) => {
      dispatch({ type: 'UPDATE_CUSTOMER_INFO', payload: info });
    },
    []
  );

  const updateShippingInfo = useCallback(
    (info: Partial<CheckoutShippingInfo>) => {
      dispatch({ type: 'UPDATE_SHIPPING_INFO', payload: info });
    },
    []
  );

  const updateBillingInfo = useCallback(
    (info: Partial<CheckoutBillingInfo>) => {
      dispatch({ type: 'UPDATE_BILLING_INFO', payload: info });
    },
    []
  );

  const updatePaymentInfo = useCallback(
    (info: Partial<CheckoutPaymentInfo>) => {
      dispatch({ type: 'UPDATE_PAYMENT_INFO', payload: info });
    },
    []
  );

  // Cart integration
  const setCartItems = useCallback((items: CheckoutCartItem[]) => {
    dispatch({ type: 'SET_ITEMS', payload: items });
  }, []);

  // Shipping
  const loadShippingOptions = useCallback(
    async (zipCode: string) => {
      dispatch({ type: 'SET_LOADING_SHIPPING', payload: true });

      try {
        // Simulate API call - replace with actual shipping API
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Filter shipping options based on zip code (mock logic)
        let options = [...SHIPPING_OPTIONS];

        // Free shipping for subscriptions
        const hasSubscription = state.items.some(
          item => item.type === 'subscription'
        );
        if (hasSubscription) {
          options = options.map(option => ({ ...option, price: 0 }));
        }

        dispatch({ type: 'SET_SHIPPING_OPTIONS', payload: options });

        // Auto-select default option
        const defaultOption =
          options.find(option => option.isDefault) || options[0];
        if (defaultOption) {
          dispatch({ type: 'SELECT_SHIPPING_OPTION', payload: defaultOption });
        }
      } catch (error) {
        console.error('Failed to load shipping options:', error);
        dispatch({
          type: 'SET_ERRORS',
          payload: { general: ['Failed to load shipping options'] },
        });
      } finally {
        dispatch({ type: 'SET_LOADING_SHIPPING', payload: false });
      }
    },
    [state.items]
  );

  const selectShippingOption = useCallback((option: ShippingOption) => {
    dispatch({ type: 'SELECT_SHIPPING_OPTION', payload: option });
  }, []);

  // Discounts
  const applyDiscountCode = useCallback(
    async (code: string): Promise<boolean> => {
      dispatch({ type: 'SET_VALIDATING_DISCOUNT', payload: true });

      try {
        // Simulate API call - replace with actual discount validation
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock discount validation
        const mockDiscounts: Record<string, CheckoutDiscount> = {
          SAVE10: {
            code: 'SAVE10',
            type: 'percentage',
            value: 10,
            description: '10% off your order',
            isValid: true,
            appliedAmount: state.pricing.subtotal * 0.1,
          },
          FREESHIP: {
            code: 'FREESHIP',
            type: 'free_shipping',
            value: 0,
            description: 'Free shipping on this order',
            isValid: true,
            appliedAmount: state.selectedShippingOption?.price || 0,
          },
        };

        const discount = mockDiscounts[code.toUpperCase()];
        if (discount) {
          dispatch({ type: 'APPLY_DISCOUNT', payload: discount });
          return true;
        } else {
          dispatch({
            type: 'SET_ERRORS',
            payload: { discount: ['Invalid discount code'] },
          });
          return false;
        }
      } catch (error) {
        dispatch({
          type: 'SET_ERRORS',
          payload: { discount: ['Failed to validate discount code'] },
        });
        return false;
      } finally {
        dispatch({ type: 'SET_VALIDATING_DISCOUNT', payload: false });
      }
    },
    [state.pricing.subtotal, state.selectedShippingOption]
  );

  const removeDiscount = useCallback(() => {
    dispatch({ type: 'REMOVE_DISCOUNT' });
    dispatch({ type: 'CLEAR_ERRORS', payload: 'discount' });
  }, []);

  // Validation
  const validateCurrentStep = useCallback((): boolean => {
    dispatch({ type: 'VALIDATE_FORM', payload: state.currentStep });

    // Check specific step validation
    switch (state.currentStep) {
      case 'shipping':
        return state.errors.shippingInfo.length === 0;
      case 'billing':
        return state.errors.billingInfo.length === 0;
      case 'payment':
        return state.errors.paymentInfo.length === 0;
      default:
        return true;
    }
  }, [state.currentStep, state.errors]);

  const validateStep = useCallback(
    (step: CheckoutStep): boolean => {
      const tempErrors = validateCheckoutData(state);

      switch (step) {
        case 'shipping':
          return tempErrors.shippingInfo.length === 0;
        case 'billing':
          return tempErrors.billingInfo.length === 0;
        case 'payment':
          return tempErrors.paymentInfo.length === 0;
        case 'cart':
          return tempErrors.items.length === 0;
        default:
          return true;
      }
    },
    [state]
  );

  const clearErrors = useCallback(
    (section?: keyof CheckoutValidationErrors) => {
      dispatch({ type: 'CLEAR_ERRORS', payload: section });
    },
    []
  );

  // Processing
  const processOrder = useCallback(async (): Promise<boolean> => {
    dispatch({ type: 'SET_PROCESSING', payload: true });
    dispatch({ type: 'SET_CURRENT_STEP', payload: 'processing' });

    try {
      // Validate all data
      dispatch({ type: 'VALIDATE_FORM' });

      if (!state.isValid) {
        throw new Error('Please complete all required fields');
      }

      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Mark as complete
      dispatch({ type: 'SET_CURRENT_STEP', payload: 'complete' });
      dispatch({ type: 'MARK_STEP_COMPLETED', payload: 'complete' });

      return true;
    } catch (error) {
      dispatch({
        type: 'SET_ERRORS',
        payload: {
          general: [
            error instanceof Error ? error.message : 'Order processing failed',
          ],
        },
      });
      dispatch({ type: 'SET_CURRENT_STEP', payload: 'review' });
      return false;
    } finally {
      dispatch({ type: 'SET_PROCESSING', payload: false });
    }
  }, [state.isValid]);

  // Utilities
  const getStepProgress = useCallback((): number => {
    const currentIndex = CHECKOUT_STEPS.indexOf(state.currentStep);
    return Math.round(((currentIndex + 1) / CHECKOUT_STEPS.length) * 100);
  }, [state.currentStep]);

  const isStepCompleted = useCallback(
    (step: CheckoutStep): boolean => {
      return state.completedSteps.includes(step);
    },
    [state.completedSteps]
  );

  const resetCheckout = useCallback(() => {
    dispatch({ type: 'RESET_CHECKOUT' });
  }, []);

  // Auto-validate on data changes
  useEffect(() => {
    dispatch({ type: 'VALIDATE_FORM' });
  }, [
    state.customerInfo,
    state.shippingInfo,
    state.billingInfo,
    state.paymentInfo,
    state.items,
  ]);

  // Auto-calculate pricing on relevant changes
  useEffect(() => {
    dispatch({ type: 'CALCULATE_PRICING' });
  }, [
    state.items,
    state.selectedShippingOption,
    state.appliedDiscount,
    state.shippingInfo.zipCode,
  ]);

  // Context value
  const contextValue: CheckoutContextType = {
    ...state,
    goToStep,
    goToNextStep,
    goToPreviousStep,
    canProceedToStep,
    updateCustomerInfo,
    updateShippingInfo,
    updateBillingInfo,
    updatePaymentInfo,
    setCartItems,
    loadShippingOptions,
    selectShippingOption,
    applyDiscountCode,
    removeDiscount,
    validateCurrentStep,
    validateStep,
    clearErrors,
    processOrder,
    getStepProgress,
    isStepCompleted,
    resetCheckout,
  };

  return (
    <CheckoutContext.Provider value={contextValue}>
      {children}
    </CheckoutContext.Provider>
  );
}

// ============================================================================
// CHECKOUT HOOK
// ============================================================================

export function useCheckout(): CheckoutContextType {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
}

// ============================================================================
// EXPORTS
// ============================================================================

export type { CheckoutContextType, CheckoutState, CheckoutAction };
export { CheckoutContext, CHECKOUT_STEPS };
