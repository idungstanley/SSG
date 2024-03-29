import { useMemo } from 'react';
import { getRelativeWidth } from '../../utils/widthUtils';
import { useAppSelector } from '../hooks';
import { IUserParams } from '../../features/account/account.interfaces';

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

const PILOT_WIDTH = {
  DEFAULT: 22,
  MAX: 34.27,
  MIN: 26
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
  CURRENT_WORKSPACE_ID: 'currentWorkspaceId',
  IS_PILOT_MINIFIED: 'isPilotMinified',
  EXTENDED_BAR_WIDTH: 'extendedBarWidth',
  HOT_KEYS: 'hotkeys',
  FEATURE_BUTTONS: 'featureButtons'
};

export const LIMITS = {
  NAME_INPUT_LIMITS: 2000
};

const calculateWidthForContent = () => {
  const pilotWidthFromLS =
    (JSON.parse(localStorage.getItem(STORAGE_KEYS.PILOT_WIDTH) || '""') as number) || dimensions.pilot.default;

  const extendedBarWidthFromLS =
    (JSON.parse(localStorage.getItem(STORAGE_KEYS.EXTENDED_BAR_WIDTH) || '""') as number) ||
    dimensions.extendedBar.default;

  const sidebarWidthFromLS =
    (JSON.parse(localStorage.getItem(STORAGE_KEYS.SIDEBAR_WIDTH) || '""') as number) ||
    dimensions.navigationBar.default;

  const isPilotMinifiedFromLS = (
    JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_SETTINGS_DATA) || '""') as IUserParams
  ).isPilotMinified as boolean;

  const { showSidebar, userSettingsData, sidebarWidth, pilotWidth, extendedBarWidth } = useAppSelector(
    (state) => state.account
  );
  const { show: showFullPilot, id } = useAppSelector((state) => state.slideOver.pilotSideOver);

  const { sidebarWidthRD, showExtendedBar } = useAppSelector((state) => state.workspace);

  const sidebarWidthRT = showSidebar ? sidebarWidth || userSettingsData?.sidebarWidth : sidebarWidthRD;

  const extendedBarWidthRT = showExtendedBar ? extendedBarWidth || userSettingsData?.extendedBarWidth : 0;

  const pilotWidthRT = showFullPilot && id ? pilotWidth || userSettingsData?.pilotWidth : !showFullPilot && id ? 50 : 0;

  const calculatedContentWidth = useMemo(() => {
    return `calc(100vw - ${sidebarWidthRT}px - ${extendedBarWidthRT}px - ${pilotWidthRT}px)`;
  }, [
    pilotWidth,
    sidebarWidth,
    extendedBarWidthRT,
    sidebarWidthRT,
    pilotWidthRT,
    extendedBarWidth,
    pilotWidthFromLS,
    userSettingsData?.sidebarWidth,
    showFullPilot,
    showSidebar,
    userSettingsData?.pilotWidth,
    userSettingsData?.extendedBarWidth,
    userSettingsData?.isPilotMinified,
    showExtendedBar,
    userSettingsData,
    isPilotMinifiedFromLS,
    extendedBarWidthFromLS,
    sidebarWidthFromLS
  ]);
  return calculatedContentWidth;
};

export { dimensions, NAVIGATION_AND_EXTENDED_MAX_ALLOWED, STORAGE_KEYS, calculateWidthForContent };
