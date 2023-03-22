import React, { ReactNode } from 'react';

interface ToolTipProps {
  children: ReactNode;
  tooltip?: string;
}

export default function ToolTip({ children, tooltip }: ToolTipProps) {
  return (
    <div data-tooltip={tooltip} className="tooltip">
      {children}
    </div>
  );
}

// import { ReactNode, useRef } from 'react';

// interface Props {
//   children: ReactNode;
//   tooltip?: string;
// }
// function ToolTip({ children, tooltip }: Props) {
//   const tooltipRef = useRef<HTMLSpanElement>(null);
//   const container = useRef<HTMLDivElement>(null);

//   return (
//     <div
//       ref={container}
//       onMouseEnter={({ clientX }) => {
//         if (!tooltipRef.current || !container.current) return;
//         const { left } = container.current.getBoundingClientRect();

//         tooltipRef.current.style.left = clientX - left + 'px';
//       }}
//       className="relative inline-block group"
//     >
//       {children}
//       {tooltip ? (
//         <span
//           ref={tooltipRef}
//           className="absolute p-0.5 mt-2 text-white transition bg-blue-500 rounded opacity-0 top-full group-hover:opacity-100 whitespace-nowrap"
//         >
//           {tooltip}
//         </span>
//       ) : null}
//     </div>
//   );
// }

// export default ToolTip;
