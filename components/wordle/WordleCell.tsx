'use client';

import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useState } from 'react';
import { LetterColor } from '@/types';
import { cn } from '@/lib/utils/cn';

interface WordleCellProps {
  letter: string;
  color: LetterColor;
  isRevealing?: boolean;
  delay?: number;
}

const colorClasses: Record<LetterColor, string> = {
  correct: 'bg-green-500 border-green-500 text-white',
  present: 'bg-yellow-500 border-yellow-500 text-white',
  absent: 'bg-gray-400 border-gray-400 text-white',
  empty: 'bg-white border-gray-300 text-gray-900',
};

export function WordleCell({ letter, color, isRevealing, delay = 0 }: WordleCellProps) {
  const controls = useAnimationControls();
  const [revealed, setRevealed] = useState(!isRevealing);

  useEffect(() => {
    if (isRevealing) {
      setRevealed(false);

      const flipAnimation = async () => {
        // Flip to 90 degrees
        await controls.start({
          rotateX: 90,
          transition: { duration: 0.25, delay, ease: 'easeIn' }
        });

        // Change color at 90 degrees
        setRevealed(true);

        // Flip back to 0 degrees
        await controls.start({
          rotateX: 0,
          transition: { duration: 0.25, ease: 'easeOut' }
        });
      };

      flipAnimation();
    }
  }, [isRevealing, delay, controls]);

  const displayColor = revealed ? color : 'empty';
  const hasBorder = letter && !revealed;

  return (
    <motion.div
      className={cn(
        'w-14 h-14 border-2 flex items-center justify-center',
        'text-2xl font-bold uppercase rounded',
        hasBorder ? 'border-gray-500 bg-white text-gray-900' : colorClasses[displayColor]
      )}
      animate={controls}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {letter}
    </motion.div>
  );
}
