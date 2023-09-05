import { ReactElement, ReactNode, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { useAbsolute } from '../../hooks/useAbsolute';

interface TooltipProps {
  children: ReactNode;
  content: ReactElement;
  top?: string;
  right?: string;
  zIndex?: string;
  bottom?: string;
  dependency?: number;
}

export default function InteractiveTooltip({
  children,
  content,
  top,
  bottom = 'bottom-8',
  right = '-right-10',
  zIndex = 'z-50',
  dependency
}: TooltipProps) {
  const tooltipTimeout = useRef<number | undefined>(undefined);

  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);

  const handleOpenTooltip = () => {
    // Clear any existing timeout to avoid premature closure
    if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current);
    setIsTooltipOpen(true);
  };

  const handleCloseTooltip = () => {
    // Delay the closure to give time for interaction
    tooltipTimeout.current = window.setTimeout(() => {
      setIsTooltipOpen(false);
    }, 200); // Adjust this delay time as needed (e.g., 200ms)
    setIsTooltipOpen(false);
    // Clear the timeout if the tooltip is reopened before the delay completes
    clearTimeout(tooltipTimeout.current);
  };

  const handleTooltipClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent click event from closing the tooltip
  };

  const [elementHeight, setElementHeight] = useState(0);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const calculateHeight = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const height = rect.height;
        setElementHeight(height);
      }
    };
    // Initial calculation
    calculateHeight();
    // Add event listeners for resizing (optional, if element can change size)
    window.addEventListener('resize', calculateHeight);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', calculateHeight);
    };
  }, [elementRef, dependency]);

  console.log(elementHeight);

  const { updateCords } = useAppSelector((state) => state.task);
  const { cords, relativeRef } = useAbsolute(updateCords, elementHeight);

  return (
    <div className="relative inline-block" ref={relativeRef}>
      <div className="rounded cursor-pointer" onMouseEnter={handleOpenTooltip}>
        {children}
      </div>
      {isTooltipOpen && (
        <div
          style={{ ...cords }}
          className={`fixed w-32 transition-all ease-out delay-300 duration-100 ${zIndex} ${top} ${right} ${bottom}`}
          onClick={(e) => handleTooltipClick(e)}
          onMouseLeave={handleCloseTooltip}
          onMouseEnter={() => clearTimeout(tooltipTimeout?.current)}
        >
          <div
            ref={elementRef}
            className="w-auto p-2 text-white rounded shadow-lg"
            style={{ backgroundColor: '#424242' }}
          >
            {content}
          </div>
          <div
            className="absolute left-0 right-0 w-2 h-2 ml-auto mr-auto -mt-1 transform rotate-45"
            style={{ backgroundColor: '#424242' }}
          ></div>
        </div>
      )}
    </div>
  );
}
