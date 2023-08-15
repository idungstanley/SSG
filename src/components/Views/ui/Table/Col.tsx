import { TdHTMLAttributes } from 'react';
import { useParams } from 'react-router-dom';
import { ImyTaskData, setCurrentTaskStatusId } from '../../../../features/task/taskSlice';
import { cl } from '../../../../utils';
import Assignee from '../../../../pages/workspace/tasks/assignTask/Assignee';
import DropdownFieldWrapper from '../../../../pages/workspace/tasks/component/taskData/dropdown/DropdownFieldWrapper';
import TaskPriority from '../../../../pages/workspace/tasks/component/taskData/priority';
import { listColumnProps } from '../../../../pages/workspace/tasks/component/views/ListColumns';
import { Task, TaskValue } from '../../../../features/task/interface.tasks';
import { DEFAULT_COL_BG } from '../../config';
import DateFormat from '../../../DateFormat';
import StatusNameDropdown from '../../../status/StatusNameDropdown';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { EntityType } from '../../../../utils/EntityTypes/EntityType';

interface ColProps extends TdHTMLAttributes<HTMLTableCellElement> {
  value: TaskValue;
  field: Pick<listColumnProps, 'field'>['field'];
  task: Task;
  fieldId: string;
}

export function Col({ value, field, fieldId, task, ...props }: ColProps) {
  const { taskId } = useParams();
  const { dragOverItemId, draggableItemId } = useAppSelector((state) => state.list);
  const ACTIVE_TASK = taskId === task.id ? 'tdListVNoSticky' : DEFAULT_COL_BG;
  const { singleLineView, verticalGrid, selectedTasksArray, CompactView } = useAppSelector((state) => state.task);
  const isSelected = selectedTasksArray.includes(task.id);

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
    start_date: <DateFormat date={value as string} font="text-sm" />,
    dropdown: (
      <DropdownFieldWrapper
        taskId={task.id}
        fieldId={fieldId}
        listId={task.list_id}
        taskCustomFields={task.custom_fields}
      />
    ),
    assignees: (
      <Assignee
        task={task as ImyTaskData}
        itemId={task.id}
        option={`${task.id !== '0' ? EntityType.task : 'getTeamId'}`}
      />
    )
  };

  return (
    <>
      <td
        className={cl(
          dragOverItemId === task.id && draggableItemId !== dragOverItemId
            ? 'border-b-2 border-alsoit-purple-300'
            : 'border-t',
          ACTIVE_TASK,
          `relative flex ${isSelected && 'tdListVNoSticky'} ${
            verticalGrid && 'border-r'
          } justify-center items-center text-sm font-medium text-gray-900 `
        )}
        {...props}
        style={{
          height:
            singleLineView && !CompactView
              ? '42px'
              : CompactView && singleLineView
              ? '32px'
              : !singleLineView && CompactView && task.name.length < 30
              ? '32px'
              : ''
        }}
      >
        {field in fields ? fields[field] : String(value)}
      </td>
    </>
  );
}
