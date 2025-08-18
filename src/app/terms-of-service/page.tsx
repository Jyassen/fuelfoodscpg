import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - FuelFoods CPG',
  description: 'Terms and conditions for using FuelFoods services.',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Terms of Service
          </h1>
          
          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-gray-600">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Acceptance of Terms
              </h2>
              <p className="text-gray-700">
                By accessing and using FuelFoods services, you accept and agree to be bound by the 
                terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Product Information
              </h2>
              <p className="text-gray-700">
                We strive to provide accurate product information, but we do not warrant that product 
                descriptions are accurate, complete, reliable, current, or error-free.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Orders and Payment
              </h2>
              <p className="text-gray-700">
                All orders are subject to acceptance and availability. We reserve the right to refuse 
                or cancel any order at any time.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Contact Information
              </h2>
              <p className="text-gray-700">
                Questions about the Terms of Service should be sent to us at{' '}
                <a href="mailto:info@fuelfoods.store" className="text-fuelfoods-green-600 underline">
                  info@fuelfoods.store
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}