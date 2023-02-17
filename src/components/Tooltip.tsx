import React, { ReactNode } from 'react';

interface ToolTipProps {
  children: ReactNode;
  tooltip: string;
}

export default function ToolTip({ children, tooltip }: ToolTipProps) {
  return (
    <div data-tooltip={tooltip} className="tooltip" style={{ zIndex: 999 }}>
      {children}
    </div>
  );
}
