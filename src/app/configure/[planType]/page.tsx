'use client';

import { useParams } from 'next/navigation';

export default function SimpleConfigurePage() {
  const params = useParams();
  const planType = Array.isArray(params.planType) ? params.planType[0] : params.planType;
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          Configure Your Plan: {planType}
        </h1>
        
        <div className="bg-white rounded-lg shadow-sm p-8">
          <p className="text-lg text-gray-700">
            This is a simplified version of the configure page to test the routing.
          </p>
          
          <div className="mt-6 space-y-4">
            <div>
              <strong>Plan Type:</strong> {planType}
            </div>
            <div>
              <strong>Status:</strong> Page is loading successfully
            </div>
          </div>
          
          <div className="mt-8">
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
              Test Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}