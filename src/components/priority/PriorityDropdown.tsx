import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { cl } from '../../utils';
import { AiFillFlag } from 'react-icons/ai';
import { UseUpdateTaskStatusServices } from '../../features/task/taskService';
import { useAppSelector } from '../../app/hooks';
import { useAbsolute } from '../../hooks/useAbsolute';

interface priorityType {
  id: number;
  title: string;
  handleClick: () => void;
  color: string;
  bg: string;
}

interface TaskCurrentPriorityProps {
  TaskCurrentPriority: string | [{ id: string; initials: string; color: string }] | null | undefined;
}
export default function PriorityDropdown({ TaskCurrentPriority }: TaskCurrentPriorityProps) {
  const [priorityValue, setPriority] = useState('');
  const { currentTaskPriorityId, selectedTasksArray } = useAppSelector((state) => state.task);
  const priorityList: priorityType[] = [
    {
      id: 1,
      title: 'Low',
      handleClick: () => {
        setPriority('low');
      },
      color: '#d3d3d3',
      bg: 'gray'
    },
    {
      id: 2,
      title: 'Normal',
      handleClick: () => {
        setPriority('normal');
      },
      color: '#6fddff',
      bg: 'blue'
    },
    {
      id: 3,
      title: 'High',
      handleClick: () => {
        setPriority('high');
      },
      color: '#f7cb04',
      bg: 'yellow'
    },
    {
      id: 4,
      title: 'Urgent',
      handleClick: () => {
        setPriority('urgent');
      },
      color: '#f32100',
      bg: 'red'
    }
  ];
  const { status } = UseUpdateTaskStatusServices({
    task_id_array: selectedTasksArray,
    priorityDataUpdate: priorityValue
  });

  if (status == 'success') {
    setPriority('');
  }
  const setPriorityColor = (
    priority: string | null | undefined | [{ id: string; initials: string; color: string }]
  ) => {
    if (priority == null || priority == 'low') {
      return <AiFillFlag className="h-5 w-7  text-gray-400" aria-hidden="true" />;
    } else if (priority == 'normal') {
      return <AiFillFlag className="h-5 w-7" style={{ color: '#6fddff' }} aria-hidden="true" />;
    } else if (priority == 'high') {
      return <AiFillFlag className="h-5 w-7  text-yellow-400 " aria-hidden="true" />;
    } else if (priority == 'urgent') {
      return <AiFillFlag className="h-5 w-7  text-red-400 " aria-hidden="true" />;
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  const { updateCords } = useAppSelector((state) => state.task);
  const { cords, relativeRef } = useAbsolute(updateCords, 200);

  return (
    <>
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex text-sm justify-center items-center focus:outline-none text-gray-400 hover:text-gray-700 w-full"
        >
          <div ref={relativeRef}>{setPriorityColor(TaskCurrentPriority)}</div>
        </button>
      </div>

      <Transition appear show={isOpen} as="div">
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <div style={{ ...cords }} className="fixed overflow-y-auto">
            <div className="flex-col border px-2 w-fit h-fit py-1 outline-none flex items-center justify-center text-center mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
              {priorityList.map((i) => (
                <button
                  key={i.id}
                  type="button"
                  className={cl(
                    TaskCurrentPriority === i.title ? `bg-${i.bg}-200` : '',
                    'flex items-center px-4 py-2 text-sm text-gray-600 text-left space-x-2 w-full'
                  )}
                  onClick={i.handleClick}
                >
                  <p>
                    <AiFillFlag className="h-5 w-7  " aria-hidden="true" style={{ color: `${i.color}` }} />
                  </p>
                  <p>{i.title}</p>
                </button>
              ))}
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
