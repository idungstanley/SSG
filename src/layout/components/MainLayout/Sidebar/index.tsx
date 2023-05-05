import React, { useCallback, useMemo, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { cl } from '../../../../utils';
import { setScrollTop, setShowSidebar } from '../../../../features/account/accountSlice';
import { setSidebarWidthRD } from '../../../../features/workspace/workspaceSlice';
import Header from './components/Header';
import NavigationItems from './components/NavigationItems';
import Places from './components/Places';
import ResizeBorder from './components/ResizeBorder';
import Search from './components/Search';
import Toggle from './components/Toggle';
import { dimensions } from '../../../../app/config/dimensions';
import { isAllowIncreaseWidth } from '../../../../utils/widthUtils';

const MAX_SIDEBAR_WIDTH = dimensions.navigationBar.max;
const MIN_SIDEBAR_WIDTH = dimensions.navigationBar.min;

interface SidebarProps {
  allowSelect: boolean;
  setAllowSelect: (i: boolean) => void;
}

export default function Sidebar({ allowSelect, setAllowSelect }: SidebarProps) {
  const dispatch = useAppDispatch();
  const { sidebarWidthRD, extendedSidebarWidth } = useAppSelector((state) => state.workspace);
  const { showSidebar } = useAppSelector((state) => state.account);

  const sidebarRef = useRef<HTMLDivElement>(null);

  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const startX = e.clientX;

      const onMouseMove = (e: MouseEvent) => {
        if (allowSelect) {
          setAllowSelect(false);
        }
        // current width
        const width = sidebarWidthRD + e.clientX - startX;
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

        const { isAllow, allowedSize } = isAllowIncreaseWidth(adjustedWidth, extendedSidebarWidth);

        dispatch(setSidebarWidthRD(isAllow ? adjustedWidth : allowedSize - adjustedWidth));
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
      width: sidebarWidthRD + 'px',
      minWidth: MIN_SIDEBAR_WIDTH + 'px',
      maxWidth: MAX_SIDEBAR_WIDTH + 'px'
    }),
    [sidebarWidthRD]
  );

  const handleScroll = (event: React.UIEvent<HTMLElement, UIEvent>) => {
    dispatch(setScrollTop(event.currentTarget.scrollTop));
  };

  return (
    <aside ref={sidebarRef} className={cl('flex text-center relative overflow-x-visible')}>
      {/* show / hide sidebar icon */}
      <Toggle />
      {/* sidebar */}
      <section
        className="relative flex flex-col gap-2 pr-1 border-r border-gray-300"
        style={showSidebar ? style : undefined}
      >
        <Header />
        <section
          className="relative h-full flex flex-col pr-1.5 overflow-y-visible overflow-x-hidden"
          onScroll={(e) => handleScroll(e)}
        >
          {showSidebar ? <Search /> : null}
          <NavigationItems />
          <Places />
        </section>
      </section>
      <ResizeBorder sidebarWidth={sidebarWidthRD} onMouseDown={onMouseDown} />
    </aside>
  );
}
