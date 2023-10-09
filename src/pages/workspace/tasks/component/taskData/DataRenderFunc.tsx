import { ImyTaskData } from '../../../../../features/task/taskSlice';
import Assignee from '../../assignTask/Assignee';
import TaskName from './taskName';
import TaskPriority from './priority/index';
import TaskTag from './taskTag/index';
import DropdownFieldWrapper from './dropdown/DropdownFieldWrapper';
import { ITaskFullList, TaskValue } from '../../../../../features/task/interface.tasks';
import DateFormat from '../../../../../components/DateFormat/index';

export interface tagItem {
  id: string;
  name: string;
  color: string;
}

export interface renderDataProps {
  taskColField?: TaskValue;
  col?: { field: string; id: string };
  task?: ImyTaskData | undefined | ITaskFullList;
  getSubTaskId?: string | null | undefined;
  handleGetSubTask?: (id: string | undefined) => void;
  ShowPlusIcon?: null | boolean;
  entity_type?: string;
  entity_id?: string;
}

export default function DataRenderFunc({
  taskColField,
  col,
  task,
  getSubTaskId,
  handleGetSubTask,
  ShowPlusIcon
}: renderDataProps) {
  if (col?.field === 'assignees') {
    return (
      <div className="-mt-0.5">
        <Assignee task={task as ImyTaskData} itemId={task?.id} option="task" />
      </div>
    );
  } else if (col?.field === 'tags') {
    return (
      <div>
        <TaskTag entity_id={task?.id} taskColField={taskColField} entity_type="task" />
      </div>
    );
  } else if (col?.field === 'created_at' || col?.field === 'updated_at') {
    return (
      <div className="mt-2">
        <DateFormat date={taskColField as string} font="text-sm" />
      </div>
    );
  } else if (col?.field === 'status') {
    return <div>{/* <TaskStatus taskColField={taskColField} task={task} /> */}</div>;
  } else if (col?.field === 'name') {
    return (
      <TaskName
        taskColField={taskColField}
        task={task}
        handleGetSubTask={handleGetSubTask}
        getSubTaskId={getSubTaskId}
        ShowPlusIcon={ShowPlusIcon}
      />
    );
  } else if (col?.field === 'priority') {
    return <TaskPriority task={task} />;
  } else if (col && col.field === 'dropdown' && task) {
    return <DropdownFieldWrapper taskId={task.id} fieldId={col.id} taskCustomFields={task.custom_fields} />;
  } else return <>{taskColField}</>;
}
