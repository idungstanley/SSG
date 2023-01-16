import React, { ReactNode, useRef } from 'react';

interface ToolTipProps {
  children: ReactNode;
  tooltip: string;
}

export default function ToolTip({ children, tooltip }: ToolTipProps) {
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const container = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={container}
      onMouseEnter={({ clientX }) => {
        if (!tooltipRef.current || !container.current) return;
        const { left } = container.current.getBoundingClientRect();

        tooltipRef.current.style.left = clientX - left + 'px';
      }}
      className="group relative inline-block"
    >
      {children}

      <span
        ref={tooltipRef}
        className="absolute z-20 top-full whitespace-nowrap opacity-0 transition mt-2 group-hover:opacity-100 bg-gray-700 text-white p-2 rounded-xl"
      >
        {tooltip}
      </span>
    </div>
  );
}
