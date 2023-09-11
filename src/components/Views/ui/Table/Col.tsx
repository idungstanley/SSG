import { TdHTMLAttributes } from 'react';
import { useParams } from 'react-router-dom';
import {
  ImyTaskData,
  setCurrentTaskStatusId,
  setSelectedTaskParentId,
  setSelectedTaskType
} from '../../../../features/task/taskSlice';
import { cl } from '../../../../utils';
import Assignee from '../../../../pages/workspace/tasks/assignTask/Assignee';
import DropdownFieldWrapper from '../../../../pages/workspace/tasks/component/taskData/dropdown/DropdownFieldWrapper';
import TaskPriority from '../../../../pages/workspace/tasks/component/taskData/priority';
import { listColumnProps } from '../../../../pages/workspace/tasks/component/views/ListColumns';
import { Task, TaskValue } from '../../../../features/task/interface.tasks';
import { ACTIVE_COL_BG, DEFAULT_COL_BG } from '../../config';
import DateFormat from '../../../DateFormat';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { EntityType } from '../../../../utils/EntityTypes/EntityType';
import { IField } from '../../../../features/list/list.interfaces';
import TextField from './CustomField/TextField/TextField';
import LabelsWrapper from './CustomField/Labels/LabelsWrapper';
import NumberField from './CustomField/Number/NumberField';
import TagsWrapper from './CustomField/Tags/TagsWrapper';
import MoneyField from './CustomField/Money/MoneyField';
import DateField from './CustomField/Date/DateField';
import EmailWebsiteField from './CustomField/EmailWebsiteField/EmailWebsiteField';
import CheckboxField from './CustomField/Checkbox/CheckboxField';
import StatusDropdown from '../../../status/StatusDropdown';

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
  const { singleLineView, dragToBecomeSubTask, verticalGrid, selectedTasksArray, CompactView, saveSettingOnline } =
    useAppSelector((state) => state.task);

  const COL_BG = taskId === task.id ? ACTIVE_COL_BG : DEFAULT_COL_BG;
  const isSelected = selectedTasksArray.includes(task.id);

  // fields config
  const fields: Record<string, JSX.Element> = {
    priority: <TaskPriority task={task as ImyTaskData} />,
    status: value ? (
      <div
        className="top-0 flex flex-col items-center justify-center w-full h-full px-1 text-xs font-medium text-center text-white capitalize bg-green-500"
        style={{ backgroundColor: task.status.color }}
        onClick={() => {
          dispatch(setCurrentTaskStatusId(task.id as string));
          dispatch(setSelectedTaskParentId((task.list_id || task.parent_id) as string));
          dispatch(setSelectedTaskType(task?.list_id ? EntityType.task : EntityType.subtask));
        }}
      >
        <StatusDropdown TaskCurrentStatus={task.status} statusDropdownType="name" />
      </div>
    ) : (
      <></>
    ),
    created_at: <DateFormat date={value as string} font="text-sm" />,
    updated_at: <DateFormat date={value as string} font="text-sm" />,
    start_date: <DateFormat date={value as string} font="text-sm" task={task} />,
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
    tags: (
      <TagsWrapper
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
    email: (
      <EmailWebsiteField
        taskId={task.id}
        taskCustomFields={task.custom_fields?.find((i) => i.id === fieldId)}
        fieldId={fieldId}
        fieldType="email"
      />
    ),
    longtext: (
      <TextField
        taskId={task.id}
        taskCustomFields={task.custom_fields?.find((i) => i.id === fieldId)}
        fieldId={fieldId}
      />
    ),
    number: (
      <NumberField
        taskId={task.id}
        taskCustomFields={task.custom_fields?.find((i) => i.id === fieldId)}
        fieldId={fieldId}
      />
    ),
    money: (
      <MoneyField
        entityCustomProperty={customFields?.find((i) => i.id === fieldId)}
        taskId={task.id}
        taskCustomFields={task.custom_fields?.find((i) => i.id === fieldId)}
        fieldId={fieldId}
      />
    ),
    date: <DateField />,
    website: (
      <EmailWebsiteField
        taskId={task.id}
        taskCustomFields={task.custom_fields?.find((i) => i.id === fieldId)}
        fieldId={fieldId}
        fieldType="website"
      />
    ),
    assignees: (
      <Assignee
        task={task as ImyTaskData}
        itemId={task.id}
        option={`${task.id !== '0' ? EntityType.task : 'getTeamId'}`}
      />
    ),
    checkbox: (
      <CheckboxField
        taskId={task.id}
        taskCustomFields={task.custom_fields?.find((i) => i.id === fieldId)}
        fieldId={fieldId}
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
              : saveSettingOnline?.singleLineView && !saveSettingOnline?.CompactView
              ? '42px'
              : saveSettingOnline?.CompactView && saveSettingOnline?.singleLineView
              ? '32px'
              : !saveSettingOnline?.singleLineView && saveSettingOnline?.CompactView && task.name.length < 30
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
