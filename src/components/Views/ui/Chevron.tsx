import { MouseEvent, useState } from 'react';
import { IoChevronDownCircleOutline, IoChevronForwardCircleOutline } from 'react-icons/io5';

interface ChevronProps {
  onToggle: VoidFunction;
  active: boolean;
  color?: string;
  hoverBg?: string;
}

export function Chevron({ onToggle, active, color, hoverBg }: ChevronProps) {
  const [isHovered, setIsHovered] = useState(false);

  const defaultStyle = {
    color: isHovered ? color : 'white',
    backgroundColor: isHovered ? hoverBg : color
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
        <IoChevronForwardCircleOutline className="w-4 h-4 rounded-full" />
      ) : (
        <IoChevronDownCircleOutline className="w-4 h-4 rounded-full " />
      )}
    </button>
  );
}
