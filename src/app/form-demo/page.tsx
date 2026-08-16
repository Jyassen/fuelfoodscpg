import { notFound } from 'next/navigation';
import FormComponentsShowcase from '@/components/examples/FormComponentsShowcase';

export default function FormDemoPage() {
  if (process.env.NODE_ENV === 'production') {
    notFound();
  }
  return <FormComponentsShowcase />;
}

export const metadata = {
  title: 'Form Components Demo | FuelFoods',
  description:
    'Interactive showcase of FuelFoods form components for checkout system',
};
