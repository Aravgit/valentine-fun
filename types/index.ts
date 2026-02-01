export type Step = 'initial' | 'wordle' | 'letter' | 'reveal';

export type GameStatus = 'playing' | 'won' | 'lost';

export type LetterColor = 'correct' | 'present' | 'absent' | 'empty';

export interface WordleState {
  targetWord: string;
  guesses: string[];
  currentGuess: string;
  gameStatus: GameStatus;
  maxGuesses: number;
}

export interface LetterSection {
  id: number;
  trigger: 'click' | 'scroll' | 'hover' | 'type';
  word?: string;
  content: string;
}

export interface LetterState {
  revealedSections: number[];
  completed: boolean;
}

export interface AppState {
  currentStep: Step;
  dodgeCount: number;
  wordle: WordleState;
  letter: LetterState;
}

export type AppAction =
  | { type: 'SET_STEP'; payload: Step }
  | { type: 'INCREMENT_DODGE' }
  | { type: 'UPDATE_WORDLE'; payload: Partial<WordleState> }
  | { type: 'REVEAL_LETTER_SECTION'; payload: number }
  | { type: 'RESET_STATE' };
