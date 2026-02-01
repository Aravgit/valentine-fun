'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAppState } from '@/components/providers/AppStateProvider';
import { fadeIn, slideUp } from '@/lib/utils/animations';
import { config } from '@/data/config';

export function LoveLetter() {
  const { state, dispatch } = useAppState();
  const [scrolled, setScrolled] = useState(false);
  const [typedWord, setTypedWord] = useState('');
  const [hoveredHeart, setHoveredHeart] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const sections = config.loveLetter.sections;
  const revealedSections = state.letter.revealedSections;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;

      if (scrollPosition > 50 && !scrolled && revealedSections.includes(1)) {
        setScrolled(true);
        dispatch({ type: 'REVEAL_LETTER_SECTION', payload: 2 });
      }
    };

    // Listen to both window scroll and check periodically
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled, dispatch, revealedSections]);

  useEffect(() => {
    if (hoveredHeart && !revealedSections.includes(3)) {
      dispatch({ type: 'REVEAL_LETTER_SECTION', payload: 3 });
    }
  }, [hoveredHeart, revealedSections, dispatch]);

  useEffect(() => {
    if (typedWord.toLowerCase() === 'love' && !revealedSections.includes(4)) {
      dispatch({ type: 'REVEAL_LETTER_SECTION', payload: 4 });
    }
  }, [typedWord, revealedSections, dispatch]);

  useEffect(() => {
    if (state.letter.completed) {
      setTimeout(() => {
        dispatch({ type: 'SET_STEP', payload: 'reveal' });
      }, 2000);
    }
  }, [state.letter.completed, dispatch]);

  const handleClick = () => {
    if (!revealedSections.includes(1)) {
      dispatch({ type: 'REVEAL_LETTER_SECTION', payload: 1 });
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-valentine-purple-50 to-valentine-pink-50 p-8 py-16 pb-96"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={handleClick}
    >
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-2xl p-12 md:p-16 min-h-[80vh]">
        <motion.h2
          className="text-4xl md:text-5xl font-display font-bold text-valentine-purple-600 text-center mb-12"
          variants={slideUp}
          initial="hidden"
          animate="visible"
        >
          A Letter For You
        </motion.h2>

        <div className="space-y-8 font-sans text-lg text-gray-700 leading-relaxed">
          {/* Section 1: Click to reveal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={revealedSections.includes(1) ? { opacity: 1, y: 0 } : { opacity: 0.5, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {revealedSections.includes(1) ? (
              <p className="text-justify">{sections[0].content}</p>
            ) : (
              <p className="text-sm text-gray-500 italic text-center py-8">
                {config.messages.letterClickPrompt}
              </p>
            )}
          </motion.div>

          {/* Section 2: Scroll to reveal */}
          {revealedSections.includes(1) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={revealedSections.includes(2) ? { opacity: 1, y: 0 } : { opacity: 0.5, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {revealedSections.includes(2) ? (
                <p className="text-justify">{sections[1].content}</p>
              ) : (
                <div className="text-center py-12">
                  <p className="text-sm text-gray-500 italic mb-4">
                    {config.messages.letterScrollPrompt}
                  </p>
                  <motion.div
                    className="text-2xl text-valentine-purple-400"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ↓
                  </motion.div>
                </div>
              )}
            </motion.div>
          )}

          {/* Section 3: Hover heart to reveal */}
          {revealedSections.includes(2) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={revealedSections.includes(3) ? { opacity: 1, y: 0 } : { opacity: 0.5, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {!revealedSections.includes(3) && (
                <div className="flex items-center justify-center gap-4 mb-4">
                  <motion.div
                    className="text-4xl cursor-pointer"
                    onMouseEnter={() => setHoveredHeart(true)}
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    ❤️
                  </motion.div>
                  <p className="text-sm text-gray-500 italic">
                    {config.messages.letterHoverPrompt}
                  </p>
                </div>
              )}
              {revealedSections.includes(3) && (
                <p className="text-justify">{sections[2].content}</p>
              )}
            </motion.div>
          )}

          {/* Section 4: Type "love" to reveal */}
          {revealedSections.includes(3) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={revealedSections.includes(4) ? { opacity: 1, y: 0 } : { opacity: 0.5, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {!revealedSections.includes(4) && (
                <div className="mb-4">
                  <input
                    type="text"
                    value={typedWord}
                    onChange={(e) => setTypedWord(e.target.value)}
                    placeholder={config.messages.letterTypePrompt}
                    className="w-full px-4 py-2 border-2 border-valentine-purple-300 rounded-lg focus:outline-none focus:border-valentine-purple-500"
                    autoFocus
                  />
                </div>
              )}
              {revealedSections.includes(4) && (
                <p className="text-justify">{sections[3].content}</p>
              )}
            </motion.div>
          )}
        </div>

        {state.letter.completed && (
          <motion.p
            className="text-center text-valentine-purple-600 font-semibold mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Continuing to final reveal...
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
