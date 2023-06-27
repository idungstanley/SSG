import React from 'react';
import Button from '../../../../../../../components/Buttons/Button';
import Icons from '../../../../../../../components/Icons/Icons';
import Subtask from '../../../../../../../assets/icons/Subtask.svg';

export default function ListSubtasks({ viewsList1 }: { viewsList1: string }) {
  return (
    <div className="flex items-center justify-start space-x-1 w-full">
      {/* <span className=" space-x-1 flex items-center pb-2 pt-1 mb-2  text-sm  cursor-pointer bg-gray-200 rounded-sm min-w-max px-1"> */}
      <Button active={false}>
        <Icons src={Subtask} />
        <span className="flex items-center text-sm  cursor-pointer font-bold">{viewsList1}</span>
      </Button>
      {/* </span> */}
    </div>
  );
}
