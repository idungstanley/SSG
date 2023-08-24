import React, { useState } from 'react';
import { ICustomField } from '../../../../features/task/taskSlice';
import { useUpdateEntityCustomFieldValue } from '../../../../features/list/listService';

interface DropdownFieldWrapperProps {
  taskCustomFields?: ICustomField;
  taskId: string;
  fieldId: string;
}

function TextField({ taskCustomFields, taskId, fieldId }: DropdownFieldWrapperProps) {
  const activeValue = taskCustomFields?.values[0].value ? taskCustomFields?.values[0].value : '-';
  const [currentValue, setCurrentValue] = useState<string>(activeValue);
  const [editMode, setEditMode] = useState(false);

  const { mutate: onUpdate } = useUpdateEntityCustomFieldValue(taskId);

  const handleInputBlur = () => {
    setEditMode(false);
    onUpdate({
      taskId,
      value: [{ value: currentValue }],
      fieldId
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setEditMode(false);
      if (currentValue !== activeValue) {
        onUpdate({
          taskId,
          value: [{ value: currentValue }],
          fieldId
        });
      }
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      {!editMode ? (
        <div className="w-full h-full hover:border-2 hover:borer-alsoit-gray-300">
          <h1
            onClick={() => {
              setEditMode(true);
            }}
            className="w-full h-full flex justify-center items-center text-alsoit-text-md font-semibold"
          >
            {currentValue}
          </h1>
        </div>
      ) : (
        <input
          type="text"
          autoFocus={true}
          value={currentValue === '-' ? '' : currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleInputBlur}
          className="w-full h-fit border-alsoit-gray-300 text-alsoit-text-md font-semibold"
        />
      )}
    </div>
  );
}

export default TextField;
