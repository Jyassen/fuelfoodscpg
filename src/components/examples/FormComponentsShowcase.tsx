'use client';

import React, { useState } from 'react';
import {
  FormField,
  Button,
  FormSection,
  ValidationMessage,
  LoadingSpinner,
  PageSpinner,
  InlineSpinner,
} from '@/components/form';
import {
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  ShoppingCart,
  Package,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

export default function FormComponentsShowcase() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    subscription: 'pro',
    specialInstructions: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [step, setStep] = useState(1);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (stepNumber: number) => {
    const newErrors: Record<string, string> = {};

    if (stepNumber === 1) {
      if (!formData.firstName.trim())
        newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim())
        newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email))
        newErrors.email = 'Please enter a valid email';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    }

    if (stepNumber === 2) {
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    }

    if (stepNumber === 3) {
      if (!formData.cardNumber.trim())
        newErrors.cardNumber = 'Card number is required';
      if (!formData.expiryDate.trim())
        newErrors.expiryDate = 'Expiry date is required';
      if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const handleSubmit = async () => {
    if (validateStep(3)) {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLoading(false);
      alert('Order submitted successfully!');
    }
  };

  const stateOptions = [
    { value: '', label: 'Select a state' },
    { value: 'NY', label: 'New York' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'MA', label: 'Massachusetts' },
  ];

  const subscriptionOptions = [
    { value: 'starter', label: 'Starter Plan - $15/pack' },
    { value: 'pro', label: 'Pro Plan - $45/week' },
    { value: 'elite', label: 'Elite Plan - $75/week' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            FuelFoods Form Components Showcase
          </h1>
          <p className="text-lg text-gray-600">
            Interactive demo of all form components matching the FuelFoods
            design language
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {[1, 2, 3].map(stepNumber => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold
                  ${
                    step >= stepNumber
                      ? 'bg-fuelfoods-green-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }
                `}
                >
                  {stepNumber}
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${
                    step >= stepNumber
                      ? 'text-fuelfoods-green-600'
                      : 'text-gray-500'
                  }`}
                >
                  {stepNumber === 1 && 'Personal Info'}
                  {stepNumber === 2 && 'Shipping'}
                  {stepNumber === 3 && 'Payment'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Form */}
        <div className="space-y-8">
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <FormSection
              variant="elevated"
              title="Personal Information"
              description="Tell us about yourself so we can personalize your microgreens experience"
              icon={<User />}
              required
              headerVariant="accent"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="First Name"
                  value={formData.firstName}
                  onChange={e => handleInputChange('firstName', e.target.value)}
                  error={errors.firstName}
                  required
                  placeholder="Enter your first name"
                />
                <FormField
                  label="Last Name"
                  value={formData.lastName}
                  onChange={e => handleInputChange('lastName', e.target.value)}
                  error={errors.lastName}
                  required
                  placeholder="Enter your last name"
                />
              </div>

              <FormField
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={e => handleInputChange('email', e.target.value)}
                error={errors.email}
                success={
                  formData.email && !errors.email ? 'Valid email address' : ''
                }
                required
                placeholder="your@email.com"
                helperText="We'll use this to send order updates and nutrition tips"
              />

              <FormField
                label="Phone Number"
                type="tel"
                value={formData.phone}
                onChange={e => handleInputChange('phone', e.target.value)}
                error={errors.phone}
                required
                placeholder="(555) 123-4567"
                helperText="For delivery notifications and customer support"
              />

              <div className="flex justify-end pt-4">
                <Button onClick={handleNext} size="lg">
                  Continue to Shipping
                </Button>
              </div>
            </FormSection>
          )}

          {/* Step 2: Shipping Information */}
          {step === 2 && (
            <FormSection
              variant="elevated"
              title="Shipping Information"
              description="Where should we deliver your fresh microgreens?"
              icon={<MapPin />}
              required
              headerVariant="accent"
            >
              <FormField
                label="Street Address"
                value={formData.address}
                onChange={e => handleInputChange('address', e.target.value)}
                error={errors.address}
                required
                placeholder="123 Main Street"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  label="City"
                  value={formData.city}
                  onChange={e => handleInputChange('city', e.target.value)}
                  error={errors.city}
                  required
                  placeholder="New York"
                />
                <FormField
                  label="State"
                  fieldType="select"
                  value={formData.state}
                  onChange={e => handleInputChange('state', e.target.value)}
                  error={errors.state}
                  options={stateOptions}
                  required
                />
                <FormField
                  label="ZIP Code"
                  value={formData.zipCode}
                  onChange={e => handleInputChange('zipCode', e.target.value)}
                  error={errors.zipCode}
                  required
                  placeholder="10001"
                />
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="secondary" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button onClick={handleNext} size="lg">
                  Continue to Payment
                </Button>
              </div>
            </FormSection>
          )}

          {/* Step 3: Payment & Subscription */}
          {step === 3 && (
            <>
              <FormSection
                variant="elevated"
                title="Subscription Plan"
                description="Choose the plan that fits your lifestyle"
                icon={<Package />}
                headerVariant="accent"
              >
                <FormField
                  label="Subscription Plan"
                  fieldType="select"
                  value={formData.subscription}
                  onChange={e =>
                    handleInputChange('subscription', e.target.value)
                  }
                  options={subscriptionOptions}
                />

                <ValidationMessage
                  type="info"
                  message="All subscriptions can be modified or cancelled anytime"
                />
              </FormSection>

              <FormSection
                variant="elevated"
                title="Payment Information"
                description="Secure payment processing"
                icon={<CreditCard />}
                required
                headerVariant="accent"
              >
                <FormField
                  label="Card Number"
                  value={formData.cardNumber}
                  onChange={e =>
                    handleInputChange('cardNumber', e.target.value)
                  }
                  error={errors.cardNumber}
                  required
                  placeholder="1234 5678 9012 3456"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Expiry Date"
                    value={formData.expiryDate}
                    onChange={e =>
                      handleInputChange('expiryDate', e.target.value)
                    }
                    error={errors.expiryDate}
                    required
                    placeholder="MM/YY"
                  />
                  <FormField
                    label="CVV"
                    value={formData.cvv}
                    onChange={e => handleInputChange('cvv', e.target.value)}
                    error={errors.cvv}
                    required
                    placeholder="123"
                  />
                </div>

                <FormField
                  label="Special Instructions"
                  fieldType="textarea"
                  value={formData.specialInstructions}
                  onChange={e =>
                    handleInputChange('specialInstructions', e.target.value)
                  }
                  placeholder="Any special delivery instructions..."
                  helperText="Optional: Gate codes, delivery preferences, etc."
                  rows={3}
                />

                <div className="flex justify-between pt-4">
                  <Button variant="secondary" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    size="lg"
                    loading={loading}
                    loadingText="Processing Order..."
                    leftIcon={<ShoppingCart className="w-5 h-5" />}
                  >
                    Complete Order
                  </Button>
                </div>
              </FormSection>
            </>
          )}
        </div>

        {/* Component Showcase Section */}
        <div className="mt-16 space-y-8">
          <FormSection
            variant="card"
            title="Component Showcase"
            description="Examples of all available components and their states"
            titleSize="lg"
          >
            {/* Button Variants */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">
                Button Variants
              </h4>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="orange">Orange</Button>
                <Button variant="yellow">Yellow</Button>
                <Button variant="primary" loading loadingText="Loading...">
                  Loading
                </Button>
              </div>
            </div>

            {/* Button Sizes */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">
                Button Sizes
              </h4>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="xl">Extra Large</Button>
              </div>
            </div>

            {/* Form Field States */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">
                Form Field States
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Default State"
                  placeholder="Enter some text..."
                  helperText="This is a helper text"
                />
                <FormField
                  label="Error State"
                  value="invalid@email"
                  error="Please enter a valid email address"
                />
                <FormField
                  label="Success State"
                  value="valid@email.com"
                  success="Email address is valid"
                />
                <FormField
                  label="Loading State"
                  value="Processing..."
                  loading
                />
              </div>
            </div>

            {/* Validation Messages */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">
                Validation Messages
              </h4>
              <div className="space-y-3">
                <ValidationMessage
                  type="error"
                  message="This is an error message"
                />
                <ValidationMessage
                  type="success"
                  message="This is a success message"
                />
                <ValidationMessage
                  type="warning"
                  message="This is a warning message"
                />
                <ValidationMessage
                  type="info"
                  message="This is an info message"
                />
              </div>
            </div>

            {/* Loading Spinners */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">
                Loading Spinners
              </h4>
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <LoadingSpinner size="sm" />
                  <p className="text-xs mt-2">Small</p>
                </div>
                <div className="text-center">
                  <LoadingSpinner size="default" />
                  <p className="text-xs mt-2">Default</p>
                </div>
                <div className="text-center">
                  <LoadingSpinner size="lg" />
                  <p className="text-xs mt-2">Large</p>
                </div>
                <div className="text-center">
                  <LoadingSpinner size="xl" />
                  <p className="text-xs mt-2">Extra Large</p>
                </div>
                <div className="text-center">
                  <InlineSpinner />
                  <p className="text-xs mt-2">Inline</p>
                </div>
              </div>
            </div>

            {/* Demo Buttons */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">
                Interactive Demos
              </h4>
              <div className="flex flex-wrap gap-4">
                <Button
                  variant="secondary"
                  onClick={() => setShowSpinner(!showSpinner)}
                >
                  {showSpinner ? 'Hide' : 'Show'} Page Spinner
                </Button>
                <Button
                  variant="outline"
                  onClick={() => alert('Button clicked!')}
                >
                  Test Click Handler
                </Button>
              </div>
            </div>
          </FormSection>
        </div>

        {/* Page Spinner Demo */}
        {showSpinner && <PageSpinner label="Loading page content..." />}
      </div>
    </div>
  );
}
