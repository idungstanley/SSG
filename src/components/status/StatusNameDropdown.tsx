import { useState } from 'react';
import { cl } from '../../utils';
import { RiCheckboxBlankFill } from 'react-icons/ri';
import { useAppSelector } from '../../app/hooks';
import { UseUpdateTaskStatusService } from '../../features/task/taskService';
import ToolTip from '../Tooltip/Tooltip';
import { useAbsolute } from '../../hooks/useAbsolute';
import { Status } from '../../features/task/interface.tasks';
import { UseGetListDetails } from '../../features/list/listService';
import { Fade, Menu } from '@mui/material';
import { useParams } from 'react-router-dom';

interface StatusDropdownProps {
  TaskCurrentStatus: Status;
  statusName?: Status;
}

export default function StatusNameDropdown({ TaskCurrentStatus, statusName }: StatusDropdownProps) {
  const { listId } = useParams();

  const { currentTaskStatusId, selectedTaskParentId } = useAppSelector((state) => state.task);
  const { updateCords } = useAppSelector((state) => state.task);

  const [status, setStatus] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const { data: list } = UseGetListDetails(listId || selectedTaskParentId);

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
            <div ref={relativeRef}>{TaskCurrentStatus.name}</div>
          </button>
        </ToolTip>
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
          <div className="flex flex-col items-center justify-center w-48 px-2 py-1 mt-2 text-center bg-white border divide-y divide-gray-100 rounded-md shadow-lg outline-none h-fit ring-1 ring-black ring-opacity-5 focus:outline-none">
            {sortedStatuses?.map((statuses) => (
              <button
                key={statuses.id}
                type="button"
                className={cl(
                  statusName?.name.toLowerCase() === statuses.name.toLowerCase() ? `bg-${statuses.color}-200` : '',
                  'flex items-center px-4 py-2 text-sm text-gray-600 text-left space-x-2 w-full'
                )}
                onClick={() => {
                  setStatus(statuses.id);
                  setIsOpen(false);
                }}
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
            ))}
          </div>
        </div>
      </Menu>
    </>
  );
}
