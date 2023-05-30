import { IoChevronDownCircleOutline, IoChevronForwardCircleOutline } from 'react-icons/io5';

interface ChevronProps {
  onToggle: VoidFunction;
  active: boolean;
  color?: string;
}

export function Chevron({ onToggle, active, color = 'text-gray-200' }: ChevronProps) {
  return (
    <button type="button" className={color} onClick={onToggle}>
      {active ? (
        <IoChevronForwardCircleOutline className="w-4 h-4" />
      ) : (
        <IoChevronDownCircleOutline className="w-4 h-4" />
      )}
    </button>
  );
}
