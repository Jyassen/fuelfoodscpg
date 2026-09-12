import Image from 'next/image';
import { Check, Pause, Shield } from 'lucide-react';
import { CtaLink } from './cta-link';
import { PlansSection } from './plans-section';
import { StickyCta } from './sticky-cta';

const GREENS = [
  { src: '/images/Radish.png', label: 'Daikon radish' },
  { src: '/images/Daikon-1.png', label: 'Purple radish' },
  { src: '/images/Beet-1.png', label: 'Beet' },
  { src: '/images/Kohlrabi.png', label: 'Kohlrabi' },
  { src: '/images/Mustard.png', label: 'Mustard' },
  { src: '/images/Broccoli.png', label: 'Broccoli' },
  { src: '/images/Sunflowers.png', label: 'Sunflower' },
  { src: '/images/Arugula.png', label: 'Arugula' },
  { src: '/images/Broccoli-1.png', label: 'Brassica' },
] as const;

const MEAL_MOMENTS = [
  {
    src: '/images/magnific/sandwich-greens.webp',
    alt: 'Sunnies microgreens being added to a breakfast sandwich',
    label: 'On the sandwich you already ordered',
  },
  {
    src: '/images/magnific/smoothie-greens.webp',
    alt: 'FuelFoods microgreens being poured into a berry smoothie',
    label: 'Into the smoothie already in the blender',
  },
  {
    src: '/images/magnific/salad-greens.webp',
    alt: 'Fresh microgreens in a simple salad bowl',
    label: 'Over a five-minute salad',
  },
  {
    src: '/images/magnific/burrata.webp',
    alt: 'Burrata and tomatoes finished with colorful microgreens',
    label: 'Or straight onto dinner',
  },
] as const;

const TESTIMONIALS = [
  {
    quote:
      "Absolutely love these tasty micro greens. I eat them every day, either in salad or as a side with salmon. They're fresh & delicious !!! Lifetime customer!",
    author: 'Trixie D',
    location: 'Queens, NY',
    highlight: 'The habit stuck',
  },
  {
    quote:
      "I order from FuelFoods every other week, normally 2-3 packages of greens (the Mustard is my favorite.) They're always prompt on delivery, and the food is always fresh.",
    author: 'Romel L',
    location: 'New York, NY',
    highlight: 'No wilted produce',
  },
  {
    quote:
      'Always get the freshest greens and they convinced me to change my snack choice to micro radishes, game changer!',
    author: 'Tené L',
    location: 'Manhattan, NY',
    highlight: 'Zero-effort Tuesday',
  },
] as const;

const INSIDE = [
  {
    title: 'Harvest-to-door in 48 hours.',
    body: 'Microgreens lose nutrition by the day after cutting. Most “fresh” produce is days or weeks old by the time you unpack it. Your FuelFoods box goes from harvest to your door within 48 hours — you’ll see the difference before you taste it.',
  },
  {
    title: 'Up to 40x the nutrients of regular vegetables.',
    body: 'Not a slogan; a measurable claim, tied to the named vitamin and mineral profile printed on every blend. You’re not getting “more greens.” You’re getting meaningfully denser ones, with a specific reason behind them.',
  },
  {
    title: 'Preselected blends instead of a mystery box.',
    body: 'No 5pm “what do I even do with this” decision. Each blend has a single named job, so you pick once and the thinking is over.',
  },
  {
    title: 'No shopping, no prep, no waste.',
    body: 'Toss on, add to, or sprinkle into whatever you’re already making. This is the offer’s sharpest line, so we’ll say it plainly: the labor is gone.',
  },
  {
    title: 'Weekly fixed cadence.',
    body: 'You don’t re-decide every week. The delivery is the habit.',
  },
  {
    title: 'A recipe guide, a newsletter, and member pricing.',
    body: 'The people who’ve never used microgreens get their answers before they have to ask — without adding a minute of work.',
  },
  {
    title:
      'A free session with a licensed nutritionist, plus a personalized meal plan.',
    body: 'Most boxes of greens end at the doorstep. Yours comes with a plan built for you, so the first week isn’t a guessing game.',
  },
  {
    title: 'Early access to new products and member events.',
    body: 'Because a subscription should get better the longer you stay, not feel like a bill you forgot.',
  },
] as const;

function Slip({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-subheadline text-xs font-medium uppercase tracking-[0.22em] text-fuelfoods-green-500">
      {children}
    </p>
  );
}

