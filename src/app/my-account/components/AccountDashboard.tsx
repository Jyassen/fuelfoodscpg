'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthContext';
import { ApiResponse } from '@/lib/auth/types';
import LoadingSpinner from '@/components/form/LoadingSpinner';
import AccountSidebar from './AccountSidebar';
import WelcomeSection from './WelcomeSection';
import QuickStats from './QuickStats';
import ActiveSubscriptions from './ActiveSubscriptions';
import RecentOrders from './RecentOrders';
import AccountSettingsLinks from './AccountSettingsLinks';

interface DashboardData {
  user: {
    firstName: string;
    lastName: string;
    nextDeliveryDate: Date | null;
  };
  stats: {
    totalOrders: number;
    activeSubscriptions: number;
    totalSaved: number;
  };
  subscriptions: Array<{
    id: string;
    planType: string;
    status: string;
    nextDeliveryDate: Date | null;
    cancelAtPeriodEnd: boolean;
    recurringAmount: number;
  }>;
  recentOrders: Array<{
    id: string;
    orderNumber: string;
    status: string;
    total: number;
    createdAt: Date;
    itemCount: number;
    itemNames: string;
  }>;
}

export default function AccountDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [isAuthenticated]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const { supabase } = await import('@/lib/supabase/client');

      const { data: authUser } = await supabase.auth.getUser();
      if (!authUser?.user) {
        setError('Not authenticated');
        setLoading(false);
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('first_name, last_name')
        .eq('id', authUser.user.id)
        .single();

      if (profileError) {
        setError('Failed to load profile');
        setLoading(false);
        return;
      }

      const data: DashboardData = {
        user: {
          firstName: profile?.first_name || '',
          lastName: profile?.last_name || '',
          nextDeliveryDate: null,
        },
        stats: {
          totalOrders: 0,
          activeSubscriptions: 0,
          totalSaved: 0,
        },
        subscriptions: [],
        recentOrders: [],
      };

      setDashboardData(data);
    } catch (err) {
      console.error('Dashboard fetch error:', err);
      setError('An error occurred while loading your dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error loading dashboard</h3>
              <p className="mt-1 text-sm text-red-700">{error}</p>
              <button
                onClick={fetchDashboardData}
                className="mt-2 text-sm font-medium text-red-800 hover:text-red-900"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <p className="text-gray-500">No dashboard data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Account Navigation */}
        <div className="lg:col-span-1">
          <AccountSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Account Content */}
        <div className="lg:col-span-3 space-y-8">
          {activeTab === 'dashboard' && (
            <>
              {/* Welcome Section */}
              <WelcomeSection
                firstName={dashboardData.user.firstName}
                lastName={dashboardData.user.lastName}
                nextDeliveryDate={dashboardData.user.nextDeliveryDate}
              />

              {/* Quick Stats */}
              <QuickStats stats={dashboardData.stats} />

              {/* Active Subscriptions */}
              <ActiveSubscriptions subscriptions={dashboardData.subscriptions} />

              {/* Recent Orders */}
              <RecentOrders orders={dashboardData.recentOrders} />

              {/* Account Settings Quick Links */}
              <AccountSettingsLinks />
            </>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Order History</h2>
              <p className="text-gray-600">Order history component coming soon...</p>
            </div>
          )}

          {activeTab === 'subscriptions' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Manage Subscriptions</h2>
              <ActiveSubscriptions subscriptions={dashboardData.subscriptions} detailed />
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Addresses</h2>
              <p className="text-gray-600">Address management component coming soon...</p>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Profile Settings</h2>
              <p className="text-gray-600">Profile management component coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}