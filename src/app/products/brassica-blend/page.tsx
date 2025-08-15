import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Brassica Blend - Cruciferous Microgreens | FuelFoods CPG',
  description:
    'Power-packed brassica microgreens including broccoli, kale, and cabbage varieties. Rich in sulforaphane and cancer-fighting compounds.',
};

export default function BrassicaBlendPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/images/Brassica-Blend-Product-Pg.png"
              alt="Brassica Blend Microgreens"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src="/images/Brassica-Product-img.png"
                alt="Brassica Blend Product"
                fill
                className="object-contain"
              />
            </div>
            <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src="/images/Brassica-Blend-Product-Pg-2.png"
                alt="Brassica Blend Details"
                fill
                className="object-contain"
              />
            </div>
            <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src="/images/Brasspopup2.png"
                alt="Brassica Blend Close-up"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Brassica Blend
            </h1>
            <p className="text-xl text-green-600 font-semibold">
              Cruciferous Powerhouse Microgreens
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600">
              Our Brassica Blend features the most nutrient-dense cruciferous
              microgreens, including broccoli, kale, cabbage, and mustard
              varieties. These powerhouse greens are packed with sulforaphane
              and other cancer-fighting compounds, making them one of the most
              beneficial additions to your daily nutrition.
            </p>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Health Benefits
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-purple-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                High in sulforaphane for cancer protection
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-purple-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Supports detoxification processes
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-purple-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Rich in glucosinolates
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-purple-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Anti-inflammatory properties
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900">
                From $14.99
              </span>
              <span className="text-sm text-gray-500">Weekly delivery</span>
            </div>

            <button className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
              Add to Cart
            </button>

            <div className="text-center text-sm text-gray-500">
              <p>🚚 Free delivery on orders over $25</p>
              <p>📦 Fresh weekly deliveries</p>
              <p>♻️ Sustainable packaging</p>
            </div>
          </div>
        </div>
      </div>

      {/* Microgreens Included */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Microgreens in This Blend
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden mb-3">
              <Image
                src="/images/Broccoli.png"
                alt="Broccoli Microgreens"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="font-semibold text-gray-900">Broccoli</h3>
            <p className="text-sm text-gray-600">High in sulforaphane</p>
          </div>
          <div className="text-center">
            <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden mb-3">
              <Image
                src="/images/Kale-Trio.png"
                alt="Kale Microgreens"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="font-semibold text-gray-900">Kale</h3>
            <p className="text-sm text-gray-600">Vitamin K powerhouse</p>
          </div>
          <div className="text-center">
            <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden mb-3">
              <Image
                src="/images/Mustard.png"
                alt="Mustard Microgreens"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="font-semibold text-gray-900">Mustard</h3>
            <p className="text-sm text-gray-600">Spicy flavor profile</p>
          </div>
          <div className="text-center">
            <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden mb-3">
              <Image
                src="/images/Red-Cabbage.png"
                alt="Red Cabbage Microgreens"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="font-semibold text-gray-900">Red Cabbage</h3>
            <p className="text-sm text-gray-600">Rich in anthocyanins</p>
          </div>
        </div>
      </div>

      {/* Usage Guide */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Perfect For:
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">•</span>
              Daily health supplementation
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">•</span>
              Cancer prevention diets
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">•</span>
              Detox programs
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">•</span>
              Anti-inflammatory meals
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Taste Profile:
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">•</span>
              Mild to moderate spiciness
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">•</span>
              Earthy, robust flavors
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">•</span>
              Slightly peppery finish
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">•</span>
              Complements savory dishes
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
