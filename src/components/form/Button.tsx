'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { LoadingSpinner } from './LoadingSpinner';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-bold uppercase tracking-wide transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transform active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary:
          'bg-fuelfoods-green-500 text-white shadow-lg hover:bg-fuelfoods-green-600 hover:shadow-xl hover:-translate-y-0.5 focus-visible:ring-fuelfoods-green-500/50 active:bg-fuelfoods-green-700',
        secondary:
          'bg-gray-100 text-gray-900 shadow-md hover:bg-gray-200 hover:shadow-lg hover:-translate-y-0.5 focus-visible:ring-gray-500/50 border border-gray-300',
        outline:
          'border-2 border-fuelfoods-green-500 text-fuelfoods-green-600 bg-transparent shadow-md hover:bg-fuelfoods-green-50 hover:shadow-lg hover:-translate-y-0.5 focus-visible:ring-fuelfoods-green-500/50',
        destructive:
          'bg-red-600 text-white shadow-lg hover:bg-red-700 hover:shadow-xl hover:-translate-y-0.5 focus-visible:ring-red-500/50 active:bg-red-800',
        ghost:
          'text-fuelfoods-green-600 hover:bg-fuelfoods-green-50 hover:text-fuelfoods-green-700 focus-visible:ring-fuelfoods-green-500/50',
        link:
          'text-fuelfoods-green-600 underline-offset-4 hover:underline hover:text-fuelfoods-green-700 focus-visible:ring-fuelfoods-green-500/50',
        orange:
          'bg-orange-500 text-white shadow-lg hover:bg-orange-600 hover:shadow-xl hover:-translate-y-0.5 focus-visible:ring-orange-500/50 active:bg-orange-700',
        yellow:
          'bg-yellow-400 text-yellow-900 shadow-lg hover:bg-yellow-500 hover:shadow-xl hover:-translate-y-0.5 focus-visible:ring-yellow-500/50 active:bg-yellow-600',
      },
      size: {
        sm: 'h-8 px-4 py-1.5 text-xs',
        default: 'h-10 px-6 py-2.5',
        lg: 'h-12 px-8 py-3 text-base',
        xl: 'h-14 px-10 py-4 text-lg',
        icon: 'h-10 w-10 p-0',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
      loading: {
        true: 'cursor-not-allowed',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      fullWidth: false,
      loading: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant,
    size,
    fullWidth,
    loading = false,
    loadingText,
    leftIcon,
    rightIcon,
    asChild = false,
    children,
    disabled,
    ...props
  }, ref) => {
    const isDisabled = disabled || loading;

    // When rendering asChild, Radix Slot requires exactly one React element child.
    // We therefore do not inject extra nodes (spinner/icons) in this branch.
    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, fullWidth, loading, className }))}
          {...props}
        >
          {children as React.ReactElement}
        </Slot>
      );
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, loading, className }))}
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        {...props}
      >
        {loading && (
          <LoadingSpinner
            size={size === 'sm' ? 'sm' : size === 'lg' || size === 'xl' ? 'lg' : 'default'}
            className="text-current"
          />
        )}
        {!loading && leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        <span className="flex-1 text-center">{loading && loadingText ? loadingText : children}</span>
        {!loading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };