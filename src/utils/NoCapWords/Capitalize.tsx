import { NoCapWords } from './NoCapWords';

export const Capitalize = (title: string | null) => {
  if (title === null) {
    return '';
  }
  const words = title.split(' ');
  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return capitalizedWords.join(' ');
};
