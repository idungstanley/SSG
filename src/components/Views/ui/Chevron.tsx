import { useState } from 'react';
import { IoChevronDownCircleOutline, IoChevronForwardCircleOutline } from 'react-icons/io5';

interface ChevronProps {
  onToggle: VoidFunction;
  active: boolean;
  color?: string;
  hoverBg?: string;
  iconColor?: string;
}

export function Chevron({ onToggle, active, color, hoverBg, iconColor }: ChevronProps) {
  const [isHovered, setIsHovered] = useState(false);

  const defaultStyle = {
    color: isHovered ? 'white' : color,
    backgroundColor: isHovered ? color : hoverBg
  };

  return (
    <button
      type="button"
      onClick={onToggle}
      style={{
        ...defaultStyle
      }}
      className="rounded-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {active ? (
        <IoChevronForwardCircleOutline className={`w-4 h-4 rounded-full ${iconColor}`} />
      ) : (
        <IoChevronDownCircleOutline className={`w-4 h-4 rounded-full ${iconColor}`} />
      )}
    </button>
  );
}
