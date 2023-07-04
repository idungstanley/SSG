import { NoCapWords } from './NoCapWords';

export const Capitalize = (title: string) => {
  const words = title.toLowerCase().split(' ');

  const capitalizedWords = words.map((word, index) => {
    if (index === 0 || index === words.length - 1 || !NoCapWords.includes(word)) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
    return word;
  });

  return capitalizedWords.join(' ');
};
