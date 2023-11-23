import React, { useState } from 'react';
import { cl } from '../../utils';
import { AiFillFlag } from 'react-icons/ai';
import { UseUpdateTaskPrioritiesServices } from '../../features/task/taskService';
import { useAppSelector } from '../../app/hooks';

import { priorities } from '../../app/constants/priorities';
import AlsoitMenuDropdown from '../DropDowns';
import { priorityArr } from '../../utils/PriorityArr';

export interface priorityType {
  id: string;
  title: string;
  handleClick: () => void;
  color: string;
  bg: string;
}

interface TaskCurrentPriorityProps {
  taskCurrentPriority: string | [{ id: string; initials: string; color: string }] | null | undefined;
  icon?: React.ReactNode;
}

export default function PriorityDropdown({ taskCurrentPriority, icon }: TaskCurrentPriorityProps) {
  const { priority, priorityList, setPriority } = priorityArr();
  const { selectedTasksArray, selectedListIds, selectedTaskParentId } = useAppSelector((state) => state.task);
  const [isOpen, setIsOpen] = useState<HTMLButtonElement | null>(null);

  const { isSuccess } = UseUpdateTaskPrioritiesServices({
    task_id_array: selectedTasksArray,
    priorityDataUpdate: priority,
    listIds: selectedListIds.length ? selectedListIds : [selectedTaskParentId]
  });

  if (isSuccess) setPriority('');

  const handleCloseDropdown = () => {
    setIsOpen(null);
  };
  const handleOpenDropdown = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsOpen(event.currentTarget);
  };

  const setPriorityColor = (
    priority: string | null | undefined | [{ id: string; initials: string; color: string }]
  ) => {
    if (priority === priorities.LOW) {
      return <AiFillFlag className="h-5 text-gray-400 w-7" aria-hidden="true" />;
    } else if (priority === priorities.NORMAL) {
      return <AiFillFlag className="h-5 w-7" style={{ color: '#6fddff' }} aria-hidden="true" />;
    } else if (priority === priorities.HIGH) {
      return <AiFillFlag className="h-5 text-yellow-400 w-7 " aria-hidden="true" />;
    } else if (priority === priorities.URGENT) {
      return <AiFillFlag className="h-5 text-red-400 w-7" aria-hidden="true" />;
    }
  };

  return (
    <>
      <div>
        <button
          type="button"
          onClick={(e) => handleOpenDropdown(e)}
          className="flex items-center justify-center w-full text-sm text-gray-400 focus:outline-none hover:text-gray-700"
        >
          <div>{icon ? icon : setPriorityColor(taskCurrentPriority)}</div>
        </button>
      </div>
      <AlsoitMenuDropdown handleClose={handleCloseDropdown} anchorEl={isOpen}>
        <div className="overflow-y-auto">
          <div className="flex flex-col items-center justify-center w-48 px-1 py-1 text-center divide-y divide-gray-100 rounded-md shadow-lg outline-none w-fit h-fit ring-1 ring-black ring-opacity-5 focus:outline-none">
            {priorityList.map((priority) => (
              <button
                key={priority.id}
                type="button"
                className={cl(
                  taskCurrentPriority === priority.title ? `bg-${priority.bg}-200` : '',
                  'flex items-center px-4 py-1 hover:bg-alsoit-gray-50 text-sm text-gray-600 text-left space-x-2 w-full rounded-md'
                )}
                onClick={() => {
                  priority.handleClick();
                  setIsOpen(null);
                }}
              >
                <p>
                  <AiFillFlag className="h-5 w-7 " aria-hidden="true" style={{ color: `${priority.color}` }} />
                </p>
                <p>{priority.title}</p>
              </button>
            ))}
          </div>
        </div>
      </AlsoitMenuDropdown>
    </>
  );
}
