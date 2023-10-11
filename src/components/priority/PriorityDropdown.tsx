import React, { useState } from 'react';
import { cl } from '../../utils';
import { AiFillFlag } from 'react-icons/ai';
import { UseUpdateTaskPrioritiesServices } from '../../features/task/taskService';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useAbsolute } from '../../hooks/useAbsolute';
import { Fade, Menu } from '@mui/material';
import { setNewTaskPriority } from '../../features/task/taskSlice';
import { priorities } from '../../app/constants/priorities';

interface priorityType {
  id: string;
  title: string;
  handleClick: () => void;
  color: string;
  bg: string;
}

interface TaskCurrentPriorityProps {
  taskCurrentPriority: string | [{ id: string; initials: string; color: string }] | null | undefined;
}

export default function PriorityDropdown({ taskCurrentPriority }: TaskCurrentPriorityProps) {
  const dispatch = useAppDispatch();
  const { selectedTasksArray, updateCords, selectedListIds, selectedTaskParentId } = useAppSelector(
    (state) => state.task
  );

  const [priority, setPriority] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const { isSuccess } = UseUpdateTaskPrioritiesServices({
    task_id_array: selectedTasksArray,
    priorityDataUpdate: priority,
    listIds: selectedListIds.length ? selectedListIds : [selectedTaskParentId]
  });

  if (isSuccess) setPriority('');

  const priorityList: priorityType[] = [
    {
      id: priorities.LOW,
      title: 'Low',
      color: '#d3d3d3',
      bg: 'gray',
      handleClick: () => {
        setPriority(priorities.LOW);
        dispatch(setNewTaskPriority(priorities.LOW));
      }
    },
    {
      id: priorities.NORMAL,
      title: 'Normal',
      color: '#6fddff',
      bg: 'blue',
      handleClick: () => {
        setPriority(priorities.NORMAL);
        dispatch(setNewTaskPriority(priorities.NORMAL));
      }
    },
    {
      id: priorities.HIGH,
      title: 'High',
      color: '#f7cb04',
      bg: 'yellow',
      handleClick: () => {
        setPriority(priorities.HIGH);
        dispatch(setNewTaskPriority(priorities.HIGH));
      }
    },
    {
      id: priorities.URGENT,
      title: 'Urgent',
      color: '#f32100',
      bg: 'red',
      handleClick: () => {
        setPriority(priorities.URGENT);
        dispatch(setNewTaskPriority(priorities.URGENT));
      }
    }
  ];

  const setPriorityColor = (
    priority: string | null | undefined | [{ id: string; initials: string; color: string }]
  ) => {
    if (priority === priorities.LOW) {
      return <AiFillFlag className="h-5 w-7  text-gray-400" aria-hidden="true" />;
    } else if (priority === priorities.NORMAL) {
      return <AiFillFlag className="h-5 w-7" style={{ color: '#6fddff' }} aria-hidden="true" />;
    } else if (priority === priorities.HIGH) {
      return <AiFillFlag className="h-5 w-7  text-yellow-400 " aria-hidden="true" />;
    } else if (priority === priorities.URGENT) {
      return <AiFillFlag className="h-5 w-7  text-red-400 " aria-hidden="true" />;
    }
  };

  const { cords, relativeRef } = useAbsolute(updateCords, 200);

  return (
    <>
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex text-sm justify-center items-center focus:outline-none text-gray-400 hover:text-gray-700 w-full"
        >
          <div ref={relativeRef}>{setPriorityColor(taskCurrentPriority)}</div>
        </button>
      </div>

      <Menu
        id="priority-menu"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
        TransitionComponent={Fade}
      >
        <div style={{ ...cords }} className="fixed overflow-y-auto">
          <div className="flex-col border px-2 w-fit h-fit py-1 outline-none flex items-center justify-center text-center mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
            {priorityList.map((priority) => (
              <button
                key={priority.id}
                type="button"
                className={cl(
                  taskCurrentPriority === priority.title ? `bg-${priority.bg}-200` : '',
                  'flex items-center px-4 py-2 text-sm text-gray-600 text-left space-x-2 w-full'
                )}
                onClick={() => {
                  priority.handleClick();
                  setIsOpen(false);
                }}
              >
                <p>
                  <AiFillFlag className="h-5 w-7  " aria-hidden="true" style={{ color: `${priority.color}` }} />
                </p>
                <p>{priority.title}</p>
              </button>
            ))}
          </div>
        </div>
      </Menu>
    </>
  );
}
