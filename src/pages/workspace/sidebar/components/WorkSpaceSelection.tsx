import React from 'react';
import { VscTriangleDown } from 'react-icons/vsc';
import { useAppSelector } from '../../../../app/hooks';
import { AvatarWithInitials } from '../../../../components';

function WorkSpaceSelection() {
  const { showSidebar } = useAppSelector((state) => state.workspace);
  return (
    <>
      {showSidebar ? (
        <div className="rounded border border-gray-400 p-0.5 mt-1 cursor-pointer"
        style={{width: 'calc(100% - 120px)'}}
        >
          <div className="flex justify-between items-center">
            <div className="flex justify-between items-center space-x-1">
            <AvatarWithInitials
              initials="EG"
              roundedStyle="rounded"
              height="h-5"
              width="w-5"
              textColor="black"
              backgroundColour="#34C6BE"
            />
              <p className="truncate" style={{ fontSize: '11px' }}>
                Elastic Group
              </p>
            </div>
              <VscTriangleDown className="text-xs text-gray-400" />
          </div>
        </div>
      ) : (
        <p
          className="truncate rounded-full p-1"
          style={{ fontSize: '7px', backgroundColor: "#D2AAF0"
}}
        >
          Elastic Group
        </p>
      )}
    </>
  );
}

export default WorkSpaceSelection;
