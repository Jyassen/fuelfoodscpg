'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCheckout } from '@/context';
import { Button, FormField, LoadingSpinner } from '@/components/form';
import { CheckoutCartItem, OrderPricing } from '@/lib/types';

interface OrderSummaryProps {
  items: CheckoutCartItem[];
  pricing: OrderPricing;
  showCouponCode?: boolean;
  showEditCart?: boolean;
}

export default function OrderSummary({ 
  items, 
  pricing, 
  showCouponCode = false, 
  showEditCart = false 
}: OrderSummaryProps) {
  const { 
    appliedDiscount, 
    applyDiscountCode, 
    removeDiscount, 
    isValidatingDiscount,
    errors
  } = useCheckout();

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }

    setCouponError('');
    setCouponSuccess('');
    
    try {
      const success = await applyDiscountCode(couponCode.trim().toUpperCase());
      if (success) {
        setCouponSuccess('Coupon applied successfully!');
        setCouponCode('');
      } else {
        setCouponError('Invalid coupon code. Please try again.');
      }
    } catch (error) {
      setCouponError('Failed to apply coupon. Please try again.');
    }
  };

  const handleRemoveCoupon = () => {
    removeDiscount();
    setCouponSuccess('');
    setCouponError('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleApplyCoupon();
    }
  };

  const normalizeImageSrc = (url?: string) => {
    if (!url) return '/images/placeholder.png';
    if (url.startsWith('http') || url.startsWith('data:')) return url;
    return url.startsWith('/') ? url : `/${url}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
        {showEditCart && (
          <Link 
            href="/cart" 
            className="text-sm text-green-600 hover:text-green-700 font-medium"
          >
            Edit Cart
          </Link>
        )}
      </div>

      {/* Order Items */}
      <div className="space-y-4 mb-6">
        {items.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Your cart is empty</p>
          </div>
        ) : (
          items.map((item: CheckoutCartItem) => (
            <div key={item.id} className="flex items-center space-x-3">
              {/* Image removed per request for a cleaner summary */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {item.product.name}
                </h3>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>Qty: {item.quantity}</span>
                  {item.type === 'subscription' && (
                    <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                      Subscription
                    </span>
                  )}
                </div>
                {item.packageConfiguration && (
                  <p className="text-xs text-gray-500">
                    {item.packageConfiguration.planType} plan
                  </p>
                )}
                {item.subscriptionFrequency && (
                  <p className="text-xs text-gray-500">
                    {item.subscriptionFrequency} delivery
                  </p>
                )}
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">
                  ${item.totalPrice.toFixed(2)}
                </div>
                {item.discountAmount && item.discountAmount > 0 && (
                  <div className="text-xs text-green-600">
                    -${item.discountAmount.toFixed(2)}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Coupon Code Section */}
      {showCouponCode && (
        <div className="mb-6 pb-6 border-b border-gray-200">
          {!appliedDiscount ? (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-900">Coupon Code</h3>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => {
                    setCouponCode(e.target.value);
                    setCouponError('');
                    setCouponSuccess('');
                  }}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter coupon code"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  disabled={isValidatingDiscount}
                />
                <Button
                  onClick={handleApplyCoupon}
                  disabled={isValidatingDiscount || !couponCode.trim()}
                  size="sm"
                  className="whitespace-nowrap"
                >
                  {isValidatingDiscount ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    'Apply'
                  )}
                </Button>
              </div>
              {couponError && (
                <p className="text-xs text-red-600">{couponError}</p>
              )}
              {couponSuccess && (
                <p className="text-xs text-green-600">{couponSuccess}</p>
              )}
              {errors.discount.length > 0 && (
                <div className="text-xs text-red-600">
                  {errors.discount.map((error, index) => (
                    <p key={index}>{error}</p>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-900">
                    {appliedDiscount.code}
                  </p>
                  <p className="text-xs text-green-700">
                    {appliedDiscount.description}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-green-900">
                    -${appliedDiscount.appliedAmount?.toFixed(2)}
                  </span>
                  <button
                    onClick={handleRemoveCoupon}
                    className="text-green-600 hover:text-green-700"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Pricing Breakdown */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-900">${pricing.subtotal.toFixed(2)}</span>
        </div>
        
        {pricing.discountAmount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Discount</span>
            <span className="text-green-600">-${pricing.discountAmount.toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className={`${pricing.shippingCost === 0 ? 'text-green-600' : 'text-gray-900'}`}>
            {pricing.shippingCost === 0 ? 'Free' : `$${pricing.shippingCost.toFixed(2)}`}
          </span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax</span>
          <span className="text-gray-900">${pricing.taxCalculation.amount.toFixed(2)}</span>
        </div>
        
        {pricing.savings > 0 && (
          <div className="flex justify-between text-sm border-t border-gray-200 pt-3">
            <span className="text-green-600 font-medium">Total Savings</span>
            <span className="text-green-600 font-medium">-${pricing.savings.toFixed(2)}</span>
          </div>
        )}
        
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between">
            <span className="text-lg font-semibold text-gray-900">Total</span>
            <span className="text-lg font-semibold text-gray-900">
              ${pricing.total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Security Info */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-center space-x-4 text-xs text-gray-600">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            SSL Encrypted
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            100% Secure
          </div>
        </div>
        
        {/* Money Back Guarantee */}
        <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-start space-x-2">
            <svg className="w-4 h-4 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <h4 className="text-xs font-medium text-green-900">Freshness Guarantee</h4>
              <p className="text-xs text-green-700 mt-1">
                Not satisfied? We'll replace your order or provide a full refund.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}