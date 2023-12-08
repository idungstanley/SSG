import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Priority from '../../assets/icons/Priority';
import { cl } from '../../utils';
import { priorityType } from './PriorityDropdown';
import {
  setCurrentTaskPriorityId,
  setSelectedTaskParentId,
  setSelectedTaskType,
  setTaskColumnIndex,
  setTaskRowFocus
} from '../../features/task/taskSlice';
import { Task } from '../../features/task/interface.tasks';
import { EntityType } from '../../utils/EntityTypes/EntityType';

type Props = {
  priorityList: priorityType[];
  taskCurrentPriority:
    | string
    | [
        {
          id: string;
          initials: string;
          color: string;
        }
      ]
    | null
    | undefined;
  setIsOpen: (value: React.SetStateAction<HTMLElement | null>) => void;
  task: Task;
};
export function PriorityDropDownModal({ priorityList, setIsOpen, taskCurrentPriority, task }: Props) {
  const dispatch = useAppDispatch();

  const { KeyBoardSelectedTaskData } = useAppSelector((state) => state.task);

  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp' && focusedIndex !== null && focusedIndex > 0) {
        setFocusedIndex((prevIndex) => (prevIndex !== null ? prevIndex - 1 : null));
      } else if (event.key === 'ArrowDown') {
        setFocusedIndex((prevIndex) => (prevIndex === null ? 0 : Math.min(prevIndex + 1, priorityList.length - 1)));
      }

      if (event.key === 'Enter' && focusedIndex !== null && focusedIndex < priorityList.length) {
        priorityList[focusedIndex].handleClick();
        dispatch(setCurrentTaskPriorityId(task.id));
        dispatch(setCurrentTaskPriorityId(task.id));
        dispatch(setSelectedTaskParentId((task.parent_id || task.list_id) as string));
        dispatch(setSelectedTaskType(task?.parent_id ? EntityType.subtask : EntityType.task));
        dispatch(setTaskRowFocus(true));
        dispatch(setTaskColumnIndex(null));
        setIsOpen(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [focusedIndex]);

  useEffect(() => {
    if (task.id === KeyBoardSelectedTaskData?.id) dispatch(setTaskRowFocus(false));
  }, [task, KeyBoardSelectedTaskData]);
  return (
    <div className="overflow-y-auto" key="priority">
      <div className="flex flex-col items-center justify-center w-48 px-1 py-1 text-center divide-y divide-gray-100 rounded-md shadow-lg outline-none w-fit h-fit ring-1 ring-black ring-opacity-5 focus:outline-none">
        {priorityList.map((priority, index) => (
          <button
            key={priority.id}
            type="button"
            className={cl(
              taskCurrentPriority === priority.title
                ? `bg-${priority.bg}-200`
                : focusedIndex === index
                ? 'bg-alsoit-gray-50'
                : '',
              'flex px-4 py-1 hover:bg-alsoit-gray-50 text-sm text-gray-600 text-left space-x-2 w-full rounded-md'
            )}
            onClick={() => {
              priority.handleClick();
              setIsOpen(null);
            }}
          >
            <p>
              <Priority fill={`${priority.color}`} />
            </p>
            <p>{priority.title}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
