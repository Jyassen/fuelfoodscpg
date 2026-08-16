import { notFound } from 'next/navigation';
import { ShadcnShowcase } from '@/components/examples/ShadcnShowcase';

export default function UITestPage() {
  if (process.env.NODE_ENV === 'production') {
    notFound();
  }
  return (
    <div className="min-h-screen bg-background">
      <ShadcnShowcase />
    </div>
  );
}
