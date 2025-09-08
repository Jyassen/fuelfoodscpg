'use client';

import { ProtectedRoute, AccountSidebar, ProfileManager } from '@/components/auth';

export default function NotificationsPage() {
  return (
    <ProtectedRoute redirectTo="/login">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <AccountSidebar />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 mt-8 lg:mt-0">
            <ProfileManager activeTab="notifications" />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}