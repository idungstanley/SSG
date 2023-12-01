import { TdHTMLAttributes, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  ICustomField,
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
import PhoneField from './CustomField/Phone/PhoneField';
import CheckboxField from './CustomField/Checkbox/CheckboxField';
import StatusDropdown from '../../../status/StatusDropdown';
import RatingField from './CustomField/Ratings/RatingField';
import TimeField from './CustomField/TimeField/TimeField';
import AutoProgress from './CustomField/Progress/AutoProgress';
import FormulaField from './CustomField/Formula/FormulaField';
import PeopleField from './CustomField/PeopleField/PeopleField';
import FilesField from './CustomField/Files/FilesField';
import LocationField from './CustomField/Location/LocationField';
import ManualProgress from './CustomField/Progress/ManualProgress';
import moment, { MomentInput } from 'moment-timezone';

interface ColProps extends TdHTMLAttributes<HTMLTableCellElement> {
  value: TaskValue;
  field: Pick<listColumnProps, 'field'>['field'];
  task: Task;
  fieldId: string;
  styles?: { opacity: number };
  selectedRow: boolean;
}

export function Col({ value, field, fieldId, task, styles, selectedRow, ...props }: ColProps) {
  const dispatch = useAppDispatch();
  const { taskId } = useParams();

  const { date_format } = useAppSelector((state) => state.userSetting);
  const { dragOverItemId, draggableItemId } = useAppSelector((state) => state.list);
  const {
    dragToBecomeSubTask,
    newTaskStatus,
    verticalGrid,
    currentTaskStatusId,
    selectedTasksArray,
    saveSettingOnline,
    taskColumnIndex,
    taskColumns,
    KeyBoardSelectedTaskData
  } = useAppSelector((state) => state.task);

  const [arrangedHeaders, setArrangedHeaders] = useState<string[]>([]);

  const COL_BG = taskId === task.id ? ACTIVE_COL_BG : selectedRow ? 'bg-alsoit-purple-50' : DEFAULT_COL_BG;
  const isSelected = selectedTasksArray.includes(task.id);
  const columnIndex = arrangedHeaders.map((columns): boolean => {
    return columns === field && task.id === KeyBoardSelectedTaskData?.id ? true : false;
  });

  useEffect(() => {
    const newArr = taskColumns
      .filter((columns) => !columns.hidden)
      .map((columns) => columns.field)
      .filter((field) => field !== undefined);

    setArrangedHeaders(newArr as string[]);
  }, [field, taskColumns]);

  // fields config
  const fields: Record<string, JSX.Element> = {
    priority: <TaskPriority task={task as ImyTaskData} activeColumn={columnIndex} />,
    status: value ? (
      <div
        className="top-0 flex flex-col items-center justify-center w-full h-full px-1 text-xs font-medium text-center text-white capitalize"
        style={{
          backgroundColor:
            task.id === '0' || task.id === currentTaskStatusId
              ? newTaskStatus?.color || task?.status?.color
              : task?.status?.color
        }}
        onClick={() => {
          dispatch(setCurrentTaskStatusId(task.id as string));
          dispatch(setSelectedTaskParentId((task.parent_id || task.list_id) as string));
          dispatch(setSelectedTaskType(task?.parent_id ? EntityType.subtask : EntityType.task));
        }}
      >
        <StatusDropdown
          taskCurrentStatus={task.status}
          taskStatuses={task.task_statuses}
          statusDropdownType="name"
          task={task}
          activeColumn={columnIndex}
        />
      </div>
    ) : (
      <></>
    ),
    created_at: <DateFormat date={value as string} activeColumn={columnIndex} font="text-sm" type="created_at" />,
    updated_at: <DateFormat date={value as string} activeColumn={columnIndex} font="text-sm" type="updated_at" />,
    start_date: (
      <DateFormat date={value as string} activeColumn={columnIndex} font="text-sm" task={task} type="start_date" />
    ),
    end_date: (
      <DateFormat
        date={value as string}
        activeColumn={columnIndex}
        font="text-sm"
        task={task}
        type="end_date"
        isDueDate={true}
      />
    ),
    dropdown: (
      <DropdownFieldWrapper
        taskId={task.id}
        fieldId={fieldId}
        taskCustomFields={task.custom_fields}
        entityCustomProperty={task.custom_field_columns}
        activeColumn={columnIndex}
        task={task}
      />
    ),
    labels: (
      <LabelsWrapper
        entityCustomProperty={task.custom_field_columns?.find((i) => i.id === fieldId)}
        taskCustomFields={task.custom_fields?.find((i) => i.id === fieldId)}
        taskId={task.id}
        task={task}
        activeColumn={columnIndex}
      />
    ),
    tags: <TagsWrapper tags={task.tags} />,
    text: (
      <TextField
        taskId={task.id}
        taskCustomFields={task.custom_fields?.find((i) => i.id === fieldId)}
        fieldId={fieldId}
        activeColumn={columnIndex}
        task={task}
      />
    ),
    email: (
      <EmailWebsiteField
        taskId={task.id}
        taskCustomFields={task.custom_fields?.find((i) => i.id === fieldId)}
        fieldId={fieldId}
        fieldType="email"
        activeColumn={columnIndex}
        task={task}
      />
    ),
    longtext: (
      <TextField
        taskId={task.id}
        taskCustomFields={task.custom_fields?.find((i) => i.id === fieldId)}
        fieldId={fieldId}
        activeColumn={columnIndex}
        task={task}
      />
    ),
    number: (
      <NumberField
        taskId={task.id}
        taskCustomFields={task.custom_fields?.find((i) => i.id === fieldId)}
        fieldId={fieldId}
        activeColumn={columnIndex}
        task={task}
      />
    ),
    money: (
      <MoneyField
        entityCustomProperty={task.custom_field_columns?.find((i) => i.id === fieldId)}
        taskId={task.id}
        taskCustomFields={task.custom_fields?.find((i) => i.id === fieldId)}
        fieldId={fieldId}
        activeColumn={columnIndex}
        task={task}
      />
    ),
    date: <DateField />,
    archived_at: <>{value ? <>{moment(value as MomentInput).format(date_format?.toUpperCase())}</> : '-'}</>,
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
        activeColumn={columnIndex}
        task={task}
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
        activeColumn={columnIndex}
      />
    ),
    progress_manual: (
      <ManualProgress
        taskId={task.id}
        taskCustomFields={task.custom_fields?.find((i) => i.id === fieldId)}
        fieldId={fieldId}
        entityCustomProperty={task.custom_field_columns?.find((i) => i.id === fieldId)}
      />
    ),
    progress_auto: (
      <AutoProgress
        task={task as ImyTaskData}
        entityCustomProperty={task.custom_field_columns?.find((i) => i.id === fieldId)}
      />
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
        entityCustomProperty={task.custom_field_columns?.find((i) => i.id === fieldId)}
        taskId={task.id}
        taskCustomFields={task.custom_fields?.find((i) => i.id === fieldId)}
        fieldId={fieldId}
      />
    ),
    formula: (
      <FormulaField
        taskId={task.id}
        parentId={task.parent_id || task.list_id}
        currentCustomFields={task.custom_fields?.find((i) => i.id === fieldId) as ICustomField}
        currentCustomFieldColumn={task.custom_field_columns?.find((i) => i.id === fieldId) as IField}
        taskCustomFields={task.custom_fields as ICustomField[]}
        taskCustomFieldsColumns={task.custom_field_columns}
        fieldId={fieldId}
      />
    ),
    people: (
      <PeopleField
        entityCustomProperty={task.custom_field_columns?.find((i) => i.id === fieldId)}
        taskId={task.id}
        taskCustomFields={task.custom_fields?.find((i) => i.id === fieldId)}
        fieldId={fieldId}
      />
    ),
    files: (
      <FilesField
        taskId={task.id}
        taskCustomFields={task.custom_fields?.find((i) => i.id === fieldId)}
        fieldId={fieldId}
        listId={task.list_id}
      />
    ),
    location: (
      <LocationField
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
            : columnIndex[taskColumnIndex]
            ? 'border border-alsoit-gray-200'
            : 'border-t',
          COL_BG,
          `relative flex ${isSelected && 'tdListVNoSticky'} ${
            verticalGrid && 'border-r'
          } justify-center items-center text-sm font-medium text-gray-900 relative`
        )}
        {...props}
        style={{
          height:
            saveSettingOnline?.singleLineView && !saveSettingOnline?.CompactView
              ? '42px'
              : saveSettingOnline?.CompactView && saveSettingOnline?.singleLineView
              ? '25px'
              : !saveSettingOnline?.singleLineView && saveSettingOnline?.CompactView && task.name.length < 30
              ? '25px'
              : '',
          ...styles
        }}
      >
        {dragOverItemId === task.id && draggableItemId !== dragOverItemId && dragToBecomeSubTask && (
          <span
            className={cl('absolute content-start z-50 flex items-center w-full right-0')}
            style={{ bottom: '2px' }}
          >
            <span className={cl('h-0.5 bg-alsoit-purple-300 w-full ml-auto')}></span>
          </span>
        )}
        {field in fields ? fields[field] : String(value)}
      </td>
    </>
  );
}
