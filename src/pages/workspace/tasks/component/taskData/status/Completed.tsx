import React from 'react';
import StatusNameDropdown from '../../../../../../components/status/StatusNameDropdown';
import { setCurrentTaskStatusId } from '../../../../../../features/task/taskSlice';
import { useAppDispatch } from '../../../../../../app/hooks';
import { renderDataProps } from '../DataRenderFunc';

export default function Completed({ taskColField, task }: renderDataProps) {
  const dispatch = useAppDispatch();

  const handleTaskStatus = (id: string) => {
    dispatch(setCurrentTaskStatusId(id));
  };

  return (
    <div
      className="capitalize text-xs font-medium bg-green-500 text-white py-2.5 px-1 w-20 absolute text-center h-full top-0 flex flex-col justify-center"
      style={{ marginLeft: '-30px' }}
      onClick={() => handleTaskStatus(task?.id as string)}
    >
      <StatusNameDropdown TaskCurrentStatus={task?.status} statusName={taskColField as string} />
    </div>
  );
}
