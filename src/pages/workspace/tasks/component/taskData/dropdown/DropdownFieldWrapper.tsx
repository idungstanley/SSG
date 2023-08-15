import { useList } from '../../../../../../features/list/listService';
import { ICustomField } from '../../../../../../features/task/taskSlice';
import DropdownField from './DropdownField';

interface DropdownFieldWrapperProps {
  listId: string;
  taskCustomFields?: ICustomField[];
  fieldId: string;
  taskId: string;
}

export default function DropdownFieldWrapper({ taskId, fieldId, listId, taskCustomFields }: DropdownFieldWrapperProps) {
  const { data } = useList(listId);
  const customFields = data?.custom_fields ?? [];

  const field = customFields.find((i) => i.id === fieldId);
  const property = taskCustomFields?.find((i) => i.custom_field.id === fieldId);

  const activeProperty = property ? property.values[0].value : '-';

  return field ? (
    <DropdownField field={{ id: field.id, options: field.options, activeProperty }} taskId={taskId} />
  ) : null;
}
