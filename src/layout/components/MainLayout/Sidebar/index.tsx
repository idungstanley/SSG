import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { cl } from '../../../../utils';
import { setShowSidebar } from '../../../../features/account/accountSlice';
import { setSidebarWidthRD } from '../../../../features/workspace/workspaceSlice';
import Header from './components/Header';
import NavigationItems from './components/NavigationItems';
import Places from './components/Places';
import ResizeBorder from './components/ResizeBorder';
import Search from './components/Search';
import Toggle from './components/Toggle';

//INNER_WIDTH OF YOUR SCREEN.
const INNER_WIDTH = window.innerWidth;
//RELATIVE_WIDTH IN PIXEL.
const RELATIVE_WIDTH = 1550;
// 15% OF YOUR WINDOW SCREEN
const PER_MIN_LG_SCREEN = 0.15;
// 18% OF YOUR WINDOW SCREEN
const PER_MIN_MD_SCREEN = 0.18;
// 22.5% OF YOUR WINDOW SCREEN AS MAX FOR MD
const PER_MAX_MD_SCREEN = 0.225;
// 22.5% OF YOUR WINDOW SCREEN AS MAX FOR LG
const PER_MAX_LG_SCREEN = 0.2;

export const MIN_SIDEBAR_WIDTH =
  INNER_WIDTH >= RELATIVE_WIDTH ? PER_MIN_LG_SCREEN * INNER_WIDTH : PER_MIN_MD_SCREEN * RELATIVE_WIDTH;

//25% OF YOUR WINDOW SCREEN
export const MAX_SIDEBAR_WIDTH =
  INNER_WIDTH >= RELATIVE_WIDTH ? PER_MAX_LG_SCREEN * RELATIVE_WIDTH : PER_MAX_MD_SCREEN * RELATIVE_WIDTH;

interface SidebarProps {
  allowSelect: boolean;
  setAllowSelect: (i: boolean) => void;
}
// getting sidebar width from localStorage
interface SidebarFromLSProp {
  sidebarWidth: number;
  showSidebar: boolean;
}

// getting sidebar width from localStorage
const sidebarFromLS: SidebarFromLSProp = JSON.parse(localStorage.getItem('sidebar') || '""') as SidebarFromLSProp;
const sidebarWidthFromLS = sidebarFromLS.sidebarWidth;

export default function Sidebar({ allowSelect, setAllowSelect }: SidebarProps) {
  const dispatch = useAppDispatch();
  const { showSidebar } = useAppSelector((state) => state.account);
  const [sidebarWidth, setSidebarWidth] = useState(sidebarWidthFromLS || MIN_SIDEBAR_WIDTH);

  const sidebarRef = useRef<HTMLDivElement>(null);

  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const startX = e.clientX;

      const onMouseMove = (e: MouseEvent) => {
        if (allowSelect) {
          setAllowSelect(false);
        }
        // current width
        const width = sidebarWidth + e.clientX - startX;
        // actual size is bigger than bax
        if (width > MAX_SIDEBAR_WIDTH) {
          return;
        }

        // sidebar hidden and becomes bigger
        if (width > startX) {
          dispatch(setShowSidebar(true));
        }

        // adjusted width according to min and max values
        const adjustedWidth =
          width >= MAX_SIDEBAR_WIDTH ? MAX_SIDEBAR_WIDTH : width <= MIN_SIDEBAR_WIDTH ? MIN_SIDEBAR_WIDTH : width;

        setSidebarWidth(adjustedWidth);
      };

      const onMouseEnd = () => {
        setAllowSelect(true);

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseEnd);

        // saving current sidebar size to localStorage
        if (sidebarRef.current) {
          const width = sidebarRef.current.clientWidth;
          const adjustedWidth =
            width >= MAX_SIDEBAR_WIDTH ? MAX_SIDEBAR_WIDTH : width <= MIN_SIDEBAR_WIDTH ? MIN_SIDEBAR_WIDTH : width;

          localStorage.setItem(
            'sidebar',
            JSON.stringify({
              adjustedWidth,
              showSidebar: width >= MIN_SIDEBAR_WIDTH
            })
          );
        }
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseEnd);
    },
    [allowSelect]
  );

  // dynamic width for sidebar
  const style = useMemo(
    () => ({
      width: sidebarWidth + 'px',
      minWidth: MIN_SIDEBAR_WIDTH + 'px',
      maxWidth: MAX_SIDEBAR_WIDTH + 'px'
    }),
    [sidebarWidth]
  );
  useMemo(() => dispatch(setSidebarWidthRD(sidebarWidth)), [sidebarWidth]);

  return (
    <aside ref={sidebarRef} className={cl('flex text-center relative overflow-x-hidden')}>
      {/* show / hide sidebar icon */}
      <Toggle />
      {/* sidebar */}
      <section
        className="relative flex flex-col h-full gap-2 pr-1 border-r border-gray-300"
        style={showSidebar ? style : undefined}
      >
        <Header />
        <section className="relative flex flex-col pr-1.5 overflow-y-scroll overflow-x-hidden">
          {showSidebar ? <Search /> : null}
          <NavigationItems />
          <Places />
        </section>
      </section>
      <ResizeBorder sidebarWidth={sidebarWidth} onMouseDown={onMouseDown} />
    </aside>
  );
}
