import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Shop - FuelFoods CPG',
  description:
    'Browse our selection of premium microgreens, pet grass, and bundles.',
};

export default function ShopPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Page Moved</h1>
      <p className="text-gray-700 mb-6">Our shopping experience has moved. Please use the new configuration flow.</p>
      <Link href="/configure/starter" className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
        Go to Get Your Greens
            </Link>
    </div>
  );
}
