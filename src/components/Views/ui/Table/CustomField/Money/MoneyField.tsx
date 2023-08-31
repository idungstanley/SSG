import React, { useState } from 'react';
import { ICustomField } from '../../../../../../features/task/taskSlice';
import { IField } from '../../../../../../features/list/list.interfaces';
import { useUpdateEntityCustomFieldValue } from '../../../../../../features/list/listService';

interface MoneyField {
  taskCustomFields?: ICustomField;
  taskId: string;
  fieldId: string;
  entityCustomProperty?: IField;
}

function MoneyField({ taskCustomFields, taskId, fieldId, entityCustomProperty }: MoneyField) {
  const avtiveCurrency = entityCustomProperty?.properties?.symbol;
  const activeValue = taskCustomFields?.values[0].value ? taskCustomFields?.values[0].value : '-';
  const [currentValue, setCurrentValue] = useState<string>(activeValue);
  const [editMode, setEditMode] = useState(false);

  const { mutate: onUpdate } = useUpdateEntityCustomFieldValue(taskId);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(avtiveCurrency as string, '').trim();

    if (newValue === '' || !isNaN(Number(newValue))) {
      setCurrentValue(newValue);
    }
  };

  const handleInputBlur = () => {
    setEditMode(false);
    if (currentValue !== activeValue) {
      onUpdate({
        taskId,
        value: [{ value: currentValue }],
        fieldId
      });
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      {!editMode ? (
        <div className="w-full h-full border-2 border-transparent hover:border-alsoit-gray-50 group/parent p-1">
          <span className="h-full flex justify-center items-center  cursor-pointer">
            <h1
              className="truncate text-alsoit-text-lg font-semibold"
              onClick={() => {
                setEditMode(true);
              }}
            >
              {currentValue === '-' ? currentValue : `${avtiveCurrency + currentValue}`}
            </h1>
          </span>
        </div>
      ) : (
        <input
          type="text"
          autoFocus={true}
          value={currentValue === '-' ? '' : `${avtiveCurrency + currentValue}`}
          onChange={handleChange}
          // onKeyDown={handleKeyDown}
          onBlur={handleInputBlur}
          className="w-full h-fit border-alsoit-gray-300 text-alsoit-text-lg font-semibold"
        />
      )}
    </div>
  );
}

export default MoneyField;
