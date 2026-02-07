'use client';

import { motion } from 'framer-motion';
import { DodgingButton } from '@/components/ui/DodgingButton';
import { GrowingButton } from '@/components/ui/GrowingButton';
import { useAppState } from '@/components/providers/AppStateProvider';
import { fadeIn } from '@/lib/utils/animations';
import { config } from '@/data/config';

export function InitialQuestion() {
  const { state, dispatch } = useAppState();

  const handleYes = () => {
    dispatch({ type: 'SET_STEP', payload: 'wordle' });
  };

  const handleDodge = () => {
    dispatch({ type: 'INCREMENT_DODGE' });
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-valentine-purple-500 via-valentine-pink-500 to-valentine-purple-600 p-6 sm:p-8"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.h1
        className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-white text-center mb-10 sm:mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Will you be my Valentine?
      </motion.h1>

      <div className="relative w-full h-[180px] sm:h-[200px]">
        {state.dodgeCount > 0 && (
          <div className="absolute left-1/2 top-1/2 -translate-x-[140px] -translate-y-1/2">
            <GrowingButton dodgeCount={state.dodgeCount} onClick={handleYes} />
          </div>
        )}
        <DodgingButton onDodge={handleDodge} />
      </div>

      {state.dodgeCount >= 6 && (
        <motion.p
          className="text-white text-base sm:text-xl mt-10 sm:mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {config.messages.dodgeEncouragement}
        </motion.p>
      )}
    </motion.div>
  );
}
