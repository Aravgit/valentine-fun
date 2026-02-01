'use client';

import { Step } from '@/types';
import { cn } from '@/lib/utils/cn';

interface ProgressIndicatorProps {
  currentStep: Step;
}

const steps: Step[] = ['initial', 'wordle', 'letter', 'reveal'];

export function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  const currentIndex = steps.indexOf(currentStep);

  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-50">
      {steps.map((step, index) => (
        <div
          key={step}
          className={cn(
            'w-2 h-2 rounded-full transition-all duration-300',
            index <= currentIndex
              ? 'bg-valentine-purple-500 scale-125'
              : 'bg-gray-300'
          )}
        />
      ))}
    </div>
  );
}
