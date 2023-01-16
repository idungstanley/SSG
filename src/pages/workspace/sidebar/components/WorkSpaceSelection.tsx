import React from 'react';
import { VscTriangleDown } from 'react-icons/vsc';
import { useAppSelector } from '../../../../app/hooks';
import { AvatarWithInitials } from '../../../../components';

function WorkSpaceSelection() {
  const { showSidebar } = useAppSelector((state) => state.workspace);
  const workspaceName = JSON.parse(
    localStorage.getItem('currentWorkspacename') as string
  );
  return (
    <>
      {showSidebar ? (
        <div className="rounded border border-gray-400 p-0.5 w-8/12 mt-1 cursor-pointer">
          <div className="flex justify-between items-center space-x-20">
            <div className="flex justify-between items-center space-x-1">
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
                {workspaceName.split(' ').slice(0, 1).join('').toUpperCase()}
              </p>
            </div>
            <VscTriangleDown className="text-xs text-gray-400" />
          </div>
        </div>
      ) : (
        <p
          className="truncate rounded-full p-1"
          style={{ fontSize: '7px', backgroundColor: '#D2AAF0' }}
        >
          {workspaceName}
        </p>
      )}
    </>
  );
}

export default WorkSpaceSelection;
