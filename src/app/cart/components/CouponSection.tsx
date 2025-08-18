'use client';

import React, { useState } from 'react';
import { useCheckout } from '@/context';
import { Button, FormField } from '@/components/form';

interface CouponSectionProps {
  appliedCoupon: string | null;
  onCouponChange: (coupon: string | null) => void;
}

export default function CouponSection({
  appliedCoupon,
  onCouponChange,
}: CouponSectionProps) {
  const {
    applyDiscountCode,
    removeDiscount,
    appliedDiscount,
    isValidatingDiscount,
    errors,
  } = useCheckout();
  const [couponCode, setCouponCode] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;

    const success = await applyDiscountCode(couponCode.trim());
    if (success) {
      onCouponChange(couponCode.trim());
      setCouponCode('');
      setIsExpanded(false);
    }
  };

  const handleRemoveCoupon = () => {
    removeDiscount();
    onCouponChange(null);
    setCouponCode('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleApplyCoupon();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6">
        {appliedDiscount ? (
          // Applied Coupon Display
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-fuelfoods-green-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-fuelfoods-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Coupon Applied</h3>
                <p className="text-sm text-gray-600">
                  {appliedDiscount.description}
                </p>
                <p className="text-sm font-medium text-fuelfoods-green-600">
                  Code: {appliedDiscount.code}
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="text-lg font-semibold text-fuelfoods-green-600 mb-1">
                -
                {appliedDiscount.appliedAmount.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemoveCoupon}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Remove
              </Button>
            </div>
          </div>
        ) : (
          // Coupon Input Section
          <div>
            {!isExpanded ? (
              <Button
                variant="ghost"
                onClick={() => setIsExpanded(true)}
                className="w-full justify-start text-fuelfoods-green-600 hover:text-fuelfoods-green-700"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add coupon code
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">
                    Apply Coupon Code
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsExpanded(false);
                      setCouponCode('');
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </Button>
                </div>

                <div className="flex space-x-3">
                  <div className="flex-1">
                    <FormField
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={e =>
                        setCouponCode(e.target.value.toUpperCase())
                      }
                      onKeyPress={handleKeyPress}
                      disabled={isValidatingDiscount}
                      error={errors.discount?.[0]}
                    />
                  </div>
                  <Button
                    onClick={handleApplyCoupon}
                    disabled={!couponCode.trim() || isValidatingDiscount}
                    loading={isValidatingDiscount}
                    loadingText="Applying..."
                  >
                    Apply
                  </Button>
                </div>

                {/* Sample Coupon Codes */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-2">Try these codes:</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setCouponCode('SAVE10')}
                      className="text-xs bg-white border border-gray-200 rounded px-2 py-1 hover:bg-gray-50 transition-colors"
                    >
                      SAVE10
                    </button>
                    <button
                      onClick={() => setCouponCode('FREESHIP')}
                      className="text-xs bg-white border border-gray-200 rounded px-2 py-1 hover:bg-gray-50 transition-colors"
                    >
                      FREESHIP
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
