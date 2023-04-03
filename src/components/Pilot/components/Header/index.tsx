import { ChevronDoubleRightIcon } from '@heroicons/react/24/outline';
import { ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setShowPilotSideOver } from '../../../../features/general/slideOver/slideOverSlice';
import { cl } from '../../../../utils';
import Menu from '../HotKeys/components/Dropdown';

interface HeaderProps {
  setActiveTabId: (i: null | number) => void;
  isMinified: boolean;
  additionalNavItems?: ReactNode;
  children?: ReactNode;
}

export default function Header({ children, setActiveTabId, isMinified, additionalNavItems }: HeaderProps) {
  const dispatch = useAppDispatch();
  const { pilotSideOver } = useAppSelector((state) => state.slideOver);

  const togglePilot = () => {
    setActiveTabId(null);
    dispatch(setShowPilotSideOver({ ...pilotSideOver, show: isMinified }));
  };

  return (
    <div
      className={cl(
        'w-full grid grid-cols-frAuto grid-rows-1 border-none',
        isMinified ? 'pb-4 pt-2 col-span-3' : 'p-2 col-span-1'
      )}
    >
      {children}

      <div
        className={cl(
          'relative flex items-center',
          isMinified ? 'justify-center w-full flex-col-reverse gap-4' : 'gap-3'
        )}
      >
        {/* other components */}
        {additionalNavItems}

        {/* show / hide pilot toggle */}
        <button type="button" onClick={togglePilot} className="text-gray-600">
          <ChevronDoubleRightIcon className="w-4 h-4 " />
        </button>
      </div>
    </div>
  );
}

Header.Menu = Menu;
