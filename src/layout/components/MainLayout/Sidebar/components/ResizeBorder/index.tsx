import React from 'react';
import { MAX_SIDEBAR_WIDTH } from '../..';
import { useAppSelector } from '../../../../../../app/hooks';
import { cl } from '../../../../../../utils';

interface ResizeBorderProps {
  onMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  sidebarWidth: number;
}

export default function ResizeBorder({
  onMouseDown,
  sidebarWidth,
}: ResizeBorderProps) {
  const { showSidebar } = useAppSelector((state) => state.account);

  return (
    <div
      style={{ cursor: 'col-resize' }}
      onMouseDown={(e) => onMouseDown(e)}
      className="absolute top-0 w-5 h-full -right-2.5 group flex justify-center"
    >
      <div
        className={cl(
          'group-hover:opacity-100 opacity-0 h-full w-0.5 shadow bg-green-300 transition duration-500',
          sidebarWidth === MAX_SIDEBAR_WIDTH
            ? 'mr-1.5'
            : showSidebar && 'ml-1.5',
          !showSidebar && 'ml-1.5'
        )}
      />
    </div>
  );
}
