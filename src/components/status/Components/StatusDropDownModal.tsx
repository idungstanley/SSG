import { RiCheckboxBlankFill } from 'react-icons/ri';
import { VerticalScroll } from '../../ScrollableContainer/VerticalScroll';
import { Cords } from '../../../hooks/useAbsolute';
import { ITask_statuses } from '../../../features/list/list.interfaces';
import { cl } from '../../../utils';
import { Status, Task } from '../../../features/task/interface.tasks';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useEffect, useState } from 'react';
import {
  setCurrentTaskStatusId,
  setKeyBoardSelectedIndex,
  setSelectedTaskParentId,
  setSelectedTaskType,
  setTaskColumnIndex,
  setTaskRowFocus
} from '../../../features/task/taskSlice';
import { EntityType } from '../../../utils/EntityTypes/EntityType';

type Props = {
  cords: Cords;
  sortedStatuses: ITask_statuses[];
  taskCurrentStatus: Status;
  handleStatusSelection: (status: ITask_statuses) => void;
  task: Task;
};

export function StatusDropDownModal({ cords, sortedStatuses, handleStatusSelection, taskCurrentStatus, task }: Props) {
  const dispatch = useAppDispatch();

  const { taskRowFocus, KeyBoardSelectedTaskData, currentTaskStatusId } = useAppSelector((state) => state.task);

  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp' && focusedIndex !== null && focusedIndex > 0) {
        setFocusedIndex((prevIndex) => (prevIndex !== null ? prevIndex - 1 : null));
      } else if (event.key === 'ArrowDown') {
        setFocusedIndex((prevIndex) => (prevIndex === null ? 0 : Math.min(prevIndex + 1, sortedStatuses.length - 1)));
      }

      if (event.key === 'Enter' && focusedIndex !== null && focusedIndex < sortedStatuses.length) {
        handleStatusSelection(sortedStatuses[focusedIndex]);
        dispatch(setCurrentTaskStatusId(task.id));
        dispatch(setSelectedTaskParentId(task.parent_id || task.list_id));
        dispatch(setSelectedTaskType(task?.parent_id ? EntityType.subtask : EntityType.task));
        dispatch(setTaskRowFocus(true));
        dispatch(setTaskColumnIndex(null));
        dispatch(setKeyBoardSelectedIndex(0));
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [focusedIndex, currentTaskStatusId]);

  useEffect(() => {
    if (task.id === KeyBoardSelectedTaskData?.id) dispatch(setTaskRowFocus(!taskRowFocus));
  }, [task, KeyBoardSelectedTaskData]);

  return (
    <div className="relative z-10">
      <VerticalScroll>
        <div style={{ ...cords }} className="max-h-64">
          <div className="flex flex-col items-center justify-center w-48 p-1 text-center bg-white divide-y divide-gray-100 shadow-lg outline-none h-fit ring-1 ring-black ring-opacity-5 focus:outline-none">
            {sortedStatuses.length
              ? sortedStatuses.map((statuses, index) => (
                  <button
                    key={statuses.id}
                    type="button"
                    className={cl(
                      taskCurrentStatus.name.toLowerCase() === statuses.name.toLowerCase()
                        ? `bg-${statuses.color}-200`
                        : focusedIndex === index
                        ? 'bg-alsoit-gray-50'
                        : '',
                      'flex items-center px-4 py-2 text-sm text-gray-600 rounded hover:bg-alsoit-gray-50 text-left space-x-2 w-full'
                    )}
                    onClick={() => handleStatusSelection(statuses)}
                  >
                    <p>
                      <RiCheckboxBlankFill
                        className="pl-px text-xs"
                        aria-hidden="true"
                        style={{ color: `${statuses.color}` }}
                      />
                    </p>
                    <p>{statuses.name}</p>
                  </button>
                ))
              : null}
          </div>
        </div>
      </VerticalScroll>
    </div>
  );
}