function Letter({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-[680px] space-y-5 font-body text-lg leading-[1.75] text-gray-700">
      {children}
    </div>
  );
}

export function SalesLanding() {
  return (
    <div className="min-h-screen bg-white pb-24 md:pb-0">
      <Hero />
      <ProofBar />
      <Lead />
      <Handled />
      <MealMoments />
      <FuelFlow />
      <Testimonials />
      <WhatsInside />
      <Fork />
      <PlansSection />
      <Guarantees />
      <StickyCta />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 pb-12 pt-8 sm:px-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)] lg:gap-8 lg:px-8 lg:pb-16 lg:pt-10">
        <div className="text-center lg:text-left">
          <Slip>Daily vegetables, handled</Slip>
          <h1 className="font-headline mt-4 text-4xl font-bold leading-[1.02] tracking-tight text-gray-900 sm:text-5xl lg:text-[48px] xl:text-[54px]">
            <span className="block">
              Eat <span className="italic text-[#e56322]">9</span> vegetables a
              day
            </span>
            <span className="block">without touching a cutting board.</span>
          </h1>
          <div className="my-6 flex justify-center lg:hidden">
            <Image
              src="/images/hero copy.png"
              alt="FuelFoods Mega Mix, Brassica Blend, and Sunnies Snacks pouches"
              width={1920}
              height={960}
              priority
              sizes="(max-width: 1024px) 90vw, 0px"
              className="h-auto w-full max-w-md object-contain drop-shadow-xl"
            />
          </div>
          <p className="mx-auto mt-5 max-w-[540px] font-subheadline text-base leading-snug text-gray-700 lg:mx-0 lg:text-lg">
            Skip the mystery powder. Get fresh-harvested microgreens you can
            actually see, taste, and trust — delivered weekly and ready for
            whatever you&apos;re already eating.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <CtaLink href="#plans" size="lg" arrow>
              Start your subscription
            </CtaLink>
            <p className="font-body text-sm text-gray-600">
              $15 a pack · first month ships free
            </p>
          </div>
        </div>
        <div className="relative hidden lg:block">
          <Image
            src="/images/hero copy.png"
            alt="FuelFoods Mega Mix, Brassica Blend, and Sunnies Snacks pouches"
            width={1920}
            height={960}
            priority
            sizes="50vw"
            className="h-auto w-full max-w-none object-contain drop-shadow-xl lg:scale-110 lg:translate-x-4"
          />
        </div>
      </div>
    </section>
  );
}

