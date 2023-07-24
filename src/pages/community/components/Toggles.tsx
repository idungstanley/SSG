import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { UserIcon } from '@heroicons/react/24/solid';

interface ShowGuestsToggleProps {
  value: boolean;
  setValue: (i: boolean) => void;
}

export function ShowDetailsToggle({ value, setValue }: ShowGuestsToggleProps) {
  return (
    <button
      onClick={() => setValue(!value)}
      className="uppercase text-gray-400 text-xs flex items-center gap-2 p-2 rounded-md hover:bg-gray-200"
    >
      <InformationCircleIcon className="w-4 h-4" aria-hidden="true" />
      <span>{value ? 'Hide details' : 'show details'}</span>
    </button>
  );
}

interface ShowGuestsToggleProps {
  value: boolean;
  setValue: (i: boolean) => void;
}

export function ShowGuestsToggle({ value, setValue }: ShowGuestsToggleProps) {
  return (
    <button
      onClick={() => setValue(!value)}
      className="uppercase text-gray-400 text-xs flex items-center gap-2 p-2 rounded-md hover:bg-gray-200"
    >
      <UserIcon className="w-4 h-4" aria-hidden="true" />
      <span>{value ? 'Hide guests' : 'show guests'}</span>
    </button>
  );
}
