import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { cl } from '../../utils';
import { RiCheckboxBlankFill } from 'react-icons/ri';
import { useAppSelector } from '../../app/hooks';
import { UseUpdateTaskStatusService2 } from '../../features/task/taskService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
interface statusType {
  id: number;
  title: string;
  handleClick: () => void;
  color: string;
  bg: string;
}

interface StatusDropdownProps {
  TaskCurrentStatus: string | null | undefined | [{ id: string; initials: string; colour: string }];
  statusName?: string | null;
}

export default function StatusDropdown({ TaskCurrentStatus }: StatusDropdownProps) {
  const statusList: statusType[] = [
    {
      id: 1,
      title: 'Todo',
      handleClick: () => {
        handleUpdateTaskStatus('todo');
      },
      color: '#d3d3d3',
      bg: 'gray'
    },
    {
      id: 2,
      title: 'In Progress',
      handleClick: () => {
        handleUpdateTaskStatus('in progress');
      },
      color: '#a875ff',
      bg: 'purple'
    },
    {
      id: 3,
      title: 'Archived',
      handleClick: () => {
        handleUpdateTaskStatus('archived');
      },
      color: '#f7cb04',
      bg: 'yellow'
    },
    {
      id: 4,
      title: 'Completed',
      handleClick: () => {
        handleUpdateTaskStatus('completed');
      },
      color: '#6bc951',
      bg: 'green'
    }
  ];

  const { currentTaskStatusId } = useAppSelector((state) => state.task);

  const queryClient = useQueryClient();

  const updateStatusMutation = useMutation(UseUpdateTaskStatusService2, {
    onSuccess: () => {
      queryClient.invalidateQueries(['task']);
    }
  });

  const handleUpdateTaskStatus = async (status: string) => {
    await updateStatusMutation.mutateAsync({
      task_id: currentTaskStatusId,
      statusDataUpdate: status
    });
  };

  const setStatusColor = (status: string | null | undefined | [{ id: string; initials: string; colour: string }]) => {
    if (status == 'new' || status == 'todo') {
      return <RiCheckboxBlankFill className="pl-px text-gray-400 text-xs" aria-hidden="true" />;
    } else if (status == 'in progress') {
      return <RiCheckboxBlankFill className="pl-px text-purple-400 text-xs" aria-hidden="true" />;
    } else if (status == 'completed') {
      return <RiCheckboxBlankFill className="pl-px text-green-400 text-xs" aria-hidden="true" />;
    } else if (status == 'archived') {
      return <RiCheckboxBlankFill className="pl-px text-yellow-400 text-xs" aria-hidden="true" />;
    }
  };
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex text-sm text-gray-400">{setStatusColor(TaskCurrentStatus)}</Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        // show={sidebarSettings}
      >
        <Menu.Items className="origin-top-right absolute z-40 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none ">
          {statusList.map((i) => (
            <Menu.Item key={i.id}>
              {({ active }) => (
                <button
                  type="button"
                  className={cl(
                    active ? `bg-${i.bg}-200` : '',
                    'flex items-center px-4 py-2 text-sm text-gray-600 text-left space-x-2 w-full'
                  )}
                  onClick={i.handleClick}
                >
                  <p>
                    <RiCheckboxBlankFill
                      className="pl-px text-xs "
                      aria-hidden="true"
                      style={{ color: `${i.color}` }}
                    />
                  </p>
                  <p>{i.title}</p>
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
