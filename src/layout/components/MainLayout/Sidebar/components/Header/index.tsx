import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { setShowSidebarSettings } from '../../../../../../features/hubs/hubSlice';
import WorkSpaceSelection from '../WorkSpaceSelection';
import MainLogo from '../../../../../../assets/icons/mainIcon.svg';
import { cl } from '../../../../../../utils';
import TeamSettings from '../../../../../../pages/workspace/workspaceSettings/components/TeamSettings';
import UserSettingsModal from '../../../../../../pages/settings/UserSettings/components/UserSettings/UserSettingsModal';
import { Link, useNavigate } from 'react-router-dom';
import { IoNotificationsOutline } from 'react-icons/io5';
import Toggle from '../Toggle';

export default function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { sidebarSettings } = useAppSelector((state) => state.hub);
  const { showSidebar, scrollTop } = useAppSelector((state) => state.account);
  const { notificationCount } = useAppSelector((state) => state.notification);
  const { currentWorkspaceId } = useAppSelector((state) => state.auth);
  const handleClick = () => {
    navigate(`/${currentWorkspaceId}/notification`);
  };

  return (
    <div
      className={cl('flex py-2 border-b gap-1', !showSidebar ? 'flex-col pb-3 items-center' : 'items-center')}
      style={{ height: `${showSidebar ? '115px' : ''}` }}
    >
      <Link to="/">
        <img className="w-14 h-14" src={MainLogo} alt="Workflow" />
      </Link>
      <div className={cl('flex pt-2 flex-1', !showSidebar ? 'flex-col items-center justify-center' : undefined)}>
        <WorkSpaceSelection />
        {scrollTop > '108' ? (
          <span className="relative h-4 w-4 mr-0.5 mt-2 cursor-pointer flex items-center" onClick={handleClick}>
            {notificationCount > 0 && (
              <p
                className="flex items-center justify-center px-0.5 h-2.5 w-2.5 absolute top-0 text-white bg-red-600"
                style={{ fontSize: '7px', borderRadius: '50px', left: '9px' }}
              >
                {notificationCount}
              </p>
            )}
            <IoNotificationsOutline className="w-5 h-5" aria-hidden="true" />
          </span>
        ) : null}
        {/* cog */}
        <div onClick={() => dispatch(setShowSidebarSettings(!sidebarSettings))}>
          <TeamSettings />
        </div>
        <UserSettingsModal />
        <Toggle />
      </div>
    </div>
  );
}
