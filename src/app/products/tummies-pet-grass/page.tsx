import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Tummies Pet Grass - Fresh Cat Grass | FuelFoods CPG',
  description:
    'Premium fresh cat grass grown specifically for pets. Safe, healthy, and delivered weekly to keep your furry friends happy.',
};

export default function TummiesPetGrassPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/images/Live-Cat-Grass.jpg"
              alt="Tummies Pet Grass"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src="/images/3-live-cat-grass-pots-1536x1075-1.jpg"
                alt="Pet Grass Pots"
                fill
                className="object-cover"
              />
            </div>
            <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src="/images/3-pack-Product-img.png"
                alt="3-Pack Pet Grass"
                fill
                className="object-contain"
              />
            </div>
            <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src="/images/5-pack-Product-img.png"
                alt="5-Pack Pet Grass"
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
              Tummies Pet Grass
            </h1>
            <p className="text-xl text-blue-600 font-semibold">
              Fresh Cat Grass for Happy Pets
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600">
              Give your beloved cats and small pets the fresh, safe grass they
              crave with Tummies Pet Grass. Our specially grown cat grass is
              perfect for indoor pets, providing natural fiber and nutrients
              that support healthy digestion and satisfy their natural instincts
              to graze.
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Benefits for Your Pet
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-blue-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Aids healthy digestion
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-blue-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Helps prevent hairballs
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-blue-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Provides natural vitamins and minerals
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-blue-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Safe alternative to outdoor plants
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900">
                From $8.99
              </span>
              <span className="text-sm text-gray-500">Weekly delivery</span>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Package Size:
              </label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                <option>Single Pot - $8.99</option>
                <option>3-Pack - $24.99</option>
                <option>5-Pack - $39.99</option>
              </select>
            </div>

            <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Add to Cart
            </button>

            <div className="text-center text-sm text-gray-500">
              <p>🐱 Safe for all cats and small pets</p>
              <p>📦 Delivered fresh weekly</p>
              <p>♻️ Eco-friendly packaging</p>
            </div>
          </div>
        </div>
      </div>

      {/* Care Instructions */}
      <div className="mt-16 bg-gradient-to-r from-blue-50 to-green-50 p-8 rounded-xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Pet Grass Care Instructions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4M5 21h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Placement</h3>
            <p className="text-sm text-gray-600">
              Place in indirect sunlight near your pet's favorite spot
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Watering</h3>
            <p className="text-sm text-gray-600">
              Water lightly every 2-3 days to keep soil moist
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Duration</h3>
            <p className="text-sm text-gray-600">
              Fresh grass lasts 1-2 weeks with proper care
            </p>
          </div>
        </div>
      </div>

      {/* Safety Information */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Safe for Your Pets:
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              100% pet-safe grass varieties
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              No pesticides or chemicals
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Grown in clean, controlled environment
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Suitable for cats, rabbits, and birds
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why Pets Love It:
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Natural instinct to graze
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Fresh, appealing texture
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Satisfies curiosity and play
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Provides mental stimulation
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
