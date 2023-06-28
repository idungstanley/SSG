import { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { cl } from '../../utils';
import { RiCheckboxBlankFill } from 'react-icons/ri';
import { useAppSelector } from '../../app/hooks';
import { UseUpdateTaskStatusService2 } from '../../features/task/taskService';
import ToolTip from '../Tooltip';
import { useAbsolute } from '../../hooks/useAbsolute';
import { Status } from '../../features/task/interface.tasks';
import { UseGetListDetails } from '../../features/list/listService';
interface statusType {
  id: number;
  title: string;
  handleClick: () => void;
  color: string;
  bg: string;
}

interface StatusDropdownProps {
  TaskCurrentStatus: Status;
  statusName?: Status;
  parentId?: string;
}

export default function StatusNameDropdown({ TaskCurrentStatus, statusName, parentId }: StatusDropdownProps) {
  const { currentTaskStatusId } = useAppSelector((state) => state.task);
  const { data: list } = UseGetListDetails({ activeItemId: parentId, activeItemType: 'list' });

  const task_status_id = (status: string) =>
    list?.data.list.task_statuses.map((statuses) => {
      if (statuses.name == status) {
        handleUpdateTaskStatus(statuses.id);
      }
    });

  const statusList: statusType[] = [
    {
      id: 1,
      title: 'Todo',
      handleClick: () => {
        task_status_id('To do');
      },
      color: '#d3d3d3',
      bg: 'gray'
    },
    {
      id: 2,
      title: 'In Progress',
      handleClick: () => {
        task_status_id('In progress');
      },
      color: '#a875ff',
      bg: 'purple'
    },
    {
      id: 3,
      title: 'Archived',
      handleClick: () => {
        task_status_id('Archived');
      },
      color: '#f7cb04',
      bg: 'yellow'
    },
    {
      id: 4,
      title: 'Completed',
      handleClick: () => {
        task_status_id('Completed');
      },
      color: '#6bc951',
      bg: 'green'
    }
  ];

  const { mutate } = UseUpdateTaskStatusService2();

  const handleUpdateTaskStatus = (status: string) => {
    const updateStatusMutation = {
      task_id: currentTaskStatusId,
      statusDataUpdate: status
    };
    mutate(updateStatusMutation);
  };

  const setStatusColor = (value: string) => {
    if (value === 'new' || value === 'To do') {
      return (
        <p className="text-white capitalize" aria-hidden="true">
          {value}
        </p>
      );
    } else if (value === 'In progress') {
      return (
        <p className=" text-white whitespace-nowrap capitalize" aria-hidden="true">
          {value}
        </p>
      );
    } else if (value === 'Completed') {
      return (
        <p className="text-white capitalize" aria-hidden="true">
          {value}
        </p>
      );
    } else if (value === 'Archived') {
      return (
        <p className="text-white capitalize" aria-hidden="true">
          {value}
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
            <div ref={relativeRef}>{setStatusColor(TaskCurrentStatus.name)}</div>
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
                    statusName?.name.toLowerCase() === i.title.toLowerCase() ? `bg-${i.bg}-200` : '',
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
