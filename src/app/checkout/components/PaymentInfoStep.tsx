'use client';

import { useState, useEffect } from 'react';
import { useCheckout } from '@/context';
import { FormField, FormSection, Button } from '@/components/form';
import { CheckoutBillingInfo } from '@/lib/types';

interface PaymentInfoStepProps {
  onContinue: () => void;
  onBack: () => void;
}

export default function PaymentInfoStep({
  onContinue,
}: PaymentInfoStepProps) {
  const {
    billingInfo,
    shippingInfo,
    updatePaymentInfo,
    updateBillingInfo,
    errors,
    validateCurrentStep,
    clearErrors,
  } = useCheckout();

  const [billingData, setBillingData] = useState<Partial<CheckoutBillingInfo>>({
    sameAsShipping: billingInfo.sameAsShipping ?? true,
    firstName: billingInfo.firstName || '',
    lastName: billingInfo.lastName || '',
    company: billingInfo.company || '',
    address1: billingInfo.address1 || '',
    address2: billingInfo.address2 || '',
    city: billingInfo.city || '',
    state: billingInfo.state || '',
    zipCode: billingInfo.zipCode || '',
    country: billingInfo.country || 'US',
  });

  useEffect(() => {
    updatePaymentInfo({ methodType: 'credit_card' });
  }, [updatePaymentInfo]);

  useEffect(() => {
    if (billingData.sameAsShipping) {
      const updatedBilling: CheckoutBillingInfo = {
        firstName: shippingInfo.firstName || '',
        lastName: shippingInfo.lastName || '',
        company: shippingInfo.company || '',
        address1: shippingInfo.address1 || '',
        address2: shippingInfo.address2 || '',
        city: shippingInfo.city || '',
        state: shippingInfo.state || '',
        zipCode: shippingInfo.zipCode || '',
        country: shippingInfo.country || 'US',
        sameAsShipping: true,
      };
      setBillingData(updatedBilling);
      updateBillingInfo(updatedBilling);
    }
  }, [billingData.sameAsShipping, shippingInfo, updateBillingInfo]);

  const handleBillingChange = (
    field: keyof CheckoutBillingInfo,
    value: string | boolean
  ) => {
    const updatedData = { ...billingData, [field]: value };
    setBillingData(updatedData);
    updateBillingInfo(updatedData);
    if (errors.billingInfo.length > 0) clearErrors('billingInfo');
  };

  const handleContinue = () => {
    if (validateCurrentStep()) onContinue();
  };

  return (
    <div className="space-y-8">
      <FormSection
        title="Payment Method"
        description="You will enter card details on Stripe’s secure checkout page"
        className="space-y-6"
      >
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-900">
            FuelFoods never collects or stores card numbers. After you review
            your order you will be redirected to Stripe Checkout to pay.
          </p>
        </div>
      </FormSection>

      <FormSection
        title="Billing Address"
        description="Address associated with your payment method"
        className="space-y-6"
      >
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="same-as-shipping"
            checked={billingData.sameAsShipping || false}
            onChange={e =>
              handleBillingChange('sameAsShipping', e.target.checked)
            }
            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
          />
          <label
            htmlFor="same-as-shipping"
            className="text-sm font-medium text-gray-700"
          >
            Billing address is the same as shipping address
          </label>
        </div>

        {!billingData.sameAsShipping && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="First Name"
                type="text"
                value={billingData.firstName || ''}
                onValueChange={v => handleBillingChange('firstName', v)}
                placeholder="Enter first name"
                required
              />
              <FormField
                label="Last Name"
                type="text"
                value={billingData.lastName || ''}
                onValueChange={v => handleBillingChange('lastName', v)}
                placeholder="Enter last name"
                required
              />
            </div>
            <FormField
              label="Street Address"
              type="text"
              value={billingData.address1 || ''}
              onValueChange={v => handleBillingChange('address1', v)}
              placeholder="Enter street address"
              required
            />
            <FormField
              label="Apartment, Suite, etc. (Optional)"
              type="text"
              value={billingData.address2 || ''}
              onValueChange={v => handleBillingChange('address2', v)}
              placeholder="Apt, suite, unit, etc."
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                label="City"
                type="text"
                value={billingData.city || ''}
                onValueChange={v => handleBillingChange('city', v)}
                placeholder="Enter city"
                required
              />
              <FormField
                label="State"
                type="text"
                value={billingData.state || ''}
                onValueChange={v => handleBillingChange('state', v)}
                placeholder="State"
                required
              />
              <FormField
                label="ZIP Code"
                type="text"
                value={billingData.zipCode || ''}
                onValueChange={v => handleBillingChange('zipCode', v)}
                placeholder="12345"
                required
              />
            </div>
          </div>
        )}
      </FormSection>

      <div className="flex flex-col gap-4 pt-6 border-t border-gray-200">
        <Button
          variant="primary"
          className="w-full bg-[#178641] hover:bg-[#136834] text-white"
          onClick={handleContinue}
          size="lg"
        >
          Review Order
        </Button>
      </div>
    </div>
  );
}
