import type { Metadata } from 'next';
import { SalesLanding } from '@/components/landing/sales-landing';

export const metadata: Metadata = {
  title: 'Eat 9 vegetables a day without touching a cutting board',
  description:
    'Fresh-harvested microgreens land on your doorstep every week — up to 40x the nutrients of regular vegetables. $15 a pack. First month ships free. Pause or cancel anytime.',
};

export default function HomePage() {
  return <SalesLanding />;
}
