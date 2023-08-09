import React from 'react';
import Button from '../../../../../../../components/Buttons/Button';
import SubtaskIcon from '../../../../../../../assets/icons/SubtaskIcon';
import { useAppDispatch, useAppSelector } from '../../../../../../../app/hooks';
import { setToggleAllSubtask } from '../../../../../../../features/task/taskSlice';
import toast from 'react-hot-toast';
import Toast from '../../../../../../../common/Toast';

export default function ListSubtasks({ viewsList1 }: { viewsList1: string }) {
  const dispatch = useAppDispatch();
  const { toggleAllSubtask } = useAppSelector((state) => state.task);

  const handleClick = () => {
    toast.custom((t) => <Toast type="success" title={'Testing'} body={'body'} toastId={t.id} />, {
      position: 'bottom-right', // Set the position to bottom-right
      duration: Infinity // Set the duration to 5000 milliseconds (5 seconds)
    });
  };
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
