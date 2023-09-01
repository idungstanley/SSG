import PriorityDropdown from '../../../../../../components/priority/PriorityDropdown';
import {
  ImyTaskData,
  setCurrentTaskPriorityId,
  setSelectedTaskParentId,
  setSelectedTaskType
} from '../../../../../../features/task/taskSlice';
import { useAppDispatch } from '../../../../../../app/hooks';
import { renderDataProps } from '../DataRenderFunc';
import { EntityType } from '../../../../../../utils/EntityTypes/EntityType';

export default function TaskPriority({ task }: renderDataProps) {
  const dispatch = useAppDispatch();

  const handleTaskPriority = (task: ImyTaskData) => {
    dispatch(setCurrentTaskPriorityId(task.id));
    dispatch(setSelectedTaskParentId((task.list_id || task.parent_id) as string));
    dispatch(setSelectedTaskType(task?.list_id ? EntityType.task : EntityType.subtask));
  };

  return (
    <div
      className="relative mt-2 border-gray-300 border-dotted "
      onClick={() => handleTaskPriority(task as ImyTaskData)}
    >
      <PriorityDropdown taskCurrentPriority={task?.priority} />
    </div>
  );
}
