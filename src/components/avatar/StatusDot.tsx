import React from 'react';

interface statusType {
  on?: string | JSX.Element;
  colour?: string;
  size?: number;
  ringSize?: number;
  top?: boolean;
}

function StatusDot({ on, colour, size, ringSize, top }: statusType) {
  return (
    <span className="relative inline-block">
      {on}
      <span
        className={`absolute ${
          top ? 'top-0 right-0' : 'bottom-0 right-0'
        } block h-${size} w-${size} rounded-full ring-${ringSize} ring-white`}
        style={{ backgroundColor: colour }}
      />
    </span>
  );
}

export default StatusDot;
