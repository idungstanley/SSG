import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { setShowSidebarSettings } from '../../../../../../features/hubs/hubSlice';
import WorkSpaceSelection from '../WorkSpaceSelection';
import MainLogo from '../../../../../../assets/icons/mainIcon.svg';
import { cl } from '../../../../../../utils';
import TeamSettings from '../../../../../../pages/workspace/workspaceSettings/components/TeamSettings';
import UserSettingsModal from '../../../../../../pages/settings/UserSettings/components/UserSettingsModal';

export default function Header() {
  const dispatch = useAppDispatch();
  const { sidebarSettings } = useAppSelector((state) => state.hub);
  const { showSidebar } = useAppSelector((state) => state.account);

  return (
    <div
      className={cl('flex py-2 border-b gap-1', !showSidebar ? 'flex-col pb-9 items-center' : 'pr-7 items-center')}
      style={{ height: `${showSidebar ? '115px' : ''}` }}
    >
      <img className="w-14 h-14" src={MainLogo} alt="Workflow" />
      <div className={cl('flex pt-2 flex-1', !showSidebar ? 'flex-col items-center justify-center' : undefined)}>
        <WorkSpaceSelection />
        {/* cog */}
        <div onClick={() => dispatch(setShowSidebarSettings(!sidebarSettings))}>
          <TeamSettings />
        </div>
        <UserSettingsModal />
      </div>
    </div>
  );
}
