'use client';

import { CheckoutStep } from '@/lib/types';
import { cn } from '@/lib/utils';

interface CheckoutProgressBarProps {
  currentStep: CheckoutStep;
  onStepClick: (step: string) => void;
  isStepCompleted: (step: CheckoutStep) => boolean;
  canProceedToStep: (step: CheckoutStep) => boolean;
}

const CHECKOUT_STEPS = [
  { id: 'customer_info', label: 'Customer Info', number: 1 },
  { id: 'shipping', label: 'Shipping', number: 2 },
  { id: 'payment', label: 'Payment', number: 3 },
  { id: 'review', label: 'Review', number: 4 },
] as const;

export default function CheckoutProgressBar({
  currentStep,
  onStepClick,
  isStepCompleted,
  canProceedToStep,
}: CheckoutProgressBarProps) {
  const getCurrentStepNumber = () => {
    const step = CHECKOUT_STEPS.find((s) => s.id === currentStep);
    return step?.number || 1;
  };

  const getStepStatus = (step: typeof CHECKOUT_STEPS[number]) => {
    if (isStepCompleted(step.id as CheckoutStep)) return 'completed';
    if (step.id === currentStep) return 'current';
    if (canProceedToStep(step.id as CheckoutStep)) return 'accessible';
    return 'disabled';
  };

  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between">
        {CHECKOUT_STEPS.map((step, index) => {
          const status = getStepStatus(step);
          const isClickable = status === 'accessible' || status === 'completed';

          return (
            <div key={step.id} className="flex items-center">
              {/* Step Circle */}
              <div className="flex items-center">
                <button
                  onClick={() => isClickable && onStepClick(step.id)}
                  disabled={!isClickable}
                  className={cn(
                    'flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm transition-all duration-200',
                    {
                      'bg-green-600 text-white shadow-lg': status === 'current',
                      'bg-green-500 text-white': status === 'completed',
                      'bg-gray-200 text-gray-500 cursor-not-allowed': status === 'disabled',
                      'bg-gray-300 text-gray-700 hover:bg-green-100 cursor-pointer': status === 'accessible',
                    }
                  )}
                >
                  {status === 'completed' ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    step.number
                  )}
                </button>

                {/* Step Label */}
                <div className="ml-3">
                  <p
                    className={cn('text-sm font-medium', {
                      'text-green-600': status === 'current' || status === 'completed',
                      'text-gray-500': status === 'disabled',
                      'text-gray-700': status === 'accessible',
                    })}
                  >
                    {step.label}
                  </p>
                </div>
              </div>

              {/* Progress Line */}
              {index < CHECKOUT_STEPS.length - 1 && (
                <div className="flex-1 mx-4">
                  <div className="h-0.5 bg-gray-200 relative">
                    <div
                      className={cn('h-0.5 bg-green-500 transition-all duration-500', {
                        'w-full': getCurrentStepNumber() > step.number,
                        'w-0': getCurrentStepNumber() <= step.number,
                      })}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}