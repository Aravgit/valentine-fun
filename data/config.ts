import { romanticWords } from './wordle-words';
import { letterSections } from './love-letter';
import { messages } from './messages';

export const config = {
  wordleWords: romanticWords,
  loveLetter: {
    sections: letterSections,
  },
  // Single photo for the scratch card reveal
  photos: [
    '/photos/01.jpg', // This photo will be revealed by scratching
  ],
  finalMessage: messages.finalRevealMessage,
  messages,
};
