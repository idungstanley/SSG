import { MouseEvent } from 'react';
import { IoChevronDownCircleOutline, IoChevronForwardCircleOutline } from 'react-icons/io5';

interface ChevronProps {
  onToggle: VoidFunction;
  active: boolean;
  color?: string;
}

export function Chevron({ onToggle, active, color }: ChevronProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      style={{ color }}
      onMouseEnter={(e: MouseEvent<HTMLButtonElement>) => {
        const target = e.target as HTMLButtonElement;
        target.style.background = color as string;
        target.style.color = 'white';
      }}
      onMouseLeave={(e: MouseEvent<HTMLButtonElement>) => {
        const target = e.target as HTMLButtonElement;
        target.style.background = '';
        target.style.color = color as string;
      }}
    >
      {active ? (
        <IoChevronForwardCircleOutline className="w-4 h-4 rounded-full" />
      ) : (
        <IoChevronDownCircleOutline className="w-4 h-4 rounded-full" />
      )}
    </button>
  );
}
