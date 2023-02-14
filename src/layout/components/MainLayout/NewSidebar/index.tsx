import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/solid';
import React, { useCallback, useRef, useState } from 'react';
import FullSidebar from './components/FullSidebar';
import MinSidebar from './components/MinSidebar';
import ResizeBorder from './components/ResizeBorder';

const MIN_SIDEBAR_WIDTH = 230;
const MAX_SIDEBAR_WIDTH = 400;
const RELATIVE_WIDTH = 10;

interface SidebarProps {
  allowSelect: boolean;
  setAllowSelect: (i: boolean) => void;
}

export default function NewSidebar({
  allowSelect,
  setAllowSelect,
}: SidebarProps) {
  const [sidebarWidth, setSidebarWidth] = useState(MIN_SIDEBAR_WIDTH);
  const [showSmall, setShowSmall] = useState(false);
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
          return setShowSmall(true);
        }

        // sidebar hidden and becomes bigger
        if (width > startX) {
          setShowSmall(false);
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

  const closeOrShowSidebar = () => {
    setShowSmall((prev) => !prev);
    // if (showSmall) {
    //   setSidebarWidth(MIN_SIDEBAR_WIDTH);
    // }
  };

  return (
    <div ref={sidebarRef} className="flex gap-5 text-center relative">
      {/* show / hide sidebar */}
      <div
        onClick={closeOrShowSidebar}
        className="absolute z-20 text-gray-800 top-1 right-1 cursor-pointer"
      >
        {showSmall ? (
          <ChevronDoubleRightIcon className="w-4 h-4" aria-hidden="true" />
        ) : (
          <ChevronDoubleLeftIcon className="w-4 h-4" aria-hidden="true" />
        )}
      </div>

      {!showSmall ? (
        <div
          className="relative flex flex-col border-r border-indigo-500 p-2 gap-2"
          style={{
            width: sidebarWidth,
            minWidth: MIN_SIDEBAR_WIDTH + 'px',
            maxWidth: MAX_SIDEBAR_WIDTH + 'px',
          }}
        >
          <FullSidebar />
          <ResizeBorder onMouseDown={onMouseDown} />
        </div>
      ) : (
        <div className="relative flex flex-col border border-indigo-500 p-2 gap-2">
          <MinSidebar />
          <ResizeBorder onMouseDown={onMouseDown} />
        </div>
      )}
    </div>
  );
}
