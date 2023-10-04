import { ReactNode, useEffect } from 'react';
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

export default function Page({ header, additionalHeader, children, additional, pilotConfig, extendedBar }: PageProps) {
  const { showOverlay } = useAppSelector((state) => state.workspace);
  const { show: showFullPilot } = useAppSelector((state) => state.slideOver.pilotSideOver);

  const DEFAULT_PILOT_WIDTH = dimensions.pilot.default;
  const pilotWidthFromLS = JSON.parse(
    localStorage.getItem(STORAGE_KEYS.PILOT_WIDTH) ?? `${DEFAULT_PILOT_WIDTH}`
  ) as number;

  const { blockRef, Dividers } = useResize({
    dimensions: {
      min: dimensions.pilot.min,
      max: dimensions.pilot.max
    },
    storageKey: STORAGE_KEYS.PILOT_WIDTH,
    direction: 'XL'
  });

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
      <section className="flex flex-col w-full h-full">
        {additionalHeader}
        {header}
        <div className="relative grid w-full h-full grid-cols-frAuto">
          <div className="relative" style={{ width: calculateWidthForContent() }}>
            {children}
          </div>
          <span
            className={`${showOverlay ? 'z-50' : 'border-l relative'}`}
            ref={blockRef}
            style={{
              width: showFullPilot ? pilotWidthFromLS : undefined
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
    storageKey: 'extendedBarWidth',
    direction: 'XR',
    defaultSize: dimensions.extendedBar.default
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
      style={{ width: showExtendedBar ? userSettingsData?.extendedBarWidth : 0 }}
      ref={blockRef}
      className={cl(showExtendedBar && 'border-r', 'relative w-60 h-full transition-all duration-300')}
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
