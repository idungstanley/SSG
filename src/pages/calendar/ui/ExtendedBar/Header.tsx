import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ReactNode } from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { Checkbox } from '../../../../components/Checkbox/Checkbox';
import { selectCalendar } from '../../../../features/calendar/slice/calendarSlice';
import { cl } from '../../../../utils';

interface HeaderProps {
  onReset: (i: boolean) => void;
  onToggleSearch: VoidFunction;
  onClickXIcon: VoidFunction;
  showSearch: boolean;
  children: ReactNode;
}

export function Header({ onReset, onToggleSearch, onClickXIcon, showSearch, children }: HeaderProps) {
  const { blacklistIds } = useAppSelector(selectCalendar);

  return (
    <div className="relative h-10 p-2 flex border-b items-center overflow-hidden">
      <div className="flex space-x-3 items-center">
        <Checkbox
          styles="text-primary-500 focus:ring-primary-500"
          checked={blacklistIds.length === 0}
          setChecked={(e) => onReset(e)}
        />

        <p>Hub 1</p>
      </div>

      <div
        style={!showSearch ? { transform: 'translateX(calc(100% - 35px))' } : undefined}
        className={cl(
          'absolute space-x-1 left-0 transform p-2 justify-between transition-all duration-500 flex items-center right-0 bg-white h-10'
        )}
      >
        <button onClick={onToggleSearch}>
          <MagnifyingGlassIcon className="w-5 h-5 cursor-pointer text-gray-500" aria-hidden="true" />
        </button>

        {children}

        <button onClick={onClickXIcon}>
          <XMarkIcon className="w-5 h-5 cursor-pointer text-gray-500" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
