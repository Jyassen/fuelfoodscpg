"use client";
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: 'Our Story: Why We Started FuelFoods - Fresh Microgreens NYC',
  description:
    'NYC\'s freshest microgreens grown by local Black-owned farm. Learn how we\'re making healthy eating simple for thousands of New Yorkers. Try your first pack!',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero with split image/content, matching home style */}
      <section className="relative bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-[1.05] tracking-tight">
              We Started FuelFoods Because Healthy Eating Was Too Hard, Too Expensive, and Too Time-Consuming
            </h1>
            <div className="space-y-5 text-gray-800">
              <p>
                <strong>Like you, we were tired of buying expensive vegetables that went bad before we could eat them. Tired of trying to figure out what supplements actually worked. Tired of feeling guilty about not eating enough vegetables.</strong>
              </p>
              <p>
                I'm Jada, and this is my brother Jamal. We're lifelong New Yorkers who discovered something amazing in 2020 that changed everything for us—and now for thousands of our neighbors.
              </p>
              <p>
                When the pandemic hit, we watched people get sicker and sicker, especially in our community. We saw how expensive "healthy" food was, how quickly fresh produce spoiled, and how confusing all the nutrition advice had become. There had to be a better way.
              </p>
              <p>
                <strong>Then we discovered microgreens.</strong> These tiny plants pack up to 40x more nutrition than regular vegetables, taste incredible, stay fresh for days, and you can grow them anywhere. We converted our garage into a farm and started growing the most nutrient-dense food in NYC.
              </p>
              <p>
                Today, we grow fresh microgreens for over 10,000 New Yorkers and 30+ restaurants. No more wilted salads. No more expensive supplements that don't work. No more confusion about what to eat.
              </p>
              <p>
                <strong>Just real food that makes you feel amazing, delivered fresh to your door.</strong>
              </p>
              <p className="text-lg font-semibold text-fuelfoods-green-600">
                Join the movement. Your future self will thank you.
              </p>
              {/* No CTA in this first panel per request */}
            </div>
          </div>
          <div className="lg:sticky lg:top-24">
            <div className="w-full h-[260px] sm:h-[360px] lg:h-[520px] overflow-hidden rounded-2xl shadow-2xl">
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
      </section>

      {/* Restaurant Partnerships */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="w-full h-[260px] sm:h-[340px] lg:h-[420px] overflow-hidden rounded-2xl shadow-xl">
              <img
                src="/images/Restaurant-Partnerships.jpg"
                alt="Restaurant partnerships and dishes"
                className="w-full h-full object-cover object-bottom"
              />
            </div>
          </div>
          <div>
            <h3 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
              Restaurant Partnerships: Fueling Culinary Excellence
            </h3>
            <p className="text-gray-700 mb-6">
              FuelFoods collaborates with restaurants that share our commitment
              to fresh, tasty, and high‑quality foods. For our seasonal catalog
              and pricing contact us at{' '}
              <a
                href="mailto:info@fuelfoods.store"
                className="text-fuelfoods-green-600 underline"
              >
                info@fuelfoods.store
              </a>
              .
            </p>
            <p className="text-gray-700 mb-6">
              We are proud to serve 30+ NYC restaurants across a wide range of
              cuisines, each with the same passion for fresh, artisan
              ingredients that elevate any dish.
            </p>
            <a
              href="https://culinary.fuelfoods.store/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#178641] hover:bg-[#136834] text-white font-bold px-8 py-3 rounded-full shadow-lg transition-colors"
            >
              See Our Selection
            </a>
          </div>
        </div>
      </section>

      {/* Quality + Sustainability block */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="w-full h-[300px] sm:h-[340px] lg:h-[400px] overflow-hidden rounded-2xl shadow-xl">
              <img
                src="/images/farmpic.jpg"
                alt="Microgreens growing"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Where quality meets sustainability, and your health thrives with
              every bite.
            </h2>
            <p className="text-gray-700 mb-4">
              At FuelFoods, we&apos;re passionate about delivering the best
              natural foods to your plate. That&apos;s why we prioritize organic
              and Non-GMO practices, ensuring our microgreens grow in harmony
              with nature—from seed to soil. With no pesticides or chemical
              additives, our microgreens are nurtured with pure, filtered water
              and no inorganic fertilizers.
            </p>
            <p className="text-gray-700">
              But our commitment doesn&apos;t stop there. We&apos;re dedicated
              to regenerative practices, producing abundant compostable
              material. Currently, our compost is available for community
              gardens and special donations. If you&apos;re interested in our
              compost, please get in touch at{' '}
              <a
                href="mailto:info@fuelfoods.store"
                className="text-fuelfoods-green-600 underline"
              >
                info@fuelfoods.store
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Community + Partnerships */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              Community Collaboration
            </h3>
            <h4 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Empowering NYC Students
            </h4>
            <p className="text-gray-700 mb-4">
              FuelFoods offers an internship program for NYC students, teaching
              them to grow whole foods, make healthier choices, and develop
              essential business skills. We&apos;re committed to equipping the
              next generation with AI technology and tools for future job
              markets. We also provide potential job placement for talented
              interns with culinary interests through our restaurant partners.
              Join us in empowering our community through the power of choice.
              For more information email us at{' '}
              <a
                href="mailto:info@fuelfoods.store"
                className="text-fuelfoods-green-600 underline"
              >
                info@fuelfoods.store
              </a>
              .
            </p>
            <h4 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              MWBE Certification
            </h4>
            <p className="text-gray-700">
              FuelFoods Industries LLC is committed to fostering meaningful
              partnerships within our community and beyond. As a certified
              Minority/Women-Owned Business Enterprise (MWBE), we actively
              collaborate with restaurants across New York City, providing them
              with premium microgreens, edible flowers, and specialty produce
              that enhance their culinary offerings. Our three years of proven
              experience in maintaining consistent, high-quality deliveries has
              built lasting relationships based on trust, sustainability, and
              shared commitment to healthier eating. We believe in the power of
              collaboration to create positive change in our food system, and
              we&apos;re always seeking new partnerships with like-minded
              organizations, government agencies, and community groups who share
              our vision of making nutritious, sustainable food accessible to
              broader markets.
            </p>
            <div className="pt-6">
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center bg-[#178641] hover:bg-[#136834] text-white font-extrabold px-8 py-3 rounded-full shadow-lg transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
          <div>
            <div className="w-full h-[360px] sm:h-[480px] lg:h-[560px] overflow-hidden rounded-2xl shadow-xl">
              <img
                src="/images/Community-Collaboration-1.jpg"
                alt="Community Collaboration"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Removed bottom CTA per request */}
    </div>
  );
}
