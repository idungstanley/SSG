import React, { ReactNode } from 'react';
// import { cl } from '../utils';

interface ToolTipProps {
  children: ReactNode;
  tooltip?: string;
  position?: string;
}

export default function ToolTip({ children, tooltip }: ToolTipProps) {
  return (
    <div data-tooltip={tooltip} className="z-50 inline-block cursor-pointer tooltip">
      {children}
    </div>
  );
}
