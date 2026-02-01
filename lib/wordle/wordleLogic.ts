import { LetterColor } from '@/types';
import { isValidWord } from './wordList';

export const checkGuess = (guess: string, target: string): LetterColor[] => {
  const result: LetterColor[] = Array(5).fill('absent');
  const targetLetters = target.split('');
  const guessLetters = guess.split('');

  // First pass: mark correct positions
  guessLetters.forEach((letter, i) => {
    if (letter === targetLetters[i]) {
      result[i] = 'correct';
      targetLetters[i] = '';
    }
  });

  // Second pass: mark present letters
  guessLetters.forEach((letter, i) => {
    if (result[i] === 'correct') return;

    const targetIndex = targetLetters.indexOf(letter);
    if (targetIndex !== -1) {
      result[i] = 'present';
      targetLetters[targetIndex] = '';
    }
  });

  return result;
};

export const getLetterStatus = (
  letter: string,
  guesses: string[],
  target: string
): LetterColor => {
  let status: LetterColor = 'empty';

  guesses.forEach((guess) => {
    guess.split('').forEach((guessLetter, i) => {
      if (guessLetter !== letter) return;

      if (target[i] === letter) {
        status = 'correct';
      } else if (status !== 'correct' && target.includes(letter)) {
        status = 'present';
      } else if (status === 'empty') {
        status = 'absent';
      }
    });
  });

  return status;
};

export const validateGuess = (guess: string): { valid: boolean; message?: string } => {
  if (guess.length !== 5) {
    return { valid: false, message: 'Word must be 5 letters' };
  }

  if (!isValidWord(guess)) {
    return { valid: false, message: 'Not a valid word' };
  }

  return { valid: true };
};
