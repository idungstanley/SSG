import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/outline';
import React, { ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setShowPilotSideOver } from '../../../../features/general/slideOver/slideOverSlice';

interface HeaderProps {
  children: ReactNode;
}

export default function Header({ children }: HeaderProps) {
  const dispatch = useAppDispatch();
  const { pilotSideOver } = useAppSelector((state) => state.slideOver);

  const { show, title, type } = pilotSideOver;

  const togglePilot = () => {
    dispatch(setShowPilotSideOver({ ...pilotSideOver, show: !show }));
  };

  return (
    <div className="w-full flex justify-between items-center">
      {/* item type and title */}
      {show ? (
        <p className="truncate capitalize text-xs font-semibold">
          {type}: <span className=" font-normal">{title}</span>
        </p>
      ) : null}

      {/* show / hide pilot toggle */}
      <div className="relative flex gap-2 items-center">
        <button type="button" onClick={togglePilot} className="text-gray-600">
          {show ? <ChevronDoubleRightIcon className="w-4 h-4 " /> : <ChevronDoubleLeftIcon className="w-4 h-4" />}
        </button>

        {/* other components */}
        {children}
      </div>
    </div>
  );
}
