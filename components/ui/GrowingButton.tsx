'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface GrowingButtonProps {
  dodgeCount: number;
  onClick: () => void;
  className?: string;
}

export function GrowingButton({ dodgeCount, onClick, className }: GrowingButtonProps) {
  // Start very small (0.3) and grow with each dodge
  const scale = 0.3 + dodgeCount * 0.15;
  const isClickable = dodgeCount >= 3;

  return (
    <motion.button
      className={cn(
        'px-8 py-3 bg-valentine-purple-500',
        isClickable ? 'hover:bg-valentine-purple-600 cursor-pointer' : 'cursor-not-allowed opacity-80',
        'text-white font-semibold rounded-full shadow-lg',
        'transition-colors duration-200',
        className
      )}
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ opacity: 1, scale }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={isClickable ? onClick : undefined}
      disabled={!isClickable}
    >
      Yes
    </motion.button>
  );
}
