import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - FuelFoods CPG',
  description:
    'Learn about FuelFoods CPG and our mission to provide premium microgreens and pet grass.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">About Us</h1>
      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-600 mb-6">
          Welcome to FuelFoods CPG - your trusted source for premium microgreens
          and pet grass delivered fresh to your door.
        </p>
        <p className="mb-6">
          At FuelFoods CPG, we believe in the power of fresh, organic nutrition
          for both you and your beloved pets. Our microgreens are carefully
          cultivated using sustainable growing practices, ensuring maximum
          nutritional value and incredible flavor.
        </p>
        <p className="mb-6">
          Our mission is simple: to make nutrient-dense superfoods accessible to
          everyone through convenient weekly deliveries. Whether you&apos;re
          looking to boost your health with vitamin-packed microgreens or
          provide your pets with fresh, natural grass, we&apos;ve got you
          covered.
        </p>
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          Our Commitment
        </h2>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>100% organic growing methods</li>
          <li>Fresh weekly deliveries</li>
          <li>Sustainable farming practices</li>
          <li>Premium quality guarantee</li>
          <li>Exceptional customer service</li>
        </ul>
      </div>
    </div>
  );
}