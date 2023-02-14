import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setShowSidebar } from '../../../../features/account/accountSlice';
import FullSidebar from './components/FullSidebar';
import MinSidebar from './components/MinSidebar';
import ResizeBorder from './components/ResizeBorder';
import Toggle from './components/Toggle';

const MIN_SIDEBAR_WIDTH = 230;
const MAX_SIDEBAR_WIDTH = 400;
const RELATIVE_WIDTH = 10;

interface SidebarProps {
  allowSelect: boolean;
  setAllowSelect: (i: boolean) => void;
}

export default function Sidebar({
  allowSelect,
  setAllowSelect,
}: SidebarProps) {
  const dispatch = useAppDispatch();
  const { showSidebar } = useAppSelector((state) => state.account);
  const [sidebarWidth, setSidebarWidth] = useState(MIN_SIDEBAR_WIDTH);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const startX = e.clientX;

      const onMouseMove = (e: MouseEvent) => {
        if (allowSelect) {
          setAllowSelect(false);
        }

        const width = sidebarWidth + e.clientX - startX;

        // actual size is bigger than bax
        if (width > MAX_SIDEBAR_WIDTH) {
          return;
        }

        // actual size is smaller than min
        if (width < MIN_SIDEBAR_WIDTH - RELATIVE_WIDTH) {
          return dispatch(setShowSidebar(false));
        }

        // sidebar hidden and becomes bigger
        if (width > startX) {
          dispatch(setShowSidebar(true));
          setSidebarWidth(MIN_SIDEBAR_WIDTH);
        }

        const correctWidth =
          width >= MAX_SIDEBAR_WIDTH
            ? MAX_SIDEBAR_WIDTH
            : width <= MIN_SIDEBAR_WIDTH
            ? MIN_SIDEBAR_WIDTH
            : width;

        setSidebarWidth(correctWidth);
      };

      const onMouseEnd = () => {
        setAllowSelect(true);

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseEnd);
        if (sidebarRef.current) {
          // console.log('sidebar:', sidebarRef.current.clientWidth);
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
      maxWidth: MAX_SIDEBAR_WIDTH + 'px',
    }),
    [sidebarWidth]
  );

  return (
    <div ref={sidebarRef} className="flex gap-5 text-center relative">
      {/* show / hide sidebar icon */}
      <Toggle />

      {/* sidebar */}
      {showSidebar ? (
        <div
          className="h-full relative flex flex-col border-r border-gray-500 px-1 gap-2"
          style={style}
        >
          <FullSidebar />
          <ResizeBorder onMouseDown={onMouseDown} />
        </div>
      ) : (
        <div className="h-full relative flex flex-col border-r border-gray-500 px-1 gap-2">
          <MinSidebar />
          <ResizeBorder onMouseDown={onMouseDown} />
        </div>
      )}
    </div>
  );
}
