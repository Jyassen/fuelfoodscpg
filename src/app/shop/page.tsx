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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Shop</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover our premium selection of microgreens and pet grass, perfect
          for healthy living and happy pets.
        </p>
      </div>

      {/* Featured Products */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Mega Mix */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-square relative bg-gray-100">
              <Image
                src="/images/Mega-Product-img.png"
                alt="Mega Mix"
                fill
                className="object-contain p-4"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1">Mega Mix</h3>
              <p className="text-sm text-gray-600 mb-2">
                Premium blend of microgreens
              </p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-green-600">$12.99</span>
                <Link
                  href="/products/mega-mix"
                  className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                >
                  View
                </Link>
              </div>
            </div>
          </div>

          {/* Brassica Blend */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-square relative bg-gray-100">
              <Image
                src="/images/Brassica-Product-img.png"
                alt="Brassica Blend"
                fill
                className="object-contain p-4"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1">
                Brassica Blend
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                Cruciferous powerhouse
              </p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-purple-600">$14.99</span>
                <Link
                  href="/products/brassica-blend"
                  className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700 transition-colors"
                >
                  View
                </Link>
              </div>
            </div>
          </div>

          {/* Green Medley */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-square relative bg-gray-100">
              <Image
                src="/images/green-med-Product-pg-img.png"
                alt="Green Medley"
                fill
                className="object-contain p-4"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1">Green Medley</h3>
              <p className="text-sm text-gray-600 mb-2">Mild & sweet blend</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-fuelfoods-green-500">$11.99</span>
                <Link
                  href="/products/green-medley"
                  className="bg-fuelfoods-green-500 text-white px-3 py-1 rounded text-sm hover:bg-fuelfoods-green-600 transition-colors"
                >
                  View
                </Link>
              </div>
            </div>
          </div>

          {/* Tummies Pet Grass */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-square relative bg-gray-100">
              <Image
                src="/images/Live-Cat-Grass.jpg"
                alt="Tummies Pet Grass"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1">
                Tummies Pet Grass
              </h3>
              <p className="text-sm text-gray-600 mb-2">Fresh cat grass</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-blue-600">$8.99</span>
                <Link
                  href="/products/tummies-pet-grass"
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <div className="h-48 relative bg-green-100">
            <Image
              src="/images/Fresh-Greens-Delivered-Weekly-Image.png"
              alt="Premium Microgreens"
              fill
              className="object-contain p-4"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Premium Microgreens</h3>
            <p className="text-gray-600 mb-4">
              Nutrient-dense microgreens packed with vitamins and minerals.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <Link
                href="/products/mega-mix"
                className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded"
              >
                Mega Mix
              </Link>
              <Link
                href="/products/brassica-blend"
                className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded"
              >
                Brassica Blend
              </Link>
              <Link
                href="/products/green-medley"
                className="text-sm bg-fuelfoods-green-100 text-fuelfoods-green-800 px-2 py-1 rounded"
              >
                Green Medley
              </Link>
            </div>
            <Link
              href="/products/mega-mix"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors inline-block"
            >
              Shop Microgreens
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <div className="h-48 relative bg-blue-100">
            <Image
              src="/images/Live-Cat-Grass.jpg"
              alt="Fresh Pet Grass"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Fresh Pet Grass</h3>
            <p className="text-gray-600 mb-4">
              Healthy, fresh grass for your cats and small pets delivered live.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Single Pot - $8.99
              </span>
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                3-Pack - $24.99
              </span>
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                5-Pack - $39.99
              </span>
            </div>
            <Link
              href="/products/tummies-pet-grass"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors inline-block"
            >
              Shop Pet Grass
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <div className="h-48 relative bg-gradient-to-br from-purple-100 to-orange-100 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">📦</div>
              <span className="text-purple-600 text-lg font-semibold">
                Value Bundles
              </span>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Value Bundles</h3>
            <p className="text-gray-600 mb-4">
              Save money with our carefully curated product bundles and
              subscription packages.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded">
                15% off 2+ items
              </span>
              <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded">
                25% off 3+ items
              </span>
            </div>
            <Link
              href="/offers"
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors inline-block"
            >
              View Offers
            </Link>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Why Choose FuelFoods CPG?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="font-semibold">Fresh Quality</h3>
          </div>
          <div className="text-center">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4"
                />
              </svg>
            </div>
            <h3 className="font-semibold">Weekly Delivery</h3>
          </div>
          <div className="text-center">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 className="font-semibold">Organic</h3>
          </div>
          <div className="text-center">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364"
                />
              </svg>
            </div>
            <h3 className="font-semibold">Sustainable</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
