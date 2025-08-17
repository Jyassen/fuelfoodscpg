import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Link from 'next/link';
export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Alert Banner */}
      <div className="bg-black text-white text-center py-3 px-4">
        <p className="text-sm font-medium">
          Now Shipping Exclusively To The Northeast!
        </p>
      </div>

      {/* Hero Section - Matching Screenshot Design Exactly */}
      <section className="relative bg-gray-50 min-h-[700px] overflow-hidden">
        {/* Background image behind hero - positioned at bottom right */}
        <img
          src="/images/herobackground.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute bottom-0 right-0 w-full h-auto opacity-90 z-0"
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex flex-col lg:flex-row items-center lg:justify-start lg:gap-0 min-h-[700px] pt-2 lg:pt-4">
            {/* Left Content - Matching Screenshot Layout */}
            <div className="w-full lg:w-[35%] text-left py-6 lg:py-20 lg:pr-0">
              
              <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-black text-gray-900 mb-4 leading-[0.95] tracking-tight">
                <span className="whitespace-nowrap">Microgreens <span className="text-fuelfoods-green-500 font-black">BIG</span></span>
                <br />
                where it <span className="italic text-orange-500 font-bold">counts</span>
              </h1>

              <p className="text-base lg:text-lg text-gray-700 mb-6 leading-snug max-w-[480px]">
                With up to 40 times the nutrients of full grown veggies, our microgreens are packed with essential vitamins, minerals, and antioxidants that will have you feeling great and keep you fueled throughout the day!
              </p>

              {/* Feature checkmarks - Matching Screenshot Style */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-fuelfoods-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-800 text-[15px] font-medium">Grown to Order</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-fuelfoods-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-800 text-[15px] font-medium">Harvested Fresh</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-fuelfoods-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-800 text-[15px] font-medium">Delivered Straight to Your Door</span>
                </div>
              </div>

              {/* CTA Button - Single Button as in Screenshot */}
              <div>
                <button className="bg-[#136834] hover:bg-[#0f5429] text-white font-extrabold px-8 py-3 rounded-full text-base uppercase tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-transparent">
                  Get Your Greens
                </button>
              </div>
            </div>

            {/* Right Product Packages - Exactly as in Screenshot */}
            <div className="w-full lg:w-[65%] flex justify-center lg:justify-end items-center mt-8 lg:mt-0 relative lg:-ml-24">
              <div className="relative z-10">
                <img
                  src="/images/imgpsh_fullsize_anim-1-1.webp"
                  alt="Brassica Blend, Mega Mix, and Sunnies Snacks packages"
                  className="w-full lg:w-[125%] max-w-none h-auto object-contain drop-shadow-2xl lg:-translate-x-8"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Condensed Info Section: What/Why/How with side image */}
      <section className="relative bg-white py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left copy: three condensed blocks */}
          <div className="space-y-6 relative z-10">
            <div>
              <h2 className="text-3xl lg:text-5xl font-extrabold text-[#e56322] mb-3">
                What Are Microgreens?
              </h2>
              <p className="text-base text-gray-800 leading-snug max-w-2xl">
                All the vegetables we know and love, harvested very early in their growth cycle when they are at their highest concentration of nutrients!
              </p>
            </div>

            <div>
              <h2 className="text-3xl lg:text-5xl font-extrabold text-black mb-3">
                Why Microgreens?
              </h2>
              <p className="text-base text-gray-800 leading-snug max-w-2xl">
                Diets rich in nutrient dense vegetables have been shown to reduce the risk of chronic disease like heart disease or diabetes. Each pack is curated with a variety of micro-greens to offer a full spectrum of vitamins, minerals and antioxidants. Since our microgreen packs are whole foods you get the whole benefits of the plants as nature intended! Extracts, pills and powder supplements can't match up to the real stuff.
              </p>
            </div>

            <div>
              <h2 className="text-3xl lg:text-5xl font-extrabold text-[#448319] mb-3">
                How To Use Your Microgreen Packs?
              </h2>
              <p className="text-base text-gray-800 leading-snug max-w-2xl">
                Add your favorite microgreen pack to your meal, whether at home or on the go. Create nutritious and delicious smoothies, juices, salads, sandwiches and bowls and more! Get as creative as you'd like!
              </p>
            </div>
          </div>

          {/* Right visual: banner-1.png - positioned at center-right where cursor indicates */}
          <div className="relative">
            <img
              src="/images/banner-1.png"
              alt="Microgreens bursting from package"
              className="hidden lg:block absolute top-1/2 right-0 w-full h-auto object-contain scale-150 origin-center-right z-0 -translate-y-1/2"
            />
            {/* Fallback for small screens */}
            <img
              src="/images/banner-1.png"
              alt="Microgreens bursting from package"
              className="block lg:hidden w-full max-w-[700px] h-auto object-contain mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Product Showcase Section with Side-by-Side Imagery */}
      <section className="bg-gray-50 pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Discover Our Microgreen Varieties
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each blend is carefully crafted to deliver maximum nutrition and flavor, harvested at peak freshness for your health journey.
            </p>
          </div>
          {/* Carousel of product varieties */}
          <div className="relative mt-6">
            <Carousel opts={{ loop: true, align: 'start' }} autoplay autoplayInterval={6000} className="w-full overflow-visible">
              <CarouselContent>
                {/* Mega Mix Slide */}
                <CarouselItem>
                  <div className="grid lg:grid-cols-2 gap-12 items-start min-h-[600px]">
                    <div>
                      <div className="mb-6">
                        <span className="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wide mb-3">
                          Most Popular
                        </span>
                        <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Mega Mix</h3>
                        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                          Antioxidant powerhouse. Immune support. Detoxification. Bone and heart health. Anti-inflammatory properties. Eye health.
                        </p>
                        <div className="mb-4">
                          <div className="text-xl font-extrabold text-gray-900 mb-2">Nutrients:</div>
                          <p className="text-gray-700 text-sm lg:text-base">
                            Vitamins A, C, E, K, B5, B6, B12; Thiamin (B1); Riboflavin (B2); Niacin (B3); Folate (B9); anthocyanins, sulforaphane, beta-carotene, magnesium, potassium, calcium, iron.
                          </p>
                        </div>
                        <div className="mb-6">
                          <div className="text-xl font-extrabold text-gray-900 mb-2">Contains:</div>
                          <p className="text-gray-700 text-sm lg:text-base">Green and Purple Daikon Radish, Green and Pak Choi, Kohlrabi, Purple Mustard, Mizuna, Sweet Peas, Beets.</p>
                        </div>
                      </div>
                      <div className="bg-orange-50 p-6 rounded-xl border border-orange-200 mb-8">
                        <h4 className="text-lg font-semibold text-orange-800 mb-3">Key Benefits:</h4>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center"><div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div><span className="text-orange-700">40x more vitamins</span></div>
                          <div className="flex items-center"><div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div><span className="text-orange-700">9 different veggies</span></div>
                          <div className="flex items-center"><div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div><span className="text-orange-700">Immune support</span></div>
                          <div className="flex items-center"><div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div><span className="text-orange-700">Anti-inflammatory</span></div>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-colors">Order Now</button>
                      </div>
                    </div>
                    <div>
                      <div className="relative flex items-center justify-center">
                        <img src="/images/megamixsidebyside.jpg" alt="Mega Mix microgreens side by side comparison" className="w-full max-w-[520px] h-auto object-contain mx-auto rounded-2xl shadow-2xl" />
                      </div>
                    </div>
                  </div>
                </CarouselItem>

                {/* Brassica Blend Slide */}
                <CarouselItem>
                  <div className="grid lg:grid-cols-2 gap-12 items-start min-h-[520px]">
                    <div className="relative order-2 lg:order-1 lg:order-none flex items-center justify-center">
                      <img src="/images/brassicablendsidebyside.jpg" alt="Brassica Blend microgreens variety" className="w-full max-w-[520px] h-auto object-contain mx-auto rounded-2xl shadow-2xl" />
                    </div>
                    <div>
                      <div className="mb-6">
                        <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wide mb-3">Power Blend</span>
                        <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Brassica Blend</h3>
                        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                          Cancer‑fighting properties. Antioxidant and anti‑inflammatory effects. Detoxification. Sustained energy. Mineral support.
                        </p>
                        <div className="mb-4">
                          <div className="text-xl font-extrabold text-gray-900 mb-2">Nutrients:</div>
                          <p className="text-gray-700 text-sm lg:text-base">Vitamins A, C, E, K, B6; Thiamin (B1); Riboflavin (B2); Niacin (B3); Folate (B9); Sulforaphane; Calcium; Iron; Chlorophyll.</p>
                        </div>
                        <div className="mb-6">
                          <div className="text-xl font-extrabold text-gray-900 mb-2">Contains:</div>
                          <p className="text-gray-700 text-sm lg:text-base">Broccoli, Purple Mustard, Kohlrabi, Sunflower.</p>
                        </div>
                      </div>
                      <div className="bg-purple-50 p-6 rounded-xl border border-purple-200 mb-8">
                        <h4 className="text-lg font-semibold text-purple-800 mb-3">Key Benefits:</h4>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center"><div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div><span className="text-purple-700">Highest sulforaphane</span></div>
                          <div className="flex items-center"><div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div><span className="text-purple-700">Anti-inflammatory</span></div>
                          <div className="flex items-center"><div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div><span className="text-purple-700">Immune support</span></div>
                          <div className="flex items-center"><div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div><span className="text-purple-700">Cancer-fighting</span></div>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-colors">Order Now</button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>

                {/* Sunnies Snacks Slide */}
                <CarouselItem>
                  <div className="grid lg:grid-cols-2 gap-12 items-start min-h-[520px]">
                    <div>
                      <div className="mb-6">
                        <span className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wide mb-3">Crunchy & Delicious</span>
                        <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Sunnies Snacks</h3>
                        <p className="text-lg text-gray-700 mb-6 leading-relaxed">Vitamin and mineral rich. Vitality and energy. Skin and eye health. Antioxidant support.</p>
                        <div className="mb-4">
                          <div className="text-xl font-extrabold text-gray-900 mb-2">Nutrients:</div>
                          <p className="text-gray-700 text-sm lg:text-base">Vitamins A, C, E; Vitamin K; Thiamin (B1); Riboflavin (B2); Niacin (B3); Folate (B9); Vitamin B6; Magnesium; Potassium; Calcium; Iron; Zinc; Phosphorus; Chlorophyll; Bioflavonoids.</p>
                        </div>
                        <div className="mb-6">
                          <div className="text-xl font-extrabold text-gray-900 mb-2">Contains:</div>
                          <p className="text-gray-700 text-sm lg:text-base">Micro Sunflower Shoots.</p>
                        </div>
                      </div>
                      <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200 mb-8">
                        <h4 className="text-lg font-semibold text-yellow-800 mb-3">Perfect For:</h4>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center"><div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div><span className="text-yellow-700">Healthy snacking</span></div>
                          <div className="flex items-center"><div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div><span className="text-yellow-700">Salad toppers</span></div>
                          <div className="flex items-center"><div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div><span className="text-yellow-700">Sandwich crunch</span></div>
                          <div className="flex items-center"><div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div><span className="text-yellow-700">Smoothie bowls</span></div>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-full font-semibold transition-colors">Order Now</button>
                      </div>
                    </div>
                    <div>
                      <div className="relative flex items-center justify-center">
                        <img src="/images/sunniessidebyside.jpg" alt="Sunnies Snacks sunflower microgreens" className="w-full max-w-[520px] h-auto object-contain mx-auto rounded-2xl shadow-2xl" />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="-left-6" />
              <CarouselNext className="-right-6" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Choose Your Subscription Section - Enhanced Design */}
      <section className="bg-gradient-to-br from-fuelfoods-green-500 to-fuelfoods-green-600 pt-12 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
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
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Select the best option to support your wellness goals and start your journey to better health.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-6 items-stretch">
            {/* Starter Plan */}
            <div className="bg-white rounded-2xl p-8 shadow-[0_16px_48px_6px_rgba(34,94,20,0.35)] hover:shadow-[0_28px_70px_12px_rgba(34,94,20,0.45)] transition-all duration-300 transform hover:-translate-y-2 relative flex flex-col h-full">
              <div className="mb-6 h-56 flex items-end justify-center">
                <img 
                  src="/images/imgpsh_fullsize_anim-3-1-1.png" 
                  alt="Starter Plan - 3 Pack" 
                  className="max-h-full w-auto object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Starter Packs</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">$15</span>
                <span className="text-lg text-gray-600">per pack</span>
              </div>
              <p className="text-gray-600 mb-6">Get the ball rolling on your health journey!</p>
              
              <div className="space-y-3 mb-8 text-left">
                <div className="text-gray-700 mb-2">Select as many delicious 3.5oz micro packs you'd like, we recommend all of them!</div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-fuelfoods-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Mega Mix</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-fuelfoods-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Brassica Blend</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-fuelfoods-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Sunnies Snacks</span>
                </div>
              </div>
              
              <button className="mt-auto w-full bg-gray-900 text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors text-lg">
                Get Started
              </button>
            </div>

            {/* Pro Plan - Most Popular */}
            <div className="bg-white rounded-2xl p-8 shadow-[0_16px_48px_6px_rgba(34,94,20,0.35)] hover:shadow-[0_28px_70px_12px_rgba(34,94,20,0.45)] transition-all duration-300 transform hover:-translate-y-2 relative border-4 border-[#c0c0c0] flex flex-col h-full">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wide shadow-lg">
                Most Popular
              </div>
              
              <div className="mb-6 h-56 flex items-end justify-center">
                <img 
                  src="/images/image-2-4.png" 
                  alt="Pro Plan - 3 Pack Weekly" 
                  className="max-h-full w-auto object-contain"
                />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Pro Member</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">$45</span>
                <span className="text-lg text-gray-600">/week</span>
              </div>
              <p className="text-gray-600 mb-6">Start your commitment to health and build momentum!</p>
              
              <div className="space-y-3 mb-8 text-left">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-fuelfoods-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Three 3.5oz freshly harvested micro packs delivered weekly</span>
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
                      <span className="text-gray-700">Access to Weekly Newsletter with health tips, recipes, new offers, and member discounts</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-yellow-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">Free Session with a Licensed Nutritionist w/ Personalized meal plan</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-yellow-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">Free Admission to Regional FuelFoods Wellness Events</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <button className="mt-auto w-full bg-gradient-to-r from-gray-200 to-gray-400 text-gray-900 py-4 rounded-xl font-bold hover:from-gray-300 hover:to-gray-500 transition-all duration-300 text-lg shadow-lg">
                Start Pro Plan
              </button>
            </div>

            {/* Elite Plan */}
            <div className="bg-white rounded-2xl p-8 shadow-[0_16px_48px_6px_rgba(34,94,20,0.35)] hover:shadow-[0_28px_70px_12px_rgba(34,94,20,0.45)] transition-all duration-300 transform hover:-translate-y-2 relative border-4 border-yellow-400 flex flex-col h-full">
              <div className="mb-6 h-56 flex items-end justify-center">
                <img 
                  src="/images/5-pack1.webp" 
                  alt="Elite Plan - 5 Pack Weekly" 
                  className="max-h-full w-auto object-contain"
                />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Elite Member</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">$75</span>
                <span className="text-lg text-gray-600">/week</span>
              </div>
              <p className="text-gray-600 mb-6">Take your health to the next level and optimize your lifestyle!</p>
              
              <div className="space-y-3 mb-8 text-left">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-fuelfoods-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">Five 3.5oz freshly harvested micro packs delivered weekly</span>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                  <div className="text-center text-yellow-800 font-semibold mb-2">PLUS</div>
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
                      <span className="text-gray-700">Access to Weekly Newsletter with health tips, recipes, new offers, and member discounts</span>
                </div>
                <div className="flex items-center">
                      <svg className="w-4 h-4 text-yellow-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                      <span className="text-gray-700">Free Session with a Licensed Nutritionist w/ Personalized meal plan</span>
                </div>
                <div className="flex items-center">
                      <svg className="w-4 h-4 text-yellow-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                      <span className="text-gray-700">Free Admission to Regional FuelFoods Wellness Events</span>
                </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-yellow-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">Early Access to New Exclusive Products to optimize your health</span>
              </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-yellow-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">Exclusive discounts on participating health product vendors (coming soon)</span>
                    </div>
                  </div>
            </div>
          </div>
          
              <button className="mt-auto w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 py-4 rounded-xl font-bold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 text-lg shadow-lg">
                Start Elite Plan
            </button>
          </div>
          </div>
          
          
        </div>
      </section>

      {/* The Ultimate Superfood Section */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">The Ultimate Superfood</h2>
          <h3 className="text-xl lg:text-2xl font-semibold text-gray-700 mb-10">Here to power you through your busy lifestyle.</h3>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <div className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-[0_24px_80px_12px_rgba(229,99,34,0.22)]">
              <img src="/images/bikerider.png" alt="Biker fueling performance with microgreens" className="w-full h-64 object-cover filter drop-shadow-[0_40px_90px_rgba(229,99,34,0.5)]" />
            </div>
            <div className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-[0_24px_80px_12px_rgba(229,99,34,0.22)]">
              <img src="/images/gymdrinker.png" alt="Gym-goer recovering with nutrient-dense greens" className="w-full h-64 object-cover filter drop-shadow-[0_40px_90px_rgba(229,99,34,0.5)]" />
            </div>
            <div className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-[0_24px_80px_12px_rgba(229,99,34,0.22)]">
              <img src="/images/runners.png" alt="Runners energized by whole-food nutrition" className="w-full h-64 object-cover filter drop-shadow-[0_40px_90px_rgba(229,99,34,0.5)]" />
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-[0_10px_30px_rgba(23,134,65,0.06)] hover:shadow-[0_18px_42px_rgba(23,134,65,0.12)] transition-shadow h-full text-left">
              <div className="w-10 h-10 rounded-lg bg-fuelfoods-green-100 text-fuelfoods-green-600 flex items-center justify-center mb-4">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="13 2 3 14 12 14 11 22 21 10 13 10 13 2"/>
                </svg>
              </div>
              <h4 className="text-base font-bold text-gray-900 mb-1">Nutritional Powerhouse</h4>
              <p className="text-gray-700 text-sm">Packed with vitamins A, C, K, B and minerals for daily energy and resilience.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-[0_10px_30px_rgba(23,134,65,0.06)] hover:shadow-[0_18px_42px_rgba(23,134,65,0.12)] transition-shadow h-full text-left">
              <div className="w-10 h-10 rounded-lg bg-fuelfoods-green-100 text-fuelfoods-green-600 flex items-center justify-center mb-4">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l7 4v5c0 5-3.5 9-7 11-3.5-2-7-6-7-11V6l7-4z"/>
                  <path d="M9 12l2 2 4-4"/>
                </svg>
              </div>
              <h4 className="text-base font-bold text-gray-900 mb-1">Antioxidant Boost</h4>
              <p className="text-gray-700 text-sm">Support your body’s defenses and recovery from everyday stressors.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-[0_10px_30px_rgba(23,134,65,0.06)] hover:shadow-[0_18px_42px_rgba(23,134,65,0.12)] transition-shadow h-full text-left">
              <div className="w-10 h-10 rounded-lg bg-fuelfoods-green-100 text-fuelfoods-green-600 flex items-center justify-center mb-4">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="3" y="3" width="7" height="7" rx="1.5"/>
                  <rect x="14" y="3" width="7" height="7" rx="1.5"/>
                  <rect x="3" y="14" width="7" height="7" rx="1.5"/>
                  <rect x="14" y="14" width="7" height="7" rx="1.5"/>
                </svg>
              </div>
              <h4 className="text-base font-bold text-gray-900 mb-1">Versatile & Convenient</h4>
              <p className="text-gray-700 text-sm">Toss into salads, sandwiches, bowls, or smoothies in seconds.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-[0_10px_30px_rgba(23,134,65,0.06)] hover:shadow-[0_18px_42px_rgba(23,134,65,0.12)] transition-shadow h-full text-left">
              <div className="w-10 h-10 rounded-lg bg-fuelfoods-green-100 text-fuelfoods-green-600 flex items-center justify-center mb-4">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/></svg>
              </div>
              <h4 className="text-base font-bold text-gray-900 mb-1">Gut Health Support</h4>
              <p className="text-gray-700 text-sm">Fiber and phytonutrients that help keep things balanced.</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-[0_10px_30px_rgba(23,134,65,0.06)] hover:shadow-[0_18px_42px_rgba(23,134,65,0.12)] transition-shadow h-full text-left">
              <div className="w-10 h-10 rounded-lg bg-fuelfoods-green-100 text-fuelfoods-green-600 flex items-center justify-center mb-4">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 3h6M10 3v6l-3 5a4 4 0 108 0l-3-5V3"/>
                </svg>
              </div>
              <h4 className="text-base font-bold text-gray-900 mb-1">Phytonutrient Rich</h4>
              <p className="text-gray-700 text-sm">Sulforaphane and anthocyanins for anti‑inflammatory support.</p>
            </div>
          </div>

          <div className="mt-10 text-gray-700">
            <p className="text-base lg:text-lg">No chemicals. No additives. Just food.</p>
          </div>
        </div>
      </section>

      {/* Fresh Greens Delivered Weekly Section - Modern Layout */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl lg:text-5xl font-bold text-fuelfoods-green-500 mb-4">Fresh Greens Delivered Weekly</h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto">
              Choose from our carefully curated tasty microgreen mixes designed to unlock the benefits of biodiversity your body needs the most. It’s easy, subscribe today and you’ll never have to worry about running out of your favorite blend.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left visual */}
            <div className="relative">
              <img
                src="/images/5-pack3.png"
                alt="FuelFoods microgreen packs"
                className="w-full max-w-2xl h-auto object-contain mx-auto"
              />
            </div>

            {/* Right bullets */}
            <div className="bg-fuelfoods-green-50/80 border border-fuelfoods-green-200 rounded-2xl p-8 lg:p-10 shadow-[0_12px_36px_rgba(23,134,65,0.10)]">
              <ul className="space-y-6 text-gray-800 text-lg">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-fuelfoods-green-500 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Locally grown and harvested for ultimate freshness, ensuring you receive the highest quality microgreens every single week.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-fuelfoods-green-500 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Say goodbye to mystery ingredients. We use only organic, non‑GMO seeds and practices, free from harmful pesticides, fertilizers, or chemicals.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-fuelfoods-green-500 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Add a wider variety of greens to your diet, with up to 13 different nutrient‑rich veggies in one pack.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-fuelfoods-green-500 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Skip the grocery store frenzy and enjoy the convenience of regular deliveries for effortless nutrition.</span>
                </li>
              </ul>

              <div className="mt-10">
                <Link
                  href="/shop"
                  aria-label="Choose Your Greens"
                  className="inline-flex items-center justify-center bg-[#178641] hover:bg-[#136834] text-white font-extrabold text-lg px-10 py-4 rounded-full shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#178641]"
                >
                  Choose Your Greens!
                </Link>
              </div>
            </div>
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
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Real Stories from Real Customers
          </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied customers who have transformed their health with our fresh microgreens
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-16">
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
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
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
              <Link href="/shop" className="inline-flex items-center justify-center bg-gray-900 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-[0_12px_24px_rgba(0,0,0,0.12)] hover:shadow-[0_16px_32px_rgba(0,0,0,0.16)]">
                Try a Pack
              </Link>
              <Link href="/shop" className="inline-flex items-center justify-center bg-gradient-to-r from-gray-200 to-gray-400 text-gray-900 px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-[0_12px_24px_rgba(0,0,0,0.12)] hover:shadow-[0_16px_32px_rgba(0,0,0,0.16)]">
                Go Pro with 3
              </Link>
              <Link href="/shop" className="inline-flex items-center justify-center bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 px-10 py-4 rounded-full font-bold text-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-[0_12px_24px_rgba(0,0,0,0.12)] hover:shadow-[0_16px_32px_rgba(0,0,0,0.16)]">
                Commit, Go Elite
              </Link>
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
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="mb-8">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Our Mission
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
          
          <div className="bg-white rounded-2xl p-8 md:p-10 mb-8 grid md:grid-cols-2 lg:gap-10 gap-6 items-center">
            <div>
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-left">Let Food Be Thy Medicine</h3>
              <p className="text-lg lg:text-xl text-gray-900 mb-6 leading-relaxed text-left">
                Everyone wants to be healthy but the information and choices available for us is so confusing it leaves us stuck! It's time to make health and nutrition simple so you can be your best you. Here at FuelFoods Industries we are aggressively dedicated to finding the best practices to optimize human health, the natural way.
              </p>
              <p className="text-base lg:text-lg text-gray-900 font-semibold text-left">Join us on our mission to transform health through nutrition!</p>
              <div className="mt-6 text-left">
                <Link
                  href="/about-us"
                  className="inline-flex items-center justify-center bg-[#178641] hover:bg-[#136834] text-white font-extrabold text-base md:text-lg px-8 py-3 rounded-full shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#178641]"
                >
                  Learn Our Story
                </Link>
              </div>
            </div>
            <div className="w-full">
              <div className="w-full h-[240px] sm:h-[300px] md:h-[360px] lg:h-[420px] overflow-hidden rounded-xl shadow-2xl">
                <video className="w-full h-full object-cover object-center" src="/images/About-Us-tiktok-1.mp4" autoPlay muted loop playsInline />
              </div>
            </div>
          </div>
          
          
        </div>
      </section>

      
    </div>
  );
}