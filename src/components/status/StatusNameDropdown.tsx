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

interface StatusDropdownProps {
  TaskCurrentStatus: Status;
  statusName?: Status;
}

export default function StatusNameDropdown({ TaskCurrentStatus, statusName }: StatusDropdownProps) {
  const { currentTaskStatusId, currTaskListId } = useAppSelector((state) => state.task);
  const { data: list } = UseGetListDetails({ activeItemId: currTaskListId, activeItemType: 'list' });

  const { mutate } = UseUpdateTaskStatusService2();

  const handleUpdateTaskStatus = (statusId: string) => {
    const updateStatusMutation = {
      task_id: currentTaskStatusId,
      statusDataUpdate: statusId
    };
    mutate(updateStatusMutation);
  };

  const sortedStatuses = list?.data.list.task_statuses.sort((a, b) => {
    const positionA = typeof a.position === 'number' ? a.position : 0;
    const positionB = typeof b.position === 'number' ? b.position : 0;
    return positionA - positionB;
  });
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
            <div ref={relativeRef}>{TaskCurrentStatus.name}</div>
          </button>
        </ToolTip>
      </div>

      <Transition appear show={isOpen} as="div">
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <div style={{ ...cords }} className="fixed overflow-y-auto">
            <div className="flex-col border px-2 h-fit py-1 outline-none flex items-center justify-center text-center mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
              {sortedStatuses?.map((statuses) => (
                <button
                  key={statuses.id}
                  type="button"
                  className={cl(
                    statusName?.name.toLowerCase() === statuses.name.toLowerCase() ? `bg-${statuses.color}-200` : '',
                    'flex items-center px-4 py-2 text-sm text-gray-600 text-left space-x-2 w-full'
                  )}
                  onClick={() => handleUpdateTaskStatus(statuses.id)}
                >
                  <p>
                    <RiCheckboxBlankFill
                      className="pl-px text-xs "
                      aria-hidden="true"
                      style={{ color: `${statuses.color}` }}
                    />
                  </p>
                  <p>{statuses.name}</p>
                </button>
              ))}
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
