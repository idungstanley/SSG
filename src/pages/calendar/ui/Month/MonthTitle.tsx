import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface MonthTitleProps {
  extended?: boolean;
  title: string;
  onChange?: (action: 'increment' | 'decrement') => void;
}

export default function MonthTitle({ extended, title, onChange }: MonthTitleProps) {
  return !extended ? (
    <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
  ) : (
    <div className="flex items-center text-gray-900">
      {onChange ? (
        <button
          onClick={() => onChange('decrement')}
          type="button"
          className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      ) : null}

      <div className="flex-auto text-sm font-semibold">{title}</div>

      {onChange ? (
        <button
          onClick={() => onChange('increment')}
          type="button"
          className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
}
