'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AppState, AppAction } from '@/types';
import { getRandomWord } from '@/data/wordle-words';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';

const initialState: AppState = {
  currentStep: 'initial',
  dodgeCount: 0,
  wordle: {
    targetWord: getRandomWord(),
    guesses: [],
    currentGuess: '',
    gameStatus: 'playing',
    maxGuesses: 6,
  },
  letter: {
    revealedSections: [],
    completed: false,
  },
};

const AppStateContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | undefined>(undefined);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };

    case 'INCREMENT_DODGE':
      return { ...state, dodgeCount: state.dodgeCount + 1 };

    case 'UPDATE_WORDLE':
      return {
        ...state,
        wordle: { ...state.wordle, ...action.payload },
      };

    case 'REVEAL_LETTER_SECTION':
      const newRevealedSections = state.letter.revealedSections.includes(action.payload)
        ? state.letter.revealedSections
        : [...state.letter.revealedSections, action.payload];

      return {
        ...state,
        letter: {
          ...state.letter,
          revealedSections: newRevealedSections,
          completed: newRevealedSections.length === 4,
        },
      };

    case 'RESET_STATE':
      return initialState;

    default:
      return state;
  }
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [storedState, setStoredState] = useLocalStorage<AppState>('valentine-hunt-state', initialState);
  const [state, dispatch] = useReducer(appReducer, storedState);

  useEffect(() => {
    setStoredState(state);
  }, [state, setStoredState]);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
}
