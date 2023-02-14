import React from 'react';
import { VscTriangleDown } from 'react-icons/vsc';
import { useAppSelector } from '../../../../../app/hooks';
import { AvatarWithInitials } from '../../../../../components';

function WorkSpaceSelection() {
  const { showSidebar } = useAppSelector((state) => state.workspace);
  const getLocalWSName = JSON.parse(
    localStorage.getItem('currentWorkspacename') as string
  );
  const workspaceName = getLocalWSName ? getLocalWSName : 'Also Workspace';

  return (
    <>
      {showSidebar ? (
        <div className="flex flex-grow rounded justify-between items-center border border-gray-400 mt-1">
          <div className="flex items-center space-x-1 w-full">
            <AvatarWithInitials
              initials={workspaceName
                .split(' ')
                .slice(0, 2)
                .map((word) => word[0])
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
          <VscTriangleDown className="text-xs text-gray-400" />
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
  );
}

export default WorkSpaceSelection;
