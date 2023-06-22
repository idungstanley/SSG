import { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { cl } from '../../utils';
import { RiCheckboxBlankFill } from 'react-icons/ri';
import { useAppSelector } from '../../app/hooks';
import { UseUpdateTaskStatusService2 } from '../../features/task/taskService';
import ToolTip from '../Tooltip';
import { useAbsolute } from '../../hooks/useAbsolute';
import { Status } from '../../features/task/interface.tasks';
interface statusType {
  id: number;
  title: string;
  handleClick: () => void;
  color: string;
  bg: string;
}

interface StatusDropdownProps {
  TaskCurrentStatus: Status;
  statusName?: string | null;
}

export default function StatusNameDropdown({ TaskCurrentStatus, statusName }: StatusDropdownProps) {
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

  const { mutate } = UseUpdateTaskStatusService2();

  const handleUpdateTaskStatus = (status: string) => {
    const updateStatusMutation = {
      task_id: currentTaskStatusId,
      statusDataUpdate: status
    };
    mutate(updateStatusMutation);
  };

  const setStatusColor = (status: Status) => {
    if (status.name === 'new' || status.name === 'to do') {
      return (
        <p className="text-white capitalize" aria-hidden="true">
          {statusName}
        </p>
      );
    } else if (status.name === 'in progress') {
      return (
        <p className=" text-white whitespace-nowrap capitalize" aria-hidden="true">
          {statusName}
        </p>
      );
    } else if (status.name === 'completed') {
      return (
        <p className="text-white capitalize" aria-hidden="true">
          {statusName}
        </p>
      );
    } else if (status.name === 'archived') {
      return (
        <p className="text-white capitalize" aria-hidden="true">
          {statusName}
        </p>
      );
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
        <ToolTip tooltip={TaskCurrentStatus.name}>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex text-sm justify-center items-center focus:outline-none hover:text-gray-700 w-full"
          >
            <div ref={relativeRef}>{setStatusColor(TaskCurrentStatus)}</div>
          </button>
        </ToolTip>
      </div>

      <Transition appear show={isOpen} as="div">
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <div style={{ ...cords }} className="fixed overflow-y-auto">
            <div className="flex-col border px-2 h-fit py-1 outline-none flex items-center justify-center text-center mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
              {statusList.map((i) => (
                <button
                  key={i.id}
                  type="button"
                  className={cl(
                    statusName?.toLowerCase() === i.title.toLowerCase() ? `bg-${i.bg}-200` : '',
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
              ))}
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
