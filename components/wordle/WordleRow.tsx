'use client';

import { LetterColor } from '@/types';
import { WordleCell } from './WordleCell';

interface WordleRowProps {
  guess: string;
  colors?: LetterColor[];
  isRevealing?: boolean;
}

export function WordleRow({ guess, colors, isRevealing }: WordleRowProps) {
  const cells = Array(5).fill('');

  return (
    <div className="flex gap-2">
      {cells.map((_, i) => (
        <WordleCell
          key={i}
          letter={guess[i] || ''}
          color={colors?.[i] || 'empty'}
          isRevealing={isRevealing}
          delay={i * 0.1}
        />
      ))}
    </div>
  );
}
