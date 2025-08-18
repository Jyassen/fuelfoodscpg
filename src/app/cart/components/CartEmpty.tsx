'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/form';

export default function CartEmpty() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="text-center py-16 px-6">
        {/* Empty Cart Icon */}
        <div className="mb-6">
          <svg 
            className="w-24 h-24 text-gray-300 mx-auto" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1} 
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
            />
          </svg>
        </div>
        
        {/* Empty State Content */}
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Discover our fresh, nutrient-dense microgreens and subscription plans. 
            Perfect for healthy living and gourmet cooking!
          </p>
          
          {/* Action Buttons */}
          <div className="space-y-4">
            <Button
              asChild
              variant="primary"
              size="lg"
              fullWidth
              className="bg-[#178641] hover:bg-[#136834] text-white"
            >
              <Link href="/#plans">Explore Subscription Plans</Link>
            </Button>
          </div>
        </div>
        
        {/* Features removed per request for a cleaner empty state */}
      </div>
    </div>
  );
}