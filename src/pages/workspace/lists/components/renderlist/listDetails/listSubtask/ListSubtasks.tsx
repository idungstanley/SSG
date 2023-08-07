import React from 'react';
import Button from '../../../../../../../components/Buttons/Button';
import SubtaskIcon from '../../../../../../../assets/icons/SubtaskIcon';
import { useAppDispatch, useAppSelector } from '../../../../../../../app/hooks';
import { setToggleAllSubtask } from '../../../../../../../features/task/taskSlice';

export default function ListSubtasks({ viewsList1 }: { viewsList1: string }) {
  const dispatch = useAppDispatch();
  const { toggleAllSubtask } = useAppSelector((state) => state.task);
  return (
    <div
      className="flex items-center justify-start space-x-1 w-full"
      onClick={() => dispatch(setToggleAllSubtask(!toggleAllSubtask))}
    >
      {/* <span className=" space-x-1 flex items-center pb-2 pt-1 mb-2  text-sm  cursor-pointer bg-gray-200 rounded-sm min-w-max px-1"> */}
      <Button active={toggleAllSubtask}>
        <SubtaskIcon color={toggleAllSubtask ? '#BF01FE' : '#424242'} />
        <span className={`flex items-center cursor-pointer ${toggleAllSubtask && 'text-alsoit-purple-300'}`}>
          {viewsList1}
        </span>
      </Button>
      {/* </span> */}
    </div>
  );
}
