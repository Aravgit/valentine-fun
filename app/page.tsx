'use client';

import { AnimatePresence } from 'framer-motion';
import { useAppState } from '@/components/providers/AppStateProvider';
import { ProgressIndicator } from '@/components/ui/ProgressIndicator';
import { InitialQuestion } from '@/components/steps/InitialQuestion';
import { WordleGame } from '@/components/steps/WordleGame';
import { RelationshipQuiz } from '@/components/steps/RelationshipQuiz';
import { FinalReveal } from '@/components/steps/FinalReveal';

export default function Home() {
  const { state } = useAppState();

  return (
    <main className="relative">
      <ProgressIndicator currentStep={state.currentStep} />

      <AnimatePresence mode="wait">
        {state.currentStep === 'initial' && <InitialQuestion key="initial" />}
        {state.currentStep === 'wordle' && <WordleGame key="wordle" />}
        {state.currentStep === 'letter' && <RelationshipQuiz key="quiz" />}
        {state.currentStep === 'reveal' && <FinalReveal key="reveal" />}
      </AnimatePresence>
    </main>
  );
}
