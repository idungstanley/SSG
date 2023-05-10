import React from 'react';
import { ICustomField, ImyTaskData } from '../../../../../features/task/taskSlice';
import Assignee from '../../assignTask/Assignee';
import TaskStatus from './status/index';
import TaskName from './taskName';
import TaskPriority from './priority/index';
import DateForTask from './taskDate/index';
import TaskTag from './taskTag/index';
import { useList } from '../../../../../features/list/listService';
import DropdownField from './dropdown/DropdownField';
import ToolTip from '../../../../../components/Tooltip';

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
  const { data } = useList(task?.list_id);
  const customFields = data?.custom_fields ?? [];

  if (col?.field === 'assignees') {
    return (
      <div className="z-1 -mt-1">
        <Assignee task={task} itemId={task?.id} option="task" />
      </div>
    );
  } else if (col?.field === 'tags') {
    return (
      <div className="z-1">
        <TaskTag task={task} taskColField={taskColField} />
      </div>
    );
  } else if (col?.field == 'created_at' || col?.field == 'updated_at') {
    return (
      <div className="mt-2">
        <ToolTip tooltip={col?.field}>
          <DateForTask taskColField={taskColField} />
        </ToolTip>
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
    const field = customFields.find((i) => i.id === col.id);
    const property = task.custom_fields.find((i) => i.custom_field.id === col.id);

    const activeProperty = property ? property.values[0].value : '-';

    return field ? (
      <DropdownField field={{ id: field.id, properties: field.properties, activeProperty }} taskId={task.id} />
    ) : null;
  } else return <>{taskColField}</>;
}
