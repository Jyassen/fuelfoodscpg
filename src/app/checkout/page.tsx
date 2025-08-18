'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useCheckout } from '@/context';
import CustomerInfoStep from './components/CustomerInfoStep';
import ShippingAddressStep from './components/ShippingAddressStep';
import PaymentInfoStep from './components/PaymentInfoStep';
import OrderReviewStep from './components/OrderReviewStep';
import CheckoutProgressBar from './components/CheckoutProgressBar';
import OrderSummary from './components/OrderSummary';
import { FormSection } from '@/components/form';

export default function CheckoutPage() {
  const { items, pricing, hasItems } = useCart();
  const {
    currentStep,
    goToStep,
    goToNextStep,
    goToPreviousStep,
    canProceedToStep,
    validateCurrentStep,
    isStepCompleted,
    setCartItems,
  } = useCheckout();

  // Sync cart items with checkout
  useEffect(() => {
    setCartItems(items);
  }, [items, setCartItems]);

  // Redirect to cart if no items
  useEffect(() => {
    if (!hasItems() && typeof window !== 'undefined') {
      window.location.href = '/cart';
    }
  }, [hasItems]);

  const handleStepNavigation = (step: string) => {
    if (canProceedToStep(step as any)) {
      goToStep(step as any);
    }
  };

  const handleContinue = () => {
    if (validateCurrentStep()) {
      goToNextStep();
    }
  };

  const CombinedInfo = () => (
    <div className="space-y-8">
      <CustomerInfoStep
        onContinue={handleContinue}
        onBack={() => (window.location.href = '/cart')}
        hideNavigation
      />
      <ShippingAddressStep
        onContinue={handleContinue}
        onBack={() => (window.location.href = '/cart')}
      />
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'shipping':
        return (
          <ShippingAddressStep
            onContinue={handleContinue}
            onBack={() => (window.location.href = '/cart')}
          />
        );
      case 'payment':
        return (
          <PaymentInfoStep
            onContinue={handleContinue}
            onBack={goToPreviousStep}
          />
        );
      case 'review':
        return (
          <OrderReviewStep
            onPlaceOrder={handleContinue}
            onBack={goToPreviousStep}
          />
        );
      default:
        return (
          <ShippingAddressStep
            onContinue={handleContinue}
            onBack={() => (window.location.href = '/cart')}
          />
        );
    }
  };

  // Show loading while checking cart
  if (!hasItems()) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <CheckoutProgressBar
          currentStep={currentStep}
          onStepClick={handleStepNavigation}
          isStepCompleted={isStepCompleted}
          canProceedToStep={canProceedToStep}
        />

        {/* Main Checkout Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">{renderCurrentStep()}</div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8">
              <OrderSummary
                items={items}
                pricing={pricing}
                showCouponCode={currentStep === 'review'}
                showEditCart={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
