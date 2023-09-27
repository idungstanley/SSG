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
import { IField, ITask_statuses } from '../../../../features/list/list.interfaces';
import TextField from './CustomField/TextField/TextField';
import LabelsWrapper from './CustomField/Labels/LabelsWrapper';
import NumberField from './CustomField/Number/NumberField';
import TagsWrapper from './CustomField/Tags/TagsWrapper';
import MoneyField from './CustomField/Money/MoneyField';
import DateField from './CustomField/Date/DateField';
import EmailWebsiteField from './CustomField/EmailWebsiteField/EmailWebsiteField';
import PhoneField from './CustomField/Phone/PhoneField';
import CheckboxField from './CustomField/Checkbox/CheckboxField';
import StatusDropdown from '../../../status/StatusDropdown';
import RatingField from './CustomField/Ratings/RatingField';
import TimeField from './CustomField/TimeField/TimeField';
import AutoProgress from './CustomField/Progress/AutoProgress';
import PeopleField from './CustomField/PeopleField/PeopleField';

interface ColProps extends TdHTMLAttributes<HTMLTableCellElement> {
  value: TaskValue;
  field: Pick<listColumnProps, 'field'>['field'];
  task: Task;
  fieldId: string;
  customFields?: IField[];
  taskStatuses?: ITask_statuses[];
}

export function Col({ value, field, fieldId, task, customFields, taskStatuses, ...props }: ColProps) {
  const dispatch = useAppDispatch();
  const { taskId } = useParams();

  const { dragOverItemId, draggableItemId } = useAppSelector((state) => state.list);
  const { dragToBecomeSubTask, verticalGrid, selectedTasksArray, saveSettingOnline } = useAppSelector(
    (state) => state.task
  );

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
          dispatch(setSelectedTaskParentId((task.parent_id || task.list_id) as string));
          dispatch(setSelectedTaskType(task?.parent_id ? EntityType.subtask : EntityType.task));
        }}
      >
        <StatusDropdown TaskCurrentStatus={task.status} taskStatuses={taskStatuses} statusDropdownType="name" />
      </div>
    ) : (
      <></>
    ),
    created_at: <DateFormat date={value as string} font="text-sm" type="created_at" />,
    updated_at: <DateFormat date={value as string} font="text-sm" type="updated_at" />,
    start_date: <DateFormat date={value as string} font="text-sm" task={task} type="start_date" />,
    end_date: <DateFormat date={value as string} font="text-sm" task={task} type="end_date" />,
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
    time: (
      <TimeField
        taskId={task.id}
        taskCustomFields={task.custom_fields?.find((i) => i.id === fieldId)}
        fieldId={fieldId}
      />
    ),
    website: (
      <EmailWebsiteField
        taskId={task.id}
        taskCustomFields={task.custom_fields?.find((i) => i.id === fieldId)}
        fieldId={fieldId}
        fieldType="website"
      />
    ),
    phone: (
      <PhoneField
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
    ),
    progress_manual: <AutoProgress task={task as ImyTaskData} />,
    progress_auto: (
      <AutoProgress task={task as ImyTaskData} entityCustomProperty={customFields?.find((i) => i.id === fieldId)} />
    ),
    checkbox: (
      <CheckboxField
        taskId={task.id}
        taskCustomFields={task.custom_fields?.find((i) => i.id === fieldId)}
        fieldId={fieldId}
      />
    ),
    rating: (
      <RatingField
        entityCustomProperty={customFields?.find((i) => i.id === fieldId)}
        taskId={task.id}
        taskCustomFields={task.custom_fields?.find((i) => i.id === fieldId)}
        fieldId={fieldId}
      />
    ),
    people: (
      <PeopleField
        entityCustomProperty={customFields?.find((i) => i.id === fieldId)}
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
            : dragOverItemId === task.id && draggableItemId !== dragOverItemId && dragToBecomeSubTask
            ? 'mb-0.5'
            : 'border-t',
          COL_BG,
          `relative flex ${isSelected && 'tdListVNoSticky'} ${
            verticalGrid && 'border-r'
          } justify-center items-center text-sm font-medium text-gray-900 relative`
        )}
        {...props}
        style={{
          height:
            task.id === '0'
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
          <span className={cl('absolute h-0.5 bg-alsoit-purple-300 w-full bottom-px right-0')}></span>
        )}
        {field in fields ? fields[field] : String(value)}
      </td>
    </>
  );
}
