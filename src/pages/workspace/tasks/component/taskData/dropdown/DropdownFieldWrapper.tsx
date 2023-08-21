import { IField } from '../../../../../../features/list/list.interfaces';
import { useList } from '../../../../../../features/list/listService';
import { ICustomField } from '../../../../../../features/task/taskSlice';
import DropdownField from './DropdownField';

interface DropdownFieldWrapperProps {
  taskCustomFields?: ICustomField[];
  fieldId: string;
  taskId: string;
  entityCustomProperty?: IField[];
}

export default function DropdownFieldWrapper({
  taskId,
  fieldId,
  taskCustomFields,
  entityCustomProperty
}: DropdownFieldWrapperProps) {
  const customFields = entityCustomProperty ?? [];
  const field = customFields.find((i) => i.id === fieldId);
  const property = taskCustomFields?.find((i) => i.id === fieldId);
  const taskActiveProperty = field?.options?.find((i) => i.id === property?.values[0].value);
  const activeProperty = property ? taskActiveProperty : undefined;

  return field ? (
    <DropdownField
      field={{ id: field.id, options: field.options, activeProperty }}
      currentProperty={field}
      taskId={taskId}
    />
  ) : null;
}
