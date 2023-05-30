import { IoChevronDownCircleOutline, IoChevronForwardCircleOutline } from 'react-icons/io5';

interface ChevronProps {
  onToggle: VoidFunction;
  active: boolean;
}

export function Chevron({ onToggle, active }: ChevronProps) {
  return (
    <button type="button" onClick={onToggle}>
      {active ? (
        <IoChevronForwardCircleOutline className="w-4 h-4" />
      ) : (
        <IoChevronDownCircleOutline className="w-4 h-4" />
      )}
    </button>
  );
}
