'use client';

import React from 'react';

interface WelcomeSectionProps {
  firstName: string;
  lastName: string;
  nextDeliveryDate: Date | null;
}

export default function WelcomeSection({ firstName, lastName, nextDeliveryDate }: WelcomeSectionProps) {
  const formatDeliveryDate = (date: Date | null) => {
    if (!date) return 'No upcoming deliveries';
    
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    }).format(new Date(date));
  };

  const displayName = firstName || lastName ? `${firstName} ${lastName}`.trim() : 'Welcome';

  return (
    <div className="bg-gradient-to-r from-fuelfoods-green-600 to-fuelfoods-green-700 rounded-lg p-6 text-white">
      <h2 className="text-2xl font-bold mb-2">
        Welcome back, {displayName}!
      </h2>
      <p className="opacity-90">
        {nextDeliveryDate ? (
          <>Your next delivery is scheduled for {formatDeliveryDate(nextDeliveryDate)}</>
        ) : (
          'Ready to start your fresh microgreens journey?'
        )}
      </p>
      {!nextDeliveryDate && (
        <div className="mt-4">
          <a
            href="/configure/pro"
            className="inline-flex items-center px-4 py-2 bg-white text-fuelfoods-green-700 font-medium rounded-lg hover:bg-fuelfoods-green-50 transition-colors"
          >
            Start Subscription
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
}