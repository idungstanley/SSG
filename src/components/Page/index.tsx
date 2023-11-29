import { ReactNode, useEffect, useMemo } from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { STORAGE_KEYS, calculateWidthForContent, dimensions } from '../../app/config/dimensions';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setExtendedSidebarWidth, setShowExtendedBar } from '../../features/workspace/workspaceSlice';
import { useResize } from '../../hooks/useResize';
import ExtendedItem from '../../layout/components/MainLayout/extendedNavigation/components/extendedItem';
import { IPilotSection, IPilotTab } from '../../types';
import { cl } from '../../utils';
import { isAllowIncreaseWidth } from '../../utils/widthUtils';
import Pilot from '../Pilot';
import selectWidth from '../../utils/selectWidth';

interface PageProps {
  header?: JSX.Element;
  additionalHeader?: JSX.Element;
  children: ReactNode;
  additional?: JSX.Element;
  extendedBar?: ExtendedBarProps;
  pilotConfig?: { tabs: IPilotTab[]; sections: IPilotSection[] };
}

interface ExtendedBarProps {
  children: ReactNode;
  name: string;
  icon?: JSX.Element;
  source?: string;
}

const MIN_SIDEBAR_WIDTH = dimensions.extendedBar.min;
const MAX_SIDEBAR_WIDTH = dimensions.extendedBar.max;
const extendedBarWidthFromLS =
  (JSON.parse(localStorage.getItem(STORAGE_KEYS.EXTENDED_BAR_WIDTH) || '""') as number) ||
  dimensions.extendedBar.default;

const pilotWidthFromLS =
  (JSON.parse(localStorage.getItem(STORAGE_KEYS.PILOT_WIDTH) || '""') as number) || dimensions.pilot.default;

export default function Page({ header, additionalHeader, children, additional, pilotConfig, extendedBar }: PageProps) {
  const { showOverlay } = useAppSelector((state) => state.workspace);
  const { userSettingsData } = useAppSelector((state) => state.account);
  const { show: showFullPilot } = useAppSelector((state) => state.slideOver.pilotSideOver);

  const { size, blockRef, Dividers } = useResize({
    dimensions: {
      min: dimensions.pilot.min,
      max: dimensions.pilot.max
    },
    storageKey: STORAGE_KEYS.PILOT_WIDTH,
    direction: 'XL'
  });

  const calculateWidthForHeader = () => {
    const extendedBarWidthFromLS =
      (JSON.parse(localStorage.getItem(STORAGE_KEYS.EXTENDED_BAR_WIDTH) || '""') as number) ||
      dimensions.extendedBar.default;

    const sidebarWidthFromLS =
      (JSON.parse(localStorage.getItem(STORAGE_KEYS.SIDEBAR_WIDTH) || '""') as number) ||
      dimensions.navigationBar.default;

    const { showSidebar, userSettingsData, sidebarWidth, extendedBarWidth } = useAppSelector((state) => state.account);
    const { sidebarWidthRD, showExtendedBar } = useAppSelector((state) => state.workspace);

    const sidebarWidthRT = showSidebar ? sidebarWidth || userSettingsData?.sidebarWidth : sidebarWidthRD;

    const extendedBarWidthRT = showExtendedBar ? extendedBarWidth || userSettingsData?.extendedBarWidth : 0;

    const calculatedContentWidth = useMemo(() => {
      return `calc(100vw - ${sidebarWidthRT}px - ${extendedBarWidthRT}px)`;
    }, [
      sidebarWidth,
      extendedBarWidthRT,
      sidebarWidthRT,
      extendedBarWidth,
      userSettingsData?.sidebarWidth,
      showSidebar,
      userSettingsData?.extendedBarWidth,
      userSettingsData?.isPilotMinified,
      showExtendedBar,
      userSettingsData,
      extendedBarWidthFromLS,
      sidebarWidthFromLS
    ]);
    return calculatedContentWidth;
  };

  return (
    <main className="grid w-full h-full grid-cols-autoFr">
      {showOverlay && <div className="absolute inset-0 top-0 left-0 z-40 bg-black opacity-50" />}
      {extendedBar ? (
        <ExtendedBar name={extendedBar.name} icon={extendedBar.icon} source={extendedBar.source}>
          {extendedBar.children}
        </ExtendedBar>
      ) : (
        <div></div>
      )}
      <section className="flex flex-col h-full" style={{ width: calculateWidthForHeader() }}>
        {additionalHeader}
        {header}
        <div className="relative grid h-full grid-cols-frAuto">
          <div className="relative" style={{ width: calculateWidthForContent() }}>
            {children}
          </div>
          <span
            className={`${showOverlay ? 'z-50' : 'border-l relative'}`}
            ref={blockRef}
            style={{
              width: showFullPilot ? selectWidth(size, pilotWidthFromLS) || userSettingsData?.pilotWidth : undefined
            }}
          >
            {showFullPilot ? <Dividers /> : null}
            {pilotConfig ? <Pilot pilotConfig={pilotConfig} /> : null}
          </span>
        </div>
      </section>
      {additional}
    </main>
  );
}

function ExtendedBar({ children, name, icon, source }: ExtendedBarProps) {
  const dispatch = useAppDispatch();

  const { sidebarWidthRD, showExtendedBar } = useAppSelector((state) => state.workspace);
  const { userSettingsData } = useAppSelector((state) => state.account);

  const { blockRef, Dividers, size } = useResize({
    dimensions: {
      min: MIN_SIDEBAR_WIDTH,
      max: MAX_SIDEBAR_WIDTH
    },
    storageKey: STORAGE_KEYS.EXTENDED_BAR_WIDTH,
    direction: 'XR'
  });

  const handleToggle = () => {
    dispatch(setShowExtendedBar(!showExtendedBar));
  };

  useEffect(() => {
    const { isAllow, allowedSize } = isAllowIncreaseWidth(size, sidebarWidthRD);
    dispatch(setExtendedSidebarWidth(isAllow ? size : allowedSize - size));
  }, [size]);

  return (
    <aside
      style={{
        width: showExtendedBar
          ? selectWidth(size, extendedBarWidthFromLS) || userSettingsData?.extendedBarWidth
          : undefined
      }}
      ref={blockRef}
      className={cl(showExtendedBar && 'border-r', 'relative h-full transition-all duration-300')}
    >
      <span
        onClick={handleToggle}
        style={{ zIndex: '11' }}
        className={cl(
          showExtendedBar ? 'bg-green-400 top-2 border-green-400' : 'bg-white top-4 border-inherit',
          'absolute border-2 rounded-full cursor-pointer -right-2'
        )}
      >
        {showExtendedBar ? (
          <RiArrowLeftSLine className="text-sm text-white" />
        ) : (
          <RiArrowRightSLine className="text-xs" />
        )}
      </span>

      {showExtendedBar ? (
        <>
          <ExtendedItem name={name} icon={icon} source={source} />
          <div>{children}</div>
          <Dividers />
        </>
      ) : null}
    </aside>
  );
}
