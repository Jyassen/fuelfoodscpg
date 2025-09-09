'use client';

import { useState } from 'react';
import { AuthProvider, useRequireAuth } from '@/components/auth/AuthContext';
import AccountSidebar from '@/components/auth/AccountSidebar';
import { CreditCard, Plus, Edit, Trash2, Shield, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaymentMethod {
  id: string;
  type: 'card';
  brand: 'visa' | 'mastercard' | 'amex' | 'discover';
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
  billingAddress?: {
    name: string;
    line1: string;
    city: string;
    state: string;
    postalCode: string;
  };
}

// Initialize with no payment methods; will integrate with Stripe later
const initialPaymentMethods: PaymentMethod[] = [];

function PaymentMethodsContent() {
  const { user, loading } = useRequireAuth();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(initialPaymentMethods);
  const [isLoading, setIsLoading] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your payment methods...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const getBrandIcon = (brand: string) => {
    // In a real app, you'd use actual card brand icons
    const brandColors = {
      visa: 'text-blue-600',
      mastercard: 'text-red-600',
      amex: 'text-green-600',
      discover: 'text-orange-600'
    };
    
    return (
      <div className={`w-8 h-5 rounded border ${brandColors[brand as keyof typeof brandColors]} bg-white flex items-center justify-center text-xs font-bold`}>
        {brand.toUpperCase().slice(0, 4)}
      </div>
    );
  };

  const handleSetDefault = async (paymentMethodId: string) => {
    setIsLoading(true);
    // In a real app, you would call Stripe API to set default payment method
    setTimeout(() => {
      setPaymentMethods(methods => 
        methods.map(method => ({
          ...method,
          isDefault: method.id === paymentMethodId
        }))
      );
      setIsLoading(false);
    }, 1000);
  };

  const handleDelete = async (paymentMethodId: string) => {
    if (!window.confirm('Are you sure you want to remove this payment method?')) {
      return;
    }

    setIsLoading(true);
    // In a real app, you would call Stripe API to detach the payment method
    setTimeout(() => {
      setPaymentMethods(methods => methods.filter(method => method.id !== paymentMethodId));
      setIsLoading(false);
    }, 1000);
  };

  const handleAddPaymentMethod = () => {
    // In a real app, you would integrate with Stripe Elements to collect payment method
    alert('This would open Stripe payment method collection form');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <AccountSidebar />
          </div>

          {/* Payment Methods Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-green-600" />
                    Your Payment Methods
                  </h2>
                  <Button
                    onClick={handleAddPaymentMethod}
                    disabled={isLoading}
                    className="bg-green-600 hover:bg-green-700 flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Payment Method
                  </Button>
                </div>
              </div>

              <div className="p-6">
                {paymentMethods.length > 0 ? (
                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="border border-gray-200 rounded-lg p-6 relative">
                        {method.isDefault && (
                          <span className="absolute top-3 right-3 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                            Default
                          </span>
                        )}
                        
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-4">
                            {getBrandIcon(method.brand)}
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-gray-900">
                                  •••• •••• •••• {method.last4}
                                </span>
                                <span className="text-sm text-gray-500">
                                  {String(method.expiryMonth).padStart(2, '0')}/{method.expiryYear}
                                </span>
                              </div>
                              {method.billingAddress && (
                                <div className="text-sm text-gray-600 mt-1">
                                  <p>{method.billingAddress.name}</p>
                                  <p>
                                    {method.billingAddress.line1}, {method.billingAddress.city}, {method.billingAddress.state} {method.billingAddress.postalCode}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            {!method.isDefault && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleSetDefault(method.id)}
                                disabled={isLoading}
                              >
                                Set Default
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              disabled
                              className="flex items-center"
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(method.id)}
                              disabled={isLoading}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No payment methods</h3>
                    <p className="text-gray-600 mb-6">
                      Add a payment method to make checkout faster and easier.
                    </p>
                    <Button
                      onClick={handleAddPaymentMethod}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Your First Payment Method
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Security Notice */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    Your payment information is secure
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>
                      We use Stripe to process payments securely. Your card details are encrypted 
                      and stored safely according to PCI DSS standards. We never store your full 
                      card number on our servers.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Billing Information */}
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <AlertCircle className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Important billing information
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <ul className="list-disc list-inside space-y-1">
                      <li>Your default payment method will be used for subscription renewals</li>
                      <li>If a payment fails, we'll try your backup payment methods automatically</li>
                      <li>You'll receive email notifications for all payment activity</li>
                      <li>Changes to your default payment method take effect immediately</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentMethodsPage() {
  return (
    <AuthProvider>
      <PaymentMethodsContent />
    </AuthProvider>
  );
}