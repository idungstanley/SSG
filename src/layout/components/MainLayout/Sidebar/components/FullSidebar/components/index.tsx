import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../../app/hooks';
import { AvatarWithInitials } from '../../../../../../../components';
import { setShowSidebarSettings } from '../../../../../../../features/hubs/hubSlice';
import ArchiveMenu from '../../../../../../../pages/workspace/hubs/components/archive/ArchiveMenu';
import WorkSpaceSelection from '../../WorkSpaceSelection';
import MainLogo from '../../../../../../../assets/branding/main-logo.png';
import { classNames } from '../../../../../../../utils';

export default function Header() {
  const dispatch = useAppDispatch();
  const { sidebarSettings } = useAppSelector((state) => state.hub);
  const { showSidebar } = useAppSelector((state) => state.account);

  return (
    <div
      className={classNames(
        'flex py-2 border-b items-center gap-1',
        !showSidebar ? 'flex-col pb-9' : 'pr-6'
      )}
    >
      <img className="w-10 h-11" src={MainLogo} alt="Workflow" />
      <WorkSpaceSelection />

      {/* cog */}
      <div
        className="flex items-center justify-center mt-1"
        onClick={() => dispatch(setShowSidebarSettings(!sidebarSettings))}
      >
        <ArchiveMenu />
      </div>

      <span className="mb-1.5">
        <AvatarWithInitials
          initials="Also Workspace"
          height="h-5"
          width="w-5"
          backgroundColour="blue"
        />
      </span>
    </div>
  );
}
