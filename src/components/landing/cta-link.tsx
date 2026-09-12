import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const variants = {
  green:
    'bg-[#178641] text-white hover:bg-[#136834] focus-visible:ring-[#178641]',
  orange:
    'bg-[#e56322] text-white hover:bg-[#d05a1e] focus-visible:ring-[#e56322]',
  yellow:
    'bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 hover:from-yellow-500 hover:to-yellow-600 focus-visible:ring-yellow-400',
  white:
    'bg-white text-[#136834] hover:bg-gray-100 focus-visible:ring-white',
} as const;

type CtaLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof variants;
  size?: 'md' | 'lg';
  arrow?: boolean;
  className?: string;
};

export function CtaLink({
  href,
  children,
  variant = 'green',
  size = 'md',
  arrow = false,
  className,
}: CtaLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full font-headline font-bold tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        size === 'lg' ? 'px-10 py-4 text-lg' : 'px-8 py-3 text-base',
        variants[variant],
        className
      )}
    >
      {children}
      {arrow ? <ArrowRight className="h-4 w-4" aria-hidden="true" /> : null}
    </Link>
  );
}
