'use client';

import { useState, useEffect } from 'react';
import { WordleRow } from './WordleRow';
import { Keyboard } from './Keyboard';
import { checkGuess, getLetterStatus, validateGuess } from '@/lib/wordle/wordleLogic';
import { LetterColor } from '@/types';
import { useAppState } from '@/components/providers/AppStateProvider';

interface WordleBoardProps {
  onWin: () => void;
}

export function WordleBoard({ onWin }: WordleBoardProps) {
  const { state, dispatch } = useAppState();
  const { targetWord, guesses, currentGuess, gameStatus, maxGuesses } = state.wordle;
  const [revealingIndex, setRevealingIndex] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const [letterStatuses, setLetterStatuses] = useState<Map<string, LetterColor>>(new Map());

  useEffect(() => {
    // Update letter statuses for keyboard
    const newStatuses = new Map<string, LetterColor>();
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    alphabet.forEach((letter) => {
      const status = getLetterStatus(letter, guesses, targetWord);
      newStatuses.set(letter, status);
    });

    setLetterStatuses(newStatuses);
  }, [guesses, targetWord]);

  const handleKeyPress = (key: string) => {
    if (gameStatus !== 'playing') return;
    setError('');

    if (key === 'ENTER') {
      if (currentGuess.length !== 5) {
        setError('Word must be 5 letters');
        return;
      }

      const validation = validateGuess(currentGuess);
      if (!validation.valid) {
        setError(validation.message || 'Invalid word');
        return;
      }

      const newGuesses = [...guesses, currentGuess];
      dispatch({
        type: 'UPDATE_WORDLE',
        payload: {
          guesses: newGuesses,
          currentGuess: '',
        },
      });

      setRevealingIndex(newGuesses.length - 1);

      setTimeout(() => {
        setRevealingIndex(null);

        if (currentGuess === targetWord) {
          dispatch({
            type: 'UPDATE_WORDLE',
            payload: { gameStatus: 'won' },
          });
          setTimeout(onWin, 500);
        } else if (newGuesses.length >= maxGuesses) {
          dispatch({
            type: 'UPDATE_WORDLE',
            payload: { gameStatus: 'lost' },
          });
        }
      }, 600);
    } else if (key === 'BACK') {
      dispatch({
        type: 'UPDATE_WORDLE',
        payload: { currentGuess: currentGuess.slice(0, -1) },
      });
    } else if (currentGuess.length < 5) {
      dispatch({
        type: 'UPDATE_WORDLE',
        payload: { currentGuess: currentGuess + key },
      });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleKeyPress('ENTER');
      } else if (e.key === 'Backspace') {
        handleKeyPress('BACK');
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        handleKeyPress(e.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const rows = Array(maxGuesses).fill('');

  return (
    <div className="flex flex-col items-center gap-4 sm:gap-6 w-full">
      <div className="flex flex-col gap-2 sm:gap-3">
        {rows.map((_, i) => {
          const guess = guesses[i];
          const isCurrentRow = i === guesses.length && gameStatus === 'playing';
          const displayGuess = isCurrentRow ? currentGuess : guess || '';
          const colors = guess ? checkGuess(guess, targetWord) : undefined;
          const isRevealing = i === revealingIndex;

          return (
            <WordleRow
              key={i}
              guess={displayGuess}
              colors={colors}
              isRevealing={isRevealing}
            />
          );
        })}
      </div>

      {error && (
        <div className="text-red-500 font-semibold text-sm">{error}</div>
      )}

      <Keyboard onKeyPress={handleKeyPress} letterStatuses={letterStatuses} />
    </div>
  );
}
