'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const spinnerVariants = cva(
  'animate-spin rounded-full border-solid border-current border-r-transparent',
  {
    variants: {
      size: {
        sm: 'h-3 w-3 border-[1.5px]',
        default: 'h-4 w-4 border-2',
        lg: 'h-6 w-6 border-2',
        xl: 'h-8 w-8 border-[3px]',
      },
      variant: {
        default: 'text-fuelfoods-green-500',
        white: 'text-white',
        gray: 'text-gray-500',
        current: 'text-current',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
  }
);

const containerVariants = cva('flex items-center justify-center', {
  variants: {
    fullScreen: {
      true: 'fixed inset-0 bg-white/80 backdrop-blur-sm z-50',
      false: '',
    },
    padding: {
      none: '',
      sm: 'p-2',
      default: 'p-4',
      lg: 'p-8',
    },
  },
  defaultVariants: {
    fullScreen: false,
    padding: 'none',
  },
});

export interface LoadingSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants>,
    VariantProps<typeof containerVariants> {
  label?: string;
  showLabel?: boolean;
}

const LoadingSpinner = React.forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  (
    {
      className,
      size,
      variant,
      fullScreen,
      padding,
      label = 'Loading...',
      showLabel = false,
      ...props
    },
    ref
  ) => {
    const SpinnerComponent = (
      <div className="flex flex-col items-center gap-2">
        <div
          className={cn(spinnerVariants({ size, variant }), className)}
          role="status"
          aria-label={label}
        />
        {showLabel && (
          <span className="text-sm text-gray-600 font-medium">{label}</span>
        )}
      </div>
    );

    if (fullScreen) {
      return (
        <div
          ref={ref}
          className={cn(containerVariants({ fullScreen, padding }))}
          {...props}
        >
          {SpinnerComponent}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(containerVariants({ fullScreen, padding }))}
        {...props}
      >
        {SpinnerComponent}
      </div>
    );
  }
);

LoadingSpinner.displayName = 'LoadingSpinner';

// Preset spinner components for common use cases
const ButtonSpinner = ({
  className,
  ...props
}: Omit<LoadingSpinnerProps, 'size' | 'variant'>) => (
  <LoadingSpinner
    size="sm"
    variant="current"
    className={cn('mr-2', className)}
    {...props}
  />
);

const PageSpinner = ({
  className,
  ...props
}: Omit<LoadingSpinnerProps, 'fullScreen' | 'showLabel'>) => (
  <LoadingSpinner
    fullScreen
    showLabel
    padding="lg"
    size="lg"
    className={className}
    {...props}
  />
);

const InlineSpinner = ({
  className,
  ...props
}: Omit<LoadingSpinnerProps, 'size'>) => (
  <LoadingSpinner
    size="sm"
    className={cn('inline-block', className)}
    {...props}
  />
);

export {
  LoadingSpinner,
  ButtonSpinner,
  PageSpinner,
  InlineSpinner,
  spinnerVariants,
};
