'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCheckout } from '@/context';
import {
  FormSection,
  Button,
  LoadingSpinner,
  ValidationMessage,
} from '@/components/form';
import { CheckoutCartItem } from '@/lib/types';

interface OrderReviewStepProps {
  onPlaceOrder: () => void;
  onBack: () => void;
}

export default function OrderReviewStep({
  onPlaceOrder,
  onBack,
}: OrderReviewStepProps) {
  const {
    items,
    customerInfo,
    shippingInfo,
    paymentInfo,
    billingInfo,
    pricing,
    selectedShippingOption,
    appliedDiscount,
    errors,
    isProcessing,
    processOrder,
  } = useCheckout();

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);
    try {
      const success = await processOrder();
      if (success) {
        // processOrder will start Stripe Checkout redirect
      }
    } catch (error) {
      console.error('Order placement failed:', error);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const formatCardNumber = (cardNumber: string) => {
    if (!cardNumber) return '';
    const lastFour = cardNumber.slice(-4);
    return `•••• •••• •••• ${lastFour}`;
  };

  const formatAddress = (info: any) => {
    if (!info.address1) return 'No address provided';

    const parts = [
      info.address1,
      info.address2,
      `${info.city}, ${info.state} ${info.zipCode}`,
    ].filter(Boolean);

    return parts.join(', ');
  };

  return (
    <div className="space-y-8">
      <FormSection
        title="Review Your Order"
        description="Please review all details before placing your order"
        className="space-y-8"
      >
        {/* Order Items */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Order Items
          </h3>
          <div className="space-y-4">
            {items.map((item: CheckoutCartItem) => (
              <div key={item.id} className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-16 h-16 relative bg-gray-100 rounded-lg overflow-hidden">
                  {item.product.images && item.product.images[0] && (
                    <Image
                      src={`${(() => {
                        const u = item.product.images[0].url || '';
                        if (!u) return '/images/placeholder.png';
                        return u.startsWith('http') || u.startsWith('data:')
                          ? u
                          : u.startsWith('/')
                            ? u
                            : '/' + u;
                      })()}`}
                      alt={item.product.name}
                      fill
                      className="object-contain"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">
                    {item.product.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {item.type === 'subscription'
                      ? 'Subscription'
                      : 'One-time purchase'}
                  </p>
                  {item.packageConfiguration && (
                    <p className="text-xs text-gray-500">
                      {item.packageConfiguration.planType} plan -{' '}
                      {item.packageConfiguration.totalPacks} packs
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    Deliveries Mondays & Thursdays
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  <p className="font-medium text-gray-900">
                    ${item.totalPrice.toFixed(2)}
                  </p>
                  {item.discountAmount && item.discountAmount > 0 && (
                    <p className="text-xs text-green-600">
                      -${item.discountAmount.toFixed(2)} savings
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Customer Information
            </h3>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Name:</span>{' '}
                {customerInfo.firstName} {customerInfo.lastName}
              </p>
              <p>
                <span className="font-medium">Email:</span> {customerInfo.email}
              </p>
              <p>
                <span className="font-medium">Phone:</span> {customerInfo.phone}
              </p>
              {customerInfo.marketingOptIn && (
                <p className="text-green-600 text-xs">
                  ✓ Subscribed to marketing updates
                </p>
              )}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Shipping Address
            </h3>
            <div className="space-y-2 text-sm">
              <p className="font-medium">
                {shippingInfo.firstName} {shippingInfo.lastName}
              </p>
              {shippingInfo.company && <p>{shippingInfo.company}</p>}
              <p>{formatAddress(shippingInfo)}</p>
              {shippingInfo.deliveryInstructions && (
                <p className="text-gray-600">
                  <span className="font-medium">Instructions:</span>{' '}
                  {shippingInfo.deliveryInstructions}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Payment and Billing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Payment Method
            </h3>
            <div className="space-y-2 text-sm">
              {paymentInfo.methodType === 'credit_card' ||
              paymentInfo.methodType === 'debit_card' ? (
                <>
                  <p>
                    <span className="font-medium">Card:</span>{' '}
                    {formatCardNumber(paymentInfo.cardNumber || '')}
                  </p>
                  <p>
                    <span className="font-medium">Name:</span>{' '}
                    {paymentInfo.cardholderName}
                  </p>
                  <p>
                    <span className="font-medium">Expires:</span>{' '}
                    {paymentInfo.expiryMonth}/
                    {paymentInfo.expiryYear?.slice(-2)}
                  </p>
                </>
              ) : (
                <p>
                  <span className="font-medium">Payment Method:</span> PayPal
                </p>
              )}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Billing Address
            </h3>
            <div className="text-sm">
              {billingInfo.sameAsShipping ? (
                <p className="text-gray-600">Same as shipping address</p>
              ) : (
                <div className="space-y-2">
                  <p className="font-medium">
                    {billingInfo.firstName} {billingInfo.lastName}
                  </p>
                  {billingInfo.company && <p>{billingInfo.company}</p>}
                  <p>{formatAddress(billingInfo)}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Shipping Option */}
        {selectedShippingOption && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Shipping Method
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{selectedShippingOption.name}</p>
                <p className="text-sm text-gray-600">
                  {selectedShippingOption.description}
                </p>
                {selectedShippingOption.carrierName && (
                  <p className="text-xs text-gray-500">
                    via {selectedShippingOption.carrierName}
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className="font-medium">
                  {selectedShippingOption.price === 0
                    ? 'Free'
                    : `$${selectedShippingOption.price.toFixed(2)}`}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Discount box only on final stage */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Discount</h3>
          {appliedDiscount ? (
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-green-800">
                  {appliedDiscount.code}
                </p>
                <p className="text-sm text-green-700">
                  {appliedDiscount.description}
                </p>
              </div>
              <p className="font-medium text-green-800">
                -${appliedDiscount.appliedAmount?.toFixed(2)}
              </p>
            </div>
          ) : (
            <p className="text-sm text-gray-600">
              Add a discount code at this step.
            </p>
          )}
          {errors.general.length > 0 && (
            <ValidationMessage
              message={errors.general.join(' • ')}
              type="error"
              className="mt-3"
            />
          )}
        </div>

        {/* Order Total */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Order Summary
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${pricing.subtotal.toFixed(2)}</span>
            </div>
            {pricing.discountAmount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount</span>
                <span>-${pricing.discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>
                {pricing.shippingCost === 0
                  ? 'Free'
                  : `$${pricing.shippingCost.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax</span>
              <span>${pricing.taxCalculation.amount.toFixed(2)}</span>
            </div>
            {typeof pricing.savings === 'number' && pricing.savings > 0 && (
              <div className="flex justify-between text-sm text-green-600 font-medium">
                <span>Total Savings</span>
                <span>-${(pricing.savings || 0).toFixed(2)}</span>
              </div>
            )}
            <div className="border-t border-gray-300 pt-2">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${pricing.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <svg
              className="w-5 h-5 text-yellow-600 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <h4 className="text-sm font-medium text-yellow-800">
                Please Review Carefully
              </h4>
              <p className="text-xs text-yellow-700 mt-1">
                By placing this order, you agree to our terms of service and
                privacy policy. Your order will be processed immediately and
                cannot be cancelled once confirmed.
              </p>
            </div>
          </div>
        </div>
      </FormSection>

      {/* Navigation Buttons */}
      <div className="flex flex-col gap-4 pt-6 border-t border-gray-200">
        <Button
          variant="primary"
          className="w-full bg-[#178641] hover:bg-[#136834] text-white"
          onClick={handlePlaceOrder}
          disabled={isPlacingOrder || isProcessing}
          size="lg"
        >
          {isPlacingOrder || isProcessing ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              Processing Order...
            </>
          ) : (
            <>
              Place Order - ${pricing.total.toFixed(2)}
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
