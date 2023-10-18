import React, { useEffect } from 'react';
// import { ChevronDoubleRightIcon } from '@heroicons/react/24/solid';
import { setShowSidebar } from '../../../../../../features/account/accountSlice';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { cl } from '../../../../../../utils';
import CompactIcon from '../../../../../../assets/icons/CompactIcon';
import { setShowExtendedBar, setSidebarWidthRD } from '../../../../../../features/workspace/workspaceSlice';
import ToolTip from '../../../../../../components/Tooltip/Tooltip';
import { dimensions } from '../../../../../../app/config/dimensions';
import ExpandIcon from '../../../../../../assets/icons/ExpandIcon';

const MIN_SIDEBAR_WIDTH = dimensions.navigationBar.min;

export default function Toggle() {
  const dispatch = useAppDispatch();
  const { showSidebar } = useAppSelector((state) => state.account);
  const { activePlaceId } = useAppSelector((state) => state.workspace);

  useEffect(() => {
    if (!showSidebar && activePlaceId) {
      dispatch(setShowExtendedBar(true));
    }
  }, [showSidebar, activePlaceId]);

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

  return (
    <div
      onClick={closeOrShowSidebar}
      className={cl('z-20 text-indigo-900 cursor-pointer flex items-center', showSidebar ? 'pl-1' : 'pt-1 absolute')}
      style={{ top: !showSidebar ? '69px' : '', left: !showSidebar ? '55px' : '' }}
    >
      {!showSidebar ? (
        <ToolTip title="Expand Sidebar">
          <span>
            <ExpandIcon />
          </span>
        </ToolTip>
      ) : (
        <ToolTip title="Collapse Sidebar">
          <span>
            <CompactIcon />
          </span>
        </ToolTip>
      )}
    </div>
  );
}
