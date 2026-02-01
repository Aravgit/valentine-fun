'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWindowSize } from '@/lib/hooks/useWindowSize';
import { getRandomPosition } from '@/lib/utils/random';
import { cn } from '@/lib/utils/cn';

interface DodgingButtonProps {
  onDodge: () => void;
  className?: string;
}

const BUTTON_WIDTH = 120;
const BUTTON_HEIGHT = 50;

export function DodgingButton({ onDodge, className }: DodgingButtonProps) {
  const { width, height } = useWindowSize();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (width && height && isMounted) {
      // Center the button initially
      setPosition({
        x: width / 2 - BUTTON_WIDTH / 2,
        y: height / 2 - BUTTON_HEIGHT / 2,
      });
    }
  }, [width, height, isMounted]);

  const handleDodge = () => {
    if (width && height) {
      const newPosition = getRandomPosition(width, height, BUTTON_WIDTH, BUTTON_HEIGHT, 60);
      setPosition(newPosition);
      onDodge();
    }
  };

  if (!isMounted) return null;

  return (
    <motion.button
      className={cn(
        'fixed px-8 py-3 bg-valentine-pink-500 hover:bg-valentine-pink-600',
        'text-white font-semibold rounded-full shadow-lg',
        'transition-colors duration-200 z-10',
        className
      )}
      style={{
        width: BUTTON_WIDTH,
        height: BUTTON_HEIGHT,
        left: 0,
        top: 0,
      }}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      onMouseEnter={handleDodge}
      onTouchStart={handleDodge}
      onClick={handleDodge}
    >
      No
    </motion.button>
  );
}
