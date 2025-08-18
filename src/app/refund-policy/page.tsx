import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund Policy - FuelFoods CPG',
  description: 'Learn about FuelFoods refund and return policy.',
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Refund Policy
          </h1>
          
          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-gray-600">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Freshness Guarantee
              </h2>
              <p className="text-gray-700">
                We guarantee the freshness of our microgreens. If you're not completely satisfied 
                with the quality of your order, please contact us within 48 hours of delivery.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Refund Process
              </h2>
              <p className="text-gray-700">
                To request a refund, please email us at{' '}
                <a href="mailto:info@fuelfoods.store" className="text-fuelfoods-green-600 underline">
                  info@fuelfoods.store
                </a>{' '}
                with your order number and reason for the refund request.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Processing Time
              </h2>
              <p className="text-gray-700">
                Approved refunds will be processed within 5-7 business days and returned to your 
                original payment method.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Subscription Cancellations
              </h2>
              <p className="text-gray-700">
                Subscription orders can be cancelled at any time before the next scheduled delivery. 
                Contact us to modify or cancel your subscription.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}