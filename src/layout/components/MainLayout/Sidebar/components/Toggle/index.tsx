import React, { useEffect } from 'react';
// import { ChevronDoubleRightIcon } from '@heroicons/react/24/solid';
import { setShowSidebar } from '../../../../../../features/account/accountSlice';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { cl } from '../../../../../../utils';
import CompactIcon from '../../../../../../assets/icons/CompactIcon';
import { setShowExtendedBar, setSidebarWidthRD } from '../../../../../../features/workspace/workspaceSlice';
import ToolTip from '../../../../../../components/Tooltip';
import { dimensions } from '../../../../../../app/config/dimensions';
import ExpandIcon from '../../../../../../assets/icons/ExpandIcon';

const MIN_SIDEBAR_WIDTH = dimensions.navigationBar.min;

export default function Toggle() {
  const dispatch = useAppDispatch();
  const { showSidebar } = useAppSelector((state) => state.account);
  const { activePlaceId } = useAppSelector((state) => state.workspace);

  const closeOrShowSidebar = () => {
    dispatch(setShowSidebar(!showSidebar));
    dispatch(setSidebarWidthRD(showSidebar ? dimensions.navigationBar.collapse : dimensions.navigationBar.max));

    // saving sidebar data with MIN size to localStorage
    localStorage.setItem(
      'sidebar',
      JSON.stringify({
        sidebarWidth: MIN_SIDEBAR_WIDTH,
        showSidebar: !showSidebar
      })
    );
  };
  useEffect(() => {
    if (!showSidebar && activePlaceId !== null) {
      dispatch(setShowExtendedBar(true));
    }
  }, [showSidebar, activePlaceId]);

  return (
    <div
      onClick={closeOrShowSidebar}
      className={cl(
        'z-20 text-indigo-900 cursor-pointer flex items-center',
        showSidebar ? 'pl-1' : 'pt-1 absolute left-14'
      )}
      style={{ top: !showSidebar ? '70px' : '' }}
    >
      {!showSidebar ? (
        <ExpandIcon />
      ) : (
        <ToolTip tooltip="Collapse Sidebar">
          <CompactIcon />
        </ToolTip>
      )}
    </div>
  );
}
