import React from 'react';
import { MAX_SIDEBAR_WIDTH, MIN_SIDEBAR_WIDTH } from '../..';

interface ResizeBorderProps {
  onMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  sidebarWidth: number;
}

export default function ResizeBorder({ onMouseDown, sidebarWidth }: ResizeBorderProps) {
  return (
    <span className="group">
      <div
        className={`absolute top-0 right-0 bottom-0 z-20 h-full justify-self-end shrink-0 grow-0 ${
          sidebarWidth >= MIN_SIDEBAR_WIDTH && 'group-hover:bg-fuchsia-300'
        }`}
        onMouseDown={(e) => onMouseDown(e)}
        style={{
          cursor: 'ew-resize',
          width: `${sidebarWidth >= MAX_SIDEBAR_WIDTH ? '4px' : '2px'}`
        }}
      ></div>
      <div
        className={`absolute top-0 bottom-0 h-full transition duration-500 z-20 justify-self-end shrink-0 grow-0 ${
          sidebarWidth <= MAX_SIDEBAR_WIDTH && 'group-hover:bg-fuchsia-300'
        }`}
        style={{
          cursor: 'ew-resize',
          width: `${sidebarWidth <= MIN_SIDEBAR_WIDTH ? '4px' : '2px'}`,
          right: `${sidebarWidth <= MIN_SIDEBAR_WIDTH ? '-2px' : '-1px'}`
        }}
        onMouseDown={(e) => onMouseDown(e)}
      ></div>
    </span>
  );
}
