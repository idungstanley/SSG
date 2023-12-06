import React, { useEffect, useRef, useState } from 'react';
import { UseUpdateTaskPrioritiesServices } from '../../features/task/taskService';
import { useAppSelector } from '../../app/hooks';
import { priorities } from '../../app/constants/priorities';
import { priorityArr } from '../../utils/PriorityArr';
import Priority from '../../assets/icons/Priority';
import { Task } from '../../features/task/interface.tasks';
import { PriorityDropDownModal } from './PriorityDropDownModal';
import AlsoitMenuDropdown from '../DropDowns';

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
  activeColumn?: boolean[];
  task?: Task;
}

export default function PriorityDropdown({ taskCurrentPriority, icon, activeColumn, task }: TaskCurrentPriorityProps) {
  const { priority, priorityList, setPriority } = priorityArr();

  const { selectedTasksArray, selectedListIds, selectedTaskParentId, taskColumnIndex, KeyBoardSelectedTaskData } =
    useAppSelector((state) => state.task);

  const [isOpen, setIsOpen] = useState<HTMLElement | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);

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
      return <Priority fill="#A5A5A5" />;
    } else if (priority === priorities.NORMAL) {
      return <Priority fill="#99BBEE" />;
    } else if (priority === priorities.HIGH) {
      return <Priority fill="#F7A100" />;
    } else if (priority === priorities.URGENT) {
      return <Priority fill="#FF0E0F" />;
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      setIsOpen(containerRef.current);
    }
  };

  useEffect(() => {
    if (containerRef.current && activeColumn && taskColumnIndex) {
      if (task?.id === KeyBoardSelectedTaskData?.id && activeColumn[taskColumnIndex]) {
        containerRef.current.focus();
      }

      containerRef.current.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      containerRef.current?.removeEventListener('keydown', handleKeyDown);
    };
  }, [task, KeyBoardSelectedTaskData, taskColumnIndex, activeColumn]);

  return (
    <div tabIndex={0} ref={containerRef} className="w-full h-full flex items-center justify-center focus:ring-0">
      <div className="w-full h-full flex items-center justify-center focus:ring-0">
        <button
          type="button"
          onClick={(e) => handleOpenDropdown(e)}
          className="flex items-center justify-center w-full text-sm text-gray-400 focus:outline-none hover:text-gray-700"
        >
          <div>{icon ? icon : setPriorityColor(taskCurrentPriority)}</div>
        </button>
      </div>
      {isOpen && (
        <AlsoitMenuDropdown handleClose={handleCloseDropdown} anchorEl={isOpen}>
          <PriorityDropDownModal
            priorityList={priorityList}
            setIsOpen={setIsOpen}
            taskCurrentPriority={taskCurrentPriority}
            task={task as Task}
          />
        </AlsoitMenuDropdown>
      )}
    </div>
  );
}
