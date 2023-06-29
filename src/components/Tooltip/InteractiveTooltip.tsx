import react, { ReactElement, ReactNode, useState } from 'react';

interface TooltipProps {
  children: ReactNode;
  content: ReactElement;
}
export default function InteractiveTooltip({ children, content }: TooltipProps) {
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);

  const handleToggleTooltip = () => {
    setIsTooltipOpen(!isTooltipOpen);
  };

  return (
    <div className="relative inline-block" onMouseEnter={handleToggleTooltip} onMouseLeave={handleToggleTooltip}>
      {isTooltipOpen && <div className="absolute z-10 p-2 text-gray-800 bg-gray-200 rounded shadow-lg">{content}</div>}
      <div className="inline-block px-4 py-2 font-medium text-gray-800 rounded cursor-pointer hover:bg-gray-300">
        {children}
      </div>
    </div>
  );
}
