import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Green Medley - Mixed Microgreens | FuelFoods CPG',
  description: 'A harmonious blend of mild, sweet microgreens perfect for beginners. Includes peas, sunflower, and other gentle flavors.',
};

export default function GreenMedleyPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/images/Green-Medley-Product-Pg.png"
              alt="Green Medley Microgreens"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src="/images/green-med-Product-pg-img.png"
                alt="Green Medley Product"
                fill
                className="object-contain"
              />
            </div>
            <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src="/images/Peas.png"
                alt="Pea Microgreens"
                fill
                className="object-contain"
              />
            </div>
            <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src="/images/Sunflowers.png"
                alt="Sunflower Microgreens"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Green Medley</h1>
            <p className="text-xl text-green-600 font-semibold">Mild & Sweet Microgreens Blend</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600">
              Our Green Medley is the perfect introduction to microgreens, featuring 
              a harmonious blend of mild, sweet varieties that appeal to all palates. 
              This gentle mix includes pea shoots, sunflower microgreens, and other 
              tender varieties that provide excellent nutrition without overwhelming flavors.
            </p>
          </div>

          <div className="bg-emerald-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Nutritional Highlights</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-emerald-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                High in plant-based protein
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-emerald-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Rich in vitamins A, C, and E
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-emerald-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Contains healthy fats and fiber
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-emerald-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Easy to digest and gentle on stomach
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900">From $11.99</span>
              <span className="text-sm text-gray-500">Weekly delivery</span>
            </div>
            
            <button className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
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
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Microgreens in This Blend</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden mb-3">
              <Image
                src="/images/Peas.png"
                alt="Pea Microgreens"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="font-semibold text-gray-900">Pea Shoots</h3>
            <p className="text-sm text-gray-600">Sweet and tender</p>
          </div>
          <div className="text-center">
            <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden mb-3">
              <Image
                src="/images/Sunflowers.png"
                alt="Sunflower Microgreens"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="font-semibold text-gray-900">Sunflower</h3>
            <p className="text-sm text-gray-600">Nutty and crunchy</p>
          </div>
          <div className="text-center">
            <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden mb-3">
              <Image
                src="/images/Buckwheat.png"
                alt="Buckwheat Microgreens"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="font-semibold text-gray-900">Buckwheat</h3>
            <p className="text-sm text-gray-600">Mild lettuce flavor</p>
          </div>
          <div className="text-center">
            <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden mb-3">
              <Image
                src="/images/Mizuna.png"
                alt="Mizuna Microgreens"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="font-semibold text-gray-900">Mizuna</h3>
            <p className="text-sm text-gray-600">Delicate and fresh</p>
          </div>
        </div>
      </div>

      {/* Usage Guide */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Perfect For:</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="text-emerald-500 mr-2">•</span>
              Microgreen beginners
            </li>
            <li className="flex items-start">
              <span className="text-emerald-500 mr-2">•</span>
              Children's meals
            </li>
            <li className="flex items-start">
              <span className="text-emerald-500 mr-2">•</span>
              Smoothies and juices
            </li>
            <li className="flex items-start">
              <span className="text-emerald-500 mr-2">•</span>
              Light salads and snacks
            </li>
          </ul>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Taste Profile:</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="text-emerald-500 mr-2">•</span>
              Mild and sweet flavors
            </li>
            <li className="flex items-start">
              <span className="text-emerald-500 mr-2">•</span>
              Tender texture
            </li>
            <li className="flex items-start">
              <span className="text-emerald-500 mr-2">•</span>
              No bitter aftertaste
            </li>
            <li className="flex items-start">
              <span className="text-emerald-500 mr-2">•</span>
              Universally appealing
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}