import React, { useState } from 'react';
import { ICustomField } from '../../../../features/task/taskSlice';
import { IField } from '../../../../features/list/list.interfaces';

interface DropdownFieldWrapperProps {
  taskCustomFields?: ICustomField;
  taskId: string;
  entityCustomProperty?: IField;
}

function TextField({ taskCustomFields, entityCustomProperty, taskId }: DropdownFieldWrapperProps) {
  const activeValue = taskCustomFields?.values[0].value ? taskCustomFields?.values[0].value : '-';
  const [currentValue, setCurrentValue] = useState<string>(activeValue);
  const [editMode, setEditMode] = useState(false);

  const handleInputBlur = () => {
    setEditMode(false);
  };

  return (
    <div>
      {!editMode ? (
        <h1
          onClick={() => {
            setEditMode(true);
          }}
        >
          {currentValue}
        </h1>
      ) : (
        <input
          type="text"
          autoFocus={true}
          value={currentValue === '-' ? '' : currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
          onBlur={handleInputBlur}
          className="w-full h-fit"
        />
      )}
    </div>
  );
}

export default TextField;
