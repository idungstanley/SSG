import { ChevronDoubleRightIcon, PrinterIcon } from '@heroicons/react/24/outline';
import { ShareIcon } from '@heroicons/react/24/solid';
import React, { ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setShowPilotSideOver } from '../../../../features/general/slideOver/slideOverSlice';
import { cl } from '../../../../utils';

interface HeaderProps {
  children: ReactNode;
  setActiveTabId: (i: null | number) => void;
}

export default function FullHeader({ children, setActiveTabId }: HeaderProps) {
  const dispatch = useAppDispatch();
  const { pilotSideOver } = useAppSelector((state) => state.slideOver);

  const { title, type } = pilotSideOver;

  const togglePilot = () => {
    setActiveTabId(null);
    dispatch(setShowPilotSideOver({ ...pilotSideOver, show: false }));
  };

  return (
    <div className="w-full grid grid-cols-frAuto grid-rows-1 pb-4 pt-2 border-none col-span-1">
      {/* item type and title */}

      <p className="truncate capitalize text-xs font-semibold">
        {type}: <span className="font-normal">{title}</span>
      </p>

      {/* show / hide pilot toggle */}
      <div className={cl('relative flex gap-3 items-center')}>
        {/* other components */}
        <ShareIcon className="w-4 h-4" />

        <PrinterIcon className="w-4 h-4" />

        {children}

        <button type="button" onClick={togglePilot} className="text-gray-600">
          <ChevronDoubleRightIcon className="w-4 h-4 " />
        </button>
      </div>
    </div>
  );
}
