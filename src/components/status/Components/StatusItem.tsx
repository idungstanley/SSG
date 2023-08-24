import React from 'react';
import Drag from '../../../assets/icons/Drag';
import StatusIconComp from '../../../assets/icons/StatusIconComp';
import Picker from '../../../assets/icons/Picker';
import ThreeDotIcon from '../../../assets/icons/ThreeDotIcon';
import { StatusProps } from '../../../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';

interface StatusBodyProps {
  item: StatusProps;
}

export default function StatusItem({ item }: StatusBodyProps) {
  return (
    <span className="flex items-center gap-2 p-1 border rounded cursor-pointer justify-items-start border-alsoit-gray-75">
      <span className="flex items-center">
        <span className="cursor-move">
          <Drag />
        </span>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 ml-4 rounded">
            <StatusIconComp color={item.color as string} />
          </span>
          <span style={{ color: item.color as string }} className="uppercase">
            {item.name}
          </span>
        </div>
      </span>

      <span className="flex items-center gap-2 ml-auto">
        <span>
          <Picker />
        </span>
        <span>
          <ThreeDotIcon />
        </span>
      </span>
    </span>
  );
}
