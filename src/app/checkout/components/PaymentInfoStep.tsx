'use client';

import { useState, useEffect } from 'react';
import { useCheckout } from '@/context';
import {
  FormField,
  FormSection,
  Button,
  ValidationMessage,
} from '@/components/form';
import {
  CheckoutPaymentInfo,
  CheckoutBillingInfo,
  PaymentMethodType,
} from '@/lib/types';

interface PaymentInfoStepProps {
  onContinue: () => void;
  onBack: () => void;
}

export default function PaymentInfoStep({
  onContinue,
  onBack,
}: PaymentInfoStepProps) {
  const {
    paymentInfo,
    billingInfo,
    shippingInfo,
    updatePaymentInfo,
    updateBillingInfo,
    errors,
    validateCurrentStep,
    clearErrors,
  } = useCheckout();

  const [paymentData, setPaymentData] = useState<Partial<CheckoutPaymentInfo>>({
    methodType: paymentInfo.methodType || 'credit_card',
    cardholderName: paymentInfo.cardholderName || '',
    cardNumber: paymentInfo.cardNumber || '',
    expiryMonth: paymentInfo.expiryMonth || '',
    expiryYear: paymentInfo.expiryYear || '',
    cvv: paymentInfo.cvv || '',
    savePaymentMethod: paymentInfo.savePaymentMethod || false,
  });

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

  const handlePaymentChange = (
    field: keyof CheckoutPaymentInfo,
    value: string | boolean
  ) => {
    const updatedData = { ...paymentData, [field]: value };
    setPaymentData(updatedData);
    updatePaymentInfo(updatedData);
    if (errors.paymentInfo.length > 0) clearErrors('paymentInfo');
  };

  const handleBillingChange = (
    field: keyof CheckoutBillingInfo,
    value: string | boolean
  ) => {
    const updatedData = { ...billingData, [field]: value };
    setBillingData(updatedData);
    updateBillingInfo(updatedData);
    if (errors.billingInfo.length > 0) clearErrors('billingInfo');
  };

  const handleCardNumberChange = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    if (formatted.length <= 19) {
      handlePaymentChange('cardNumber', cleaned);
    }
  };

  const handleExpiryChange = (value: string) => {
    // Handle both typed input (MMYY) and autofill format (MM/YY or MM/YYYY)
    let cleaned = value.replace(/\D/g, '');
    
    // If the input contains a slash, split it properly
    if (value.includes('/')) {
      const parts = value.split('/');
      const month = parts[0]?.replace(/\D/g, '') || '';
      const year = parts[1]?.replace(/\D/g, '') || '';
      
      if (month && month.length <= 2) {
        handlePaymentChange('expiryMonth', month.padStart(2, '0'));
        
        if (year) {
          // Handle both YY and YYYY formats
          const normalizedYear = year.length === 2 ? `20${year}` : year.slice(0, 4);
          // Don't accept years like "00" from autofill, use current year + 1 as minimum
          const currentYear = new Date().getFullYear();
          const yearNum = parseInt(normalizedYear);
          
          if (yearNum >= currentYear) {
            handlePaymentChange('expiryYear', normalizedYear);
          } else if (year === '00') {
            // Handle "00" from broken autofill - default to current year + 1
            handlePaymentChange('expiryYear', (currentYear + 1).toString());
          }
        }
      }
      return;
    }
    
    // Handle manual typing (no slash)
    if (cleaned.length <= 4) {
      if (cleaned.length >= 2) {
        const month = cleaned.slice(0, 2);
        const year = cleaned.slice(2);
        handlePaymentChange('expiryMonth', month);
        if (year) {
          const fullYear = year.length === 1 ? `202${year}` : `20${year}`;
          handlePaymentChange('expiryYear', fullYear);
        }
      } else {
        handlePaymentChange('expiryMonth', cleaned);
        // Clear year if month is being edited
        if (cleaned.length < 2) {
          handlePaymentChange('expiryYear', '');
        }
      }
    }
  };

  const formatCardNumber = (cardNumber: string) =>
    cardNumber.replace(/(.{4})/g, '$1 ').trim();

  const formatExpiry = () => {
    const month = paymentData.expiryMonth || '';
    const year = paymentData.expiryYear || '';
    return month && year ? `${month}/${year.slice(-2)}` : month;
  };

  const handleContinue = () => {
    if (validateCurrentStep()) onContinue();
  };

  return (
    <div className="space-y-8">
      <FormSection
        title="Payment Method"
        description="All transactions are secure and encrypted"
        className="space-y-6"
      >
        {/* Remove stacked required notices; subtle asterisks only */}

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="relative cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="credit_card"
                checked={paymentData.methodType === 'credit_card'}
                onChange={e =>
                  handlePaymentChange(
                    'methodType',
                    e.target.value as PaymentMethodType
                  )
                }
                className="sr-only"
              />
              <div
                className={`p-4 border-2 rounded-lg transition-all ${
                  paymentData.methodType === 'credit_card'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-6 h-6 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                    </svg>
                    <span className="font-medium">Credit/Debit Card</span>
                  </div>
                  {paymentData.methodType === 'credit_card' && (
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </label>

            <label className="relative cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={paymentData.methodType === 'paypal'}
                onChange={e =>
                  handlePaymentChange(
                    'methodType',
                    e.target.value as PaymentMethodType
                  )
                }
                className="sr-only"
              />
              <div
                className={`p-4 border-2 rounded-lg transition-all ${
                  paymentData.methodType === 'paypal'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                      P
                    </div>
                    <span className="font-medium">PayPal</span>
                  </div>
                  {paymentData.methodType === 'paypal' && (
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </label>
          </div>
        </div>

        {paymentData.methodType === 'credit_card' && (
          <div className="space-y-6">
            <FormField
              label="Cardholder Name"
              type="text"
              value={paymentData.cardholderName || ''}
              onValueChange={v => handlePaymentChange('cardholderName', v)}
              placeholder="Name as it appears on card"
              required
              error={errors.paymentInfo.find(e => e.includes('cardholderName'))}
              autoComplete="cc-name"
            />
            <FormField
              label="Card Number"
              type="text"
              value={formatCardNumber(paymentData.cardNumber || '')}
              onValueChange={handleCardNumberChange}
              placeholder="1234 5678 9012 3456"
              required
              error={errors.paymentInfo.find(e => e.includes('cardNumber'))}
              autoComplete="cc-number"
            />
            <div className="grid grid-cols-2 gap-6">
              <FormField
                label="Expiry Date"
                type="text"
                value={formatExpiry()}
                onValueChange={handleExpiryChange}
                placeholder="MM/YY"
                maxLength={5}
                required
                error={errors.paymentInfo.find(e => e.includes('expiry'))}
                autoComplete="cc-exp"
              />
              <FormField
                label="CVV"
                type="text"
                value={paymentData.cvv || ''}
                onValueChange={v =>
                  v.length <= 4 && handlePaymentChange('cvv', v)
                }
                placeholder="123"
                maxLength={4}
                required
                error={errors.paymentInfo.find(e => e.includes('cvv'))}
                helperText="3 or 4 digit security code"
                autoComplete="cc-csc"
              />
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="save-payment"
                checked={paymentData.savePaymentMethod || false}
                onChange={e =>
                  handlePaymentChange('savePaymentMethod', e.target.checked)
                }
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="save-payment" className="text-sm text-gray-700">
                Save this payment method for future orders
              </label>
            </div>
          </div>
        )}

        {paymentData.methodType === 'paypal' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              You'll be redirected to PayPal to complete your payment securely.
            </p>
          </div>
        )}
      </FormSection>

      <FormSection
        title="Billing Address"
        description="Address associated with your payment method"
        className="space-y-6"
      >
        {/* Remove stacked required notices; subtle asterisks only */}

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
              Secure Payment Processing
            </h4>
            <p className="text-xs text-gray-600 mt-1">
              Your payment information is encrypted and processed securely. We
              never store your card details.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 pt-6 border-t border-gray-200">
        <Button
          variant="primary"
          className="w-full bg-[#178641] hover:bg-[#136834] text-white"
          onClick={handleContinue}
          size="lg"
        >
          Review Order
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
    </div>
  );
}
