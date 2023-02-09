import React from 'react';

interface ResizeBorderProps {
  width: number;
  minWidth: number;
  maxWidth: number;
  startResizing: () => void;
}
export default function ResizeBorder({
  width,
  minWidth,
  maxWidth,
  startResizing,
}: ResizeBorderProps) {
  return (
    <span className="group">
      <div
        className={`absolute top-0 right-0 bottom-0 z-40 h-full justify-self-end shrink-0 grow-0 cursor-all-scroll ${
          width >= minWidth && 'group-hover:bg-green-100'
        }`}
        onMouseDown={startResizing}
        style={{
          cursor: 'col-resize',
          width: `${width > maxWidth ? '4px' : '2px'}`,
        }}
      ></div>
      <div
        className={`absolute top-0 bottom-0 h-full transition duration-500 z-40 justify-self-end shrink-0 grow-0 cursor-all-scroll ${
          width <= maxWidth && 'group-hover:bg-green-100'
        }`}
        style={{
          cursor: 'col-resize',
          width: `${width < minWidth ? '4px' : '2px'}`,
          right: `${width < minWidth ? '-4.5px' : '-2.8px'}`,
        }}
        onMouseDown={startResizing}
      ></div>
    </span>
  );
}