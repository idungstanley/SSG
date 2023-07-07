import zIndex from '@mui/material/styles/zIndex';
import { ReactElement, ReactNode, useState } from 'react';

interface TooltipProps {
  children: ReactNode;
  content: ReactElement;
}
export default function InteractiveTooltip({ children, content }: TooltipProps) {
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

  return (
    <div className="relative inline-block" onMouseEnter={handleOpenTooltip} onMouseLeave={handleCloseTooltip}>
      {isTooltipOpen && (
        <div className="absolute z-10 -top-36 -right-7" onClick={(e) => handleTooltipClick(e)}>
          <div className="w-auto p-2 text-white rounded shadow-lg" style={{ backgroundColor: '#424242' }}>
            {content}
          </div>
          <div
            className="absolute left-0 right-0 w-2 h-2 ml-auto mr-auto -mt-1 transform rotate-45"
            style={{ backgroundColor: '#424242' }}
          ></div>
        </div>
      )}
      <div className="inline-block rounded cursor-pointer">{children}</div>
    </div>
  );
}
