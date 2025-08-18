'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useCheckout } from '@/context';
import CartHeader from './CartHeader';
import CartItems from './CartItems';
import CartEmpty from './CartEmpty';
import OrderSummary from './OrderSummary';
import CouponSection from './CouponSection';
import ContinueShoppingLink from './ContinueShoppingLink';
import { LoadingSpinner } from '@/components/form';

export default function CartPageContent() {
  const { items, hasItems, isLoading, error } = useCart();
  const { pricing } = useCheckout();
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-fuelfoods-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-fuelfoods-green-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!hasItems()) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CartHeader />
        <CartEmpty />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <CartHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items Section */}
        <div className="lg:col-span-2 space-y-6">
          <CartItems items={items} />
          <CouponSection 
            appliedCoupon={appliedCoupon} 
            onCouponChange={setAppliedCoupon} 
          />
          <ContinueShoppingLink />
        </div>

        {/* Order Summary Section */}
        <div className="lg:col-span-1">
          <OrderSummary 
            pricing={pricing}
            appliedCoupon={appliedCoupon}
            itemCount={items.length}
          />
        </div>
      </div>
    </div>
  );
}