'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from './AuthContext';
import { 
  Package, 
  Calendar, 
  DollarSign, 
  Settings, 
  Plus, 
  ChevronRight,
  Phone,
  Mail,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardData {
  user: {
    firstName: string;
    email: string;
    totalOrders: number;
    activeSubscriptions: number;
    totalSaved: number;
    nextDelivery?: {
      date: string;
      items: string[];
    };
  };
  recentOrders: {
    id: string;
    orderNumber: string;
    date: string;
    items: string[];
    total: number;
    status: 'delivered' | 'processing' | 'shipped';
  }[];
  activeSubscriptions: {
    id: string;
    name: string;
    frequency: string;
    price: number;
    nextDelivery: string;
    status: 'active' | 'paused';
    color: 'green' | 'blue' | 'purple';
  }[];
}

export default function AccountDashboard() {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData>(() => ({
    user: {
      firstName: user?.firstName || '',
      email: user?.email || '',
      totalOrders: user?.totalOrders || 0,
      activeSubscriptions: user?.subscriptions?.filter(s => s.status === 'active').length || 0,
      totalSaved: 0,
      nextDelivery: undefined,
    },
    recentOrders: [],
    activeSubscriptions: [],
  }));
  const [loading, setLoading] = useState(false);

  // In production, this would fetch real data
  useEffect(() => {
    if (user) {
      setDashboardData(prev => ({
        ...prev,
        user: {
          ...prev.user,
          firstName: user.firstName,
          email: user.email,
          totalOrders: user.totalOrders || 0,
          activeSubscriptions: user.subscriptions?.filter(s => s.status === 'active').length || 0,
        },
        activeSubscriptions: (user.subscriptions || [])
          .filter(s => s.status === 'active')
          .map(s => ({
            id: s.id,
            name: `${s.plan.name} - ${s.plan.frequency.charAt(0).toUpperCase()}${s.plan.frequency.slice(1)}`,
            frequency: s.plan.frequency,
            price: s.plan.price,
            nextDelivery: s.nextDelivery ? new Date(s.nextDelivery).toLocaleDateString() : 'Not scheduled',
            status: 'active' as const,
            color: 'green' as const,
          })),
        recentOrders: [],
      }));
    }
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600';
      case 'shipped':
        return 'text-blue-600';
      case 'processing':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  const getSubscriptionColorClasses = (color: string) => {
    switch (color) {
      case 'green':
        return 'bg-green-50 border-green-200';
      case 'blue':
        return 'bg-blue-50 border-blue-200';
      case 'purple':
        return 'bg-purple-50 border-purple-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getSubscriptionPriceColor = (color: string) => {
    switch (color) {
      case 'green':
        return 'text-green-600';
      case 'blue':
        return 'text-blue-600';
      case 'purple':
        return 'text-purple-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Message */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <p className="text-gray-700">
          Hello <strong>{dashboardData.user.firstName}</strong> (not {dashboardData.user.firstName}? <button className="text-green-600 hover:underline">Log out</button>)
        </p>
        <p className="text-gray-600 mt-2">
          From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {dashboardData.user.totalOrders}
          </div>
          <div className="text-sm text-gray-600">Total Orders</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {dashboardData.user.activeSubscriptions}
          </div>
          <div className="text-sm text-gray-600">Active Subscriptions</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow">
          <div className="text-3xl font-bold text-purple-600 mb-2">
            ${dashboardData.user.totalSaved}
          </div>
          <div className="text-sm text-gray-600">Total Saved</div>
        </div>
      </div>

      {/* Active Subscriptions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Active Subscriptions
          </h2>
          {dashboardData.user.nextDelivery && (
            <div className="text-sm text-gray-600">
              Next delivery: <span className="font-medium text-green-600">{dashboardData.user.nextDelivery.date}</span>
            </div>
          )}
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {dashboardData.activeSubscriptions.map((subscription) => (
              <div 
                key={subscription.id} 
                className={`flex items-center justify-between p-4 rounded-lg border ${getSubscriptionColorClasses(subscription.color)}`}
              >
                <div>
                  <h3 className="font-medium text-gray-900">
                    {subscription.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Next delivery: {subscription.nextDelivery}
                  </p>
                  <p className={`text-sm font-medium ${getSubscriptionPriceColor(subscription.color)}`}>
                    ${subscription.price}/{subscription.frequency.toLowerCase()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-gray-700 hover:bg-gray-50"
                  >
                    Modify
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-red-600 hover:text-red-800 hover:bg-red-50"
                  >
                    Pause
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Link
              href="/configure/starter"
              className="inline-flex items-center text-green-600 hover:text-green-700 font-medium group"
            >
              <Plus className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
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
            {dashboardData.recentOrders.map((order) => (
              <div 
                key={order.id} 
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div>
                  <h3 className="font-medium text-gray-900">Order {order.orderNumber}</h3>
                  <p className="text-sm text-gray-600">{order.date}</p>
                  <p className="text-sm text-gray-600">
                    {order.items.join(', ')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">${order.total.toFixed(2)}</p>
                  <p className={`text-sm capitalize ${getStatusColor(order.status)}`}>
                    {order.status}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Link
              href="/my-account/orders"
              className="text-green-600 hover:text-green-700 font-medium inline-flex items-center group"
            >
              View All Orders 
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Account Settings Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <Settings className="w-5 h-5 text-gray-400 mr-2" />
            <h3 className="font-semibold text-gray-900">
              Account Settings
            </h3>
          </div>
          <div className="space-y-3">
            <Link
              href="/my-account/profile"
              className="flex items-center justify-between text-sm text-gray-600 hover:text-green-600 group"
            >
              <span>Update Profile Information</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/my-account/profile#password"
              className="flex items-center justify-between text-sm text-gray-600 hover:text-green-600 group"
            >
              <span>Change Password</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/my-account/profile#notifications"
              className="flex items-center justify-between text-sm text-gray-600 hover:text-green-600 group"
            >
              <span>Email Preferences</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-4">
            <HelpCircle className="w-5 h-5 text-gray-400 mr-2" />
            <h3 className="font-semibold text-gray-900">Need Help?</h3>
          </div>
          <div className="space-y-3">
            <Link
              href="/contact-us"
              className="flex items-center justify-between text-sm text-gray-600 hover:text-green-600 group"
            >
              <span>Contact Support</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#faq"
              className="flex items-center justify-between text-sm text-gray-600 hover:text-green-600 group"
            >
              <span>FAQ</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              href="/fulfillment-policy"
              className="flex items-center justify-between text-sm text-gray-600 hover:text-green-600 group"
            >
              <span>Fulfillment Policy</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}