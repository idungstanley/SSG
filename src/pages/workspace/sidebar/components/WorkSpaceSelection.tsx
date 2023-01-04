import React from 'react';
import { VscTriangleDown } from 'react-icons/vsc';
import { AvatarWithInitials } from '../../../../components';

function WorkSpaceSelection() {
  return (
    <div className="rounded border border-gray-400 p-0.5 w-fit mt-1 cursor-pointer">
      <div className="flex justify-between items-center space-x-1">
          <AvatarWithInitials
            initials="EG"
            roundedStyle="rounded"
            height="h-5"
            width="w-5"
            textColor="black"
            backgroundColour="#34C6BE"
          />
        <div className="flex justify-between items-center space-x-12">
          <p className="truncate" style={{fontSize: '11px'}}>Elastic Group</p>
        <VscTriangleDown className="text-xs text-gray-400" />
        </div>
      </div>
    </div>
  );
}

export default WorkSpaceSelection;
