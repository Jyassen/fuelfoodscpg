import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Special Offers - FuelFoods CPG',
  description:
    'Discover exclusive deals and discounts on premium microgreens and pet grass subscriptions.',
};

export default function OffersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Special Offers
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Save more on your favorite microgreens and pet grass with our
          exclusive deals and subscription discounts.
        </p>
      </div>

      {/* Featured Offer */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 mb-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -ml-12 -mb-12"></div>
        <div className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-block bg-yellow-400 text-green-900 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                LIMITED TIME
              </div>
              <h2 className="text-3xl font-bold mb-4">
                50% Off Your First Month
              </h2>
              <p className="text-green-100 mb-6">
                Start your healthy journey with any subscription and get 50% off
                your first month. Fresh microgreens delivered weekly to your
                door!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/configure/starter"
                  className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
                >
                  Claim Offer
                </Link>
                <div className="text-green-100 text-sm flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Offer expires August 31st
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/Fresh-Greens-Delivered-Weekly-Image.png"
                alt="Fresh Greens Delivered Weekly"
                width={400}
                height={300}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Offer Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {/* New Customer Offers */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-center mb-6">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              New Customer Special
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Perfect for first-time buyers
            </p>
          </div>
          <div className="space-y-3 mb-6">
            <div className="flex items-center text-sm">
              <svg
                className="w-4 h-4 text-green-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              50% off first month
            </div>
            <div className="flex items-center text-sm">
              <svg
                className="w-4 h-4 text-green-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Member perks forever
            </div>
            <div className="flex items-center text-sm">
              <svg
                className="w-4 h-4 text-green-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Cancel anytime
            </div>
          </div>
          <Link
            href="/register"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center block"
          >
            Get Started
          </Link>
        </div>

        {/* Bundle Deals */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-center mb-6">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Bundle & Save
            </h3>
            <p className="text-gray-600 text-sm mb-4">Mix and match products</p>
          </div>
          <div className="space-y-3 mb-6">
            <div className="flex items-center text-sm">
              <svg
                className="w-4 h-4 text-green-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              15% off 2+ products
            </div>
            <div className="flex items-center text-sm">
              <svg
                className="w-4 h-4 text-green-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              25% off 3+ products
            </div>
            <div className="flex items-center text-sm">
              <svg
                className="w-4 h-4 text-green-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Free upgrade to premium
            </div>
          </div>
          <Link
            href="/configure/starter"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors text-center block"
          >
            Shop Bundles
          </Link>
        </div>

        {/* Loyalty Rewards */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-center mb-6">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Loyalty Rewards
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              For our valued customers
            </p>
          </div>
          <div className="space-y-3 mb-6">
            <div className="flex items-center text-sm">
              <svg
                className="w-4 h-4 text-green-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Earn points on every order
            </div>
            <div className="flex items-center text-sm">
              <svg
                className="w-4 h-4 text-green-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Redeem for free products
            </div>
            <div className="flex items-center text-sm">
              <svg
                className="w-4 h-4 text-green-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              VIP customer benefits
            </div>
          </div>
          <Link
            href="/my-account"
            className="w-full bg-yellow-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-yellow-700 transition-colors text-center block"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Current Promotions */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Current Promotions
        </h2>
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Free Pet Grass Trial
                </h3>
                <p className="text-gray-600 mb-2">
                  Add a 3-pack of Tummies Pet Grass to any microgreens
                  subscription and get your first pack free!
                </p>
                <p className="text-sm text-green-600 font-medium">
                  Save $24.99 • Valid through August 2024
                </p>
              </div>
              <Link
                href="/products/tummies-pet-grass"
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Try Now
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Refer a Friend
                </h3>
                <p className="text-gray-600 mb-2">
                  Share the health! Refer friends and you both get $10 off your
                  next order.
                </p>
                <p className="text-sm text-purple-600 font-medium">
                  Unlimited referrals • No expiration
                </p>
              </div>
              <Link
                href="/my-account"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                Refer Now
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-6 border border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Season Pass - 3 Months
                </h3>
                <p className="text-gray-600 mb-2">
                  Commit to 3 months and save 20% on your subscription. Perfect
                  for building healthy habits!
                </p>
                <p className="text-sm text-orange-600 font-medium">
                  20% savings • Flexible delivery
                </p>
              </div>
              <Link
                href="/configure/starter"
                className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors"
              >
                Subscribe
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Terms */}
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <h3 className="font-semibold text-gray-900 mb-2">Terms & Conditions</h3>
        <p className="text-sm text-gray-600 max-w-3xl mx-auto">
          All offers subject to availability and terms. Discounts cannot be
          combined unless specified. New customer offers valid for first-time
          subscribers only. Subscription cancellations and modifications can be
          made anytime through your account dashboard.
        </p>
        <div className="mt-4">
          <Link
            href="/fulfillment-policy"
            className="text-green-600 hover:text-green-700 text-sm"
          >
            View Full Terms →
          </Link>
        </div>
      </div>
    </div>
  );
}
