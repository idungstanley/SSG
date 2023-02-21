import React from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { AvatarWithInitials } from '../../../../components';
import { getWorkspaceService } from '../../../../features/workspace/workspaceService';
import Spinner from '../../../../common/Spinner';
import WorkspaceSettingsModal from '../../workspaceSettings/WorkspaceSettingsModal';

function WorkSpaceSelection() {
  const { showSidebar } = useAppSelector((state) => state.workspace);

  const { data, status } = getWorkspaceService();

  const workspaceName = data?.data.workspace.name;

  if (status == 'loading') {
    return <Spinner size={10} color={'#6B7280'} />;
  }

  return status == 'success' ? (
    <>
      {showSidebar ? (
        <div
          className="rounded border border-gray-400 p-0.5 mt-1 cursor-pointer"
          style={{ width: 'calc(100% - 120px)' }}
        >
          <div className="flex justify-between items-center">
            <div className="flex justify-between items-center space-x-1">
              <AvatarWithInitials
                initials={workspaceName
                  .split(' ')
                  .slice(0, 2)
                  .map((word: string[]) => word[0])
                  .join('')
                  .toUpperCase()}
                height="h-5"
                width="w-5"
                backgroundColour="#34C6BE"
                roundedStyle="rounded"
                textColor="black"
              />
              <p className="truncate" style={{ fontSize: '8px' }}>
                {workspaceName.split(' ').slice(0, 2).join('').toUpperCase()}
              </p>
            </div>
            <WorkspaceSettingsModal />
          </div>
        </div>
      ) : (
        <p
          className="truncate rounded p-1 ml-1"
          style={{ fontSize: '5px', backgroundColor: '#D2AAF0' }}
        >
          {workspaceName}
        </p>
      )}
    </>
  ) : null;
}

export default WorkSpaceSelection;
