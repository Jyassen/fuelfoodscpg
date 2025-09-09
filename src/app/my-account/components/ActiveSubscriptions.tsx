'use client';

import React from 'react';
import Link from 'next/link';

interface Subscription {
  id: string;
  planType: string;
  status: string;
  nextDeliveryDate: Date | null;
  cancelAtPeriodEnd: boolean;
  recurringAmount: number;
}

interface ActiveSubscriptionsProps {
  subscriptions: Subscription[];
  detailed?: boolean;
}

const getPlanDisplayName = (planType: string) => {
  switch (planType.toLowerCase()) {
    case 'pro':
      return 'Pro Plan (3-Pack)';
    case 'elite':
      return 'Elite Plan (5-Pack)';
    case 'starter':
    default:
      return 'Starter Plan';
  }
};

const getPlanColor = (planType: string) => {
  switch (planType.toLowerCase()) {
    case 'pro':
      return 'bg-blue-50 border-blue-200';
    case 'elite':
      return 'bg-purple-50 border-purple-200';
    case 'starter':
    default:
      return 'bg-fuelfoods-green-50 border-fuelfoods-green-200';
  }
};

const formatDeliveryDate = (date: Date | null) => {
  if (!date) return 'Not scheduled';
  
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
};

const SubscriptionCard = ({ 
  subscription, 
  detailed = false 
}: { 
  subscription: Subscription; 
  detailed?: boolean; 
}) => {
  const planDisplayName = getPlanDisplayName(subscription.planType);
  const colorClasses = getPlanColor(subscription.planType);
  
  return (
    <div className={`p-4 rounded-lg border ${colorClasses}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="font-medium text-gray-900">
              {planDisplayName} - Weekly
            </h3>
            {subscription.cancelAtPeriodEnd && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Ending
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Next delivery: {formatDeliveryDate(subscription.nextDeliveryDate)}
          </p>
          <p className="text-sm font-medium text-fuelfoods-green-600 mt-1">
            ${subscription.recurringAmount}/week
          </p>
          
          {detailed && (
            <div className="mt-3 space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <span className="font-medium">Status:</span>
                <span className="ml-2 capitalize">{subscription.status}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="font-medium">Frequency:</span>
                <span className="ml-2">Weekly</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 ml-4">
          <button className="px-3 py-1 text-sm bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            {detailed ? 'Edit' : 'Modify'}
          </button>
          
          {subscription.cancelAtPeriodEnd ? (
            <button className="px-3 py-1 text-sm text-fuelfoods-green-600 hover:text-fuelfoods-green-800 transition-colors">
              Reactivate
            </button>
          ) : (
            <button className="px-3 py-1 text-sm text-red-600 hover:text-red-800 transition-colors">
              {detailed ? 'Cancel' : 'Pause'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default function ActiveSubscriptions({ subscriptions, detailed = false }: ActiveSubscriptionsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Active Subscriptions
          </h2>
          {subscriptions.length > 0 && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-fuelfoods-green-100 text-fuelfoods-green-800">
              {subscriptions.length} active
            </span>
          )}
        </div>
      </div>
      
      <div className="p-6">
        {subscriptions.length > 0 ? (
          <>
            <div className="space-y-4">
              {subscriptions.map((subscription) => (
                <SubscriptionCard
                  key={subscription.id}
                  subscription={subscription}
                  detailed={detailed}
                />
              ))}
            </div>

            {!detailed && (
              <div className="mt-6">
                <Link
                  href="/configure/starter"
                  className="inline-flex items-center text-fuelfoods-green-600 hover:text-fuelfoods-green-700 font-medium transition-colors"
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
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No active subscriptions</h3>
            <p className="mt-1 text-sm text-gray-500">
              Start a subscription to get fresh microgreens delivered weekly.
            </p>
            <div className="mt-6">
              <Link
                href="/configure/pro"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-fuelfoods-green-600 hover:bg-fuelfoods-green-700 transition-colors"
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
                Start Your First Subscription
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}