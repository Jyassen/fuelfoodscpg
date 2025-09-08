import { Metadata } from 'next';
import { Suspense } from 'react';
import { AuthForm } from '@/components/auth/AuthForm';

export const metadata: Metadata = {
  title: 'Create Account - FuelFoods CPG',
  description:
    'Join FuelFoods CPG to start your fresh microgreens and pet grass subscription.',
};

function RegisterPageContent() {
  return (
    <AuthForm 
      mode="register" 
      redirectTo="/my-account"
    />
  );
}

export default function RegisterPage() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="animate-pulse">
              <div className="h-16 bg-gray-200 rounded mb-6 mx-auto w-32"></div>
              <div className="h-8 bg-gray-200 rounded mb-2 mx-auto w-64"></div>
              <div className="h-4 bg-gray-200 rounded mb-8 mx-auto w-48"></div>
              <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="h-10 bg-gray-200 rounded"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <RegisterPageContent />
    </Suspense>
  );
}
