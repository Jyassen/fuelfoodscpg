'use client';

import { PlanType, PLAN_CONFIGURATIONS } from '@/lib/types';

interface PlanHeaderProps {
  planType: PlanType;
  planConfig: (typeof PLAN_CONFIGURATIONS)[PlanType];
  totalSelected: number;
  remainingPacks: number;
}

export function PlanHeader({
  planType,
  planConfig,
  totalSelected,
  remainingPacks,
}: PlanHeaderProps) {
  const getThemeClasses = () => {
    switch (planType) {
      case 'pro':
        return {
          gradient: 'from-gray-200 to-gray-400',
          text: 'text-gray-900',
          badge: 'bg-gray-100 text-gray-800',
          accent: 'text-gray-600',
        };
      case 'elite':
        return {
          gradient: 'from-yellow-400 to-yellow-500',
          text: 'text-yellow-900',
          badge: 'bg-yellow-100 text-yellow-800',
          accent: 'text-yellow-700',
        };
      default:
        return {
          gradient: 'from-fuelfoods-green-500 to-fuelfoods-green-600',
          text: 'text-white',
          badge: 'bg-fuelfoods-green-100 text-fuelfoods-green-800',
          accent: 'text-fuelfoods-green-200',
        };
    }
  };

  const theme = getThemeClasses();

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            {planConfig.name}
          </h2>
          <p className="text-gray-600 mt-1">
            {planType === 'starter'
              ? 'Select any number of packs at $15 each.'
              : `Select exactly ${planConfig.packsRequired} packs. $15 per pack.`}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            {planType === 'starter'
              ? `${totalSelected} selected`
              : `${totalSelected}/${planConfig.packsRequired} selected • ${Math.max(planConfig.packsRequired - totalSelected, 0)} left`}
          </div>
          {planType !== 'starter' && (
            <div className="w-40 h-2 rounded-full bg-gray-200 overflow-hidden">
              <div
                className="h-2 bg-fuelfoods-green-500"
                style={{
                  width: `${Math.min((totalSelected / planConfig.packsRequired) * 100, 100)}%`,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
