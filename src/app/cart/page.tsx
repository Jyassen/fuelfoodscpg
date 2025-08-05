import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Shopping Cart - FuelFoods CPG',
  description: 'Review your microgreens and pet grass selections before checkout.',
};

export default function CartPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
      {/* Cart Items */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
        <div className="p-6">
          {/* Sample Cart Items */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4 py-4 border-b border-gray-200">
              <div className="flex-shrink-0 w-20 h-20 relative bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src="/images/Mega-Product-img.png"
                  alt="Mega Mix"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Mega Mix</h3>
                <p className="text-sm text-gray-600">Premium Microgreens Blend</p>
                <p className="text-sm text-green-600">Weekly subscription</p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="px-3 py-1 border border-gray-300 rounded text-center min-w-[50px]">1</span>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">$12.99</p>
                <button className="text-sm text-red-600 hover:text-red-800">Remove</button>
              </div>
            </div>

            <div className="flex items-center space-x-4 py-4 border-b border-gray-200">
              <div className="flex-shrink-0 w-20 h-20 relative bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src="/images/Live-Cat-Grass.jpg"
                  alt="Tummies Pet Grass"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Tummies Pet Grass</h3>
                <p className="text-sm text-gray-600">3-Pack</p>
                <p className="text-sm text-blue-600">Weekly subscription</p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="px-3 py-1 border border-gray-300 rounded text-center min-w-[50px]">1</span>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">$24.99</p>
                <button className="text-sm text-red-600 hover:text-red-800">Remove</button>
              </div>
            </div>
          </div>

          {/* Cart Empty State (uncomment to show empty cart) */}
          {/* 
          <div className="text-center py-12">
            <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-600 mb-6">Add some fresh microgreens to get started!</p>
            <Link 
              href="/shop"
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-block"
            >
              Continue Shopping
            </Link>
          </div>
          */}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Continue Shopping */}
        <div className="lg:col-span-2">
          <Link 
            href="/shop"
            className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
          
          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-900">$37.98</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax</span>
              <span className="text-gray-900">$3.04</span>
            </div>
            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="font-semibold text-gray-900">$41.02</span>
              </div>
            </div>
          </div>

          <Link
            href="/checkout"
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors block text-center"
          >
            Proceed to Checkout
          </Link>

          <div className="mt-4 text-center">
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Secure checkout
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Free shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}