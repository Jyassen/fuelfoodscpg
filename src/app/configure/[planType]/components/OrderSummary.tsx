'use client';

import { useMemo } from 'react';
import { ShoppingCart, Check, Truck, Shield, Calendar } from 'lucide-react';
import { Button, LoadingSpinner } from '@/components/form';
import {
  PlanType,
  MicrogreensVarietySelection,
  PLAN_CONFIGURATIONS,
  MICROGREENS_VARIETIES,
} from '@/lib/types';

interface OrderSummaryProps {
  planType: PlanType;
  planConfig: (typeof PLAN_CONFIGURATIONS)[PlanType];
  varietySelections: MicrogreensVarietySelection[];
  onAddToCart: () => void;
  isLoading: boolean;
  isValid: boolean;
}

export function OrderSummary({
  planType,
  planConfig,
  varietySelections,
  onAddToCart,
  isLoading,
  isValid,
}: OrderSummaryProps) {
  // Frequency removed; fixed delivery days

  // Calculate pricing
  const selectedVarieties = varietySelections.filter(s => s.quantity > 0);
  const subtotal = selectedVarieties.reduce((sum, selection) => {
    const variety = MICROGREENS_VARIETIES[selection.varietyId];
    return sum + selection.quantity * variety.price;
  }, 0);

  const originalPrice = subtotal;
  const discountAmount = 0; // no discounts in simplified flow
  const discountedPrice = subtotal;
  const shippingCost = 10; // flat per requirements
  const tax = (discountedPrice + shippingCost) * 0.03; // 3%
  const total = discountedPrice + shippingCost + tax;

  // Next delivery is the next upcoming Monday or Thursday (client-side only)
  const getNextDeliveryDate = () => {
    if (typeof window === 'undefined') {
      return 'Next delivery day'; // Server-side fallback
    }
    
    const today = new Date();
    const day = today.getDay(); // 0 Sun ... 6 Sat
    const targets = [1, 4]; // Monday, Thursday
    const diffs = targets
      .map(t => (t - day + 7) % 7)
      .filter(d => d > 0)
      .sort((a, b) => a - b);
    const delta = diffs[0] ?? 0; // if today is Mon/Thu, show today
    const next = new Date(today);
    next.setDate(today.getDate() + delta);
    return next.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <div className="space-y-6">
        {/* Selected Items */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">
            {planType === 'starter' ? 'Your Packs' : 'Your Selections'}
          </h4>
          <div className="space-y-3">
            {selectedVarieties.length > 0 ? (
              selectedVarieties.map(selection => {
                const variety = MICROGREENS_VARIETIES[selection.varietyId];
                return (
                  <div
                    key={selection.varietyId}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <div className="font-medium text-gray-900">
                        {variety.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {selection.quantity} pack
                        {selection.quantity !== 1 ? 's' : ''} × ${variety.price}
                      </div>
                    </div>
                    <div className="font-semibold text-gray-900">
                      ${(selection.quantity * variety.price).toFixed(2)}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-gray-500 text-sm text-center py-4">
                No varieties selected yet
              </div>
            )}
          </div>
        </div>

        {/* Pricing Breakdown */}
        {selectedVarieties.length > 0 && (
          <div className="border-t border-gray-200 pt-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">
                  ${originalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900">
                  ${shippingCost.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (3%)</span>
                <span className="text-gray-900">${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 mt-3 pt-3">
              <div className="flex justify-between font-semibold text-lg">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">${total.toFixed(2)}</span>
              </div>
            </div>
            {/* Savings removed in simple view */}
          </div>
        )}

        {/* Delivery Info */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="space-y-3">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-gray-500 mr-3" />
              <div>
                <div className="text-sm font-medium text-gray-900">
                  Next Delivery
                </div>
                <div className="text-xs text-gray-600">
                  {getNextDeliveryDate()}
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <Truck className="w-5 h-5 text-gray-500 mr-3" />
              <div>
                <div className="text-sm font-medium text-gray-900">
                  Fresh & Fast
                </div>
                <div className="text-xs text-gray-600">
                  Harvested within 24-48 hours
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <Shield className="w-5 h-5 text-gray-500 mr-3" />
              <div>
                <div className="text-sm font-medium text-gray-900">
                  Quality Guarantee
                </div>
                <div className="text-xs text-gray-600">
                  Fresh or your money back
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={onAddToCart}
          disabled={!isValid || isLoading}
          fullWidth
          className="h-12 text-base font-semibold bg-gray-900 text-white hover:bg-gray-800"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <LoadingSpinner size="sm" color="white" className="mr-2" />
              Adding to Cart...
            </div>
          ) : selectedVarieties.length === 0 ? (
            <div className="flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add ({planType === 'starter' ? '1+' : planConfig.packsRequired}) to Cart
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </div>
          )}
        </Button>

        {!isValid && selectedVarieties.length > 0 && (
          <p className="text-sm text-red-600 text-center">
            Please select exactly {planConfig.packsRequired} packs to continue
          </p>
        )}

        {/* Subscription Benefits */}
        {/* Benefits removed for minimal layout */}
      </div>
    </div>
  );
}
