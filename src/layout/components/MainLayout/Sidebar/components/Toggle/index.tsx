import React from 'react';
import { ChevronDoubleRightIcon } from '@heroicons/react/24/solid';
import { setShowSidebar } from '../../../../../../features/account/accountSlice';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { cl } from '../../../../../../utils';
import { MIN_SIDEBAR_WIDTH } from '../..';
import CompactIcon from '../../../../../../assets/icons/CompactIcon';
import { setShowExtendedBar } from '../../../../../../features/workspace/workspaceSlice';
import ToolTip from '../../../../../../components/Tooltip';

export default function Toggle() {
  const dispatch = useAppDispatch();
  const { showSidebar } = useAppSelector((state) => state.account);
  const { activePlaceId } = useAppSelector((state) => state.workspace);

  const closeOrShowSidebar = () => {
    dispatch(setShowSidebar(!showSidebar));
    // saving sidebar data with MIN size to localStorage
    localStorage.setItem(
      'sidebar',
      JSON.stringify({
        sidebarWidth: MIN_SIDEBAR_WIDTH,
        showSidebar: !showSidebar
      })
    );
  };

  if (!showSidebar && activePlaceId !== null) {
    dispatch(setShowExtendedBar(true));
  }

  return (
    <div
      onClick={closeOrShowSidebar}
      className={cl(
        'absolute z-20 text-indigo-900 cursor-pointer',
        showSidebar ? 'top-8 right-2' : 'top-36 right-6 mt-2'
      )}
    >
      {!showSidebar ? (
        <ChevronDoubleRightIcon className="w-4 h-4" aria-hidden="true" />
      ) : (
        <ToolTip tooltip="Collapse Sidebar">
          <CompactIcon />
        </ToolTip>
      )}
    </div>
  );
}
