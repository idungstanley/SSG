import React from 'react';
import { ICustomField } from '../../../../../../features/task/taskSlice';
import { useUpdateEntityCustomFieldValue } from '../../../../../../features/list/listService';

interface CheckboxProps {
  taskCustomFields?: ICustomField;
  taskId: string;
  fieldId: string;
}

function CheckboxField({ taskCustomFields, taskId, fieldId }: CheckboxProps) {
  const activeValue = taskCustomFields ? taskCustomFields.values[0].value : '0';

  const { mutate: onUpdate } = useUpdateEntityCustomFieldValue(taskId);

  const handleChange = () => {
    onUpdate({
      taskId,
      value: [{ value: activeValue === '1' ? '0' : '1' }],
      fieldId
    });
  };

  return (
    <div className="w-full">
      <div className="w-1/2 m-auto flex justify-center items-center">
        <input
          id="default-checkbox"
          type="checkbox"
          checked={activeValue === '1' ? true : false}
          onChange={handleChange}
          className="w-4 h-4 text-alsoit-purple-300 bg-gray-100 border-gray-300 rounded focus:ring-0 dark:focus:ring-0  focus:ring-- dark:bg-gray-700 dark:border-gray-600"
        />
      </div>
    </div>
  );
}

export default CheckboxField;
