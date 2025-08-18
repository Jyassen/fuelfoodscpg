'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ValidationMessage } from './ValidationMessage';

const formFieldVariants = cva(
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground transition-all duration-200',
  {
    variants: {
      variant: {
        default:
          'focus:border-fuelfoods-green-500 focus:ring-2 focus:ring-fuelfoods-green-500/20',
        error:
          'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20',
        success:
          'border-fuelfoods-green-500 focus:border-fuelfoods-green-500 focus:ring-2 focus:ring-fuelfoods-green-500/20',
      },
      size: {
        sm: 'h-8 text-xs',
        default: 'h-10 text-sm',
        lg: 'h-12 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  {
    variants: {
      variant: {
        default: 'text-gray-900',
        error: 'text-red-700',
        success: 'text-fuelfoods-green-700',
      },
      required: {
        true: "after:content-['*'] after:ml-0.5 after:text-red-500",
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      required: false,
    },
  }
);

export interface FormFieldProps
  extends Omit<
      React.InputHTMLAttributes<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
      'size'
    >,
    VariantProps<typeof formFieldVariants> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: string;
  fieldType?: 'input' | 'textarea' | 'select';
  options?: Array<{ value: string; label: string; disabled?: boolean }>;
  rows?: number;
  labelClassName?: string;
  containerClassName?: string;
  loading?: boolean;
  onValueChange?: (value: string) => void;
}

const FormField = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  FormFieldProps
>(
  (
    {
      className,
      variant,
      size,
      label,
      helperText,
      error,
      success,
      fieldType = 'input',
      options = [],
      rows = 3,
      labelClassName,
      containerClassName,
      loading = false,
      required = false,
      id,
      onChange,
      onValueChange,
      ...props
    },
    ref
  ) => {
    const fieldId = id || React.useId();
    const hasError = Boolean(error);
    const hasSuccess = Boolean(success) && !hasError;

    const finalVariant = hasError ? 'error' : hasSuccess ? 'success' : variant;

    const renderField = () => {
      const commonProps = {
        id: fieldId,
        className: cn(
          formFieldVariants({ variant: finalVariant, size, className })
        ),
        disabled: loading || props.disabled,
        'aria-invalid': hasError,
        'aria-describedby':
          cn(
            error && `${fieldId}-error`,
            success && `${fieldId}-success`,
            helperText && `${fieldId}-helper`
          ).trim() || undefined,
        ...props,
        onChange: (
          e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
          >
        ) => {
          const target = e.target as
            | HTMLInputElement
            | HTMLTextAreaElement
            | HTMLSelectElement;
          if (typeof onValueChange === 'function') {
            onValueChange((target as any).value as string);
          }
          if (typeof onChange === 'function') {
            (onChange as any)(e);
          }
        },
      };

      if (fieldType === 'textarea') {
        return (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            rows={rows}
            {...(commonProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        );
      }

      if (fieldType === 'select') {
        return (
          <select
            ref={ref as React.Ref<HTMLSelectElement>}
            {...(commonProps as React.SelectHTMLAttributes<HTMLSelectElement>)}
          >
            {options.map(option => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
        );
      }

      return (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          type="text"
          {...(commonProps as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      );
    };

    return (
      <div className={cn('space-y-2', containerClassName)}>
        {label && (
          <label
            htmlFor={fieldId}
            className={cn(
              labelVariants({ variant: finalVariant, required }),
              labelClassName
            )}
          >
            {label}
          </label>
        )}

        <div className="relative">
          {renderField()}
          {loading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin h-4 w-4 border-2 border-fuelfoods-green-500 border-t-transparent rounded-full" />
            </div>
          )}
        </div>

        {helperText && !error && !success && (
          <p id={`${fieldId}-helper`} className="text-xs text-gray-600">
            {helperText}
          </p>
        )}

        {/* Inline error removed per subtle asterisk request */}
        {false && error && (
          <ValidationMessage
            id={`${fieldId}-error`}
            type="error"
            message={error || ''}
          />
        )}

        {success && !error && (
          <ValidationMessage
            id={`${fieldId}-success`}
            type="success"
            message={success}
          />
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';

export { FormField, formFieldVariants };