function ProofBar() {
  const items = [
    { k: '48 hrs', v: 'Harvest to door' },
    { k: '40x', v: 'The nutrients of regular vegetables' },
    { k: '5 min', v: 'To add to a meal you already eat' },
    { k: '$15', v: 'A pack · pause anytime' },
  ];
  return (
    <section className="border-y border-fuelfoods-green-100 bg-fuelfoods-green-50">
      <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 lg:grid-cols-4 lg:px-8">
        {items.map(item => (
          <div key={item.k} className="text-center lg:text-left">
            <dt className="font-headline text-2xl font-bold text-fuelfoods-green-500">
              {item.k}
            </dt>
            <dd className="mt-1 font-body text-sm text-gray-700">{item.v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Lead() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <Letter>
        <Slip>The real problem</Slip>
        <p>You buy vegetables with the best intentions.</p>
        <p>
          You get home on a Sunday. You fill the crisper. You tell yourself{' '}
          <em>this</em> is the week.
        </p>
        <p>
          Then Wednesday comes and you&apos;re staring at a schedule that ate
          your one free hour, a fridge full of produce that&apos;s already
          softening, and a to-do list where &ldquo;eat better&rdquo; keeps
          getting pushed to tomorrow.
        </p>
        <p>
          Six days later you&apos;re throwing half of it in the trash — wilted
          lettuce, limp greens, a kale you never got around to. And somewhere
          underneath, a low-grade guilt that you eat like someone who
          doesn&apos;t care about their body, even though you care a lot.
        </p>
        <p>
          Here&apos;s the part nobody tells you: eating well was never your
          problem.
        </p>
        <p>Your problem is logistics.</p>
        <p>
          Healthy eating demands recurring, unpaid labor — planning meals,
          shopping, prepping, cooking, and eating food before it rots — stacked
          on top of a calendar that&apos;s already fully committed.
        </p>
        <blockquote className="border-l-4 border-[#e56322] py-1 pl-5 font-headline text-2xl font-bold leading-snug text-gray-900 sm:text-3xl">
          That&apos;s a logistics problem wearing a health problem&apos;s
          clothes.
        </blockquote>
        <p>
          And logistics problems don&apos;t get solved with more willpower. They
          get solved by removing the work.
        </p>
      </Letter>
    </section>
  );
}

function Handled() {
  return (
    <section className="bg-[#0a3418] px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="font-subheadline text-xs font-medium uppercase tracking-[0.22em] text-yellow-400">
            Your vegetables, handled
          </p>
          <h2 className="font-headline mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Imagine your Tuesday at 6pm.
          </h2>
          <div className="mt-6 space-y-5 font-body text-lg leading-relaxed text-white/85">
            <p>
              You&apos;ve been in meetings since 9. You have twenty minutes
              before you need to leave again. The last thing you want to do is
              cook — and you don&apos;t.
            </p>
            <p>
              You reach for the dinner you were going to eat anyway, and tear
              open a pack of FuelFoods microgreens.
            </p>
            <p>
              No chopping. No measuring. No wondering which green does what or
              whether you&apos;re getting enough.
            </p>
            <p>
              You toss half of it into a wrap or a salad. The rest you fold into
              whatever&apos;s on your plate. You&apos;ve just added the
              nutrition of nine different vegetables to your meal — and it took
              less than five minutes.
            </p>
            <p>
              A week passes. No wilted produce in the crisper. No guilt. No
              &ldquo;healthy week&rdquo; that collapsed on Wednesday.
            </p>
            <p className="font-headline text-2xl font-bold text-white">
              You didn&apos;t force yourself to be the kind of person who eats
              well. The effort just . . . disappeared.
            </p>
            <p>
              That&apos;s what &ldquo;daily vegetables, handled&rdquo; actually
              feels like. And there&apos;s a reason it works, when letting
              another grocery delivery sit in the fridge didn&apos;t.
            </p>
          </div>
          <div className="mt-8">
            <CtaLink href="#plans" variant="yellow" arrow>
              Start your subscription
            </CtaLink>
          </div>
        </div>
        <div className="relative">
          <Image
            src="/images/banner-1.png"
            alt="Mega Mix pouch torn open with fresh microgreens spilling out"
            width={1033}
            height={768}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="h-auto w-full object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}

function MealMoments() {
  return (
    <section className="overflow-hidden bg-[#f7f4ee] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div>
            <Slip>No new recipe. No new skill.</Slip>
            <h2 className="mt-4 max-w-xl font-headline text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Whatever is already on the menu, add the greens.
            </h2>
          </div>
          <p className="max-w-2xl font-body text-lg leading-relaxed text-gray-700 lg:justify-self-end">
            Sandwich. Smoothie. Salad. Dinner. Open the pack, add a handful,
            keep moving. FuelFlow is built around food you already eat—not a
            meal plan you have to reorganize your life around.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-12 md:grid-rows-2">
          <figure className="group relative min-h-[460px] overflow-hidden rounded-3xl bg-black md:col-span-5 md:row-span-2 md:min-h-[680px]">
            <Image
              src="/images/magnific/family-smoothie.webp"
              alt="FuelFoods Mega Mix beside a berry smoothie in a family kitchen"
              fill
              sizes="(max-width: 768px) 100vw, 42vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-6 pb-6 pt-20 text-white">
              <figcaption className="font-headline text-2xl font-bold">
                One pack. A whole table.
              </figcaption>
              <p className="mt-1 font-body text-sm text-white/80">
                The easiest healthy habit is the one everyone can share.
              </p>
            </div>
          </figure>

          <div className="grid gap-4 sm:grid-cols-2 md:col-span-7 md:row-span-2">
            {MEAL_MOMENTS.map(moment => (
              <figure
                key={moment.src}
                className="group relative min-h-[310px] overflow-hidden rounded-3xl bg-gray-900"
              >
                <Image
                  src={moment.src}
                  alt={moment.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-5 pb-5 pt-16">
                  <figcaption className="font-subheadline text-sm font-medium text-white">
                    {moment.label}
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-black/10 pt-8 font-subheadline text-sm font-medium text-gray-700">
          <span>No chopping</span>
          <span
            aria-hidden="true"
            className="h-1 w-1 rounded-full bg-[#e56322]"
          />
          <span>No measuring</span>
          <span
            aria-hidden="true"
            className="h-1 w-1 rounded-full bg-[#e56322]"
          />
          <span>No extra grocery trip</span>
          <span
            aria-hidden="true"
            className="h-1 w-1 rounded-full bg-[#e56322]"
          />
          <span>Less than five minutes</span>
        </div>
      </div>
    </section>
  );
}

function FuelFlow() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <Slip>The FuelFlow Delivery System</Slip>
          <h2 className="font-headline mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Most greens sellers hand you the same leafy box.
          </h2>
          <p className="mt-4 font-body text-lg text-gray-700">
            So let&apos;s skip the adjectives and show you <em>how</em> this
            actually happens — because the difference is the system behind the
            box. FuelFlow runs in three steps.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          <article className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_12px_36px_rgba(23,134,65,0.10)]">
            <div className="relative h-56">
              <Image
                src="/images/farmpic.jpg"
                alt="FuelFoods grow room with trays of microgreens at harvest"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <p className="font-subheadline text-xs font-medium uppercase tracking-[0.2em] text-fuelfoods-green-500">
                1 · Grow
              </p>
              <h3 className="font-headline mt-2 text-xl font-bold text-gray-900">
                Harvested at the peak, not early to survive shipping.
              </h3>
              <p className="mt-3 font-body text-gray-700">
                We harvest every pack days after germination, the exact moment
                nutrient density spikes. That&apos;s the window when microgreens
                can carry up to 40x the nutrients of the mature vegetable.
              </p>
            </div>
          </article>

          <article className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_12px_36px_rgba(23,134,65,0.10)]">
            <div className="flex h-56 items-center justify-center bg-fuelfoods-green-50 px-4">
              <Image
                src="/images/5-pack3.png"
                alt="FuelFoods preselected blend pouches"
                width={1850}
                height={1185}
                sizes="(max-width: 1024px) 90vw, 33vw"
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="p-6">
              <p className="font-subheadline text-xs font-medium uppercase tracking-[0.2em] text-[#e56322]">
                2 · Formula
              </p>
              <h3 className="font-headline mt-2 text-xl font-bold text-gray-900">
                The blends do the math for you.
              </h3>
              <p className="mt-3 font-body text-gray-700">
                You don&apos;t need to know which green helps with what, or
                measure a single serving. Each preselected blend is engineered
                to hit your daily targets across nine or more vegetables on its
                own.
              </p>
            </div>
          </article>

          <article className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_12px_36px_rgba(23,134,65,0.10)]">
            <div className="flex h-56 items-center justify-center bg-gray-50 px-4">
              <Image
                src="/images/megamixplate.png"
                alt="Plate of mixed FuelFoods microgreens ready to eat"
                width={1130}
                height={724}
                sizes="(max-width: 1024px) 90vw, 33vw"
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="p-6">
              <p className="font-subheadline text-xs font-medium uppercase tracking-[0.2em] text-yellow-600">
                3 · Feed
              </p>
              <h3 className="font-headline mt-2 text-xl font-bold text-gray-900">
                It slots into a habit you already have.
              </h3>
              <p className="mt-3 font-body text-gray-700">
                Your packs arrive on a fixed weekly cadence, matched to how you
                actually eat — into a smoothie, onto a sandwich, over a bowl, or
                tossed into a salad. No new recipe, no new tool, no new skill to
                learn.
              </p>
            </div>
          </article>
        </div>

        <div className="mt-16">
          <p className="text-center font-body text-lg text-gray-700">
            Name the job, we&apos;ve built the blend. You choose the outcome.
            The system handles the rest.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <BlendCard
              image="/images/megamixsidebyside.jpg"
              badge="Daily coverage"
              badgeClass="bg-orange-100 text-orange-700"
              benefitClass="border-orange-200 bg-orange-50 text-orange-800"
              benefits={['Vitamin C + K', 'Antioxidants', 'Sulforaphane']}
              name="Mega Mix"
              job="Nine vegetables in one pack. The default daily formula."
            />
            <BlendCard
              image="/images/brassicablendsidebyside.jpg"
              badge="Recovery"
              badgeClass="bg-[#dcfce7] text-[#136834]"
              benefitClass="border-green-200 bg-green-50 text-green-800"
              benefits={['Sulforaphane', 'Vitamin K', 'Anti-inflammatory']}
              name="Brassica"
              job="The recovery blend. Inflammation, healing, come-back days."
            />
            <BlendCard
              image="/images/sunniessidebyside.jpg"
              badge="Skin & energy"
              badgeClass="bg-yellow-100 text-yellow-800"
              benefitClass="border-yellow-200 bg-yellow-50 text-yellow-900"
              benefits={['High protein', 'Vitamin E', 'Crunchy texture']}
              name="Sunnies"
              job="Crunchy sunflower shoots for skin, energy, and actual flavor."
            />
          </div>
        </div>

        <div className="mt-16">
          <Slip>Nine vegetables. Zero chopping.</Slip>
          <div className="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-9">
            {GREENS.map(green => (
              <figure key={green.label} className="text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-fuelfoods-green-50 sm:h-16 sm:w-16">
                  <Image
                    src={green.src}
                    alt={green.label}
                    width={80}
                    height={80}
                    sizes="80px"
                    className="h-14 w-14 object-contain sm:h-12 sm:w-12"
                  />
                </div>
                <figcaption className="mt-2 font-body text-[11px] leading-tight text-gray-600">
                  {green.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {[
            {
              src: '/images/bikerider.png',
              alt: 'Cyclist fueled by whole-food nutrition',
            },
            {
              src: '/images/gymdrinker.png',
              alt: 'Gym-goer recovering with nutrient-dense greens',
            },
            {
              src: '/images/runners.png',
              alt: 'Runners who slot greens into an existing habit',
            },
          ].map(shot => (
            <div
              key={shot.src}
              className="relative h-52 overflow-hidden rounded-2xl border border-gray-100 shadow-[0_24px_80px_12px_rgba(229,99,34,0.18)]"
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlendCard({
  image,
  badge,
  badgeClass,
  benefitClass,
  benefits,
  name,
  job,
}: {
  image: string;
  badge: string;
  badgeClass: string;
  benefitClass: string;
  benefits: readonly string[];
  name: string;
  job: string;
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-gray-100 bg-white text-left shadow-sm">
      <div className="relative aspect-square bg-gray-50">
        <Image
          src={image}
          alt={`${name} pouch, front and back`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-contain p-4"
        />
      </div>
      <div className="p-5">
        <span
          className={`inline-block rounded-full px-3 py-1 font-subheadline text-xs font-medium uppercase tracking-wide ${badgeClass}`}
        >
          {badge}
        </span>
        <h3 className="font-headline mt-3 text-2xl font-bold text-gray-900">
          {name}
        </h3>
        <p className="mt-2 font-body text-gray-700">{job}</p>
        <ul
          className="mt-4 flex flex-wrap gap-2"
          aria-label={`${name} benefits`}
        >
          {benefits.map(benefit => (
            <li
              key={benefit}
              className={`rounded-full border px-3 py-1.5 font-subheadline text-xs font-semibold ${benefitClass}`}
            >
              {benefit}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function Testimonials() {
  return (
    <section className="bg-fuelfoods-green-50 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <Slip>From people who already opened the pack</Slip>
          <h2 className="font-headline mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            The work disappeared. The habit didn&apos;t.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map(item => (
            <figure
              key={item.author}
              className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm"
            >
              <div className="mb-4 flex text-yellow-400" aria-label="5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="font-body text-gray-700 leading-relaxed">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-end justify-between border-t border-gray-100 pt-4">
                <div>
                  <p className="font-headline text-sm font-bold text-gray-900">
                    {item.author}
                  </p>
                  <p className="font-body text-sm text-gray-500">
                    {item.location}
                  </p>
                </div>
                <span className="rounded bg-fuelfoods-green-50 px-2 py-1 font-subheadline text-[11px] font-medium text-fuelfoods-green-600">
                  {item.highlight}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatsInside() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div>
          <Slip>What&apos;s inside — and why</Slip>
          <h2 className="font-headline mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            The labor is gone. The nutrition isn&apos;t.
          </h2>
          <ul className="mt-10 space-y-7">
            {INSIDE.map(item => (
              <li key={item.title} className="flex gap-4">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-fuelfoods-green-100">
                  <Check
                    className="h-4 w-4 text-fuelfoods-green-500"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                </span>
                <div>
                  <h3 className="font-headline text-lg font-bold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-1 font-body leading-relaxed text-gray-700">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4 lg:sticky lg:top-28">
          <div className="overflow-hidden rounded-2xl bg-fuelfoods-green-50 p-6">
            <Image
              src="/images/singlewithgreens_final.png"
              alt="Mega Mix pouch surrounded by harvested microgreens"
              width={1920}
              height={917}
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="h-auto w-full object-contain"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <figure className="relative aspect-square overflow-hidden rounded-2xl bg-white shadow-[0_12px_30px_rgba(23,134,65,0.10)]">
              <Image
                src="/images/magnific/open-mega-mix.webp"
                alt="An open Mega Mix pouch overflowing with fresh microgreens"
                fill
                sizes="(max-width: 1024px) 50vw, 20vw"
                className="object-cover"
              />
            </figure>
            <figure className="relative aspect-square overflow-hidden rounded-2xl bg-white shadow-[0_12px_30px_rgba(23,134,65,0.10)]">
              <Image
                src="/images/magnific/scallops.webp"
                alt="A finished plate of scallops topped with microgreens"
                fill
                sizes="(max-width: 1024px) 50vw, 20vw"
                className="object-cover"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

function Fork() {
  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <Slip>Where you are now</Slip>
          <h2 className="font-headline mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Right now you&apos;ve got two options.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-gray-200 bg-white p-8">
            <p className="font-subheadline text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
              Option 1
            </p>
            <h3 className="font-headline mt-3 text-2xl font-bold text-gray-500">
              Keep doing what you&apos;ve been doing.
            </h3>
            <p className="mt-4 font-body leading-relaxed text-gray-600">
              Buy the produce, mean well, and quietly throw out the wilted half
              every single week — while the guilt compounds along with the
              waste.
            </p>
          </article>
          <article className="rounded-2xl border-2 border-fuelfoods-green-500 bg-white p-8 shadow-[0_12px_36px_rgba(23,134,65,0.12)]">
            <p className="font-subheadline text-xs font-medium uppercase tracking-[0.2em] text-fuelfoods-green-500">
              Option 2
            </p>
            <h3 className="font-headline mt-3 text-2xl font-bold text-gray-900">
              Let the system handle it.
            </h3>
            <p className="mt-4 font-body leading-relaxed text-gray-700">
              A box that lands on schedule, packs that take five minutes to add
              to a meal, and the nutrition of nine vegetables a day — with the
              effort removed from the equation entirely.
            </p>
          </article>
        </div>
        <div className="mt-12 text-center">
          <p className="font-headline text-2xl font-bold text-gray-900">
            It&apos;s $15 a pack.{' '}
            <span className="text-fuelfoods-green-500">
              Subscribe and your first month ships free.
            </span>
          </p>
          <p className="mx-auto mt-4 max-w-xl font-body text-lg text-gray-700">
            If you&apos;re the kind of person who buys greens with good
            intentions every week, you already know what Option 1 costs. Try
            Option 2 instead.
          </p>
          <div className="mt-8">
            <CtaLink href="#plans" size="lg" arrow>
              Start your subscription
            </CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function Guarantees() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <Slip>Our guarantees</Slip>
          <h2 className="font-headline mt-4 text-3xl font-bold text-gray-900">
            We take the freshness risk. Leaving is easy.
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-fuelfoods-green-100 bg-fuelfoods-green-50 p-8">
            <Shield
              className="h-8 w-8 text-fuelfoods-green-500"
              aria-hidden="true"
            />
            <h3 className="font-headline mt-4 text-xl font-bold text-gray-900">
              The Freshness Guarantee
            </h3>
            <p className="mt-3 font-body leading-relaxed text-gray-700">
              If any pack arrives wilted, less than peak, or late past our
              48-hour harvest-to-door promise, we replace that pack free. No
              questions, no returns.
            </p>
          </article>
          <article className="rounded-2xl border border-yellow-200 bg-yellow-50 p-8">
            <Pause className="h-8 w-8 text-yellow-700" aria-hidden="true" />
            <h3 className="font-headline mt-4 text-xl font-bold text-gray-900">
              Pause or cancel anytime
            </h3>
            <p className="mt-3 font-body leading-relaxed text-gray-700">
              No lock-in, no retention gauntlet, no surprise renewal. If
              it&apos;s not working, you stop. That&apos;s the whole policy.
            </p>
          </article>
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center font-body text-gray-700">
          We take the freshness risk because that&apos;s <em>our</em> job. And
          we make leaving easy because earning your renewal beats trapping you
          in a charge you forgot about — every single month.
        </p>
      </div>
    </section>
  );
}
