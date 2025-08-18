import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - FuelFoods CPG',
  description: 'Learn how FuelFoods protects and handles your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-gray-600">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Information We Collect
              </h2>
              <p className="text-gray-700">
                We collect information you provide directly to us, such as when you create an account, 
                make a purchase, or contact us for support. This may include your name, email address, 
                phone number, shipping address, and payment information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                How We Use Your Information
              </h2>
              <p className="text-gray-700">
                We use the information we collect to provide, maintain, and improve our services, 
                process transactions, communicate with you, and comply with legal obligations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Information Sharing
              </h2>
              <p className="text-gray-700">
                We do not sell, trade, or otherwise transfer your personal information to third parties 
                without your consent, except as described in this policy or as required by law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Contact Us
              </h2>
              <p className="text-gray-700">
                If you have any questions about this Privacy Policy, please contact us at{' '}
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