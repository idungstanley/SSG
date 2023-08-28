import React, { useState } from 'react';
import { ICustomField } from '../../../../../../features/task/taskSlice';
import { useUpdateEntityCustomFieldValue } from '../../../../../../features/list/listService';
import Copy from '../../../../../../assets/icons/Copy';
import { cl } from '../../../../../../utils';

interface DropdownFieldWrapperProps {
  taskCustomFields?: ICustomField;
  taskId: string;
  fieldId: string;
}

function TextField({ taskCustomFields, taskId, fieldId }: DropdownFieldWrapperProps) {
  const activeValue = taskCustomFields?.values[0].value ? taskCustomFields?.values[0].value : '-';
  const [currentValue, setCurrentValue] = useState<string>(activeValue);
  const [editMode, setEditMode] = useState(false);
  const [isCopied, setIsCopied] = useState<number>(0);

  const { mutate: onUpdate } = useUpdateEntityCustomFieldValue(taskId);

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

  const handleCopyTexts = async () => {
    try {
      await navigator.clipboard.writeText(currentValue);
      setIsCopied(1);
      setTimeout(() => {
        setIsCopied(0);
      }, 500);
    } catch (error) {
      console.warn(`Failed to copy: ${error}`);
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
              {currentValue}
            </h1>
            <figure
              className={cl(
                'opacity-0',
                isCopied === 1 ? '-mt-2' : '-mt-4',
                activeValue === '-' ? 'group-hover/parent:opacity-0' : 'group-hover/parent:opacity-100'
              )}
              onClick={handleCopyTexts}
            >
              <Copy />
            </figure>
          </span>
        </div>
      ) : (
        <input
          type="text"
          autoFocus={true}
          value={currentValue === '-' ? '' : currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleInputBlur}
          className="w-full h-fit border-alsoit-gray-300 text-alsoit-text-lg font-semibold"
        />
      )}
    </div>
  );
}

export default TextField;
