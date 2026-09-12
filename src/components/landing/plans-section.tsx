import Image from 'next/image';
import Link from 'next/link';
import { CtaLink } from './cta-link';
import { PlanCheck } from './plan-check';

export function PlansSection() {
  return (
    <section
      id="plans"
      className="relative scroll-mt-28 overflow-hidden bg-gradient-to-br from-fuelfoods-green-500 to-fuelfoods-green-600 px-4 py-16 sm:px-6 lg:px-8 md:scroll-mt-32"
    >
      <div className="relative z-10 mx-auto max-w-7xl text-center">
        <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-2 font-subheadline text-sm font-medium uppercase tracking-[0.18em] text-white">
          Start your subscription
        </span>
        <h2 className="font-headline mb-3 text-3xl font-bold text-white lg:text-4xl">
          It&apos;s $15 a pack
        </h2>
        <p className="mx-auto mb-10 max-w-2xl font-body text-lg text-white/90">
          Subscribe and your first month ships free. Pause or cancel anytime.
        </p>

        <div className="grid items-stretch gap-4 md:grid-cols-3 lg:gap-5">
          <article className="relative flex h-full flex-col rounded-2xl bg-white p-5 text-left shadow-[0_12px_34px_4px_rgba(34,94,20,0.30)]">
            <div className="mb-2 flex h-28 items-end justify-center">
              <Image
                src="/images/sunniesfinal.png"
                alt="Starter pack of FuelFoods microgreens"
                width={1920}
                height={1920}
                sizes="200px"
                className="max-h-full w-auto object-contain"
              />
            </div>
            <h3 className="font-headline mb-1 text-center text-lg font-bold text-gray-900">
              Starter Packs
            </h3>
            <p className="mb-2 text-center">
              <span className="font-headline text-2xl font-bold text-gray-900">
                $15
              </span>
              <span className="font-body text-base text-gray-600">
                {' '}
                per pack
              </span>
            </p>
            <p className="mb-4 font-body text-gray-600">
              Perfect for first-timers. No commitment needed.
            </p>
            <ul className="mb-5 space-y-2">
              <PlanCheck>Choose any 1 pack</PlanCheck>
              <PlanCheck>Mega Mix</PlanCheck>
              <PlanCheck>Brassica Blend</PlanCheck>
              <PlanCheck>Sunnies Snacks</PlanCheck>
            </ul>
            <Link
              href="/configure/starter"
              className="mt-auto inline-flex w-full items-center justify-center rounded-xl bg-[#178641] py-2.5 font-headline text-base font-bold text-white transition-colors hover:bg-[#136834]"
            >
              Get Started
            </Link>
          </article>

          <article className="relative flex h-full flex-col rounded-2xl border-4 border-[#c0c0c0] bg-white p-5 text-left shadow-[0_12px_34px_4px_rgba(34,94,20,0.30)]">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 px-4 py-1.5 font-headline text-xs font-bold uppercase tracking-wide text-yellow-900 shadow-lg">
              Most Popular
            </div>
            <div className="mb-2 flex h-28 items-end justify-center">
              <Image
                src="/images/3packfinal.png"
                alt="Pro plan with three FuelFoods packs"
                width={1920}
                height={960}
                sizes="200px"
                className="max-h-full w-auto object-contain"
              />
            </div>
            <h3 className="font-headline mb-1 text-center text-lg font-bold text-gray-900">
              Pro Member
            </h3>
            <p className="mb-2 text-center">
              <span className="font-headline text-2xl font-bold text-gray-900">
                $45
              </span>
              <span className="font-body text-base text-gray-600">/week</span>
            </p>
            <p className="mb-4 font-body text-gray-600">
              3 packs delivered weekly. Save money vs one-time purchases.
            </p>
            <ul className="mb-4 space-y-2">
              <PlanCheck>
                Three 3.5oz freshly harvested micro packs delivered weekly
              </PlanCheck>
            </ul>
            <div className="mb-5 rounded-lg border border-yellow-200 bg-yellow-50 p-3">
              <p className="mb-2 text-center font-headline text-sm font-bold text-yellow-800">
                BONUS INCLUDES
              </p>
              <ul className="space-y-2">
                <PlanCheck tone="yellow">Microgreens Recipe Guide</PlanCheck>
                <PlanCheck tone="yellow">
                  Weekly newsletter with health tips, recipes, offers, and
                  member discounts
                </PlanCheck>
                <PlanCheck tone="yellow">
                  Free session with a licensed nutritionist and a personalized
                  meal plan
                </PlanCheck>
                <PlanCheck tone="yellow">
                  Free admission to regional FuelFoods wellness events
                </PlanCheck>
              </ul>
            </div>
            <Link
              href="/configure/pro"
              className="mt-auto inline-flex w-full items-center justify-center rounded-xl bg-[#e56322] py-2.5 font-headline text-base font-bold text-white shadow-lg transition-colors hover:bg-[#d05a1e]"
            >
              Start Pro Plan
            </Link>
          </article>

          <article className="relative flex h-full flex-col rounded-2xl border-4 border-yellow-400 bg-white p-5 text-left shadow-[0_12px_34px_4px_rgba(34,94,20,0.30)]">
            <div className="mb-2 flex h-28 items-end justify-center">
              <Image
                src="/images/5packfinal.png"
                alt="Elite plan with five FuelFoods packs"
                width={1920}
                height={960}
                sizes="200px"
                className="max-h-full w-auto object-contain"
              />
            </div>
            <h3 className="font-headline mb-1 text-center text-lg font-bold text-gray-900">
              Elite Member
            </h3>
            <p className="mb-2 text-center">
              <span className="font-headline text-2xl font-bold text-gray-900">
                $75
              </span>
              <span className="font-body text-base text-gray-600">/week</span>
            </p>
            <p className="mb-4 font-body text-gray-600">
              5 packs delivered weekly. Maximum variety and nutrition.
            </p>
            <ul className="mb-4 space-y-2">
              <PlanCheck>
                Five 3.5oz freshly harvested micro packs delivered weekly
              </PlanCheck>
            </ul>
            <div className="mb-5 rounded-lg border border-yellow-200 bg-yellow-50 p-3">
              <p className="mb-2 text-center font-headline text-sm font-bold text-yellow-800">
                PLUS
              </p>
              <ul className="space-y-2">
                <PlanCheck tone="yellow">Everything in Pro</PlanCheck>
                <PlanCheck tone="yellow">
                  Early access to new exclusive products
                </PlanCheck>
                <PlanCheck tone="yellow">
                  Exclusive discounts on participating health vendors (coming
                  soon)
                </PlanCheck>
              </ul>
            </div>
            <Link
              href="/configure/elite"
              className="mt-auto inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 py-2.5 font-headline text-base font-bold text-yellow-900 shadow-lg transition-all hover:from-yellow-500 hover:to-yellow-600"
            >
              Start Elite Plan
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
