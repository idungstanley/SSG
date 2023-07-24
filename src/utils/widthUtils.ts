import { NAVIGATION_AND_EXTENDED_MAX_ALLOWED } from '../app/config/dimensions';

const windowWidth = window.innerWidth;

export const getRelativeWidth = (percent: number) => Math.round(windowWidth * (percent / 100));

export const isAllowIncreaseWidth = (first: number, second: number) => {
  const width = windowWidth * (NAVIGATION_AND_EXTENDED_MAX_ALLOWED / 100);

  const sum = first + second;

  // return sum <= width;
  return { isAllow: sum <= width, allowedSize: width };
};
