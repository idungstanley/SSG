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
import { Task } from '../../../../../../features/task/interface.tasks';

type PickedTask = Pick<renderDataProps, 'task'>;

interface TaskPriorityProps extends PickedTask {
  activeColumn?: boolean[];
}

export default function TaskPriority({ task, activeColumn }: TaskPriorityProps) {
  const dispatch = useAppDispatch();

  const handleTaskPriority = (task: ImyTaskData) => {
    dispatch(setCurrentTaskPriorityId(task.id));
    dispatch(setSelectedTaskParentId((task.parent_id || task.list_id) as string));
    dispatch(setSelectedTaskType(task?.parent_id ? EntityType.subtask : EntityType.task));
  };

  return (
    <div
      className="relative border-gray-300 border-dotted w-full h-full"
      onClick={() => handleTaskPriority(task as ImyTaskData)}
    >
      <PriorityDropdown taskCurrentPriority={task?.priority} task={task as Task} activeColumn={activeColumn} />
    </div>
  );
}
