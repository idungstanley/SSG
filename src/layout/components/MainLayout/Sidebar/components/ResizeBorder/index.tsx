import React from 'react';
import { MAX_SIDEBAR_WIDTH, MIN_SIDEBAR_WIDTH } from '../..';
// import { useAppSelector } from "../../../../../../app/hooks";
// import { cl } from "../../../../../../utils";

interface ResizeBorderProps {
  onMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  sidebarWidth: number;
}

export default function ResizeBorder({ onMouseDown, sidebarWidth }: ResizeBorderProps) {
  // const { showSidebar } = useAppSelector((state) => state.account);

  return (
    <span className="group">
      <div
        className={`absolute top-0 right-0 bottom-0 z-20 h-full justify-self-end shrink-0 grow-0 cursor-all-scroll ${
          sidebarWidth >= MIN_SIDEBAR_WIDTH && 'group-hover:bg-green-200'
        }`}
        onMouseDown={(e) => onMouseDown(e)}
        style={{
          cursor: 'col-resize',
          width: `${sidebarWidth >= MAX_SIDEBAR_WIDTH ? '4px' : '2px'}`
        }}
      ></div>
      <div
        className={`absolute top-0 bottom-0 h-full transition duration-500 z-20 justify-self-end shrink-0 grow-0 cursor-all-scroll ${
          sidebarWidth <= MAX_SIDEBAR_WIDTH && 'group-hover:bg-green-200'
        }`}
        style={{
          cursor: 'col-resize',
          width: `${sidebarWidth < MIN_SIDEBAR_WIDTH ? '4px' : '2px'}`,
          right: `${sidebarWidth < MIN_SIDEBAR_WIDTH ? '-4.5px' : '-1px'}`
        }}
        onMouseDown={(e) => onMouseDown(e)}
      ></div>
    </span>
  );
}
