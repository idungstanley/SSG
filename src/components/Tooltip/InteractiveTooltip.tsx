import { ReactElement, ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { useAbsolute } from '../../hooks/useAbsolute';
import { taskCountFields } from '../../features/list/list.interfaces';

interface TooltipProps {
  children: ReactNode;
  content: ReactElement;
  top?: string;
  right?: string;
  zIndex?: string;
  bottom?: string;
  dependency?: taskCountFields[];
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
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);

  const handleOpenTooltip = () => {
    setIsTooltipOpen(true);
  };

  const handleCloseTooltip = () => {
    setIsTooltipOpen(false);
  };

  const handleTooltipClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent click event from closing the tooltip
  };

  const [elementHeight, setElementHeight] = useState(0);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (elementRef.current) {
      const height = elementRef.current.clientHeight;
      setElementHeight(height);
    }
  }, [dependency]);

  useEffect(() => {
    const calculateHeight = () => {
      if (elementRef.current) {
        const height = elementRef.current.clientHeight;
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
  }, [dependency]);

  const { updateCords } = useAppSelector((state) => state.task);
  const { cords, relativeRef } = useAbsolute(updateCords, elementHeight, true);

  return (
    <div
      className="relative inline-block cursor-pointer"
      ref={relativeRef}
      onMouseEnter={handleOpenTooltip}
      onMouseLeave={handleCloseTooltip}
    >
      <div className="rounded cursor-pointer">{children}</div>
      {isTooltipOpen && (
        <div
          style={{ ...cords }}
          className={`fixed w-32 transition-all ease-out delay-300 duration-100 ${zIndex} ${top} ${right} ${bottom}`}
          onClick={(e) => handleTooltipClick(e)}
          ref={elementRef}
        >
          <div className="w-auto p-2 text-white rounded shadow-lg" style={{ backgroundColor: '#424242' }}>
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
