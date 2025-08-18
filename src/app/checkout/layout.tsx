import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Secure Checkout - FuelFoods',
  description: 'Complete your order for fresh, organic microgreens with our secure checkout process.',
  robots: 'noindex, nofollow', // Prevent indexing of checkout pages
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}