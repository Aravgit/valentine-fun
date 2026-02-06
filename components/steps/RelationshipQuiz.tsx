'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppState } from '@/components/providers/AppStateProvider';
import { fadeIn, slideUp } from '@/lib/utils/animations';

interface Question {
  id: number;
  question: string;
  answer: string[];
  hint?: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "When was our first date?",
    answer: ["oct 30", "october 30", "30 oct", "30 october", "oct30", "october30"],
    hint: "Think back to October..."
  },
  {
    id: 2,
    question: "Where was our first kiss?",
    answer: ["le vantage", "levantage", "vantage"],
    hint: "A place with a beautiful view..."
  },
  {
    id: 3,
    question: "What was my first gift to you?",
    answer: ["coffee", "coffee powder", "country bean coffee"],
    hint: "It was something to do with coffee..."
  }
];

export function RelationshipQuiz() {
  const { dispatch } = useAppState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

  const checkAnswer = () => {
    const normalizedAnswer = userAnswer.toLowerCase().trim();
    const correct = question.answer.some(ans =>
      normalizedAnswer.includes(ans) || ans.includes(normalizedAnswer)
    );

    if (correct) {
      setIsCorrect(true);
      setUserAnswer('');

      setTimeout(() => {
        if (isLastQuestion) {
          // All questions answered - proceed to next step
          dispatch({ type: 'SET_STEP', payload: 'reveal' });
        } else {
          // Move to next question
          setCurrentQuestion(prev => prev + 1);
          setIsCorrect(false);
          setShowHint(false);
          setAttempts(0);
        }
      }, 1500);
    } else {
      setAttempts(prev => prev + 1);
      if (attempts >= 1) {
        setShowHint(true);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userAnswer.trim()) {
      checkAnswer();
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-valentine-purple-50 to-valentine-pink-50 p-8 flex items-center justify-center"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="max-w-2xl w-full">
        <motion.h1
          className="text-4xl md:text-5xl font-display font-bold text-valentine-purple-600 text-center mb-4"
          variants={slideUp}
          initial="hidden"
          animate="visible"
        >
          How Well Do You Remember?
        </motion.h1>

        <motion.p
          className="text-center text-gray-600 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Answer these questions about our special moments together
        </motion.p>

        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          {/* Progress indicator */}
          <div className="flex justify-center gap-2 mb-8">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index < currentQuestion
                    ? 'w-12 bg-green-500'
                    : index === currentQuestion
                    ? 'w-16 bg-valentine-purple-500'
                    : 'w-8 bg-gray-300'
                }`}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-8">
                <span className="text-sm font-semibold text-valentine-purple-600 bg-valentine-purple-100 px-3 py-1 rounded-full">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-display font-semibold text-gray-800 text-center mb-8">
                {question.question}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Type your answer..."
                    className="w-full px-6 py-4 text-lg border-2 border-valentine-purple-300 rounded-xl focus:outline-none focus:border-valentine-purple-500 transition-colors"
                    autoFocus
                    disabled={isCorrect}
                  />
                </div>

                {showHint && question.hint && !isCorrect && (
                  <motion.div
                    className="text-sm text-valentine-purple-600 text-center italic"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    💡 Hint: {question.hint}
                  </motion.div>
                )}

                {isCorrect && (
                  <motion.div
                    className="text-center text-green-600 font-semibold text-xl"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    ✓ Correct! {isLastQuestion ? "All done! 💝" : "Moving to next question..."}
                  </motion.div>
                )}

                {!isCorrect && (
                  <button
                    type="submit"
                    className="w-full py-4 bg-valentine-purple-500 hover:bg-valentine-purple-600 text-white font-semibold rounded-xl transition-colors text-lg"
                  >
                    Submit Answer
                  </button>
                )}
              </form>

              {attempts > 0 && !isCorrect && (
                <motion.p
                  className="text-center text-red-500 text-sm mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Not quite right. Try again!
                </motion.p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
