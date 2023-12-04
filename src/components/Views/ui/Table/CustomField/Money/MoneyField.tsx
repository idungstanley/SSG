import React, { useEffect, useRef, useState } from 'react';
import { ICustomField } from '../../../../../../features/task/taskSlice';
import { IField } from '../../../../../../features/list/list.interfaces';
import { useUpdateEntityCustomFieldValue } from '../../../../../../features/list/listService';
import { formatNumberWithCommas } from '../../../../../../utils/FormatNumbers';
import { Task } from '../../../../../../features/task/interface.tasks';
import { useAppSelector } from '../../../../../../app/hooks';

interface MoneyField {
  taskCustomFields?: ICustomField;
  taskId: string;
  fieldId: string;
  entityCustomProperty?: IField;
  activeColumn?: boolean[];
  task?: Task;
}

function MoneyField({ taskCustomFields, taskId, fieldId, entityCustomProperty, activeColumn, task }: MoneyField) {
  const { KeyBoardSelectedTaskData, taskColumnIndex } = useAppSelector((state) => state.task);
  const avtiveCurrency = entityCustomProperty?.properties?.symbol;
  const [activeValue, setActiveValue] = useState('');
  const [currentValue, setCurrentValue] = useState<string>(activeValue);
  const [editMode, setEditMode] = useState(false);

  const { mutate: onUpdate } = useUpdateEntityCustomFieldValue(taskId);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (taskCustomFields) {
      setActiveValue(taskCustomFields?.values[0].value ? taskCustomFields?.values[0].value : '-');
      setCurrentValue(taskCustomFields?.values[0].value ? taskCustomFields?.values[0].value : '-');
    }
  }, [taskCustomFields]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(avtiveCurrency as string, '').trim();

    // if (newValue === '' || !isNaN(Number(newValue))) {
    setCurrentValue(newValue);
    // }
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

  useEffect(() => {
    if (containerRef.current && activeColumn) {
      if (task?.id === KeyBoardSelectedTaskData?.id && activeColumn[taskColumnIndex]) {
        containerRef.current.focus();
        setEditMode(true);
      }
    }
  }, [task, KeyBoardSelectedTaskData, taskColumnIndex, activeColumn]);

  return (
    <div ref={containerRef} tabIndex={0} className="flex items-center justify-center w-full h-full">
      {!editMode ? (
        <div
          className="w-full h-full p-1 border-2 border-transparent hover:border-alsoit-gray-50 group/parent"
          onClick={() => {
            setEditMode(true);
          }}
        >
          <span className="flex items-center justify-center h-full cursor-pointer">
            <h1 className="font-semibold truncate text-alsoit-text-lg">
              {currentValue === '-' ? currentValue : `${avtiveCurrency + formatNumberWithCommas(currentValue)}`}
            </h1>
          </span>
        </div>
      ) : (
        <input
          type="text"
          autoFocus={true}
          value={currentValue === '-' ? '' : `${avtiveCurrency + currentValue}`}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleInputBlur}
          className="w-full font-semibold h-fit border-alsoit-gray-300 text-alsoit-text-lg"
        />
      )}
    </div>
  );
}

export default MoneyField;
