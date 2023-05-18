import { getRelativeWidth } from '../../utils/widthUtils';

const sidebarFromLS = JSON.parse(localStorage.getItem('sidebar') || 'null') as {
  sidebarWidth: number;
  showSidebar: boolean;
} | null;
const showSidebar = !!sidebarFromLS?.showSidebar;

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

const NAVIGATION_AND_EXTENDED_MAX_ALLOWED = 30;

const dimensions = {
  pilot: {
    default: getRelativeWidth(PILOT_WIDTH.DEFAULT),
    min: getRelativeWidth(PILOT_WIDTH.MIN),
    max: getRelativeWidth(PILOT_WIDTH.MAX)
  },
  navigationBar: {
    default: showSidebar === true ? getRelativeWidth(NAVIGATION_BAR_WIDTH.DEFAULT) : 70,
    min: getRelativeWidth(NAVIGATION_BAR_WIDTH.MIN),
    max: getRelativeWidth(NAVIGATION_BAR_WIDTH.MAX),
    collapse: 70
  },
  extendedBar: {
    default: getRelativeWidth(EXTENDED_BAR_WIDTH.DEFAULT),
    min: getRelativeWidth(EXTENDED_BAR_WIDTH.MIN),
    max: getRelativeWidth(EXTENDED_BAR_WIDTH.MAX)
  }
};

export { dimensions, NAVIGATION_AND_EXTENDED_MAX_ALLOWED };
