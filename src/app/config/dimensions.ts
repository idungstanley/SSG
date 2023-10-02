import { useMemo } from 'react';
import { getRelativeWidth } from '../../utils/widthUtils';
import { useAppSelector } from '../hooks';

const sidebarFromLS = JSON.parse(localStorage.getItem('sidebar') || '""') as
  | {
      sidebarWidth: number;
      showSidebar: boolean;
    }
  | undefined;
const showSidebar = sidebarFromLS?.showSidebar;
const INNER_WIDTH = window.innerWidth;
//RELATIVE_WIDTH IN PIXEL.
const COMMON_WIDTH = 1550;
const PILOT_SCROLLBAR_WIDTH = 0;
const PILOT_COLLAPSE_WIDTH = 54;

const PILOT_WIDTH = {
  DEFAULT: 22,
  MAX: 28,
  MIN: 20
} as const;

const NAVIGATION_BAR_WIDTH = {
  DEFAULT: INNER_WIDTH <= COMMON_WIDTH ? 16 : 12,
  MAX: 20,
  MIN: INNER_WIDTH <= COMMON_WIDTH ? 13 : 12
} as const;

const EXTENDED_BAR_WIDTH = {
  DEFAULT: 10,
  MAX: 12,
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
    default: showSidebar != undefined && !showSidebar ? 70 : getRelativeWidth(NAVIGATION_BAR_WIDTH.DEFAULT),
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

const STORAGE_KEYS = {
  SIDEBAR_WIDTH: 'sidebarWidth',
  PILOT_WIDTH: 'pilotWidth',
  CURRENT_USER_ID: 'currentUserId',
  USER: 'user',
  USER_SETTINGS_DATA: 'userSettingsData',
  ACCESS_TOKEN: 'accessToken',
  CURRENT_WORKSPACE_ID: 'currentWorkspaceId'
};

const pilotWidthFromLS = JSON.parse(
  localStorage.getItem(STORAGE_KEYS.PILOT_WIDTH) ?? `${dimensions.pilot.default}`
) as number;

const calculateWidthForContent = () => {
  const { showSidebar, userSettingsData } = useAppSelector((state) => state.account);
  const { show: showFullPilot, id } = useAppSelector((state) => state.slideOver.pilotSideOver);
  const { sidebarWidthRD, showExtendedBar } = useAppSelector((state) => state.workspace);
  const sidebarWidth = showSidebar ? userSettingsData?.sidebarWidth : sidebarWidthRD;
  const extendedBarWidth = showExtendedBar ? dimensions.extendedBar.max : 0;
  const pilotWidth =
    showFullPilot && id
      ? pilotWidthFromLS + PILOT_SCROLLBAR_WIDTH
      : PILOT_COLLAPSE_WIDTH && id
      ? PILOT_COLLAPSE_WIDTH
      : undefined;
  const calculatedContentWidth = useMemo(() => {
    return `calc(100vw - ${sidebarWidth}px - ${extendedBarWidth}px - ${pilotWidth}px)`;
  }, [pilotWidth, sidebarWidth, extendedBarWidth]);
  return calculatedContentWidth;
};

export { dimensions, NAVIGATION_AND_EXTENDED_MAX_ALLOWED, STORAGE_KEYS, calculateWidthForContent };
