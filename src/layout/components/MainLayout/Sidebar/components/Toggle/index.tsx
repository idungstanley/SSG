import React from 'react';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/solid';
import { setShowSidebar } from '../../../../../../features/account/accountSlice';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { cl } from '../../../../../../utils';
import { MIN_SIDEBAR_WIDTH } from '../..';

export default function Toggle() {
  const dispatch = useAppDispatch();
  const { showSidebar } = useAppSelector((state) => state.account);

  const closeOrShowSidebar = () => {
    dispatch(setShowSidebar(!showSidebar));

    // saving sidebar data with MIN size to localStorage
    localStorage.setItem(
      'sidebar',
      JSON.stringify({
        sidebarWidth: MIN_SIDEBAR_WIDTH,
        showSidebar: !showSidebar,
      })
    );
  };

  return (
    <div
      onClick={closeOrShowSidebar}
      className={cl(
        'absolute z-20 text-indigo-900 cursor-pointer',
        showSidebar ? 'top-6 right-2' : 'top-36 right-6 mt-2'
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
