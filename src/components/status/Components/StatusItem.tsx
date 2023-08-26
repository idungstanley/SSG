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
    <span
      style={{ minWidth: 300 }}
      className="flex justify-items-start px-1 rounded cursor-pointer h-7 items-center border-alsoit-gray-75 border bg-white"
    >
      {item.type !== 'closed' && (
        <span className="cursor-move">
          <Drag />
        </span>
      )}
      <span className="w-3 h-3 ml-4 rounded">
        <StatusIconComp color={item.color as string} />
      </span>
      <span style={{ color: item.color as string }} className="uppercase truncate flex-grow">
        {item.name}
      </span>
      <span className="flex items-center gap-2 ml-2">
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
