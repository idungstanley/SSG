import React, { useCallback, useRef, useState } from 'react';

const MIN_SIDEBAR_WIDTH = 200;
const MAX_SIDEBAR_WIDTH = 400;
const RELATIVE_WIDTH = 10;

function FullSidebar() {
  return (
    <>
      Sidebar
      <button className="py-1 px-3 border truncate">
        icon 1 text 1 csdcsd csdcsdcsd csdcsdcsd
      </button>
      <button className="p-1 border">icon 2 text 2</button>
      <button className="p-1 border">icon 3 text 3</button>
      <button className="p-1 border">icon 4 text 4</button>
      <input className="border" placeholder="input" type="text" />
    </>
  );
}

function MinSidebar() {
  return (
    <>
      Sidebar
      <button className="p-1 border">icon 1</button>
      <button className="p-1 border">icon 2</button>
      <button className="p-1 border">icon 3</button>
    </>
  );
}

interface ResizeBorderProps {
  onMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

function ResizeBorder({ onMouseDown }: ResizeBorderProps) {
  return (
    <div
      style={{ cursor: 'col-resize' }}
      onMouseDown={(e) => onMouseDown(e)}
      className="absolute top-0 w-5 h-full -right-2.5 group flex justify-center"
    >
      <div className="group-hover:opacity-100 opacity-0 h-full w-1 bg-indigo-500 transition duration-500" />
    </div>
  );
}

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

        if (width < MIN_SIDEBAR_WIDTH - RELATIVE_WIDTH) {
          setShowSmall(true);
        }

        if (showSmall && width > MIN_SIDEBAR_WIDTH + RELATIVE_WIDTH) {
          setShowSmall(false);
        }

        if (width > startX) {
          setShowSmall(false);
          setSidebarWidth(MIN_SIDEBAR_WIDTH);
        }

        setSidebarWidth(
          width >= MAX_SIDEBAR_WIDTH
            ? MAX_SIDEBAR_WIDTH
            : width <= MIN_SIDEBAR_WIDTH
            ? MIN_SIDEBAR_WIDTH
            : width
        );
      };

      const onMouseEnd = () => {
        setAllowSelect(true);

        document.removeEventListener('mousemove', onMouseMove);
        if (sidebarRef.current) {
          console.log('sidebar:', sidebarRef.current.clientWidth);
        }

        document.removeEventListener('mouseup', onMouseEnd);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseEnd);
    },
    [allowSelect]
  );

  const closeOrShowSidebar = () => {
    setShowSmall((prev) => !prev);
    setSidebarWidth(MIN_SIDEBAR_WIDTH);
  };

  return (
    <div ref={sidebarRef} className="flex gap-5 text-center relative">
      <div
        onClick={closeOrShowSidebar}
        className="absolute z-10 bg-indigo-200 top-1 right-1 p-1 cursor-pointer text-sm"
      >
        {showSmall ? 'show' : 'hide'}
      </div>
      {!showSmall ? (
        <div
          className="relative flex flex-col border border-indigo-500 p-2 gap-2"
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
