'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScratchCard } from '@/components/ui/ScratchCard';
import { fadeIn } from '@/lib/utils/animations';
import { config } from '@/data/config';

export function FinalReveal() {
  const [isScratched, setIsScratched] = useState(false);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-valentine-purple-600 via-valentine-pink-600 to-valentine-purple-700 p-6 sm:p-8 flex items-center justify-center"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="max-w-4xl w-full">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-6xl font-display font-bold text-white text-center mb-10 sm:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          One More Surprise...
        </motion.h1>

        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <ScratchCard
            imageUrl={config.photos[0] || '/photos/01.jpg'}
            onComplete={() => setIsScratched(true)}
            completeThreshold={50}
          />
        </motion.div>

        <AnimatePresence>
          {isScratched && (
            <motion.div
              className="bg-white rounded-xl p-6 sm:p-8 shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-lg sm:text-xl md:text-2xl text-center text-gray-700 font-sans leading-relaxed mb-6">
                {config.finalMessage}
              </p>
              <p className="text-center text-valentine-purple-600 text-xl sm:text-2xl font-display font-bold">
                Happy Valentine's Day! ❤️
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {!isScratched && (
          <motion.p
            className="text-white text-center text-base sm:text-lg mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Scratch the card above to reveal your surprise
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
