import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fulfillment Policy - FuelFoods CPG',
  description:
    'Learn about our delivery schedules, shipping policies, and subscription management terms.',
};

export default function FulfillmentPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Fulfillment Policy
        </h1>

        <p className="text-xl text-gray-600 mb-8">
          Last updated: August 5, 2024
        </p>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-green-800 mb-2">
            Quick Summary
          </h2>
          <p className="text-green-700">
            We deliver fresh microgreens and pet grass weekly with free shipping
            on subscriptions. Orders can be paused, modified, or cancelled
            anytime through your account dashboard.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          Delivery Schedule
        </h2>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Weekly Subscriptions
        </h3>
        <ul className="space-y-2 mb-6">
          <li>Deliveries are made weekly on your chosen delivery day</li>
          <li>Available delivery days: Monday through Friday</li>
          <li>Delivery windows: 8 AM - 6 PM local time</li>
          <li>
            You will receive tracking information 24 hours before delivery
          </li>
          <li>All subscription deliveries include free shipping</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          One-Time Orders
        </h3>
        <ul className="space-y-2 mb-6">
          <li>Processing time: 1-2 business days</li>
          <li>Shipping time: 2-3 business days via FedEx or UPS</li>
          <li>Shipping cost: $5.99 (free on orders over $50)</li>
          <li>Weekend delivery available for additional fee</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          Service Areas
        </h2>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Currently Serving
        </h3>
        <ul className="space-y-2 mb-6">
          <li>All 50 United States</li>
          <li>Washington D.C.</li>
          <li>Selected areas in Canada (additional shipping charges apply)</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Delivery Restrictions
        </h3>
        <ul className="space-y-2 mb-6">
          <li>P.O. Box addresses not accepted for fresh product deliveries</li>
          <li>
            Military APO/FPO addresses supported with extended delivery times
          </li>
          <li>Some remote areas may require additional delivery time</li>
          <li>Hawaii and Alaska deliveries may take 4-5 business days</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          Subscription Management
        </h2>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Modifying Your Subscription
        </h3>
        <ul className="space-y-2 mb-6">
          <li>
            Changes must be made by 11:59 PM PT, 2 days before your delivery day
          </li>
          <li>You can skip weeks, change products, or modify quantities</li>
          <li>Delivery day changes are allowed once per month</li>
          <li>All changes can be made through your account dashboard</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Pausing Your Subscription
        </h3>
        <ul className="space-y-2 mb-6">
          <li>Pause for up to 8 weeks at a time</li>
          <li>No fees for pausing your subscription</li>
          <li>Must be requested 2 days before your next delivery</li>
          <li>Resume anytime through your account</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Cancellation Policy
        </h3>
        <ul className="space-y-2 mb-6">
          <li>Cancel anytime with no cancellation fees</li>
          <li>
            Cancellation must be requested 2 days before your next delivery
          </li>
          <li>Final delivery will be your last charged order</li>
          <li>Account remains active for 30 days to allow easy reactivation</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          Product Freshness & Quality
        </h2>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Freshness Guarantee
        </h3>
        <ul className="space-y-2 mb-6">
          <li>All microgreens harvested within 24 hours of delivery</li>
          <li>Pet grass delivered live and growing</li>
          <li>Temperature-controlled packaging for optimal freshness</li>
          <li>Expected shelf life: 7-10 days when properly stored</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Quality Issues
        </h3>
        <ul className="space-y-2 mb-6">
          <li>Report quality issues within 48 hours of delivery</li>
          <li>Photo documentation required for quality claims</li>
          <li>Full refund or replacement at your choice</li>
          <li>Contact customer service at support@fuelfoodscpg.com</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          Billing & Payment
        </h2>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Subscription Billing
        </h3>
        <ul className="space-y-2 mb-6">
          <li>Charged weekly on your delivery day</li>
          <li>Credit card or bank account auto-pay required</li>
          <li>Payment processed 2 days before delivery</li>
          <li>Failed payments result in temporary subscription pause</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Pricing Changes
        </h3>
        <ul className="space-y-2 mb-6">
          <li>30-day advance notice for any price increases</li>
          <li>Promotional pricing honored for stated duration</li>
          <li>Seasonal adjustments may apply based on growing conditions</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          Missed Deliveries
        </h2>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Delivery Attempts
        </h3>
        <ul className="space-y-2 mb-6">
          <li>Three delivery attempts made for each order</li>
          <li>Safe drop-off locations used when possible</li>
          <li>Refrigerated trucks maintain product quality during delays</li>
          <li>Customer notification for each delivery attempt</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Failed Deliveries
        </h3>
        <ul className="space-y-2 mb-6">
          <li>
            Customer charged for failed deliveries due to incorrect address
          </li>
          <li>No charge for carrier-related delivery failures</li>
          <li>Replacement orders sent at no additional cost</li>
          <li>Address verification required for future deliveries</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          Special Circumstances
        </h2>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Weather-Related Delays
        </h3>
        <ul className="space-y-2 mb-6">
          <li>Deliveries may be delayed due to severe weather conditions</li>
          <li>Customer notification provided for weather delays</li>
          <li>No additional charges for weather-related delays</li>
          <li>Extended freshness packaging used during delays</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Holiday Schedule
        </h3>
        <ul className="space-y-2 mb-6">
          <li>Modified delivery schedule during major holidays</li>
          <li>Advance notice provided for holiday schedule changes</li>
          <li>
            No deliveries on Thanksgiving, Christmas Day, or New Year's Day
          </li>
          <li>Optional skip or delivery day adjustment during holidays</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          Customer Support
        </h2>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Contact Information
          </h3>
          <ul className="space-y-2">
            <li>
              <strong>Email:</strong> support@fuelfoodscpg.com
            </li>
            <li>
              <strong>Phone:</strong> 1-800-FUEL-CPG (1-800-383-5274)
            </li>
            <li>
              <strong>Hours:</strong> Monday-Friday, 8 AM - 6 PM EST
            </li>
            <li>
              <strong>Response Time:</strong> Within 24 hours
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Emergency Support
          </h3>
          <p>
            For urgent delivery issues on weekends, use our online chat feature
            or email with "URGENT" in the subject line.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          Terms Updates
        </h2>

        <p className="mb-4">
          This fulfillment policy may be updated periodically to reflect changes
          in our service offerings or delivery capabilities. Customers will be
          notified of significant changes via email at least 30 days in advance.
        </p>

        <p className="mb-4">
          For questions about this policy or our fulfillment process, please
          contact our customer support team. We're here to ensure your
          experience with FuelFoods CPG exceeds your expectations.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-8">
          <p className="text-green-800 font-medium">
            Thank you for choosing FuelFoods CPG for your fresh microgreens and
            pet grass needs. We're committed to delivering the highest quality
            products with exceptional service.
          </p>
        </div>
      </div>
    </div>
  );
}
