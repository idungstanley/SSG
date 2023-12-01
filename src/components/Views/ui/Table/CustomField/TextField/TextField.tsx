import React, { useEffect, useRef, useState } from 'react';
import { ICustomField } from '../../../../../../features/task/taskSlice';
import { useUpdateEntityCustomFieldValue } from '../../../../../../features/list/listService';
import Copy from '../../../../../../assets/icons/Copy';
import { cl } from '../../../../../../utils';
import { useAppSelector } from '../../../../../../app/hooks';
import { Task } from '../../../../../../features/task/interface.tasks';

interface TextFielProps {
  taskCustomFields?: ICustomField;
  taskId: string;
  fieldId: string;
  activeColumn?: boolean[];
  task?: Task;
}

function TextField({ taskCustomFields, taskId, fieldId, activeColumn, task }: TextFielProps) {
  const { KeyBoardSelectedTaskData, taskColumnIndex } = useAppSelector((state) => state.task);

  const [activeValue, setActiveValue] = useState('');
  const [currentValue, setCurrentValue] = useState<string>(activeValue);
  const [editMode, setEditMode] = useState(false);
  const [isCopied, setIsCopied] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { mutate: onUpdate } = useUpdateEntityCustomFieldValue(taskId);

  useEffect(() => {
    if (taskCustomFields) {
      setActiveValue(taskCustomFields?.values[0].value ? taskCustomFields?.values[0].value : '-');
      setCurrentValue(taskCustomFields?.values[0].value ? taskCustomFields?.values[0].value : '-');
    }
  }, [taskCustomFields]);

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
    await navigator.clipboard.writeText(currentValue);
    setIsCopied(1);
    setTimeout(() => {
      setIsCopied(0);
    }, 500);
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
    <div className="w-full h-full flex justify-center items-center" ref={containerRef} tabIndex={0}>
      {!editMode ? (
        <div
          className="w-full h-full border-2 border-transparent hover:border-alsoit-gray-50 group/parent p-1"
          onClick={() => {
            setEditMode(true);
          }}
        >
          <span className="h-full flex justify-center items-center  cursor-pointer">
            <h1 className="truncate text-alsoit-text-lg font-semibold">{currentValue}</h1>
            <figure
              className={cl(
                'opacity-0',
                isCopied === 1 ? '-mt-2' : '-mt-4',
                activeValue === '-' ? 'group-hover/parent:opacity-0' : 'group-hover/parent:opacity-100'
              )}
              onClick={(e) => {
                handleCopyTexts;
                e.stopPropagation();
              }}
            >
              <Copy />
            </figure>
          </span>
        </div>
      ) : (
        <input
          ref={inputRef}
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
