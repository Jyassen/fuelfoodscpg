export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          🌱 FuelFoods Store
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Fresh microgreens delivered weekly. Your WordPress migration is
          complete!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">
              ✅ Migration Complete
            </h3>
            <p className="text-gray-600">
              19 pages, 202+ images migrated successfully
            </p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">🚀 Next.js 15</h3>
            <p className="text-gray-600">
              Modern React framework with App Router
            </p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">🎨 Tailwind CSS</h3>
            <p className="text-gray-600">Utility-first CSS framework</p>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Available Pages:</h2>
          <ul className="space-y-2">
            <li>
              <a
                href="/configure/starter"
                className="text-blue-600 hover:underline"
              >
                Get Your Greens
              </a>
            </li>
            <li>
              <a href="/about-us" className="text-blue-600 hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact-us" className="text-blue-600 hover:underline">
                Contact Us
              </a>
            </li>
            <li>
              <a
                href="/products/mega-mix"
                className="text-blue-600 hover:underline"
              >
                Mega Mix Product
              </a>
            </li>
            <li>
              <a
                href="/products/brassica-blend"
                className="text-blue-600 hover:underline"
              >
                Brassica Blend Product
              </a>
            </li>
            <li>
              <a href="/cart" className="text-blue-600 hover:underline">
                Shopping Cart
              </a>
            </li>
            <li>
              <a href="/checkout" className="text-blue-600 hover:underline">
                Checkout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
