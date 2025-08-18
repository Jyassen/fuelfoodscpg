import { Metadata } from 'next';

// Alternative approach using client-side metadata
export const metadata: Metadata = {
  title: 'Configure Your Subscription Plan | FuelFoods',
  description: 'Customize your microgreens subscription. Choose from our three delicious varieties: Mega Mix, Brassica Blend, and Sunnies Snacks. Fresh, nutrient-dense microgreens delivered weekly.',
  keywords: [
    'microgreens subscription',
    'healthy eating',
    'meal planning',
    'nutrition',
    'superfood',
    'weekly delivery',
    'FuelFoods',
  ],
  openGraph: {
    title: 'Configure Your Subscription Plan | FuelFoods',
    description: 'Customize your microgreens subscription with your choice of varieties.',
    type: 'website',
    images: ['/images/mega-mix-product.png'],
  },
};

export default function ConfigureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}