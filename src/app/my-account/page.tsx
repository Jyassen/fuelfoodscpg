import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'My Account - FuelFoods CPG',
  description: 'Manage your account, subscriptions, and order history.',
};

export default function MyAccountPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Account Navigation */}
        <div className="lg:col-span-1">
          <nav className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <ul className="space-y-2">
              <li>
                <a
                  href="#dashboard"
                  className="block px-3 py-2 text-green-600 bg-green-50 rounded-lg font-medium"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#orders"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  Order History
                </a>
              </li>
              <li>
                <a
                  href="#subscriptions"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  Subscriptions
                </a>
              </li>
              <li>
                <a
                  href="#addresses"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  Addresses
                </a>
              </li>
              <li>
                <a
                  href="#profile"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  Profile Settings
                </a>
              </li>
              <li>
                <a
                  href="#logout"
                  className="block px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  Logout
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Account Content */}
        <div className="lg:col-span-3 space-y-8">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">Welcome back, Sarah!</h2>
            <p className="opacity-90">
              Your next delivery is scheduled for Monday, August 7th
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">12</div>
              <div className="text-sm text-gray-600">Total Orders</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">2</div>
              <div className="text-sm text-gray-600">Active Subscriptions</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                $324
              </div>
              <div className="text-sm text-gray-600">Total Saved</div>
            </div>
          </div>

          {/* Active Subscriptions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Active Subscriptions
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Mega Mix - Weekly
                    </h3>
                    <p className="text-sm text-gray-600">
                      Next delivery: Monday, Aug 7th
                    </p>
                    <p className="text-sm text-green-600">$12.99/week</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm bg-white text-gray-700 border border-gray-300 rounded hover:bg-gray-50">
                      Modify
                    </button>
                    <button className="px-3 py-1 text-sm text-red-600 hover:text-red-800">
                      Pause
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Tummies Pet Grass (3-Pack) - Weekly
                    </h3>
                    <p className="text-sm text-gray-600">
                      Next delivery: Monday, Aug 7th
                    </p>
                    <p className="text-sm text-blue-600">$24.99/week</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm bg-white text-gray-700 border border-gray-300 rounded hover:bg-gray-50">
                      Modify
                    </button>
                    <button className="px-3 py-1 text-sm text-red-600 hover:text-red-800">
                      Pause
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href="/configure/starter"
                  className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add New Subscription
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Recent Orders
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Order #1234</h3>
                    <p className="text-sm text-gray-600">July 31, 2024</p>
                    <p className="text-sm text-gray-600">
                      Mega Mix, Brassica Blend
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">$27.98</p>
                    <p className="text-sm text-green-600">Delivered</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Order #1233</h3>
                    <p className="text-sm text-gray-600">July 24, 2024</p>
                    <p className="text-sm text-gray-600">
                      Tummies Pet Grass (3-Pack)
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">$24.99</p>
                    <p className="text-sm text-green-600">Delivered</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Order #1232</h3>
                    <p className="text-sm text-gray-600">July 17, 2024</p>
                    <p className="text-sm text-gray-600">
                      Green Medley, Mega Mix
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">$24.98</p>
                    <p className="text-sm text-green-600">Delivered</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href="#orders"
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  View All Orders →
                </Link>
              </div>
            </div>
          </div>

          {/* Account Settings Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">
                Account Settings
              </h3>
              <div className="space-y-2">
                <a
                  href="#profile"
                  className="block text-sm text-gray-600 hover:text-green-600"
                >
                  Update Profile Information
                </a>
                <a
                  href="#password"
                  className="block text-sm text-gray-600 hover:text-green-600"
                >
                  Change Password
                </a>
                <a
                  href="#notifications"
                  className="block text-sm text-gray-600 hover:text-green-600"
                >
                  Email Preferences
                </a>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Need Help?</h3>
              <div className="space-y-2">
                <Link
                  href="/contact-us"
                  className="block text-sm text-gray-600 hover:text-green-600"
                >
                  Contact Support
                </Link>
                <a
                  href="#faq"
                  className="block text-sm text-gray-600 hover:text-green-600"
                >
                  FAQ
                </a>
                <Link
                  href="/fulfillment-policy"
                  className="block text-sm text-gray-600 hover:text-green-600"
                >
                  Fulfillment Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
