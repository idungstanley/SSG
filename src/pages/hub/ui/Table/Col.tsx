import { TdHTMLAttributes } from 'react';
import { ITaskFullList } from '../../../../features/task/interface.tasks';
import { ImyTaskData } from '../../../../features/task/taskSlice';
import { cl } from '../../../../utils';
import TaskPriority from '../../../workspace/tasks/component/taskData/priority';
import TaskStatus from '../../../workspace/tasks/component/taskData/status';
import { listColumnProps } from '../../../workspace/tasks/component/views/ListColumns';
import { TaskFullListValue } from '../../types/hub';

interface ColProps extends TdHTMLAttributes<HTMLTableCellElement> {
  value: TaskFullListValue;
  field: Pick<listColumnProps, 'field'>['field'];
  task: ITaskFullList;
}

const DEFAULT_COL_BG = 'bg-white opacity-90';

export function Col({ value, field, task, ...props }: ColProps) {
  const fields: Record<string, JSX.Element> = {
    priority: <TaskPriority task={task as ImyTaskData} />,
    status: <TaskStatus taskColField={value} task={task as ImyTaskData} />
  };

  return (
    <td
      className={cl(DEFAULT_COL_BG, 'flex border-t justify-center items-center text-sm font-medium text-gray-900 p-4')}
      {...props}
    >
      {field in fields ? fields[field] : String(value)}
    </td>
  );
}
