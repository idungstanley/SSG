import { ChevronDoubleLeftIcon, PrinterIcon } from '@heroicons/react/24/outline';
import { ShareIcon } from '@heroicons/react/24/solid';
import React, { ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setShowPilotSideOver } from '../../../../features/general/slideOver/slideOverSlice';
import { cl } from '../../../../utils';

interface HeaderProps {
  children: ReactNode;
  setActiveTabId: (i: null | number) => void;
}

export default function MinHeader({ children, setActiveTabId }: HeaderProps) {
  const dispatch = useAppDispatch();
  const { pilotSideOver } = useAppSelector((state) => state.slideOver);

  const togglePilot = () => {
    setActiveTabId(1);
    dispatch(setShowPilotSideOver({ ...pilotSideOver, show: true }));
  };

  return (
    <div className={cl('w-full grid grid-cols-frAuto grid-rows-1 pb-4 pt-2 border-none col-span-3')}>
      {/* show / hide pilot toggle */}
      <div className="relative flex items-center justify-center w-full flex-col-reverse gap-4">
        {/* other components */}
        <ShareIcon className="w-4 h-4" />

        <PrinterIcon className="w-4 h-4" />

        {children}

        <button type="button" onClick={togglePilot} className="text-gray-600">
          <ChevronDoubleLeftIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
