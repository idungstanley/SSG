import { TdHTMLAttributes } from 'react';
import { ITaskFullList } from '../../../../features/task/interface.tasks';
import { ImyTaskData } from '../../../../features/task/taskSlice';
import { cl } from '../../../../utils';
import TaskPriority from '../../../workspace/tasks/component/taskData/priority';
import TaskStatus from '../../../workspace/tasks/component/taskData/status';
import DateForTask from '../../../workspace/tasks/component/taskData/taskDate';
import { listColumnProps } from '../../../workspace/tasks/component/views/ListColumns';
import { TaskFullListValue } from '../../types/hub';

interface ColProps extends TdHTMLAttributes<HTMLTableCellElement> {
  value: TaskFullListValue;
  field: Pick<listColumnProps, 'field'>['field'];
  task: ITaskFullList;
  sticky?: boolean;
}

export const DEFAULT_COL_BG = 'bg-white opacity-90';

export function Col({ value, field, sticky, task, ...props }: ColProps) {
  const fields: Record<string, JSX.Element> = {
    priority: <TaskPriority task={task as ImyTaskData} />,
    status: <TaskStatus taskColField={value} task={task as ImyTaskData} />,
    name: <TaskName task={task} />,
    created_at: <DateForTask taskColField={value} />,
    updated_at: <DateForTask taskColField={value} />
  };

  return sticky ? (
    <td
      className="sticky flex -left-1 text-center justify-center items-center text-sm font-medium text-gray-900"
      {...props}
    >
      {field in fields ? fields[field] : String(value)}
    </td>
  ) : (
    <td
      className={cl(DEFAULT_COL_BG, 'flex border-t justify-center items-center text-sm font-medium text-gray-900 p-4')}
      {...props}
    >
      {field in fields ? fields[field] : String(value)}
    </td>
  );
}

// temporary component
interface TaskNameProps {
  task: ITaskFullList;
}

function TaskName({ task }: TaskNameProps) {
  return (
    <>
      {/* change me */}
      <div className="bg-purple-50 h-full flex items-center">
        <span className="p-1 group-hover:opacity-100 opacity-0">=</span>
      </div>
      <div className={cl(DEFAULT_COL_BG, ' border-t w-full h-full py-4 p-4')}>{task.name}</div>
    </>
  );
}
