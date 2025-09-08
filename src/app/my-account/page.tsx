'use client';

import { AuthProvider, useRequireAuth } from '@/components/auth/AuthContext';
import AccountSidebar from '@/components/auth/AccountSidebar';
import AccountDashboard from '@/components/auth/AccountDashboard';

function MyAccountContent() {
  const { user, loading } = useRequireAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your account...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // useRequireAuth handles redirect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <AccountSidebar />
          </div>

          {/* Main Dashboard Content */}
          <div className="lg:col-span-3">
            <AccountDashboard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MyAccountPage() {
  return (
    <AuthProvider>
      <MyAccountContent />
    </AuthProvider>
  );
}