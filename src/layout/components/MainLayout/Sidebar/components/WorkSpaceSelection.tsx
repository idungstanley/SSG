import React from 'react';
import { useAppSelector } from '../../../../../app/hooks';
import { AvatarWithInitials } from '../../../../../components';
import { getWorkspaceService } from '../../../../../features/workspace/workspaceService';
import { Spinner } from '../../../../../common';
import WorkspaceSettingsModal from '../../../../../pages/workspace/workspaceSettings/WorkspaceSettingsModal';

function WorkSpaceSelection() {
  const { showSidebar } = useAppSelector((state) => state.account);

  const { data: workSpaceData, status } = getWorkspaceService();

  const workspaceName = workSpaceData?.data.workspace.name;

  if (status == 'loading') {
    return <Spinner size={10} color={'#6B7280'} />;
  }

  return status == 'success' ? (
    <>
      {showSidebar ? (
        <div
          className="rounded border border-gray-400 p-0.5 mt-1 h-6 cursor-pointer flex flex-grow"
          style={{ width: 'calc(100% - 120px)' }}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center justify-between space-x-1">
              <AvatarWithInitials
                initials={
                  workspaceName
                    ?.split(' ')
                    .slice(0, 2)
                    .map((word) => word[0])
                    .join('')
                    .toUpperCase() as string
                }
                height="h-5"
                width="w-5"
                backgroundColour="#34C6BE"
                roundedStyle="rounded"
                textColor="black"
              />
              <p className="truncate" style={{ fontSize: '8px' }}>
                {workspaceName?.split(' ').slice(0, 2).join('').toUpperCase()}
              </p>
            </div>
            <WorkspaceSettingsModal />
          </div>
        </div>
      ) : (
        <p
          className="flex items-center justify-center flex-1 w-full p-1 truncate rounded grow"
          style={{ fontSize: '5px', backgroundColor: '#D2AAF0' }}
        >
          {workspaceName}
        </p>
      )}
    </>
  ) : null;
}

export default WorkSpaceSelection;
