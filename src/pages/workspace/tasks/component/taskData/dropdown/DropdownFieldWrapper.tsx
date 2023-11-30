import { IField } from '../../../../../../features/list/list.interfaces';
import { Task } from '../../../../../../features/task/interface.tasks';
import { ICustomField } from '../../../../../../features/task/taskSlice';
import DropdownField from './DropdownField';

interface DropdownFieldWrapperProps {
  taskCustomFields?: ICustomField[];
  fieldId: string;
  taskId: string;
  entityCustomProperty?: IField[];
  task?: Task;
  activeColumn?: boolean[];
}

export default function DropdownFieldWrapper({
  taskId,
  fieldId,
  taskCustomFields,
  entityCustomProperty,
  activeColumn,
  task
}: DropdownFieldWrapperProps) {
  const customFields = entityCustomProperty ?? [];
  const field = customFields.find((i) => i.id === fieldId);
  const property = taskCustomFields?.find((i) => i.id === fieldId);
  const taskActiveProperty = field?.options?.find((i) => i.id === property?.values[0].value);
  const activeProperty = property ? taskActiveProperty : undefined;

  return field ? (
    <DropdownField
      field={{ id: field.id, options: field.options, activeProperty }}
      taskId={taskId}
      currentProperty={field}
      activeColumn={activeColumn}
      task={task}
    />
  ) : null;
}
