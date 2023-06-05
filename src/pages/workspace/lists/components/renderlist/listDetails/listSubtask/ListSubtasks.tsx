import React from 'react';
import subtaskIcon from '../../../../../../../assets/icons/subtaskIcon.png';

export default function ListSubtasks({ viewsList1 }: { viewsList1: string }) {
  return (
    <div className="flex items-center justify-start space-x-1 w-full">
      <span className=" space-x-1 flex items-center pb-2 pt-1 mb-2  text-sm  cursor-pointer bg-gray-200 rounded-sm min-w-max px-1">
        <img src={subtaskIcon} className=" " alt="subtaskIcon" />
        <span className="flex items-center text-sm  cursor-pointer font-bold">{viewsList1}</span>
      </span>
    </div>
  );
}
