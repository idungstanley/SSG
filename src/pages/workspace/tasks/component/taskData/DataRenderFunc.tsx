import { ICustomField, ImyTaskData } from '../../../../../features/task/taskSlice';
import Assignee from '../../assignTask/Assignee';
import TaskStatus from './status/index';
import TaskName from './taskName';
import TaskPriority from './priority/index';
import DateForTask from './taskDate/index';
import TaskTag from './taskTag/index';
import DropdownFieldWrapper from './dropdown/DropdownFieldWrapper';

export interface tagItem {
  id: string;
  name: string;
  color: string;
}

export interface renderDataProps {
  taskColField?:
    | string
    | number
    | undefined
    | tagItem[]
    | null
    | ICustomField[]
    | Array<{ id: string; initials: string; colour: string }>;
  col?: { field: string; id: string };
  task?: ImyTaskData | undefined;
  getSubTaskId?: string | null | undefined;
  handleGetSubTask?: (id: string | undefined) => void;
  ShowPlusIcon?: null | boolean;
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
        <Assignee task={task} itemId={task?.id} option="task" />
      </div>
    );
  } else if (col?.field === 'tags') {
    return (
      <div className="">
        <TaskTag task={task} taskColField={taskColField} />
      </div>
    );
  } else if (col?.field == 'created_at' || col?.field == 'updated_at') {
    return (
      <div className="mt-2">
        <DateForTask taskColField={taskColField} />
      </div>
    );
  } else if (col?.field == 'status') {
    return (
      <div>
        <TaskStatus taskColField={taskColField} task={task} />
      </div>
    );
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
    return (
      <DropdownFieldWrapper
        taskId={task.id}
        fieldId={col.id}
        listId={task.list_id}
        taskCustomFields={task.custom_fields}
      />
    );
  } else return <>{taskColField}</>;
}
