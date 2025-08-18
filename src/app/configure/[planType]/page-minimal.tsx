'use client';

import { useParams } from 'next/navigation';

export default function MinimalConfigurePage() {
  const params = useParams();
  const planType = Array.isArray(params.planType) ? params.planType[0] : params.planType;
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          Minimal Configure Page Test
        </h1>
        
        <div className="bg-white rounded-lg shadow-sm p-8">
          <p className="text-lg text-gray-700 mb-4">
            This is the absolute minimal version with no external dependencies.
          </p>
          
          <div className="space-y-2">
            <div><strong>Plan Type:</strong> {planType || 'Not provided'}</div>
            <div><strong>Params:</strong> {JSON.stringify(params)}</div>
            <div><strong>Window exists:</strong> {typeof window !== 'undefined' ? 'Yes' : 'No'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}