import React from 'react';
import StatusNameDropdown from '../../../../../../components/status/StatusNameDropdown';
import { renderDataProps } from '../DataRenderFunc';
import { useAppDispatch } from '../../../../../../app/hooks';
import { setCurrentTaskStatusId } from '../../../../../../features/task/taskSlice';

export default function InProgress({ taskColField, task }: renderDataProps) {
  const dispatch = useAppDispatch();

  const handleTaskStatus = (id: string) => {
    dispatch(setCurrentTaskStatusId(id));
  };
  return (
    <div
      className="absolute top-0 flex flex-col justify-center w-20 h-full px-1 text-xs font-medium text-center text-white capitalize bg-purple-500"
      style={{ marginLeft: '-30px' }}
      onClick={() => handleTaskStatus(task?.id as string)}
    >
      <StatusNameDropdown TaskCurrentStatus={task?.status} statusName={taskColField as string} />
    </div>
  );
}
