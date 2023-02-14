import React from 'react';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/solid';
import { setShowSidebar } from '../../../../../../features/account/accountSlice';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { classNames } from '../../../../../../utils';

export default function Toggle() {
  const dispatch = useAppDispatch();
  const { showSidebar } = useAppSelector((state) => state.account);

  const closeOrShowSidebar = () => {
    dispatch(setShowSidebar(!showSidebar));
    // if (showSmall) {
    //   setSidebarWidth(MIN_SIDEBAR_WIDTH);
    // }
  };

  return (
    <div
      onClick={closeOrShowSidebar}
      className={classNames(
        'absolute z-20 text-indigo-900 cursor-pointer',
        showSidebar ? 'top-6 right-2 ' : 'top-36 right-6 mr-0.5 mt-1'
      )}
    >
      {!showSidebar ? (
        <ChevronDoubleRightIcon className="w-4 h-4" aria-hidden="true" />
      ) : (
        <ChevronDoubleLeftIcon className="w-4 h-4" aria-hidden="true" />
      )}
    </div>
  );
}
