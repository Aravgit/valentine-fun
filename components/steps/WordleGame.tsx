'use client';

import { motion } from 'framer-motion';
import { WordleBoard } from '@/components/wordle/WordleBoard';
import { useAppState } from '@/components/providers/AppStateProvider';
import { fadeIn } from '@/lib/utils/animations';
import { config } from '@/data/config';

export function WordleGame() {
  const { dispatch } = useAppState();

  const handleWin = () => {
    dispatch({ type: 'SET_STEP', payload: 'letter' });
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-valentine-purple-50 to-valentine-pink-50 p-8"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className="max-w-2xl w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold text-valentine-purple-600 text-center mb-4">
          Find the Valentine Word
        </h2>
        <p className="text-center text-gray-600 mb-8">
          {config.messages.wordleInstructions}
        </p>

        <WordleBoard onWin={handleWin} />

        <p className="text-center text-sm text-gray-500 mt-8">
          {config.messages.wordleHint}
        </p>
      </motion.div>
    </motion.div>
  );
}
