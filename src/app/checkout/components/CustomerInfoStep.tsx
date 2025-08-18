'use client';

import { useState } from 'react';
import { useCheckout } from '@/context';
import {
  FormField,
  FormSection,
  Button,
  ValidationMessage,
} from '@/components/form';
import { CheckoutCustomerInfo } from '@/lib/types';

interface CustomerInfoStepProps {
  onContinue: () => void;
  onBack: () => void;
  hideNavigation?: boolean;
}

export default function CustomerInfoStep({
  onContinue,
  onBack,
  hideNavigation = false,
}: CustomerInfoStepProps) {
  const {
    customerInfo,
    updateCustomerInfo,
    errors,
    validateCurrentStep,
    clearErrors,
  } = useCheckout();

  const [formData, setFormData] = useState<Partial<CheckoutCustomerInfo>>({
    email: customerInfo.email || '',
    firstName: customerInfo.firstName || '',
    lastName: customerInfo.lastName || '',
    phone: customerInfo.phone || '',
    isNewCustomer: customerInfo.isNewCustomer ?? true,
    marketingOptIn: customerInfo.marketingOptIn ?? false,
  });

  const handleInputChange = (
    field: keyof CheckoutCustomerInfo,
    value: string | boolean
  ) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    updateCustomerInfo(updatedData);

    if (errors.customerInfo.length > 0) {
      clearErrors('customerInfo');
    }
  };

  const handleContinue = () => {
    if (validateCurrentStep()) {
      onContinue();
    }
  };

  return (
    <FormSection
      title="Customer Information"
      description="We'll use this information to process your order and send updates"
      className="space-y-6"
    >
      {/* Remove stacked required notices; subtle asterisks only */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="First Name"
          type="text"
          value={formData.firstName || ''}
          onValueChange={value => handleInputChange('firstName', value)}
          name="firstName"
          autoComplete="given-name"
          placeholder="Enter your first name"
          required
          error={errors.customerInfo.find(e => e.includes('firstName'))}
        />

        <FormField
          label="Last Name"
          type="text"
          value={formData.lastName || ''}
          onValueChange={value => handleInputChange('lastName', value)}
          name="lastName"
          autoComplete="family-name"
          placeholder="Enter your last name"
          required
          error={errors.customerInfo.find(e => e.includes('lastName'))}
        />
      </div>

      <FormField
        label="Email Address"
        type="email"
        value={formData.email || ''}
        onValueChange={value => handleInputChange('email', value)}
        name="email"
        autoComplete="email"
        placeholder="Enter your email address"
        required
        error={errors.customerInfo.find(e => e.includes('email'))}
        helperText="We'll send order updates and delivery notifications to this email"
      />

      <FormField
        label="Phone Number"
        type="tel"
        value={formData.phone || ''}
        onValueChange={value => handleInputChange('phone', value)}
        name="phone"
        autoComplete="tel"
        placeholder="(555) 123-4567"
        required
        error={errors.customerInfo.find(e => e.includes('phone'))}
        helperText="For delivery coordination and important order updates"
      />

      {/* Marketing Opt-in */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="marketing-opt-in"
            checked={formData.marketingOptIn || false}
            onChange={e =>
              handleInputChange('marketingOptIn', e.target.checked)
            }
            className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
          />
          <div>
            <label
              htmlFor="marketing-opt-in"
              className="text-sm font-medium text-green-900"
            >
              Keep me updated on new products and special offers
            </label>
            <p className="text-xs text-green-700 mt-1">
              Get exclusive recipes, nutrition tips, and early access to new
              microgreen varieties. You can unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <svg
            className="w-5 h-5 text-green-500 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-gray-900">
              Your information is secure
            </h4>
            <p className="text-xs text-gray-600 mt-1">
              We use SSL encryption to protect your personal information and
              never share your data with third parties.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      {!hideNavigation && (
        <div className="flex flex-col gap-4 pt-6 border-t border-gray-200">
          <Button
            variant="primary"
            className="w-full bg-[#178641] hover:bg-[#136834] text-white"
            onClick={handleContinue}
            size="lg"
          >
            Continue to Shipping
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Button>
        </div>
      )}
    </FormSection>
  );
}
