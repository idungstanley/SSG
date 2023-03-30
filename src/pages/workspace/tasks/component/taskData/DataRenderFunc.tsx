import React from 'react';
import { ImyTaskData } from '../../../../../features/task/taskSlice';
import Assignee from '../../assignTask/Assignee';
import TaskStatus from './status/index';
import TaskName from './taskName';
import TaskPriority from './priority/index';
import DateForTask from './taskDate/index';
import TaskTag from './taskTag/index';

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
    | Array<{ id: string; initials: string; colour: string }>;
  colfield?: string;
  task?: ImyTaskData | undefined;
  getSubTaskId?: string | null | undefined;
  handleGetSubTask?: (id: string | undefined) => void;
  ShowPlusIcon?: null | boolean;
}

export default function DataRenderFunc({
  taskColField,
  colfield,
  task,
  getSubTaskId,
  handleGetSubTask,
  ShowPlusIcon
}: renderDataProps) {
  if (colfield === 'assignees') {
    return (
      <>
        <div>
          <Assignee task={task} itemId={task?.id} option="task" />
        </div>
      </>
    );
  } else if (colfield === 'tags') {
    return (
      <>
        <div>
          <TaskTag task={task} taskColField={taskColField} />
        </div>
      </>
    );
  } else if (colfield == 'created_at' || colfield == 'updated_at') {
    return (
      <>
        <DateForTask taskColField={taskColField} />
      </>
    );
  } else if (colfield == 'status') {
    return (
      <>
        <div>
          <TaskStatus taskColField={taskColField} task={task} />
        </div>
      </>
    );
  } else if (colfield === 'name') {
    return (
      <>
        <div>
          <TaskName
            taskColField={taskColField}
            task={task}
            handleGetSubTask={handleGetSubTask}
            getSubTaskId={getSubTaskId}
            ShowPlusIcon={ShowPlusIcon}
          />
        </div>
      </>
    );
  } else if (colfield === 'priority') {
    return (
      <>
        <TaskPriority task={task} />
      </>
    );
  } else return <>{taskColField}</>;
}
