import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fulfillment Policy - FuelFoods',
  description:
    'Learn about our order processing, shipping policies, returns, and cancellation terms.',
};

export default function FulfillmentPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Fulfillment Policy
        </h1>
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          FuelFoods Fulfillment Policy
        </h2>

        <p className="text-lg text-gray-600 mb-8">
          Last Updated: 03/18/2025
        </p>

        <p className="mb-8 text-gray-700">
          At FuelFoods, we are dedicated to delivering the freshest produce to our customers. This policy outlines how we process orders, manage shipments, and handle cancellations, credits, and refunds.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          Order Processing
        </h2>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Online Orders:
        </h3>
        <ul className="space-y-2 mb-6 text-gray-700">
          <li>Once an order is placed online, it enters our processing phase.</li>
          <li>For retail customers, greens are shipped within 2-7 days of placing the order.</li>
          <li>For restaurant deliveries, produce is delivered the day after harvest to ensure maximum freshness.</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          Shipping & Delivery
        </h2>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Retail Orders:
        </h3>
        <p className="mb-6 text-gray-700">
          We ship our greens using Next Day Air once they are harvested. This guarantees that our customers receive produce at its peak freshness.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Restaurant Deliveries:
        </h3>
        <p className="mb-6 text-gray-700">
          Deliveries are scheduled for the day following harvest to maintain the highest quality standards.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          Returns, Credits, and Refunds
        </h2>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Freshness Guarantee:
        </h3>
        <p className="mb-6 text-gray-700">
          FuelFoods is committed to quality. If the greens are not fresh upon arrival or if the packaging is damaged, we will provide a credit or refund at our discretion.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Quality Issues for Restaurant Deliveries:
        </h3>
        <p className="mb-6 text-gray-700">
          If there is any issue with the quality of the produce, we may offer a credit or replacement. Please note that proper storage of the greens upon delivery is the customer's responsibility.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          Order Cancellations
        </h2>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Online Orders:
        </h3>
        <p className="mb-6 text-gray-700">
          Cancellations must be made before the order is dispatched. Once the product has shipped, cancellations are not accepted.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Restaurant Deliveries:
        </h3>
        <p className="mb-6 text-gray-700">
          Cancellations must be requested at least 24 hours in advance of the scheduled delivery date.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-8">
          <p className="text-green-800 font-medium">
            For questions about this policy or our fulfillment process, please contact our customer support team. We're committed to delivering the highest quality products with exceptional service.
          </p>
        </div>
      </div>
    </div>
  );
}