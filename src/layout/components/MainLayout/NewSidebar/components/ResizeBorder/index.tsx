import React from 'react';

interface ResizeBorderProps {
  onMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export default function ResizeBorder({ onMouseDown }: ResizeBorderProps) {
  return (
    <div
      style={{ cursor: 'col-resize' }}
      onMouseDown={(e) => onMouseDown(e)}
      className="absolute top-0 w-5 h-full -right-2.5 group flex justify-center"
    >
      <div className="group-hover:opacity-100 opacity-0 h-full w-1 bg-green-400 transition duration-500" />
    </div>
  );
}
