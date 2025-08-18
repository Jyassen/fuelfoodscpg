'use client';

import React from 'react';
import Link from 'next/link';
import { OrderPricing } from '@/lib/types';
import { Button } from '@/components/form';
import { formatCurrency } from '@/lib/utils';

interface OrderSummaryProps {
  pricing: OrderPricing;
  appliedCoupon: string | null;
  itemCount: number;
}

export default function OrderSummary({
  pricing,
  appliedCoupon,
  itemCount,
}: OrderSummaryProps) {
  const {
    subtotal,
    discountAmount,
    shippingCost,
    taxCalculation,
    total,
    savings,
  } = pricing;

  return (
    <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Order Summary
      </h2>

      {/* Items Summary */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            Subtotal ({itemCount} item{itemCount !== 1 ? 's' : ''})
          </span>
          <span className="text-gray-900 font-medium">
            {formatCurrency(subtotal)}
          </span>
        </div>

        {/* Discount */}
        {discountAmount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              {appliedCoupon ? `Discount (${appliedCoupon})` : 'Discount'}
            </span>
            <span className="text-fuelfoods-green-600 font-medium">
              -{formatCurrency(discountAmount)}
            </span>
          </div>
        )}

        {/* Shipping */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span
            className={`font-medium ${
              shippingCost === 0 ? 'text-fuelfoods-green-600' : 'text-gray-900'
            }`}
          >
            {shippingCost === 0 ? 'Free' : formatCurrency(shippingCost)}
          </span>
        </div>

        {/* Tax */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            Tax{' '}
            {taxCalculation.rate > 0 &&
              `(${(taxCalculation.rate * 100).toFixed(1)}%)`}
          </span>
          <span className="text-gray-900 font-medium">
            {formatCurrency(taxCalculation.amount)}
          </span>
        </div>

        {/* Savings Summary */}
        {savings && savings > 0 && (
          <div className="bg-fuelfoods-green-50 rounded-lg p-3 mt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-fuelfoods-green-800">
                Total Savings
              </span>
              <span className="text-sm font-semibold text-fuelfoods-green-800">
                {formatCurrency(savings)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="border-t border-gray-200 pt-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-900">Total</span>
          <span className="text-xl font-bold text-gray-900">
            {formatCurrency(total)}
          </span>
        </div>
      </div>

      {/* Checkout Button */}
      <Button
        asChild
        variant="primary"
        size="lg"
        fullWidth
        className="mb-4 bg-[#178641] hover:bg-[#136834] text-white"
      >
        <Link href="/checkout">Proceed to Checkout</Link>
      </Button>

      {/* Security and Shipping Info */}
      <div className="space-y-3">
        <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-1.5 text-fuelfoods-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Secure checkout</span>
          </div>

          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-1.5 text-fuelfoods-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Fast shipping</span>
          </div>
        </div>

        {/* Delivery Estimate */}
        <div className="text-center text-sm text-gray-600">
          <div className="flex items-center justify-center">
            <svg
              className="w-4 h-4 mr-1.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Delivered within 48 hours of harvest</span>
          </div>
        </div>
      </div>

      {/* Money Back Guarantee */}
      <div className="mt-6 text-center">
        <div className="inline-flex items-center px-3 py-2 bg-blue-50 rounded-lg">
          <svg
            className="w-4 h-4 mr-2 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <span className="text-sm font-medium text-blue-800">
            100% Freshness Guarantee
          </span>
        </div>
      </div>
    </div>
  );
}
