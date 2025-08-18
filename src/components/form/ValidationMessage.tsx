'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

const validationMessageVariants = cva(
  'flex items-start gap-2 text-xs font-medium rounded-md px-3 py-2 border transition-all duration-200',
  {
    variants: {
      type: {
        error: 'text-red-700 bg-red-50 border-red-200',
        success: 'text-fuelfoods-green-700 bg-fuelfoods-green-50 border-fuelfoods-green-200',
        warning: 'text-orange-700 bg-orange-50 border-orange-200',
        info: 'text-blue-700 bg-blue-50 border-blue-200',
      },
      size: {
        sm: 'text-xs px-2 py-1',
        default: 'text-xs px-3 py-2',
        lg: 'text-sm px-4 py-3',
      },
      variant: {
        default: '',
        minimal: 'bg-transparent border-transparent px-0 py-1',
        inline: 'rounded-none border-0 bg-transparent px-0 py-0',
      },
    },
    defaultVariants: {
      type: 'error',
      size: 'default',
      variant: 'default',
    },
  }
);

const iconMap = {
  error: AlertCircle,
  success: CheckCircle,
  warning: AlertTriangle,
  info: Info,
} as const;

export interface ValidationMessageProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof validationMessageVariants> {
  message: string;
  showIcon?: boolean;
  customIcon?: React.ReactNode;
}

const ValidationMessage = React.forwardRef<HTMLDivElement, ValidationMessageProps>(
  ({
    className,
    type = 'error',
    size,
    variant,
    message,
    showIcon = true,
    customIcon,
    ...props
  }, ref) => {
    const Icon = iconMap[type!];

    if (!message) return null;

    return (
      <div
        ref={ref}
        role="alert"
        aria-live="polite"
        className={cn(validationMessageVariants({ type, size, variant, className }))}
        {...props}
      >
        {showIcon && (
          <div className="flex-shrink-0 mt-0.5">
            {customIcon || <Icon className="h-3 w-3" />}
          </div>
        )}
        <span className="flex-1 leading-relaxed">
          {message}
        </span>
      </div>
    );
  }
);

ValidationMessage.displayName = 'ValidationMessage';

export { ValidationMessage, validationMessageVariants };