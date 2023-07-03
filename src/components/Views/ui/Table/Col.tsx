import { TdHTMLAttributes } from 'react';
import { useParams } from 'react-router-dom';
import { ImyTaskData, setCurrentTaskStatusId } from '../../../../features/task/taskSlice';
import { cl } from '../../../../utils';
import Assignee from '../../../../pages/workspace/tasks/assignTask/Assignee';
import DropdownFieldWrapper from '../../../../pages/workspace/tasks/component/taskData/dropdown/DropdownFieldWrapper';
import TaskPriority from '../../../../pages/workspace/tasks/component/taskData/priority';
import { listColumnProps } from '../../../../pages/workspace/tasks/component/views/ListColumns';
import { Task, TaskValue } from '../../../../features/task/interface.tasks';
import { ACTIVE_COL_BG, DEFAULT_COL_BG } from '../../config';
import DateFormat from '../../../DateFormat';
import StatusNameDropdown from '../../../status/StatusNameDropdown';
import { useAppDispatch } from '../../../../app/hooks';

interface ColProps extends TdHTMLAttributes<HTMLTableCellElement> {
  value: TaskValue;
  field: Pick<listColumnProps, 'field'>['field'];
  task: Task;
  fieldId: string;
}

export function Col({ value, field, fieldId, task, ...props }: ColProps) {
  const { taskId } = useParams();
  const COL_BG = taskId === task.id ? ACTIVE_COL_BG : DEFAULT_COL_BG;

  const dispatch = useAppDispatch();

  // fields config
  const fields: Record<string, JSX.Element> = {
    priority: <TaskPriority task={task as ImyTaskData} />,
    status: value ? (
      <div
        className="capitalize text-xs font-medium bg-green-500 text-white px-1 w-full items-center text-center h-full top-0 flex flex-col justify-center"
        style={{ backgroundColor: task.status.color }}
        onClick={() => dispatch(setCurrentTaskStatusId(task.id as string))}
      >
        <StatusNameDropdown TaskCurrentStatus={task.status} />
      </div>
    ) : (
      <></>
    ),
    created_at: <DateFormat date={value as string} font="text-sm" />,
    updated_at: <DateFormat date={value as string} font="text-sm" />,
    dropdown: (
      <DropdownFieldWrapper
        taskId={task.id}
        fieldId={fieldId}
        listId={task.list_id}
        taskCustomFields={task.custom_fields}
      />
    ),
    assignees: (
      <Assignee task={task as ImyTaskData} itemId={task.id} option={`${task.id !== '0' ? 'task' : 'getTeamId'}`} />
    )
  };

  return (
    <>
      <td
        className={cl(
          COL_BG,
          'relative flex border-t justify-center items-center text-sm font-medium text-gray-900 h-10'
        )}
        {...props}
      >
        {field in fields ? fields[field] : String(value)}
      </td>
    </>
  );
}
