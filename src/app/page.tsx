
export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Alert Banner */}
      <div className="bg-black text-white text-center py-3 px-4">
        <p className="text-sm font-medium">
          Now Shipping Exclusively To The Northeast!
        </p>
      </div>

      {/* Hero Section - Enhanced design with better visual hierarchy */}
      <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 min-h-[700px] overflow-hidden">
        {/* Background image behind hero - positioned at bottom right */}
        <img
          src="/images/herobackground.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute bottom-0 right-0 w-full h-auto opacity-60"
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex flex-col lg:flex-row items-center justify-between min-h-[700px] pt-8 lg:pt-20">
            {/* Left Content - Enhanced typography and spacing */}
            <div className="w-full lg:w-[42%] text-left py-6 lg:py-20 lg:pr-6">
              <div className="mb-4">
                <span className="inline-block bg-fuelfoods-green-100 text-fuelfoods-green-700 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
                  Fresh from Farm to Table
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-gray-900 mb-6 leading-[0.95]">
                Microgreens <span className="text-fuelfoods-green-500 font-black">BIG</span>
                <br />
                where it <span className="italic text-orange-500 font-bold">counts</span>
              </h1>

              <p className="text-lg lg:text-xl text-gray-700 mb-8 leading-relaxed max-w-[480px]">
                With up to 40 times the nutrients of full grown veggies, our microgreens are packed with essential vitamins, minerals, and antioxidants that will have you feeling great and keep you fueled throughout the day!
              </p>

              {/* Feature checkmarks - Enhanced styling */}
              <div className="space-y-4 mb-10">
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-fuelfoods-green-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-800 text-base font-medium">Grown to Order</span>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-fuelfoods-green-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-800 text-base font-medium">Harvested Fresh</span>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-fuelfoods-green-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-800 text-base font-medium">Delivered Straight to Your Door</span>
                </div>
              </div>

              {/* Enhanced CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-fuelfoods-green-500 hover:bg-fuelfoods-green-600 text-white font-bold px-8 py-4 rounded-full text-lg uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Get Your Greens
                </button>
                <button className="border-2 border-fuelfoods-green-500 text-fuelfoods-green-500 hover:bg-fuelfoods-green-500 hover:text-white font-bold px-8 py-4 rounded-full text-lg uppercase tracking-wider transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>

            {/* Right Product Packages - Enhanced with better positioning */}
            <div className="w-full lg:w-[55%] flex justify-center lg:justify-end items-center mt-8 lg:mt-0">
              <div className="relative">
                <img
                  src="/images/imgpsh_fullsize_anim-1-1.webp"
                  alt="Brassica Blend, Mega Mix, and Sunnies Snacks packages"
                  className="w-full max-w-[650px] h-auto object-contain drop-shadow-2xl"
                />
                {/* Floating elements for visual interest */}
                <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold rotate-12 shadow-lg">
                  Fresh!
                </div>
                <div className="absolute -bottom-6 -left-6 bg-fuelfoods-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  40x Nutrients
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Condensed Info Section: What/Why/How with side image */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left copy: three condensed blocks */}
          <div className="space-y-12">
            <div>
              <h2 className="text-4xl lg:text-6xl font-extrabold text-orange-500 mb-4">
                What Are Microgreens?
              </h2>
              <p className="text-lg text-gray-800 leading-relaxed max-w-2xl">
                All the vegetables we know and love, harvested very early in their growth cycle when they are at their highest concentration of nutrients!
              </p>
            </div>

            <div>
              <h2 className="text-4xl lg:text-6xl font-extrabold text-black mb-4">
                Why Microgreens?
              </h2>
              <p className="text-lg text-gray-800 leading-relaxed max-w-2xl">
                Diets rich in nutrient dense vegetables have been shown to reduce the risk of chronic disease like heart disease or diabetes. Each pack is curated with a variety of micro-greens to offer a full spectrum of vitamins, minerals and antioxidants. Since our microgreen packs are whole foods you get the whole benefits of the plants as nature intended! Extracts, pills and powder supplements can't match up to the real stuff!
              </p>
            </div>

            <div>
              <h2 className="text-4xl lg:text-6xl font-extrabold text-fuelfoods-green-500 mb-4">
                How To Use Your Microgreen Packs?
              </h2>
              <p className="text-lg text-gray-800 leading-relaxed max-w-2xl">
                Add your favorite microgreen pack to your meal, whether at home or on the go. Create nutritious and delicious smoothies, juices, salads, sandwiches and bowls and more! Get as creative as you'd like!
              </p>
            </div>
          </div>

          {/* Right visual: banner-1.png aligned like reference */}
          <div className="relative flex justify-center lg:justify-end">
            <img
              src="/images/banner-1.png"
              alt="Microgreens bursting from package"
              className="w-full max-w-[900px] h-auto object-contain lg:-mr-6 lg:rotate-[12deg]"
            />
          </div>
        </div>
      </section>

      {/* Product Showcase Section with Side-by-Side Imagery */}
      <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-fuelfoods-green-100 text-fuelfoods-green-700 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide mb-4">
              Our Products
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Discover Our Microgreen Varieties
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each blend is carefully crafted to deliver maximum nutrition and flavor, harvested at peak freshness for your health journey.
            </p>
          </div>

          {/* Mega Mix Showcase */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 lg:order-1">
              <div className="mb-6">
                <span className="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wide mb-3">
                  Most Popular
                </span>
                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Mega Mix</h3>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Our signature blend featuring the perfect combination of nutrient-dense microgreens. 
                  A powerhouse mix of broccoli, kale, arugula, and more for maximum health benefits.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-fuelfoods-green-500 mb-1">40x</div>
                  <div className="text-sm text-gray-600">More Vitamin C</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-fuelfoods-green-500 mb-1">25x</div>
                  <div className="text-sm text-gray-600">More Vitamin E</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-fuelfoods-green-500 mb-1">4x</div>
                  <div className="text-sm text-gray-600">More Vitamin K</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-fuelfoods-green-500 mb-1">6x</div>
                  <div className="text-sm text-gray-600">More Antioxidants</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-fuelfoods-green-500 hover:bg-fuelfoods-green-600 text-white px-8 py-3 rounded-full font-semibold transition-colors">
                  Learn More About Mega Mix
                </button>
                <button className="border-2 border-fuelfoods-green-500 text-fuelfoods-green-500 hover:bg-fuelfoods-green-500 hover:text-white px-8 py-3 rounded-full font-semibold transition-colors">
                  Try It Now
                </button>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="relative">
                <img 
                  src="/images/megamixsidebyside.jpg" 
                  alt="Mega Mix microgreens side by side comparison"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-700">Fresh Harvested</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Brassica Blend Showcase */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative">
              <img 
                src="/images/brassicablendsidebyside.jpg" 
                alt="Brassica Blend microgreens variety"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute -top-6 -right-6 bg-purple-500 text-white p-4 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-lg font-bold">Rich in</div>
                  <div className="text-sm">Sulforaphane</div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="mb-6">
                <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wide mb-3">
                  Power Blend
                </span>
                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Brassica Blend</h3>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Packed with cancer-fighting compounds and powerful antioxidants. This blend focuses on the 
                  brassica family known for their incredible health benefits and distinctive flavors.
                </p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Highest sulforaphane content</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Anti-inflammatory properties</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Immune system support</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-colors">
                  Explore Brassica Blend
                </button>
                <button className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-3 rounded-full font-semibold transition-colors">
                  Order Now
                </button>
              </div>
            </div>
          </div>

          {/* Sunnies Snacks Showcase */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="mb-6">
                <span className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wide mb-3">
                  Crunchy & Delicious
                </span>
                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Sunnies Snacks</h3>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Pure sunflower microgreens with a satisfying crunch and nutty flavor. 
                  Perfect for snacking or adding texture to your favorite dishes.
                </p>
              </div>
              
              <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200 mb-8">
                <h4 className="text-lg font-semibold text-yellow-800 mb-3">Perfect For:</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                    <span className="text-yellow-700">Healthy snacking</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                    <span className="text-yellow-700">Salad toppers</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                    <span className="text-yellow-700">Sandwich crunch</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                    <span className="text-yellow-700">Smoothie bowls</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-full font-semibold transition-colors">
                  Try Sunnies Snacks
                </button>
                <button className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white px-8 py-3 rounded-full font-semibold transition-colors">
                  See Recipes
                </button>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="relative">
                <img 
                  src="/images/sunniessidebyside.jpg" 
                  alt="Sunnies Snacks sunflower microgreens"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-yellow-400 text-yellow-900 p-4 rounded-xl shadow-lg">
                  <div className="text-center">
                    <div className="text-lg font-bold">High in</div>
                    <div className="text-sm">Protein & Vitamin E</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Choose Your Subscription Section - Enhanced Design */}
      <section className="bg-gradient-to-br from-fuelfoods-green-500 to-fuelfoods-green-600 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-12">
            <span className="inline-block bg-white bg-opacity-20 text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide mb-4">
              Subscription Plans
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Choose Your Plan</h2>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">Select the best option to support your wellness goals and start your journey to better health.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-6">
            {/* Starter Plan */}
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative">
              <div className="mb-6">
                <img 
                  src="/images/imgpsh_fullsize_anim-3-1-1.png" 
                  alt="Starter Plan - 3 Pack" 
                  className="w-full h-40 object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter Plan</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">$35</span>
                <span className="text-lg text-gray-600">/week</span>
              </div>
              <p className="text-gray-600 mb-6">Perfect for getting started with microgreens</p>
              
              <div className="space-y-3 mb-8 text-left">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-fuelfoods-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Three 3.5oz fresh microgreen packs</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-fuelfoods-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Choose from Mega Mix, Brassica Blend, or Sunnies</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-fuelfoods-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Free shipping on orders over $35</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-fuelfoods-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Cancel anytime</span>
                </div>
              </div>
              
              <button className="w-full bg-gray-900 text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors text-lg">
                Get Started
              </button>
            </div>

            {/* Pro Plan - Most Popular */}
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative border-4 border-yellow-400">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wide shadow-lg">
                Most Popular
              </div>
              
              <div className="mb-6 mt-4">
                <img 
                  src="/images/imgpsh_fullsize_anim-3-1-1.png" 
                  alt="Pro Plan - 3 Pack Weekly" 
                  className="w-full h-40 object-contain"
                />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro Plan</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">$45</span>
                <span className="text-lg text-gray-600">/week</span>
                <div className="text-sm text-gray-500 line-through">$55/week</div>
              </div>
              <p className="text-gray-600 mb-6">Build healthy habits with our most popular plan</p>
              
              <div className="space-y-3 mb-8 text-left">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-fuelfoods-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Everything in Starter Plan</span>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                  <div className="text-center text-yellow-800 font-semibold mb-2">BONUS INCLUDES</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-yellow-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">Microgreens Recipe Guide</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-yellow-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">Weekly Newsletter with health tips</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-yellow-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">Free Nutritionist Session</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 py-4 rounded-xl font-bold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 text-lg shadow-lg">
                Start Pro Plan
              </button>
            </div>

            {/* Elite Plan */}
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative">
              <div className="mb-6">
                <img 
                  src="/images/5-pack1.webp" 
                  alt="Elite Plan - 5 Pack Weekly" 
                  className="w-full h-40 object-contain"
                />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Elite Plan</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">$75</span>
                <span className="text-lg text-gray-600">/week</span>
              </div>
              <p className="text-gray-600 mb-6">Maximum nutrition for serious health enthusiasts</p>
              
              <div className="space-y-3 mb-8 text-left">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-fuelfoods-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Five 3.5oz fresh microgreen packs weekly</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-fuelfoods-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Everything in Pro Plan</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-fuelfoods-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Early access to new products</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-fuelfoods-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Exclusive health product discounts</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-fuelfoods-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Priority customer support</span>
                </div>
              </div>
              
              <button className="w-full bg-fuelfoods-green-500 text-white py-4 rounded-xl font-semibold hover:bg-fuelfoods-green-600 transition-colors text-lg">
                Go Elite
              </button>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-green-100 text-lg mb-4">Not ready to commit? Try our one-time orders</p>
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white border-2 border-white px-8 py-3 rounded-full font-semibold transition-all duration-300">
              Shop Individual Packs
            </button>
          </div>
        </div>
      </section>

      {/* The Ultimate Superfood Section */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">The Ultimate Superfood</h2>
          <h3 className="text-2xl font-bold text-gray-900 mb-12">For Health And Vitality.</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-fuelfoods-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">NUTRITIONAL POWERHOUSE</h4>
              <p className="text-gray-700">Experience nature's tiny powerhouses, packed with vitamins A, C, K, and B, supporting immunity, collagen synthesis, bone health, and energy metabolism.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-fuelfoods-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">ANTIOXIDANT BOOST</h4>
              <p className="text-gray-700">Unleash your body's natural defense with our antioxidant-rich micros! Combat oxidative stress, protect cells from damage, and embrace youthful vitality.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-fuelfoods-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🍽️</span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">VERSATILE AND CONVENIENT</h4>
              <p className="text-gray-700">Elevate your meals effortlessly! Add your delicious microgreens to salads, sandwiches, smoothies, or use them as vibrant garnishes!</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-fuelfoods-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💚</span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">GUT HEALTH SUPPORT</h4>
              <p className="text-gray-700">Promote healthy digestion, balance gut microbiota, and maintain regularity effortlessly with our microgreens mixes!</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-fuelfoods-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧬</span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">PHYTONUTRIENT RICH</h4>
              <p className="text-gray-700">Our curated variety of microgreens are full of phytonutrients like sulforaphane and anthocyanins, which offer anti-inflammatory properties and heart health support.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-fuelfoods-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌿</span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">NO CHEMICALS, NO ADDITIVES</h4>
              <p className="text-gray-700">Just Food.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Fresh Greens Delivered Weekly Section */}
      <section className="bg-fuelfoods-green-500 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-white text-center mb-8">Fresh Greens Delivered Weekly</h2>
          <p className="text-xl text-green-100 text-center mb-12 max-w-4xl mx-auto">
            Choose from our carefully curated tasty microgreen mixes designed to unlock the benefits of biodiversity your body needs the most. It's easy, subscribe today and you'll never have to worry about running out of your favorite blend.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-white">
            <div className="text-center">
              <h4 className="font-bold mb-3">Locally Grown & Harvested</h4>
              <p className="text-green-100">Locally grown and harvested for ultimate freshness, ensuring you receive the highest quality microgreens every single week.</p>
            </div>
            <div className="text-center">
              <h4 className="font-bold mb-3">Organic & Non-GMO</h4>
              <p className="text-green-100">Say goodbye to mystery ingredients. We use only organic, non-GMO seeds and practices, free from harmful pesticides, fertilizers, or chemicals.</p>
            </div>
            <div className="text-center">
              <h4 className="font-bold mb-3">Variety of Greens</h4>
              <p className="text-green-100">Add a wider variety of greens to your diet, with up to 13 different nutrient-rich veggies in one pack you will easily.</p>
            </div>
            <div className="text-center">
              <h4 className="font-bold mb-3">Convenient Delivery</h4>
              <p className="text-green-100">Skip the grocery store frenzy and enjoy the convenience of regular deliveries, so you can effortlessly add a nutritional punch to your meals.</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button className="bg-white text-fuelfoods-green-500 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              Choose Your Greens!
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-fuelfoods-green-100 rounded-full opacity-50"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-yellow-100 rounded-full opacity-50"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-100 rounded-full opacity-30"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block bg-fuelfoods-green-100 text-fuelfoods-green-700 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide mb-4">
              Customer Love
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Real Stories from Real Customers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied customers who have transformed their health with our fresh microgreens
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-fuelfoods-green-500 mb-2">5,000+</div>
              <div className="text-gray-600 font-medium">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-fuelfoods-green-500 mb-2">4.9★</div>
              <div className="text-gray-600 font-medium">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-fuelfoods-green-500 mb-2">98%</div>
              <div className="text-gray-600 font-medium">Would Recommend</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-fuelfoods-green-500 mb-2">24-48h</div>
              <div className="text-gray-600 font-medium">Fresh Delivery</div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                quote: "I order from FuelFoods every other week, normally 2-3 packages of greens (the Mustard is my favorite.) They're always prompt on delivery, and the food is always fresh.",
                author: "Romel L",
                location: "New York, NY",
                rating: 5,
                verified: true,
                highlight: "Always prompt delivery"
              },
              {
                quote: "Great NYC locally grown microgreens that are great to munch on as some finger food for a party (they're very flavorful), or even a crunchy snack while watching a movie.",
                author: "Viviana A",
                location: "Brooklyn, NY",
                rating: 5,
                verified: true,
                highlight: "Perfect for entertaining"
              },
              {
                quote: "Always get the freshest greens and they convinced me to change my snack choice to micro radishes, game changer!",
                author: "Tené L",
                location: "Manhattan, NY",
                rating: 5,
                verified: true,
                highlight: "Life-changing healthy snacks"
              },
              {
                quote: "Absolutely love these tasty micro greens. I eat them every day, either in salad or as a side with salmon. They're fresh & delicious !!! Lifetime customer!",
                author: "Trixie D",
                location: "Queens, NY",
                rating: 5,
                verified: true,
                highlight: "Daily nutrition boost"
              },
              {
                quote: "The variety pack is amazing! Each microgreen has its own unique flavor profile. My kids actually ask for more greens now!",
                author: "Marcus K",
                location: "Bronx, NY",
                rating: 5,
                verified: true,
                highlight: "Kid-approved nutrition"
              },
              {
                quote: "As a nutritionist, I recommend FuelFoods to all my clients. The quality and freshness are unmatched in the industry.",
                author: "Dr. Sarah M",
                location: "Licensed Nutritionist",
                rating: 5,
                verified: true,
                highlight: "Professional endorsement"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative border border-gray-100">
                {testimonial.verified && (
                  <div className="absolute -top-3 -right-3 bg-fuelfoods-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                  <span className="ml-2 text-sm text-gray-500">Verified Purchase</span>
                </div>
                
                <blockquote className="text-gray-700 text-base mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.author}</div>
                      <div className="text-sm text-gray-500">{testimonial.location}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-fuelfoods-green-600 font-semibold bg-fuelfoods-green-50 px-2 py-1 rounded">
                        {testimonial.highlight}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-12">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-fuelfoods-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-fuelfoods-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Guaranteed</h3>
                <p className="text-gray-600 text-sm">Fresh or your money back promise</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Delivery</h3>
                <p className="text-gray-600 text-sm">24-48 hours from harvest to door</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Support</h3>
                <p className="text-gray-600 text-sm">Nutrition guidance from licensed professionals</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg text-gray-600 mb-6">Ready to join our community of health-conscious customers?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-fuelfoods-green-500 hover:bg-fuelfoods-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Start Your Subscription
              </button>
              <button className="border-2 border-fuelfoods-green-500 text-fuelfoods-green-500 hover:bg-fuelfoods-green-500 hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300">
                Try One-Time Order
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Farm Quality Section */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img 
                src="/images/farmpic.jpg" 
                alt="FuelFoods farm operations showing fresh microgreen cultivation"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-8 -right-8 bg-fuelfoods-green-500 text-white p-6 rounded-xl shadow-lg max-w-xs">
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">Locally Grown</div>
                  <div className="text-sm opacity-90">Fresh from our Northeast farms</div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="mb-8">
                <span className="inline-block bg-fuelfoods-green-100 text-fuelfoods-green-700 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide mb-4">
                  Our Quality Promise
                </span>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  From Farm to Your Table in 24-48 Hours
                </h2>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  Experience the difference that truly fresh microgreens make. Our locally grown microgreens are harvested at peak nutrition and delivered directly to your door within 24-48 hours.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="w-12 h-12 bg-fuelfoods-green-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-fuelfoods-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Organic & Non-GMO</h3>
                  <p className="text-gray-600 text-sm">Only the finest organic seeds with no harmful chemicals or pesticides</p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Peak Freshness</h3>
                  <p className="text-gray-600 text-sm">Harvested at optimal nutrition levels and delivered within 48 hours</p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Tested</h3>
                  <p className="text-gray-600 text-sm">Every batch tested for safety, quality, and nutritional content</p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Sustainably Grown</h3>
                  <p className="text-gray-600 text-sm">Environmentally responsible farming practices that protect our planet</p>
                </div>
              </div>
              
              <button className="bg-fuelfoods-green-500 hover:bg-fuelfoods-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Visit Our Farm
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Enhanced */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-20 px-4 sm:px-6 lg:px-8 text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="about-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#about-grid)" />
          </svg>
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="mb-8">
            <span className="inline-block bg-fuelfoods-green-500 bg-opacity-20 text-fuelfoods-green-400 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide mb-6">
              Our Mission
            </span>
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Let Food Be Thy <span className="text-fuelfoods-green-400">Medicine</span>
            </h2>
            <div className="w-24 h-1 bg-fuelfoods-green-500 mx-auto mb-8"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-fuelfoods-green-400 mb-2">Our Vision</div>
              <p className="text-gray-300 leading-relaxed">
                Making nutrition simple and accessible for everyone through the power of fresh, nutrient-dense microgreens.
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-fuelfoods-green-400 mb-2">Our Promise</div>
              <p className="text-gray-300 leading-relaxed">
                Delivering the freshest, highest quality microgreens with unmatched customer service and expert guidance.
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-fuelfoods-green-400 mb-2">Our Impact</div>
              <p className="text-gray-300 leading-relaxed">
                Helping thousands improve their health naturally while supporting sustainable, local agriculture practices.
              </p>
            </div>
          </div>
          
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <p className="text-xl lg:text-2xl text-gray-100 mb-6 leading-relaxed">
              Everyone wants to be healthy but the information and choices available for us is so confusing it leaves us stuck! It's time to make health and nutrition simple so you can be your best you. Here at FuelFoods Industries we are aggressively dedicated to finding the best practices to optimize human health, the natural way.
            </p>
            <p className="text-lg text-fuelfoods-green-300 font-semibold">
              Join us on our mission to transform health through nutrition!
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-fuelfoods-green-500 hover:bg-fuelfoods-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Learn Our Story
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300">
              Meet the Team
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto text-center">
          <h3 className="text-xl font-bold mb-4">Subscribe To Our Newsletter</h3>
          <p className="text-gray-300 mb-6">Get notified about health tips, new releases, and deals!</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Email"
              className="flex-1 px-4 py-2 rounded-md text-gray-900"
            />
            <button className="bg-fuelfoods-green-500 text-white px-6 py-2 rounded-md hover:bg-fuelfoods-green-600 transition-colors">
              Send
            </button>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="bg-gray-100 py-4 px-4 text-center">
        <p className="text-xs text-gray-600">
          Not evaluated by the FDA. This product isn't designed to diagnose, treat, cure, or prevent any disease. Information here is for informational purposes. Not a substitute for medical advice. Consult a medical professional before using our products or if health concerns arise.
        </p>
      </div>
    </div>
  );
}