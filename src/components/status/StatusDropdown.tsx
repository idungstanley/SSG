import { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { cl } from '../../utils';
import { RiCheckboxBlankFill } from 'react-icons/ri';
import { useAppSelector } from '../../app/hooks';
import { UseUpdateTaskStatusService } from '../../features/task/taskService';
import { useAbsolute } from '../../hooks/useAbsolute';
import { Status } from '../../features/task/interface.tasks';
import StatusIconComp from '../../assets/icons/StatusIconComp';
import { UseGetListDetails } from '../../features/list/listService';
import ToolTip from '../Tooltip/Tooltip';

interface StatusDropdownProps {
  TaskCurrentStatus: Status;
}

export default function StatusDropdown({ TaskCurrentStatus }: StatusDropdownProps) {
  const { currentTaskStatusId, selectedListId } = useAppSelector((state) => state.task);
  const { updateCords } = useAppSelector((state) => state.task);

  const [status, setStatus] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const { data: list } = UseGetListDetails(selectedListId);

  const { isSuccess } = UseUpdateTaskStatusService({
    task_id: currentTaskStatusId as string,
    statusDataUpdate: status
  });

  if (isSuccess) setStatus('');

  const sortedStatuses = list?.data.list.task_statuses.slice().sort((a, b) => {
    const positionA = typeof a.position === 'number' ? a.position : 0;
    const positionB = typeof b.position === 'number' ? b.position : 0;
    return positionA - positionB;
  });

  const { cords, relativeRef } = useAbsolute(updateCords, 200);

  return (
    <>
      <div>
        <ToolTip title={TaskCurrentStatus.name}>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex items-center justify-center w-full text-sm focus:outline-none hover:text-gray-700"
          >
            <div ref={relativeRef}>
              <StatusIconComp color={TaskCurrentStatus.color} />
            </div>
          </button>
        </ToolTip>
      </div>

      <Transition appear show={isOpen} as="div">
        <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
          <div style={{ ...cords }} className="fixed overflow-y-auto">
            <div className="flex flex-col items-center justify-center w-48 px-2 py-1 mt-2 text-center bg-white border divide-y divide-gray-100 rounded-md shadow-lg outline-none h-fit ring-1 ring-black ring-opacity-5 focus:outline-none">
              {sortedStatuses?.map((statuses) => (
                <button
                  key={statuses.id}
                  type="button"
                  className={cl(
                    TaskCurrentStatus?.name.toLowerCase() === statuses.name.toLowerCase()
                      ? `bg-${statuses.color}-200`
                      : '',
                    'flex items-center px-4 py-2 text-sm text-gray-600 text-left space-x-2 w-full'
                  )}
                  onClick={() => {
                    setStatus(statuses.id);
                    setIsOpen(false);
                  }}
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
