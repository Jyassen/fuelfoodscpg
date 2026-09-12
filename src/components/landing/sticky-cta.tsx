'use client';

import { useEffect, useState } from 'react';
import { CtaLink } from './cta-link';

export function StickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const plans = document.getElementById('plans');

    const update = () => {
      const pastHero = window.scrollY > 560;
      const plansTop = plans?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY;
      const plansInView = plansTop < window.innerHeight * 0.78;
      setShow(pastHero && !plansInView);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-fuelfoods-green-700 bg-[#0a3418] px-4 py-3 shadow-[0_-8px_30px_rgba(10,52,24,0.35)] md:hidden">
      <div className="mx-auto flex max-w-lg items-center justify-between gap-3 pb-[env(safe-area-inset-bottom)]">
        <div className="min-w-0">
          <p className="truncate font-headline text-sm font-bold text-white">
            $15 a pack
          </p>
          <p className="truncate font-body text-xs text-white/70">
            First month ships free
          </p>
        </div>
        <CtaLink href="#plans" size="md" arrow className="shrink-0 px-5 py-2.5 text-sm">
          Subscribe
        </CtaLink>
      </div>
    </div>
  );
}
