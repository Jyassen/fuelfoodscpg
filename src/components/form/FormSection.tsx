'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const formSectionVariants = cva('space-y-6', {
  variants: {
    variant: {
      default: 'bg-white border border-gray-200 rounded-lg p-6 shadow-sm',
      elevated: 'bg-white border border-gray-200 rounded-xl p-8 shadow-lg',
      minimal: 'bg-transparent p-0',
      card: 'bg-gray-50 border border-gray-200 rounded-lg p-6',
    },
    size: {
      sm: 'space-y-4',
      default: 'space-y-6',
      lg: 'space-y-8',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

const headerVariants = cva('space-y-2', {
  variants: {
    variant: {
      default: 'border-b border-gray-200 pb-4',
      minimal: 'pb-2',
      accent: 'border-b-2 border-fuelfoods-green-500 pb-4',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const titleVariants = cva('font-bold text-gray-900', {
  variants: {
    size: {
      sm: 'text-lg',
      default: 'text-xl',
      lg: 'text-2xl',
      xl: 'text-3xl',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export interface FormSectionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formSectionVariants> {
  title?: string;
  description?: string;
  headerVariant?: VariantProps<typeof headerVariants>['variant'];
  titleSize?: VariantProps<typeof titleVariants>['size'];
  icon?: React.ReactNode;
  headerAction?: React.ReactNode;
  headerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  required?: boolean;
}

const FormSection = React.forwardRef<HTMLDivElement, FormSectionProps>(
  (
    {
      className,
      variant,
      size,
      title,
      description,
      headerVariant = 'default',
      titleSize,
      icon,
      headerAction,
      headerClassName,
      titleClassName,
      descriptionClassName,
      children,
      required = false,
      ...props
    },
    ref
  ) => {
    const hasHeader = title || description || icon || headerAction;

    return (
      <section
        ref={ref}
        className={cn(formSectionVariants({ variant, size, className }))}
        {...props}
      >
        {hasHeader && (
          <div
            className={cn(
              headerVariants({ variant: headerVariant }),
              headerClassName
            )}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                {icon && (
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 text-fuelfoods-green-600">
                      {icon}
                    </div>
                  </div>
                )}
                <div className="space-y-1 flex-1">
                  {title && (
                    <h3
                      className={cn(
                        titleVariants({ size: titleSize }),
                        required &&
                          "after:content-['*'] after:ml-1 after:text-red-500",
                        titleClassName
                      )}
                    >
                      {title}
                    </h3>
                  )}
                  {description && (
                    <p
                      className={cn(
                        'text-sm text-gray-600 leading-relaxed',
                        descriptionClassName
                      )}
                    >
                      {description}
                    </p>
                  )}
                </div>
              </div>
              {headerAction && (
                <div className="flex-shrink-0 ml-4">{headerAction}</div>
              )}
            </div>
          </div>
        )}
        <div className="space-y-4">{children}</div>
      </section>
    );
  }
);

FormSection.displayName = 'FormSection';

export { FormSection, formSectionVariants };
