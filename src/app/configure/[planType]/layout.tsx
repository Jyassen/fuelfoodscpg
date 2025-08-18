import { Metadata } from 'next';

export async function generateMetadata(
  { params }: { params: Promise<{ planType: string }> }
): Promise<Metadata> {
  const { planType } = await params;
  
  const planNames = {
    starter: 'Starter Plan',
    pro: 'Pro Plan',
    elite: 'Elite Plan'
  };
  
  const planName = planNames[planType as keyof typeof planNames] || 'Subscription Plan';
  
  return {
    title: `Configure Your ${planName} | FuelFoods`,
    description: `Customize your ${planName} microgreens subscription. Choose from our three delicious varieties: Mega Mix, Brassica Blend, and Sunnies Snacks. Fresh, nutrient-dense microgreens delivered weekly.`,
    keywords: [
      'microgreens subscription',
      'healthy eating',
      'meal planning',
      'nutrition',
      'superfood',
      'weekly delivery',
      planType,
      'FuelFoods'
    ],
    openGraph: {
      title: `Configure Your ${planName} | FuelFoods`,
      description: `Customize your ${planName} microgreens subscription with your choice of varieties.`,
      type: 'website',
      images: ['/images/mega-mix-product.png']
    }
  };
}

export default function ConfigureLayout({ children }: { children: React.ReactNode }) {
  return children;
}