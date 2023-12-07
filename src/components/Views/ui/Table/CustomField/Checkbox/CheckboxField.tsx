import { ICustomField } from '../../../../../../features/task/taskSlice';
import { useUpdateEntityCustomFieldValue } from '../../../../../../features/list/listService';
import { useEffect, useRef, useState } from 'react';
import { Task } from '../../../../../../features/task/interface.tasks';
import { useAppSelector } from '../../../../../../app/hooks';

interface CheckboxProps {
  taskCustomFields?: ICustomField;
  taskId: string;
  fieldId: string;
  activeColumn?: boolean[];
  task?: Task;
}

function CheckboxField({ taskCustomFields, taskId, fieldId, activeColumn, task }: CheckboxProps) {
  const { KeyBoardSelectedTaskData, taskColumnIndex } = useAppSelector((state) => state.task);

  const [activeValue, setActiveValue] = useState<string>(taskCustomFields ? taskCustomFields.values[0].value : '0');
  // const activeValue = taskCustomFields ? taskCustomFields.values[0].value : '0';

  const containerRef = useRef<HTMLDivElement | null>(null);

  const { mutate: onUpdate } = useUpdateEntityCustomFieldValue(taskId);

  const handleChange = () => {
    onUpdate({
      taskId,
      value: [{ value: activeValue === '1' ? '0' : '1' }],
      fieldId
    });
  };

  const handleKeyBoardDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      setActiveValue(activeValue === '1' ? '0' : '1');
    }
  };

  useEffect(() => {
    if (containerRef.current && activeColumn && taskColumnIndex) {
      if (task?.id === KeyBoardSelectedTaskData?.id && activeColumn[taskColumnIndex]) {
        containerRef.current.focus();
      }
      containerRef.current.addEventListener('keydown', handleKeyBoardDown);
    }

    return () => containerRef.current?.removeEventListener('keydown', handleKeyBoardDown);
  }, [task, KeyBoardSelectedTaskData, taskColumnIndex, activeColumn]);

  useEffect(() => {
    handleChange();

    return () => handleChange();
  }, [activeValue]);

  return (
    <div ref={containerRef} tabIndex={0} className="w-full h-full flex items-center">
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
