"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Link from 'next/link';
export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-white min-h-[700px] overflow-hidden">

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex flex-col lg:flex-row items-center lg:justify-start lg:gap-0 min-h-[700px] pt-2 lg:pt-4">
            {/* Mobile Layout: Headline -> Image -> Content */}
            <div className="w-full lg:w-[35%] text-left py-6 lg:py-20 lg:pr-0">
              <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-black text-gray-900 mb-4 lg:mb-4 leading-[0.95] tracking-tight">
                <span className="block lg:inline">Get 40x More Nutrition</span>
                <br className="hidden lg:block" />
                <span className="block lg:inline">in Every{' '}
                <span className="italic text-orange-500 font-bold">Bite</span></span>
              </h1>

              {/* Mobile Hero Image - Shows between headline and content on mobile */}
              <div className="lg:hidden w-full flex justify-center my-6">
                <img
                  src="/images/hero copy.png"
                  alt="FuelFoods hero"
                  className="w-full max-w-sm h-auto object-contain drop-shadow-xl"
                />
              </div>

              <p className="text-base lg:text-lg text-gray-700 mb-6 leading-snug max-w-[480px]">
                Skip the guesswork of healthy eating. Our microgreens pack 40x more vitamins and nutrients than regular vegetables, delivered fresh from our NYC farm to your door in 48 hours.
              </p>

              {/* Feature checkmarks - Matching Screenshot Style */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 text-fuelfoods-green-500 mr-2 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-800 text-[15px] font-medium">
                    40x More Nutrition Than Regular Vegetables
                  </span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 text-fuelfoods-green-500 mr-2 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-800 text-[15px] font-medium">
                    Grown Fresh, Delivered Weekly to Your Door
                  </span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 text-fuelfoods-green-500 mr-2 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-800 text-[15px] font-medium">
                    No Shopping, No Prep, No Waste Required
                  </span>
                </div>
              </div>

              {/* CTA Button - Single Button as in Screenshot */}
              <div>
                <a
                  href="#plans"
                  className="inline-flex items-center justify-center bg-[#136834] hover:bg-[#0f5429] text-white font-extrabold px-8 py-3 rounded-full text-base uppercase tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-transparent"
                >
                  Start My Health Journey
                </a>
              </div>
            </div>

            {/* Desktop Right visual - Hidden on mobile */}
            <div className="hidden lg:flex w-full lg:w-[65%] justify-center lg:justify-end items-center mt-8 lg:mt-0 relative lg:pr-0">
              <div className="relative z-10">
                <img
                  src="/images/hero copy.png"
                  alt="FuelFoods hero"
                  className="w-full lg:w-[130%] max-w-none h-auto object-contain drop-shadow-xl lg:-translate-x-20"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive What/Why/How Section with Image */}
      <section className="relative bg-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 lg:mb-4">
              Microgreens Made Simple
            </h2>
            
            {/* Mobile Image - Shows after headline on mobile */}
            <div className="lg:hidden w-full flex justify-center my-6">
              <div className="relative">
                <img
                  src="/images/singlewithgreens_final.png"
                  alt="Fresh Microgreens"
                  className="w-full max-w-md h-auto object-contain scale-[1.8]"
                />
              </div>
            </div>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know in 30 seconds
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Interactive Cards */}
            <div className="space-y-6">
              {/* What Card */}
              <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-bl-2xl opacity-50"></div>
                <div className="relative z-10 flex items-start">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2a3 3 0 0 0-3 3c0 1.5 1.5 3 3 3s3-1.5 3-3a3 3 0 0 0-3-3Z" />
                      <path d="M12 8c-3 0-6 2-6 5v7h12v-7c0-3-3-5-6-5Z" />
                      <path d="M8 13h8" />
                      <path d="M8 17h8" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-orange-600 mb-3">What Are Microgreens?</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2"></div>
                        <span className="text-gray-700 text-sm">Baby vegetables with superpowers</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2"></div>
                        <span className="text-gray-700 text-sm">40x more nutrition than regular veggies</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-2"></div>
                        <span className="text-gray-700 text-sm">Like a multivitamin that tastes great</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Card */}
              <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-bl-2xl opacity-50"></div>
                <div className="relative z-10 flex items-start">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 12l2 2 4-4" />
                      <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3" />
                      <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3" />
                      <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3" />
                      <path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-yellow-600 mb-3">Why Microgreens?</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-2"></div>
                        <span className="text-gray-700 text-sm">No more wilted vegetables</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-2"></div>
                        <span className="text-gray-700 text-sm">Skip boring salad prep</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-2"></div>
                        <span className="text-gray-700 text-sm">Actually makes food taste better</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* How Card */}
              <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-bl-2xl opacity-50"></div>
                <div className="relative z-10 flex items-start">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 9V5a3 3 0 0 0-6 0v4" />
                      <rect x="2" y="9" width="20" height="12" rx="2" ry="2" />
                      <circle cx="12" cy="15" r="1" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-green-600 mb-3">How To Use Your Microgreen Packs?</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></div>
                        <span className="text-gray-700 text-sm">Toss on smoothies & salads</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></div>
                        <span className="text-gray-700 text-sm">Add to sandwiches & bowls</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></div>
                        <span className="text-gray-700 text-sm">Eat straight from the pack</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Original Image - Desktop only */}
            <div className="relative hidden lg:block">
              <img
                src="/images/singlewithgreens_final.png"
                alt="Microgreens bursting from package"
                className="absolute top-1/2 right-0 w-full h-auto object-contain scale-[1.8] origin-center-right z-0 -translate-y-1/2"
              />
            </div>
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
              Each blend is carefully crafted to deliver maximum nutrition and
              flavor, harvested at peak freshness for your health journey.
            </p>
          </div>
          {/* Carousel of product varieties */}
          <div className="relative mt-6">
            <Carousel
              opts={{ loop: true, align: 'start' }}
              arrowClassesByIndex={[
                'bg-orange-500 text-white hover:bg-orange-600 ring-2 ring-white/90',
                'bg-[#178641] text-white hover:bg-[#136834] ring-2 ring-white/90',
                'bg-yellow-400 text-yellow-900 hover:bg-yellow-500 ring-2 ring-white/90',
              ]}
              className="w-full overflow-visible"
            >
              <CarouselContent>
                {/* Mega Mix Slide */}
                <CarouselItem>
                  <div className="grid lg:grid-cols-2 gap-12 items-start min-h-[600px]">
                    <div className="pl-8 md:pl-10 lg:pl-14">
                      <div className="mb-6">
                        <span className="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wide mb-3">
                          Most Popular
                        </span>
                        <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                          Mega Mix
                        </h3>
                        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                          <strong>The Ultimate Daily Nutrition Boost</strong><br/>
                          Your daily dose of 9 different vegetables in one convenient pack. Boost energy, support immunity, and feel your best naturally. Perfect for smoothies, salads, or eating straight from the pack.
                        </p>
                        
                        {/* Mobile Image - Shows after title and description on mobile */}
                        <div className="lg:hidden w-full flex justify-center my-6">
                          <img
                            src="/images/megamixsidebyside.jpg"
                            alt="Mega Mix microgreens side by side comparison"
                            className="w-full max-w-sm h-auto object-contain mx-auto rounded-2xl shadow-2xl"
                          />
                        </div>
                        <div className="mb-4">
                          <div className="text-xl font-extrabold text-gray-900 mb-2">
                            Nutrients:
                          </div>
                          <p className="text-gray-700 text-sm lg:text-base">
                            Vitamins A, C, E, K, B5, B6, B12; Thiamin (B1);
                            Riboflavin (B2); Niacin (B3); Folate (B9);
                            anthocyanins, sulforaphane, beta-carotene,
                            magnesium, potassium, calcium, iron.
                          </p>
                        </div>
                        <div className="mb-6">
                          <div className="text-xl font-extrabold text-gray-900 mb-2">
                            Contains:
                          </div>
                          <p className="text-gray-700 text-sm lg:text-base">
                            Green and Purple Daikon Radish, Green and Pak Choi,
                            Kohlrabi, Purple Mustard, Mizuna, Sweet Peas, Beets.
                          </p>
                        </div>
                      </div>
                      <div className="bg-orange-50 p-6 rounded-xl border border-orange-200 mb-8">
                        <h4 className="text-lg font-semibold text-orange-800 mb-3">
                          Key Benefits:
                        </h4>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                            <span className="text-orange-700">
                              9 vegetables in one pack
                            </span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                            <span className="text-orange-700">
                              Natural energy boost
                            </span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                            <span className="text-orange-700">
                              Immune system support
                            </span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                            <span className="text-orange-700">
                              Anti-aging properties
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <a
                          href="#plans"
                          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-colors inline-block text-center"
                        >
                          Order Now
                        </a>
                      </div>
                    </div>
                    {/* Desktop Image - Hidden on mobile */}
                    <div className="hidden lg:block">
                      <div className="relative flex items-center justify-center">
                        <img
                          src="/images/megamixsidebyside.jpg"
                          alt="Mega Mix microgreens side by side comparison"
                          className="w-full max-w-[520px] h-auto object-contain mx-auto rounded-2xl shadow-2xl"
                        />
                      </div>
                    </div>
                  </div>
                </CarouselItem>

                {/* Brassica Blend Slide */}
                <CarouselItem>
                  <div className="grid lg:grid-cols-2 gap-12 items-start min-h-[520px]">
                    {/* Desktop Image - Hidden on mobile */}
                    <div className="relative order-2 lg:order-1 lg:order-none flex items-center justify-center hidden lg:block">
                      <img
                        src="/images/brassicablendsidebyside.jpg"
                        alt="Brassica Blend microgreens variety"
                        className="w-full max-w-[520px] h-auto object-contain mx-auto rounded-2xl shadow-2xl"
                      />
                    </div>
                    <div>
                      <div className="mb-6">
                        <span className="inline-block bg-[#dcfce7] text-[#136834] px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wide mb-3">
                          Power Blend
                        </span>
                        <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                          Brassica Blend
                        </h3>
                        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                          <strong>The Anti-Inflammatory Powerhouse</strong><br/>
                          Nature's way to reduce inflammation, fight aging, and keep your body strong. These cruciferous microgreens are packed with compounds that help your body heal and recover faster.
                        </p>
                        
                        {/* Mobile Image - Shows after title and description on mobile */}
                        <div className="lg:hidden w-full flex justify-center my-6">
                          <img
                            src="/images/brassicablendsidebyside.jpg"
                            alt="Brassica Blend microgreens variety"
                            className="w-full max-w-sm h-auto object-contain mx-auto rounded-2xl shadow-2xl"
                          />
                        </div>
                        <div className="mb-4">
                          <div className="text-xl font-extrabold text-gray-900 mb-2">
                            Nutrients:
                          </div>
                          <p className="text-gray-700 text-sm lg:text-base">
                            Vitamins A, C, E, K, B6; Thiamin (B1); Riboflavin
                            (B2); Niacin (B3); Folate (B9); Sulforaphane;
                            Calcium; Iron; Chlorophyll.
                          </p>
                        </div>
                        <div className="mb-6">
                          <div className="text-xl font-extrabold text-gray-900 mb-2">
                            Contains:
                          </div>
                          <p className="text-gray-700 text-sm lg:text-base">
                            Broccoli, Purple Mustard, Kohlrabi, Sunflower.
                          </p>
                        </div>
                      </div>
                      <div className="bg-[#f0fdf4] p-6 rounded-xl border border-[#bbf7d0] mb-8">
                        <h4 className="text-lg font-semibold text-[#136834] mb-3">
                          Key Benefits:
                        </h4>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-[#178641] rounded-full mr-2"></div>
                            <span className="text-[#136834]">
                              Reduces inflammation naturally
                            </span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-[#178641] rounded-full mr-2"></div>
                            <span className="text-[#136834]">
                              Supports muscle recovery
                            </span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-[#178641] rounded-full mr-2"></div>
                            <span className="text-[#136834]">
                              Boosts mental clarity
                            </span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-[#178641] rounded-full mr-2"></div>
                            <span className="text-[#136834]">
                              Promotes healthy aging
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <a
                          href="#plans"
                          className="bg-[#178641] hover:bg-[#136834] text-white px-8 py-3 rounded-full font-semibold transition-colors inline-block text-center"
                        >
                          Order Now
                        </a>
                      </div>
                    </div>
                  </div>
                </CarouselItem>

                {/* Sunnies Snacks Slide */}
                <CarouselItem>
                  <div className="grid lg:grid-cols-2 gap-12 items-start min-h-[520px]">
                    <div className="pl-8 md:pl-10 lg:pl-14">
                      <div className="mb-6">
                        <span className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wide mb-3">
                          Crunchy & Delicious
                        </span>
                        <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                          Sunnies Snacks
                        </h3>
                        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                          <strong>The Perfect Healthy Snack</strong><br/>
                          Crunchy, delicious, and packed with nutrients that give you glowing skin and lasting energy. These sunflower microgreens taste great and make you feel amazing.
                        </p>
                        
                        {/* Mobile Image - Shows after title and description on mobile */}
                        <div className="lg:hidden w-full flex justify-center my-6">
                          <img
                            src="/images/sunniessidebyside.jpg"
                            alt="Sunnies Snacks sunflower microgreens"
                            className="w-full max-w-sm h-auto object-contain mx-auto rounded-2xl shadow-2xl"
                          />
                        </div>
                        <div className="mb-4">
                          <div className="text-xl font-extrabold text-gray-900 mb-2">
                            Nutrients:
                          </div>
                          <p className="text-gray-700 text-sm lg:text-base">
                            Vitamins A, C, E; Vitamin K; Thiamin (B1);
                            Riboflavin (B2); Niacin (B3); Folate (B9); Vitamin
                            B6; Magnesium; Potassium; Calcium; Iron; Zinc;
                            Phosphorus; Chlorophyll; Bioflavonoids.
                          </p>
                        </div>
                        <div className="mb-6">
                          <div className="text-xl font-extrabold text-gray-900 mb-2">
                            Contains:
                          </div>
                          <p className="text-gray-700 text-sm lg:text-base">
                            Micro Sunflower Shoots.
                          </p>
                        </div>
                      </div>
                      <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200 mb-8">
                        <h4 className="text-lg font-semibold text-yellow-800 mb-3">
                          Perfect For:
                        </h4>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                            <span className="text-yellow-700">
                              Satisfying crunch like nuts
                            </span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                            <span className="text-yellow-700">
                              Glowing, healthy skin
                            </span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                            <span className="text-yellow-700">
                              Sustained natural energy
                            </span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                            <span className="text-yellow-700">
                              Actually tastes delicious
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <a
                          href="#plans"
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-full font-semibold transition-colors inline-block text-center"
                        >
                          Order Now
                        </a>
                      </div>
                    </div>
                    {/* Desktop Image - Hidden on mobile */}
                    <div className="hidden lg:block">
                      <div className="relative flex items-center justify-center">
                        <img
                          src="/images/sunniessidebyside.jpg"
                          alt="Sunnies Snacks sunflower microgreens"
                          className="w-full max-w-[520px] h-auto object-contain mx-auto rounded-2xl shadow-2xl"
                        />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious variant="brand" className="-left-6 size-12 shadow-lg border-0 z-20 ring-2 ring-white/90" />
              <CarouselNext variant="brand" className="-right-6 size-12 shadow-lg border-0 z-20 ring-2 ring-white/90" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Choose Your Subscription Section - Enhanced Design */}
      <section
        id="plans"
        className="bg-gradient-to-br from-fuelfoods-green-500 to-fuelfoods-green-600 pt-4 pb-6 px-4 sm:px-6 lg:px-8 relative overflow-hidden scroll-mt-28 md:scroll-mt-32"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="grid"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 10 0 L 0 0 0 10"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-6">
            <span className="inline-block bg-white bg-opacity-20 text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide mb-4">
              Subscription Plans
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              Choose Your Health Journey
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Starting at just $15 per pack
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-3 lg:gap-3 items-stretch">
            {/* Starter Plan */}
            <div className="bg-white rounded-2xl p-4 shadow-[0_12px_34px_4px_rgba(34,94,20,0.30)] hover:shadow-[0_22px_56px_10px_rgba(34,94,20,0.40)] transition-all duration-300 transform hover:-translate-y-[2px] relative flex flex-col h-full">
              <div className="mb-1.5 h-28 flex items-end justify-center">
                <img
                  src="/images/sunniesfinal.png"
                  alt="Starter Plan - 3 Pack"
                  className="max-h-full w-auto object-contain"
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1.5 text-center">
                Starter Packs
              </h3>
              <div className="mb-2">
                <span className="text-2xl font-bold text-gray-900">$15</span>
                <span className="text-base text-gray-600">per pack</span>
              </div>
              <p className="text-gray-600 mb-3">
                Perfect for first-timers. No commitment needed.
              </p>

              <div className="space-y-1.5 mb-4 text-left">
                <div className="text-gray-700 mb-2">
                  Choose any 1 pack
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-fuelfoods-green-500 mr-3 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">Mega Mix</span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-fuelfoods-green-500 mr-3 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">Brassica Blend</span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-fuelfoods-green-500 mr-3 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">Sunnies Snacks</span>
                </div>
              </div>

              <Link
                href="/configure/starter"
                className="mt-auto w-full bg-[#178641] hover:bg-[#136834] text-white py-2.5 rounded-xl font-semibold transition-colors text-base inline-flex items-center justify-center"
              >
                Get Started
              </Link>
            </div>

            {/* Pro Plan - Most Popular */}
            <div className="bg-white rounded-2xl p-4 shadow-[0_12px_34px_4px_rgba(34,94,20,0.30)] hover:shadow-[0_22px_56px_10px_rgba(34,94,20,0.40)] transition-all duration-300 transform hover:-translate-y-[2px] relative border-4 border-[#c0c0c0] flex flex-col h-full">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg">
                Most Popular
              </div>

              <div className="mb-1.5 h-28 flex items-end justify-center">
                <img
                  src="/images/3packfinal.png"
                  alt="Pro Plan - 3 Pack Weekly"
                  className="max-h-full w-auto object-contain"
                />
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-1.5 text-center">
                Pro Member
              </h3>
              <div className="mb-2">
                <span className="text-2xl font-bold text-gray-900">$45</span>
                <span className="text-base text-gray-600">/week</span>
              </div>
              <p className="text-gray-600 mb-3">
                3 packs delivered weekly. Save money vs one-time purchases.
              </p>

              <div className="space-y-1.5 mb-4 text-left">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-fuelfoods-green-500 mr-3 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Three 3.5oz freshly harvested micro packs delivered weekly
                  </span>
                </div>
                <div className="bg-yellow-50 p-2 rounded-lg border border-yellow-200">
                  <div className="text-center text-yellow-800 font-semibold mb-2">
                    BONUS INCLUDES
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 text-yellow-600 mr-2 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">
                        Microgreens Recipe Guide
                      </span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 text-yellow-600 mr-2 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">
                        Access to Weekly Newsletter with health tips, recipes,
                        new offers, and member discounts
                      </span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 text-yellow-600 mr-2 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">
                        Free Session with a Licensed Nutritionist w/
                        Personalized meal plan
                      </span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 text-yellow-600 mr-2 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">
                        Free Admission to Regional FuelFoods Wellness Events
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/configure/pro"
                className="mt-auto w-full bg-[#e56322] hover:bg-[#d05a1e] text-white py-2.5 rounded-xl font-bold transition-colors text-base shadow-lg inline-flex items-center justify-center"
              >
                Start Pro Plan
              </Link>
            </div>

            {/* Elite Plan */}
            <div className="bg-white rounded-2xl p-4 shadow-[0_12px_34px_4px_rgba(34,94,20,0.30)] hover:shadow-[0_22px_56px_10px_rgba(34,94,20,0.40)] transition-all duration-300 transform hover:-translate-y-[2px] relative border-4 border-yellow-400 flex flex-col h-full">
              <div className="mb-1.5 h-28 flex items-end justify-center">
                <img
                  src="/images/5packfinal.png"
                  alt="Elite Plan - 5 Pack Weekly"
                  className="max-h-full w-auto object-contain"
                />
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-1.5 text-center">
                Elite Member
              </h3>
              <div className="mb-2.5">
                <span className="text-2xl font-bold text-gray-900">$75</span>
                <span className="text-base text-gray-600">/week</span>
              </div>
              <p className="text-gray-600 mb-3">
                5 packs delivered weekly. Maximum variety and nutrition.
              </p>

              <div className="space-y-3 mb-8 text-left">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-fuelfoods-green-500 mr-3 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Five 3.5oz freshly harvested micro packs delivered weekly
                  </span>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                  <div className="text-center text-yellow-800 font-semibold mb-2">
                    PLUS
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 text-yellow-600 mr-2 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">
                        Microgreens Recipe Guide
                      </span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 text-yellow-600 mr-2 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">
                        Access to Weekly Newsletter with health tips, recipes,
                        new offers, and member discounts
                      </span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 text-yellow-600 mr-2 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">
                        Free Session with a Licensed Nutritionist w/
                        Personalized meal plan
                      </span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 text-yellow-600 mr-2 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">
                        Free Admission to Regional FuelFoods Wellness Events
                      </span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 text-yellow-600 mr-2 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">
                        Early Access to New Exclusive Products to optimize your
                        health
                      </span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 text-yellow-600 mr-2 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">
                        Exclusive discounts on participating health product
                        vendors (coming soon)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/configure/elite"
                className="mt-auto w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 py-2.5 rounded-xl font-bold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 text-base shadow-lg inline-flex items-center justify-center"
              >
                Start Elite Plan
              </Link>
            </div>
          </div>
          
          {/* Risk Reversal Section */}
          <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-2xl p-8 max-w-4xl mx-auto text-center">
            <div className="text-2xl font-bold text-yellow-800 mb-4">
              100% Satisfaction Guaranteed
            </div>
            <p className="text-yellow-700 text-lg">
              Not happy with your first delivery? We will refund every penny and let you keep the greens.<br/>
              <span className="font-semibold">Cancel anytime. No commitment needed.</span>
            </p>
          </div>
        </div>
      </section>

      {/* The Ultimate Superfood Section */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Why Microgreens Beat Every Other Superfood
          </h2>
          <h3 className="text-xl lg:text-2xl font-semibold text-gray-700 mb-10">
            All the benefits of expensive supplements, but it's actually delicious food
          </h3>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <div className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-[0_24px_80px_12px_rgba(229,99,34,0.22)]">
              <img
                src="/images/bikerider.png"
                alt="Biker fueling performance with microgreens"
                className="w-full h-64 object-cover filter drop-shadow-[0_40px_90px_rgba(229,99,34,0.5)]"
              />
            </div>
            <div className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-[0_24px_80px_12px_rgba(229,99,34,0.22)]">
              <img
                src="/images/gymdrinker.png"
                alt="Gym-goer recovering with nutrient-dense greens"
                className="w-full h-64 object-cover filter drop-shadow-[0_40px_90px_rgba(229,99,34,0.5)]"
              />
            </div>
            <div className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-[0_24px_80px_12px_rgba(229,99,34,0.22)]">
              <img
                src="/images/runners.png"
                alt="Runners energized by whole-food nutrition"
                className="w-full h-64 object-cover filter drop-shadow-[0_40px_90px_rgba(229,99,34,0.5)]"
              />
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-[0_10px_30px_rgba(23,134,65,0.06)] hover:shadow-[0_18px_42px_rgba(23,134,65,0.12)] transition-shadow h-full text-left">
              <div className="w-10 h-10 rounded-lg bg-fuelfoods-green-100 text-fuelfoods-green-600 flex items-center justify-center mb-4">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="13 2 3 14 12 14 11 22 21 10 13 10 13 2" />
                </svg>
              </div>
              <h4 className="text-base font-bold text-gray-900 mb-1">
                More Nutrition Than Any Pill
              </h4>
              <p className="text-gray-700 text-sm">
                One pack of our microgreens has more nutrition than expensive multivitamins and your body actually absorbs it because it is real food, not synthetic chemicals.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-[0_10px_30px_rgba(23,134,65,0.06)] hover:shadow-[0_18px_42px_rgba(23,134,65,0.12)] transition-shadow h-full text-left">
              <div className="w-10 h-10 rounded-lg bg-fuelfoods-green-100 text-fuelfoods-green-600 flex items-center justify-center mb-4">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2l7 4v5c0 5-3.5 9-7 11-3.5-2-7-6-7-11V6l7-4z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <h4 className="text-base font-bold text-gray-900 mb-1">
                Stronger Immune System
              </h4>
              <p className="text-gray-700 text-sm">
                Packed with immune-boosting compounds that help your body fight off whatever is going around the office or subway.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-[0_10px_30px_rgba(23,134,65,0.06)] hover:shadow-[0_18px_42px_rgba(23,134,65,0.12)] transition-shadow h-full text-left">
              <div className="w-10 h-10 rounded-lg bg-fuelfoods-green-100 text-fuelfoods-green-600 flex items-center justify-center mb-4">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <rect x="3" y="3" width="7" height="7" rx="1.5" />
                  <rect x="14" y="3" width="7" height="7" rx="1.5" />
                  <rect x="3" y="14" width="7" height="7" rx="1.5" />
                  <rect x="14" y="14" width="7" height="7" rx="1.5" />
                </svg>
              </div>
              <h4 className="text-base font-bold text-gray-900 mb-1">
                All-Day Natural Energy
              </h4>
              <p className="text-gray-700 text-sm">
                Real nutrients give you steady energy that lasts all day with no caffeine crash or sugar highs and lows.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-[0_10px_30px_rgba(23,134,65,0.06)] hover:shadow-[0_18px_42px_rgba(23,134,65,0.12)] transition-shadow h-full text-left">
              <div className="w-10 h-10 rounded-lg bg-fuelfoods-green-100 text-fuelfoods-green-600 flex items-center justify-center mb-4">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h4 className="text-base font-bold text-gray-900 mb-1">
                Glowing Skin & Hair
              </h4>
              <p className="text-gray-700 text-sm">
                The antioxidants and vitamins that make you glow from the inside out. Better than any expensive skincare routine.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-[0_10px_30px_rgba(23,134,65,0.06)] hover:shadow-[0_18px_42px_rgba(23,134,65,0.12)] transition-shadow h-full text-left">
              <div className="w-10 h-10 rounded-lg bg-fuelfoods-green-100 text-fuelfoods-green-600 flex items-center justify-center mb-4">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 3h6M10 3v6l-3 5a4 4 0 108 0l-3-5V3" />
                </svg>
              </div>
              <h4 className="text-base font-bold text-gray-900 mb-1">
                Reduce Inflammation Fast
              </h4>
              <p className="text-gray-700 text-sm">
                Natural anti-inflammatory compounds help reduce joint pain, muscle soreness, and that general blah feeling.
              </p>
            </div>
          </div>

          
        </div>
      </section>

      {/* Fresh Greens Delivered Weekly Section - Modern Layout */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl lg:text-5xl font-bold text-fuelfoods-green-500 mb-4">
              Why New Yorkers Choose FuelFoods
            </h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto">
              Join the easiest healthy eating movement in NYC
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
                  <svg
                    className="w-5 h-5 text-fuelfoods-green-500 mr-3 flex-shrink-0 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    <strong>Fresh nutrition delivered weekly.</strong> We grow and harvest specifically for your delivery, so you always get the freshest nutrition without grocery store trips.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-fuelfoods-green-500 mr-3 flex-shrink-0 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    <strong>Organic, pesticide-free growing.</strong> We use only organic, non-GMO seeds and pesticide-free growing practices, so you are getting pure nutrition without any nasty chemicals.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-fuelfoods-green-500 mr-3 flex-shrink-0 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    <strong>Maximum variety in every pack.</strong> Get more variety in your diet without buying and wasting multiple types of produce.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-fuelfoods-green-500 mr-3 flex-shrink-0 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    <strong>Real food, not synthetic supplements.</strong> Get your vitamins from real food delivered to your door, not synthetic pills that your body cannot absorb properly.
                  </span>
                </li>
              </ul>

              <div className="mt-10 text-center">
                <a
                  href="#plans"
                  aria-label="Choose Your Greens"
                  className="inline-flex items-center justify-center bg-[#178641] hover:bg-[#136834] text-white font-extrabold text-lg px-10 py-4 rounded-full shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#178641]"
                >
                  Choose Your Greens!
                </a>
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
              See why our customers give us a 5-star rating for our fresh microgreens
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-fuelfoods-green-500 mb-2">
                5★
              </div>
              <div className="text-gray-600 font-medium">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-fuelfoods-green-500 mb-2">
                98%
              </div>
              <div className="text-gray-600 font-medium">Would Recommend</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-fuelfoods-green-500 mb-2">
                24-48h
              </div>
              <div className="text-gray-600 font-medium">Fresh Delivery</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
            {[
              {
                quote:
                  "I order from FuelFoods every other week, normally 2-3 packages of greens (the Mustard is my favorite.) They're always prompt on delivery, and the food is always fresh.",
                author: 'Romel L',
                location: 'New York, NY',
                rating: 5,
                verified: true,
                highlight: 'Always prompt delivery',
              },
              {
                quote:
                  "Great NYC locally grown microgreens that are great to munch on as some finger food for a party (they're very flavorful), or even a crunchy snack while watching a movie.",
                author: 'Viviana A',
                location: 'Brooklyn, NY',
                rating: 5,
                verified: true,
                highlight: 'Perfect for entertaining',
              },
              {
                quote:
                  'Always get the freshest greens and they convinced me to change my snack choice to micro radishes, game changer!',
                author: 'Tené L',
                location: 'Manhattan, NY',
                rating: 5,
                verified: true,
                highlight: 'Life-changing healthy snacks',
              },
              {
                quote:
                  "Absolutely love these tasty micro greens. I eat them every day, either in salad or as a side with salmon. They're fresh & delicious !!! Lifetime customer!",
                author: 'Trixie D',
                location: 'Queens, NY',
                rating: 5,
                verified: true,
                highlight: 'Daily nutrition boost',
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative border border-gray-100"
              >
                {testimonial.verified && (
                  <div className="absolute -top-3 -right-3 bg-fuelfoods-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}

                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-sm text-gray-500">
                    Verified Purchase
                  </span>
                </div>

                <blockquote className="text-gray-700 text-base mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">
                        {testimonial.author}
                      </div>
                      <div className="text-sm text-gray-500">
                        {testimonial.location}
                      </div>
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
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="#178641"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Quality Guaranteed
                </h3>
                <p className="text-gray-600 text-sm">
                  Fresh or your money back promise
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                  <svg
                    className="w-8 h-8 text-orange-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Fast Delivery
                </h3>
                <p className="text-gray-600 text-sm">
                  24-48 hours from harvest to door
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                  <svg
                    className="w-8 h-8 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Z" />
                    <path d="M12 6v6l4 2" />
                    <path d="M16 8a6 6 0 0 0-6-6" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Expert Support
                </h3>
                <p className="text-gray-600 text-sm">
                  Nutrition guidance from licensed professionals
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg text-gray-600 mb-6">
              Ready to join our community of health-conscious customers?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/configure/starter"
                className="inline-flex items-center justify-center bg-[#178641] hover:bg-[#136834] text-white px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 shadow-[0_12px_24px_rgba(0,0,0,0.12)] hover:shadow-[0_16px_32px_rgba(0,0,0,0.16)]"
              >
                Try a Pack
              </Link>
              <Link
                href="/configure/pro"
                className="inline-flex items-center justify-center bg-[#e56322] hover:bg-[#d05a1e] text-white px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 shadow-[0_12px_24px_rgba(0,0,0,0.12)] hover:shadow-[0_16px_32px_rgba(0,0,0,0.16)]"
              >
                Go Pro with 3
              </Link>
              <Link
                href="/configure/elite"
                className="inline-flex items-center justify-center bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 px-8 py-3 rounded-full font-bold text-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-[0_12px_24px_rgba(0,0,0,0.12)] hover:shadow-[0_16px_32px_rgba(0,0,0,0.16)]"
              >
                Commit, Go Elite
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Enhanced */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-20 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="bg-white rounded-2xl p-8 md:p-10 mb-8 grid md:grid-cols-2 lg:gap-10 gap-6 items-center">
            <div>
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-left">
                Your Health Shouldn't Be Complicated
              </h3>
              <p className="text-lg lg:text-xl text-gray-900 mb-6 leading-relaxed text-left">
                Like you, we were tired of buying expensive vegetables that went bad before we could eat them. Tired of trying to figure out what supplements actually worked. Tired of feeling guilty about not eating enough vegetables.
              </p>
              <p className="text-lg lg:text-xl text-gray-900 mb-6 leading-relaxed text-left">
                Then we discovered microgreens in 2020 and everything changed. These tiny plants pack 40x more nutrition than regular vegetables, taste amazing, and last for days in your fridge. No more waste, no more guilt, no more confusion.
              </p>
              <p className="text-base lg:text-lg text-gray-900 font-semibold text-left">
                <strong>Join the movement. Your future self will thank you.</strong>
              </p>
              <div className="mt-6 text-center">
                <Link
                  href="/about-us"
                  className="inline-flex items-center justify-center bg-[#178641] hover:bg-[#136834] text-white font-extrabold text-base md:text-lg px-8 py-3 rounded-full shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#178641]"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="w-full">
              <div className="w-full h-[240px] sm:h-[300px] md:h-[360px] lg:h-[420px] overflow-hidden rounded-xl shadow-2xl">
                <video
                  suppressHydrationWarning
                  className="w-full h-full object-cover object-center"
                  src="/images/About-Us-tiktok-1.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
