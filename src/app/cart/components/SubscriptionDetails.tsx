'use client';

import React from 'react';
import { PlanConfiguration, MICROGREENS_VARIETIES, PLAN_CONFIGURATIONS } from '@/lib/types';

interface SubscriptionDetailsProps {
  configuration: PlanConfiguration;
}

export default function SubscriptionDetails({ configuration }: SubscriptionDetailsProps) {
  const { planType, totalPacks, varieties } = configuration;
  const planConfig = PLAN_CONFIGURATIONS[planType];

  return (
    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-900">{planConfig.name}</h4>
        <span className="text-sm text-gray-600">{totalPacks} packs total</span>
      </div>
      
      <div className="space-y-2">
        <p className="text-sm text-gray-600">Variety Breakdown:</p>
        <div className="grid grid-cols-1 gap-2">
          {varieties.map((variety) => {
            const varietyData = MICROGREENS_VARIETIES[variety.varietyId];
            return (
              <div key={variety.varietyId} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    varietyData.theme === 'orange' ? 'bg-orange-400' :
                    varietyData.theme === 'purple' ? 'bg-purple-400' :
                    'bg-yellow-400'
                  }`} />
                  <span className="text-sm font-medium text-gray-900">
                    {varietyData.name}
                  </span>
                </div>
                <span className="text-sm text-gray-600">
                  {variety.quantity} pack{variety.quantity !== 1 ? 's' : ''}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Discount removed per simplified pricing */}
    </div>
  );
}