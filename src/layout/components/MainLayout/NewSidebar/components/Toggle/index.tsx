import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/solid';
import React from 'react';

interface ToggleProps {
  showSmall: boolean;
  setShowSmall: (i: boolean) => void;
}

export default function Toggle({ showSmall, setShowSmall }: ToggleProps) {
  const closeOrShowSidebar = () => {
    setShowSmall(!showSmall);
    // if (showSmall) {
    //   setSidebarWidth(MIN_SIDEBAR_WIDTH);
    // }
  };

  return (
    <div
      onClick={closeOrShowSidebar}
      className="absolute z-20 text-indigo-900 top-5 mt-0.5 right-2 cursor-pointer"
    >
      {showSmall ? (
        <ChevronDoubleRightIcon className="w-4 h-4" aria-hidden="true" />
      ) : (
        <ChevronDoubleLeftIcon className="w-4 h-4" aria-hidden="true" />
      )}
    </div>
  );
}
