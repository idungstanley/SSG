import { TdHTMLAttributes } from 'react';
import { useParams } from 'react-router-dom';
import { ImyTaskData, setCurrentTaskStatusId, setSelectedListId } from '../../../../features/task/taskSlice';
import { cl } from '../../../../utils';
import Assignee from '../../../../pages/workspace/tasks/assignTask/Assignee';
import DropdownFieldWrapper from '../../../../pages/workspace/tasks/component/taskData/dropdown/DropdownFieldWrapper';
import TaskPriority from '../../../../pages/workspace/tasks/component/taskData/priority';
import { listColumnProps } from '../../../../pages/workspace/tasks/component/views/ListColumns';
import { Task, TaskValue } from '../../../../features/task/interface.tasks';
import { ACTIVE_COL_BG, DEFAULT_COL_BG } from '../../config';
import DateFormat from '../../../DateFormat';
import StatusNameDropdown from '../../../status/StatusNameDropdown';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { EntityType } from '../../../../utils/EntityTypes/EntityType';
import { IField } from '../../../../features/list/list.interfaces';
import TextField from '../TextField/TextField';
import LabelsWrapper from './CustomField/Labels/LabelsWrapper';

interface ColProps extends TdHTMLAttributes<HTMLTableCellElement> {
  value: TaskValue;
  field: Pick<listColumnProps, 'field'>['field'];
  task: Task;
  fieldId: string;
  customFields?: IField[];
}

export function Col({ value, field, fieldId, task, customFields, ...props }: ColProps) {
  const dispatch = useAppDispatch();
  const { taskId } = useParams();

  const { dragOverItemId, draggableItemId } = useAppSelector((state) => state.list);
  const { singleLineView, dragToBecomeSubTask, verticalGrid, selectedTasksArray, CompactView } = useAppSelector(
    (state) => state.task
  );

  const COL_BG = taskId === task.id ? ACTIVE_COL_BG : DEFAULT_COL_BG;
  const isSelected = selectedTasksArray.includes(task.id);

  // fields config
  const fields: Record<string, JSX.Element> = {
    priority: <TaskPriority task={task as ImyTaskData} />,
    status: value ? (
      <div
        className="capitalize text-xs font-medium bg-green-500 text-white px-1 w-full items-center text-center h-full top-0 flex flex-col justify-center"
        style={{ backgroundColor: task.status.color }}
        onClick={() => {
          dispatch(setCurrentTaskStatusId(task.id as string));
          dispatch(setSelectedListId(task.list_id));
        }}
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
        taskCustomFields={task.custom_fields}
        entityCustomProperty={customFields}
      />
    ),
    labels: (
      <LabelsWrapper
        entityCustomProperty={customFields?.find((i) => i.id === fieldId)}
        taskCustomFields={task.custom_fields?.find((i) => i.id === fieldId)}
        taskId={task.id}
      />
    ),
    text: (
      <TextField
        taskId={task.id}
        taskCustomFields={task.custom_fields?.find((i) => i.id === fieldId)}
        fieldId={fieldId}
      />
    ),
    longtext: (
      <TextField
        taskId={task.id}
        taskCustomFields={task.custom_fields?.find((i) => i.id === fieldId)}
        fieldId={fieldId}
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
          dragOverItemId === task.id && draggableItemId !== dragOverItemId && !dragToBecomeSubTask
            ? 'border-b-2 border-alsoit-purple-300'
            : 'border-t',
          COL_BG,
          `relative flex ${isSelected && 'tdListVNoSticky'} ${
            verticalGrid && 'border-r'
          } justify-center items-center text-sm font-medium text-gray-900 relative`
        )}
        {...props}
        style={{
          height:
            task.id == '0'
              ? '64px'
              : singleLineView && !CompactView
              ? '42px'
              : CompactView && singleLineView
              ? '32px'
              : !singleLineView && CompactView && task.name.length < 30
              ? '32px'
              : ''
        }}
      >
        {dragOverItemId === task.id && draggableItemId !== dragOverItemId && dragToBecomeSubTask && (
          <span className={cl('absolute h-0.5 bg-alsoit-purple-300 w-full -bottom-px right-0')}></span>
        )}
        {field in fields ? fields[field] : String(value)}
      </td>
    </>
  );
}
