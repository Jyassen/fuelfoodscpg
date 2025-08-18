'use client';

import { useState, useEffect } from 'react';
import { useCheckout } from '@/context';
import {
  FormField,
  FormSection,
  Button,
  ValidationMessage,
} from '@/components/form';
import { CheckoutShippingInfo } from '@/lib/types';

interface ShippingAddressStepProps {
  onContinue: () => void;
  onBack: () => void;
}

// US States list
const US_STATES = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
];

export default function ShippingAddressStep({
  onContinue,
  onBack,
}: ShippingAddressStepProps) {
  const {
    shippingInfo,
    customerInfo,
    updateShippingInfo,
    errors,
    validateCurrentStep,
    clearErrors,
    loadShippingOptions,
    isLoadingShipping,
  } = useCheckout();

  const [formData, setFormData] = useState<Partial<CheckoutShippingInfo>>({
    firstName: shippingInfo.firstName || customerInfo.firstName || '',
    lastName: shippingInfo.lastName || customerInfo.lastName || '',
    company: shippingInfo.company || '',
    address1: shippingInfo.address1 || '',
    address2: shippingInfo.address2 || '',
    city: shippingInfo.city || '',
    state: shippingInfo.state || '',
    zipCode: shippingInfo.zipCode || '',
    country: shippingInfo.country || 'US',
    deliveryInstructions: shippingInfo.deliveryInstructions || '',
  });

  // Auto-populate names from customer info
  useEffect(() => {
    if (customerInfo.firstName && !formData.firstName) {
      handleInputChange('firstName', customerInfo.firstName);
    }
    if (customerInfo.lastName && !formData.lastName) {
      handleInputChange('lastName', customerInfo.lastName);
    }
  }, [customerInfo.firstName, customerInfo.lastName]);

  const handleInputChange = (
    field: keyof CheckoutShippingInfo,
    value: string
  ) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    updateShippingInfo(updatedData);

    if (field === 'zipCode' && value.length === 5) {
      loadShippingOptions(value);
    }

    if (errors.shippingInfo.length > 0) {
      clearErrors('shippingInfo');
    }
  };

  const handleContinue = () => {
    if (validateCurrentStep()) {
      onContinue();
    }
  };

  return (
    <FormSection
      title="Shipping Address"
      description="Where should we deliver your fresh microgreens?"
      className="space-y-6"
    >
      {/* Remove stacked required notices; subtle asterisks only */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="First Name"
          type="text"
          value={formData.firstName || ''}
          onValueChange={value => handleInputChange('firstName', value)}
          name="shippingFirstName"
          autoComplete="given-name"
          placeholder="Enter first name"
          required
          error={errors.shippingInfo.find(e => e.includes('firstName'))}
        />

        <FormField
          label="Last Name"
          type="text"
          value={formData.lastName || ''}
          onValueChange={value => handleInputChange('lastName', value)}
          name="shippingLastName"
          autoComplete="family-name"
          placeholder="Enter last name"
          required
          error={errors.shippingInfo.find(e => e.includes('lastName'))}
        />
      </div>

      <FormField
        label="Company (Optional)"
        type="text"
        value={formData.company || ''}
        onValueChange={value => handleInputChange('company', value)}
        name="company"
        autoComplete="organization"
        placeholder="Company name"
      />

      <FormField
        label="Street Address"
        type="text"
        value={formData.address1 || ''}
        onValueChange={value => handleInputChange('address1', value)}
        name="address1"
        autoComplete="address-line1"
        placeholder="Enter your street address"
        required
        error={errors.shippingInfo.find(e => e.includes('address1'))}
      />

      <FormField
        label="Apartment, Suite, etc. (Optional)"
        type="text"
        value={formData.address2 || ''}
        onValueChange={value => handleInputChange('address2', value)}
        name="address2"
        autoComplete="address-line2"
        placeholder="Apt, suite, unit, etc."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField
          label="City"
          type="text"
          value={formData.city || ''}
          onValueChange={value => handleInputChange('city', value)}
          name="city"
          autoComplete="address-level2"
          placeholder="Enter city"
          required
          error={errors.shippingInfo.find(e => e.includes('city'))}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State *
          </label>
          <select
            value={formData.state || ''}
            onChange={e => handleInputChange('state', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
            required
          >
            <option value="">Select State</option>
            {US_STATES.map(state => (
              <option key={state.value} value={state.value}>
                {state.label}
              </option>
            ))}
          </select>
          {errors.shippingInfo.find(e => e.includes('state')) && (
            <ValidationMessage
              message={errors.shippingInfo.find(e => e.includes('state')) || ''}
              type="error"
            />
          )}
        </div>

        <FormField
          label="ZIP Code"
          type="text"
          value={formData.zipCode || ''}
          onValueChange={value => handleInputChange('zipCode', value)}
          name="postalCode"
          autoComplete="postal-code"
          placeholder="12345"
          required
          error={errors.shippingInfo.find(e => e.includes('zipCode'))}
          helperText={isLoadingShipping ? 'Loading shipping options...' : ''}
        />
      </div>

      <FormField
        label="Delivery Instructions (Optional)"
        type="textarea"
        value={formData.deliveryInstructions || ''}
        onValueChange={value =>
          handleInputChange('deliveryInstructions', value)
        }
        name="deliveryInstructions"
        placeholder="Special delivery instructions, gate codes, etc."
        rows={3}
      />

      {/* Delivery Information */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <svg
            className="w-5 h-5 text-green-500 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-green-900">
              Fresh Delivery Guarantee
            </h4>
            <p className="text-xs text-green-700 mt-1">
              Your microgreens are harvested fresh and delivered within 24-48
              hours. We deliver Tuesday through Friday to ensure peak freshness.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col gap-4 pt-6 border-t border-gray-200">
        <Button
          variant="primary"
          className="w-full bg-[#178641] hover:bg-[#136834] text-white"
          onClick={handleContinue}
          disabled={isLoadingShipping}
          size="lg"
        >
          {isLoadingShipping ? 'Loading...' : 'Continue to Payment'}
        </Button>
      </div>
    </FormSection>
  );
}
