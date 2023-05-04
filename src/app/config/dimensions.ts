import { getRelativeWidth } from '../../utils/getRelativeWidth';

const PILOT_WIDTH = {
  DEFAULT: 25,
  MAX: 30,
  MIN: 20
} as const;

const NAVIGATION_BAR_WIDTH = {
  DEFAULT: 12,
  MAX: 20,
  MIN: 8
} as const;

const EXTENDED_BAR_WIDTH = {
  DEFAULT: 12,
  MAX: 20,
  MIN: 8
} as const;

const dimensions = {
  pilot: {
    default: getRelativeWidth(PILOT_WIDTH.DEFAULT),
    min: getRelativeWidth(PILOT_WIDTH.MIN),
    max: getRelativeWidth(PILOT_WIDTH.MAX)
  },
  navigationBar: {
    default: getRelativeWidth(NAVIGATION_BAR_WIDTH.DEFAULT),
    min: getRelativeWidth(NAVIGATION_BAR_WIDTH.MIN),
    max: getRelativeWidth(NAVIGATION_BAR_WIDTH.MAX)
  },
  extendedBar: {
    default: getRelativeWidth(EXTENDED_BAR_WIDTH.DEFAULT),
    min: getRelativeWidth(EXTENDED_BAR_WIDTH.MIN),
    max: getRelativeWidth(EXTENDED_BAR_WIDTH.MAX)
  }
};

export { dimensions };
