import { ReactElement, ReactNode } from 'react';
interface TooltipProps {
  children: ReactNode;
  content: ReactElement;
  top?: string;
  right?: string;
  zIndex?: string;
}
export default function InteractiveTooltip({
  children,
  content,
  top = '-top-36',
  right = '-right-4',
  zIndex = 'z-50'
}: TooltipProps) {
  const handleTooltipClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent click event from closing the tooltip
  };

  return (
    <div className="relative inline-block group">
      <div
        className={`absolute transition-all scale-0 group-hover:scale-100 ${zIndex} ${top} ${right} `}
        onClick={(e) => handleTooltipClick(e)}
      >
        <div className="w-auto p-2 text-white rounded shadow-lg" style={{ backgroundColor: '#424242' }}>
          {content}
        </div>
        <div
          className="absolute left-0 right-0 w-2 h-2 ml-auto mr-auto -mt-1 transform rotate-45 "
          style={{ backgroundColor: '#424242' }}
        ></div>
      </div>

      <div className="rounded cursor-pointer">{children}</div>
    </div>
  );
}
