'use client';

import React from 'react';

interface QuickStatsProps {
  stats: {
    totalOrders: number;
    activeSubscriptions: number;
    totalSaved: number;
  };
}

const StatCard = ({ 
  value, 
  label, 
  color = 'green', 
  icon 
}: { 
  value: number | string; 
  label: string; 
  color?: 'green' | 'blue' | 'purple';
  icon?: React.ReactNode;
}) => {
  const colorClasses = {
    green: 'text-fuelfoods-green-600',
    blue: 'text-blue-600',
    purple: 'text-purple-600',
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow">
      {icon && (
        <div className={`flex justify-center mb-3 ${colorClasses[color]}`}>
          {icon}
        </div>
      )}
      <div className={`text-3xl font-bold mb-2 ${colorClasses[color]}`}>
        {typeof value === 'number' && value >= 1000 
          ? `${(value / 1000).toFixed(1)}k` 
          : value
        }
      </div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
};

export default function QuickStats({ stats }: QuickStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        value={stats.totalOrders}
        label="Total Orders"
        color="green"
        icon={
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        }
      />
      
      <StatCard
        value={stats.activeSubscriptions}
        label="Active Subscriptions"
        color="blue"
        icon={
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        }
      />
      
      <StatCard
        value={`$${stats.totalSaved}`}
        label="Total Saved"
        color="purple"
        icon={
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
            />
          </svg>
        }
      />
    </div>
  );
}