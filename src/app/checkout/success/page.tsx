import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Order Success | FuelFoods',
};

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
          <svg
            className="h-8 w-8 text-green-600"
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
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Order Confirmed
        </h1>
        <p className="text-gray-600 mb-8">
          Thanks for your order! We’ve emailed your receipt and will notify you
          when it ships.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/my-account"
            className="border border-green-600 text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
          >
            View My Account
          </Link>
        </div>
      </div>
    </div>
  );
}
