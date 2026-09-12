import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function PlanCheck({
  children,
  tone = 'green',
}: {
  children: React.ReactNode;
  tone?: 'green' | 'yellow';
}) {
  return (
    <li className="flex items-start gap-2.5">
      <Check
        className={cn(
          'mt-0.5 h-4 w-4 shrink-0',
          tone === 'yellow' ? 'text-yellow-600' : 'text-fuelfoods-green-500'
        )}
        strokeWidth={2.5}
        aria-hidden="true"
      />
      <span className="font-body text-sm leading-snug text-gray-700">{children}</span>
    </li>
  );
}
