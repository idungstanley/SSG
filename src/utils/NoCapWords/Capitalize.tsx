import { NoCapWords } from './NoCapWords';

export const Capitalize = (title: string | null) => {
  if (title === null) {
    return '';
  }
  const words = title.split(' ');
  const capitalizedWords = words.map((word) => {
    if (!NoCapWords.includes(word)) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
    return word;
  });
  return capitalizedWords.join(' ');
};
