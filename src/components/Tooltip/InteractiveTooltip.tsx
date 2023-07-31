import { ReactElement, ReactNode, useRef, useState } from 'react';
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
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);
  const tooltipTimeout = useRef<number | null>(null);

  const handleOpenTooltip = () => {
    // Clear any existing timeout to avoid premature closure
    if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current);
    setIsTooltipOpen(true);
  };

  const handleCloseTooltip = () => {
    // Delay the closure to give time for interaction
    setIsTooltipOpen(false);
    tooltipTimeout.current = window.setTimeout(() => {
      setIsTooltipOpen(false);
    }, 200); // Adjust this delay time as needed (e.g., 200ms)

    // Clear the timeout if the tooltip is reopened before the delay completes
    clearTimeout(tooltipTimeout.current);
  };
  const handleTooltipClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent click event from closing the tooltip
  };

  return (
    <div
      className="relative inline-block transition-all duration-100 ease-out delay-300 group"
      onMouseEnter={handleOpenTooltip}
    >
      {isTooltipOpen && (
        <div
          className={`absolute transition-all scale-0 group-hover:scale-100 ease-out delay-300 duration-100 ${zIndex} ${top} ${right} `}
          onClick={(e) => handleTooltipClick(e)}
          onMouseLeave={handleCloseTooltip}
        >
          <div className="w-auto p-2 text-white rounded shadow-lg" style={{ backgroundColor: '#424242' }}>
            {content}
          </div>
          <div
            className="absolute left-0 right-0 w-2 h-2 ml-auto mr-auto -mt-1 transform rotate-45 "
            style={{ backgroundColor: '#424242' }}
          ></div>
        </div>
      )}

      <div className="rounded cursor-pointer">{children}</div>
    </div>
  );
}
