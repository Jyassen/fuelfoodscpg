import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Mega Mix: The Ultimate Daily Nutrition Boost - 9 Vegetables in One Pack | FuelFoods',
  description:
    'Mega Mix microgreens: Your daily dose of 9 vegetables in one pack. Natural energy boost, immune support, anti-aging properties. Delivered fresh weekly to NYC. Order now with free shipping!',
};

export default function MegaMixPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/images/Mega-Mix-Product-Pg.png"
              alt="Mega Mix Microgreens"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src="/images/Mega-Product-img.png"
                alt="Mega Mix Product"
                fill
                className="object-contain"
              />
            </div>
            <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src="/images/Mega-Mix-Product-Pg-2.png"
                alt="Mega Mix Details"
                fill
                className="object-contain"
              />
            </div>
            <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src="/images/Mega-popup2.png"
                alt="Mega Mix Close-up"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mega Mix</h1>
            <p className="text-xl text-green-600 font-semibold">
              Premium Microgreens Blend
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600">
              Our signature Mega Mix is a carefully curated blend of the finest
              microgreens, providing you with an explosion of flavors and
              nutrients in every bite. This premium blend includes a variety of
              microgreens that complement each other perfectly, creating a
              balance of taste and nutrition.
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Nutritional Benefits
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                High in vitamins A, C, and K
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Rich in antioxidants and minerals
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Contains essential amino acids
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Low calorie, nutrient-dense superfood
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900">
                From $12.99
              </span>
              <span className="text-sm text-gray-500">Weekly delivery</span>
            </div>

            <button className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              Add to Cart
            </button>

            <div className="text-center text-sm text-gray-500">
              <p>📦 Fresh weekly deliveries</p>
              <p>♻️ Sustainable packaging</p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Perfect For:
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              Salads and garnishes
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              Smoothies and juices
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              Sandwiches and wraps
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              Cooking and meal prep
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Storage Tips:
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              Keep refrigerated at 35-40°F
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              Store in original packaging
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              Consume within 7-10 days
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              Rinse gently before eating
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
