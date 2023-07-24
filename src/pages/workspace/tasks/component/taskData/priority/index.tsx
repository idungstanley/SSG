import React from 'react';
import PriorityDropdown from '../../../../../../components/priority/PriorityDropdown';
import { setCurrentTaskPriorityId } from '../../../../../../features/task/taskSlice';
import { useAppDispatch } from '../../../../../../app/hooks';
import { renderDataProps } from '../DataRenderFunc';

export default function TaskPriority({ task }: renderDataProps) {
  const dispatch = useAppDispatch();

  const handleTaskPriority = (id: string | undefined) => {
    dispatch(setCurrentTaskPriorityId(id));
  };
  return (
    <div
      className="relative mt-2 border-gray-300 border-dotted "
      onClick={() => handleTaskPriority(task?.id as string)}
    >
      <PriorityDropdown TaskCurrentPriority={task?.priority} />
    </div>
  );
}
