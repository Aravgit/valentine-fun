'use client';

import { LetterColor } from '@/types';
import { cn } from '@/lib/utils/cn';

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  letterStatuses: Map<string, LetterColor>;
}

const keyRows = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK'],
];

const colorClasses: Record<LetterColor, string> = {
  correct: 'bg-green-500 text-white',
  present: 'bg-yellow-500 text-white',
  absent: 'bg-gray-400 text-white',
  empty: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
};

export function Keyboard({ onKeyPress, letterStatuses }: KeyboardProps) {
  return (
    <div className="flex flex-col gap-2 max-w-2xl mx-auto">
      {keyRows.map((row, i) => (
        <div key={i} className="flex justify-center gap-1">
          {row.map((key) => {
            const status = letterStatuses.get(key) || 'empty';
            const isWide = key === 'ENTER' || key === 'BACK';

            return (
              <button
                key={key}
                onClick={() => onKeyPress(key)}
                className={cn(
                  'font-bold rounded transition-colors',
                  'py-3 text-sm',
                  isWide ? 'px-4 min-w-[60px]' : 'px-3 min-w-[40px]',
                  colorClasses[status]
                )}
              >
                {key === 'BACK' ? '⌫' : key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
