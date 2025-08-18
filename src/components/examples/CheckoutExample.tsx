'use client';

import React, { useState } from 'react';
import {
  useCart,
  useCheckout,
  useCartSummary,
  useCheckoutProgress,
  useDiscounts,
  useShipping,
} from '@/context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MICROGREENS_VARIETIES, PLAN_CONFIGURATIONS, MicrogreenType } from '@/lib/types';
import { createPlanConfiguration } from '@/lib/checkout-utils';

// ============================================================================
// CART MANAGEMENT EXAMPLE
// ============================================================================

export function CartExample() {
  const { addItem, removeItem, updateQuantity, clearCart } = useCart();
  const { itemCount, totalPrice, hasItems, items } = useCartSummary();

  const handleAddMegaMix = () => {
    // Create a mock product
    const megaMixProduct = {
      id: 'mega-mix',
      name: 'Mega Mix',
      slug: 'mega-mix',
      description: 'Our signature microgreens blend',
      shortDescription: 'Premium microgreens blend',
      price: 12.99,
      images: [
        {
          id: '1',
          url: '/images/mega-mix-product.png',
          alt: 'Mega Mix',
          width: 400,
          height: 400,
          isPrimary: true,
        },
      ],
      categories: [
        {
          id: 'microgreens',
          name: 'Microgreens',
          slug: 'microgreens',
          type: 'microgreens' as const,
        },
      ],
      inStock: true,
      sku: 'MM-001',
      attributes: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      variant: 'mega-mix' as const,
      microgreenTypes: ['arugula', 'broccoli', 'kale'] as MicrogreenType[],
      nutritionalInfo: {
        vitamins: ['Vitamin C', 'Vitamin K'],
        minerals: ['Iron', 'Calcium'],
        antioxidants: ['Sulforaphane'],
      },
      subscriptionOptions: [],
      packageSizes: [],
      freshnessDuration: '7-10 days refrigerated',
    };

    addItem(megaMixProduct, 1, 'individual');
  };

  const handleAddSubscription = () => {
    const config = createPlanConfiguration('pro');

    // Create subscription product
    const subscriptionProduct = {
      id: 'subscription-pro',
      name: 'Pro Subscription Plan',
      slug: 'subscription-pro',
      description: 'Weekly delivery of 3 microgreens packs',
      shortDescription: 'Pro weekly subscription',
      price: 11.69,
      images: [
        {
          id: '1',
          url: '/images/mega-mix-product.png',
          alt: 'Pro Plan',
          width: 400,
          height: 400,
          isPrimary: true,
        },
      ],
      categories: [
        {
          id: 'subscription',
          name: 'Subscriptions',
          slug: 'subscriptions',
          type: 'bundles' as const,
        },
      ],
      inStock: true,
      sku: 'SUB-PRO',
      attributes: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      variant: 'mega-mix' as const,
      microgreenTypes: ['arugula', 'broccoli', 'kale'] as MicrogreenType[],
      nutritionalInfo: {
        vitamins: ['Vitamin C', 'Vitamin K'],
        minerals: ['Iron', 'Calcium'],
        antioxidants: ['Sulforaphane'],
      },
      subscriptionOptions: [],
      packageSizes: [],
      freshnessDuration: '7-10 days refrigerated',
    };

    addItem(
      subscriptionProduct,
      config.totalPacks,
      'subscription',
      config,
      'weekly'
    );
  };

  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-lg font-bold">Cart Management</h3>

      <div className="flex gap-2">
        <Button onClick={handleAddMegaMix} variant="brand" size="sm">
          Add Mega Mix
        </Button>
        <Button onClick={handleAddSubscription} variant="orange" size="sm">
          Add Pro Subscription
        </Button>
        <Button
          onClick={clearCart}
          variant="outline"
          size="sm"
          disabled={!hasItems}
        >
          Clear Cart
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>Items: {itemCount}</div>
        <div>Total: ${totalPrice.toFixed(2)}</div>
      </div>

      {hasItems && (
        <div className="space-y-2">
          <h4 className="font-semibold">Cart Items:</h4>
          {items.map(item => (
            <div
              key={item.id}
              className="flex items-center justify-between p-2 bg-gray-50 rounded"
            >
              <div className="flex-1">
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-gray-600">
                  Qty: {item.quantity} × ${item.unitPrice.toFixed(2)}
                </div>
                {item.type === 'subscription' && (
                  <Badge variant="secondary" className="text-xs">
                    Subscription
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  variant="outline"
                  size="sm"
                  disabled={item.quantity <= 1}
                >
                  -
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  variant="outline"
                  size="sm"
                >
                  +
                </Button>
                <Button
                  onClick={() => removeItem(item.id)}
                  variant="destructive"
                  size="sm"
                >
                  ×
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

// ============================================================================
// CHECKOUT PROGRESS EXAMPLE
// ============================================================================

export function CheckoutProgressExample() {
  const { progress, currentStep, canProceed } = useCheckoutProgress();
  const { goToStep, goToNextStep, goToPreviousStep } = useCheckout();

  const steps = [
    { key: 'cart', label: 'Cart' },
    { key: 'customer_info', label: 'Customer Info' },
    { key: 'shipping', label: 'Shipping' },
    { key: 'billing', label: 'Billing' },
    { key: 'payment', label: 'Payment' },
    { key: 'review', label: 'Review' },
    { key: 'processing', label: 'Processing' },
    { key: 'complete', label: 'Complete' },
  ];

  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-lg font-bold">Checkout Progress</h3>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-[#448319] h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {steps.map(step => (
          <Button
            key={step.key}
            onClick={() => goToStep(step.key as any)}
            variant={currentStep === step.key ? 'brand' : 'outline'}
            size="sm"
            className="text-xs p-2"
          >
            {step.label}
          </Button>
        ))}
      </div>

      <div className="flex gap-2">
        <Button onClick={goToPreviousStep} variant="outline" size="sm">
          Previous
        </Button>
        <Button
          onClick={goToNextStep}
          variant="brand"
          size="sm"
          disabled={!canProceed}
        >
          Next
        </Button>
      </div>

      <div className="text-sm text-gray-600">
        Current Step: <Badge variant="outline">{currentStep}</Badge>
      </div>
    </Card>
  );
}

// ============================================================================
// CUSTOMER INFO FORM EXAMPLE
// ============================================================================

export function CustomerInfoExample() {
  const { customerInfo, updateCustomerInfo, errors, validateCurrentStep } =
    useCheckout();

  const customerErrors = errors.customerInfo;

  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-lg font-bold">Customer Information</h3>

      <div className="space-y-3">
        <div>
          <Input
            type="email"
            placeholder="Email Address"
            value={customerInfo.email || ''}
            onChange={e => updateCustomerInfo({ email: e.target.value })}
            className={
              customerErrors.some(e => e.includes('email'))
                ? 'border-red-500'
                : ''
            }
          />
          {customerErrors
            .filter(e => e.includes('email'))
            .map((error, i) => (
              <div key={i} className="text-sm text-red-600 mt-1">
                {error}
              </div>
            ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Input
              placeholder="First Name"
              value={customerInfo.firstName || ''}
              onChange={e => updateCustomerInfo({ firstName: e.target.value })}
              className={
                customerErrors.some(e => e.includes('firstName'))
                  ? 'border-red-500'
                  : ''
              }
            />
            {customerErrors
              .filter(e => e.includes('firstName'))
              .map((error, i) => (
                <div key={i} className="text-sm text-red-600 mt-1">
                  {error}
                </div>
              ))}
          </div>

          <div>
            <Input
              placeholder="Last Name"
              value={customerInfo.lastName || ''}
              onChange={e => updateCustomerInfo({ lastName: e.target.value })}
              className={
                customerErrors.some(e => e.includes('lastName'))
                  ? 'border-red-500'
                  : ''
              }
            />
            {customerErrors
              .filter(e => e.includes('lastName'))
              .map((error, i) => (
                <div key={i} className="text-sm text-red-600 mt-1">
                  {error}
                </div>
              ))}
          </div>
        </div>

        <div>
          <Input
            type="tel"
            placeholder="Phone Number"
            value={customerInfo.phone || ''}
            onChange={e => updateCustomerInfo({ phone: e.target.value })}
            className={
              customerErrors.some(e => e.includes('phone'))
                ? 'border-red-500'
                : ''
            }
          />
          {customerErrors
            .filter(e => e.includes('phone'))
            .map((error, i) => (
              <div key={i} className="text-sm text-red-600 mt-1">
                {error}
              </div>
            ))}
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={customerInfo.marketingOptIn || false}
            onChange={e =>
              updateCustomerInfo({ marketingOptIn: e.target.checked })
            }
          />
          <span className="text-sm">Subscribe to marketing emails</span>
        </label>
      </div>

      <Button onClick={validateCurrentStep} variant="brand" size="sm">
        Validate Form
      </Button>
    </Card>
  );
}

// ============================================================================
// DISCOUNT CODE EXAMPLE
// ============================================================================

export function DiscountExample() {
  const {
    appliedDiscount,
    isValidating,
    errors,
    applyCode,
    removeDiscount,
    clearErrors,
  } = useDiscounts();

  const [discountCode, setDiscountCode] = useState('');

  const handleApplyDiscount = async () => {
    if (discountCode.trim()) {
      await applyCode(discountCode.trim());
      setDiscountCode('');
    }
  };

  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-lg font-bold">Discount Codes</h3>

      <div className="flex gap-2">
        <Input
          placeholder="Enter discount code"
          value={discountCode}
          onChange={e => setDiscountCode(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleApplyDiscount()}
          disabled={isValidating}
        />
        <Button
          onClick={handleApplyDiscount}
          variant="brand"
          size="sm"
          disabled={isValidating || !discountCode.trim()}
        >
          {isValidating ? 'Validating...' : 'Apply'}
        </Button>
      </div>

      {errors.length > 0 && (
        <div className="space-y-1">
          {errors.map((error, i) => (
            <div key={i} className="text-sm text-red-600">
              {error}
            </div>
          ))}
          <Button onClick={clearErrors} variant="outline" size="sm">
            Clear Errors
          </Button>
        </div>
      )}

      {appliedDiscount && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-green-800">
                {appliedDiscount.code}
              </div>
              <div className="text-sm text-green-600">
                {appliedDiscount.description}
              </div>
              <div className="text-sm font-semibold text-green-700">
                Savings: ${appliedDiscount.appliedAmount.toFixed(2)}
              </div>
            </div>
            <Button onClick={removeDiscount} variant="outline" size="sm">
              Remove
            </Button>
          </div>
        </div>
      )}

      <div className="text-sm text-gray-600">
        Try codes: <code className="bg-gray-100 px-1 rounded">SAVE10</code> or{' '}
        <code className="bg-gray-100 px-1 rounded">FREESHIP</code>
      </div>
    </Card>
  );
}

// ============================================================================
// SHIPPING OPTIONS EXAMPLE
// ============================================================================

export function ShippingExample() {
  const { options, selected, isLoading, loadOptions, selectOption } =
    useShipping();

  const [zipCode, setZipCode] = useState('');

  const handleLoadShipping = () => {
    if (zipCode.trim()) {
      loadOptions(zipCode.trim());
    }
  };

  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-lg font-bold">Shipping Options</h3>

      <div className="flex gap-2">
        <Input
          placeholder="Enter ZIP code"
          value={zipCode}
          onChange={e => setZipCode(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleLoadShipping()}
        />
        <Button
          onClick={handleLoadShipping}
          variant="brand"
          size="sm"
          disabled={isLoading || !zipCode.trim()}
        >
          {isLoading ? 'Loading...' : 'Load Options'}
        </Button>
      </div>

      {options.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold">Available Options:</h4>
          {options.map(option => (
            <div
              key={option.id}
              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                selected?.id === option.id
                  ? 'border-[#448319] bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => selectOption(option)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{option.name}</div>
                  <div className="text-sm text-gray-600">
                    {option.description} • {option.carrierName}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">
                    {option.price === 0
                      ? 'FREE'
                      : `$${option.price.toFixed(2)}`}
                  </div>
                  {option.trackingIncluded && (
                    <div className="text-xs text-gray-500">
                      Tracking included
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="font-medium text-blue-800">Selected Shipping:</div>
          <div className="text-sm text-blue-600">
            {selected.name} -{' '}
            {selected.price === 0 ? 'FREE' : `$${selected.price.toFixed(2)}`}
          </div>
        </div>
      )}
    </Card>
  );
}

// ============================================================================
// COMPLETE EXAMPLE COMPONENT
// ============================================================================

export function CheckoutExample() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">FuelFoods Checkout System</h1>
        <p className="text-gray-600">
          Interactive demo of the Cart and Checkout context providers
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CartExample />
        <CheckoutProgressExample />
        <CustomerInfoExample />
        <DiscountExample />
        <div className="lg:col-span-2">
          <ShippingExample />
        </div>
      </div>

      <div className="text-center text-sm text-gray-500">
        This demo showcases the functionality of the FuelFoods context
        providers. Use the controls above to test cart management, checkout
        flow, and validation.
      </div>
    </div>
  );
}
