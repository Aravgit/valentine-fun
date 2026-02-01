export const romanticWords = [
  'HEART',
  'LOVER',
  'SWEET',
  'BLISS',
  'CHARM',
  'AMOUR',
  'CRUSH',
  'SWOON',
  'HONEY',
  'CUPID',
  'ANGEL',
  'DREAM',
  'ADORE',
  'FLAME',
  'ROSES',
  'KISSES', // Note: 6 letters - will be filtered
  'BRIDE',
  'DANCE',
  'GRACE',
  'SMILE',
].filter(word => word.length === 5);

export const getRandomWord = (): string => {
  return romanticWords[Math.floor(Math.random() * romanticWords.length)];
};
