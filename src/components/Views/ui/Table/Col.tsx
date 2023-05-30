import { TdHTMLAttributes } from 'react';
import { useParams } from 'react-router-dom';
import { ImyTaskData } from '../../../../features/task/taskSlice';
import { cl } from '../../../../utils';
import Assignee from '../../../../pages/workspace/tasks/assignTask/Assignee';
import DropdownFieldWrapper from '../../../../pages/workspace/tasks/component/taskData/dropdown/DropdownFieldWrapper';
import TaskPriority from '../../../../pages/workspace/tasks/component/taskData/priority';
import TaskStatus from '../../../../pages/workspace/tasks/component/taskData/status';
import DateForTask from '../../../../pages/workspace/tasks/component/taskData/taskDate';
import TaskTag from '../../../../pages/workspace/tasks/component/taskData/taskTag';
import { listColumnProps } from '../../../../pages/workspace/tasks/component/views/ListColumns';
import { Task, TaskValue } from '../../../../features/task/interface.tasks';
import { ACTIVE_COL_BG, DEFAULT_COL_BG } from '../../config';

interface ColProps extends TdHTMLAttributes<HTMLTableCellElement> {
  value: TaskValue;
  field: Pick<listColumnProps, 'field'>['field'];
  task: Task;
  fieldId: string;
}

export function Col({ value, field, fieldId, task, ...props }: ColProps) {
  const { taskId } = useParams();
  const COL_BG = taskId === task.id ? ACTIVE_COL_BG : DEFAULT_COL_BG;

  //  fields config
  const fields: Record<string, JSX.Element> = {
    priority: <TaskPriority task={task as ImyTaskData} />,
    status: <TaskStatus taskColField={value} task={task as ImyTaskData} />,

    created_at: <DateForTask taskColField={value} />,
    updated_at: <DateForTask taskColField={value} />,
    dropdown: (
      <DropdownFieldWrapper
        taskId={task.id}
        fieldId={fieldId}
        listId={task.list_id}
        taskCustomFields={task.custom_fields}
      />
    ),
    tags: <TaskTag task={task as ImyTaskData} taskColField={value} />,
    assignees: <Assignee task={task as ImyTaskData} itemId={task.id} option="task" />
  };

  return (
    <td
      className={cl(COL_BG, 'relative flex border-t justify-center items-center text-sm font-medium text-gray-900')}
      {...props}
    >
      {field in fields ? fields[field] : String(value)}
    </td>
  );
}
