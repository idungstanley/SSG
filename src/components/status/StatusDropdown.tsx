import { useEffect, useState } from 'react';
import { cl } from '../../utils';
import { RiCheckboxBlankFill } from 'react-icons/ri';
import { useAppSelector } from '../../app/hooks';
import { UseUpdateTaskStatusService } from '../../features/task/taskService';
import { useAbsolute } from '../../hooks/useAbsolute';
import { Status } from '../../features/task/interface.tasks';
import StatusIconComp from '../../assets/icons/StatusIconComp';
import ToolTip from '../Tooltip/Tooltip';
import AlsoitMenuDropdown from '../DropDowns';
import { VerticalScroll } from '../ScrollableContainer/VerticalScroll';
import { ITask_statuses } from '../../features/list/list.interfaces';

interface StatusDropdownProps {
  taskCurrentStatus: Status;
  statusDropdownType?: string;
  taskStatuses?: ITask_statuses[];
}

export default function StatusDropdown({ taskCurrentStatus, statusDropdownType, taskStatuses }: StatusDropdownProps) {
  const { currentTaskStatusId } = useAppSelector((state) => state.task);
  const { updateCords } = useAppSelector((state) => state.task);

  const [status, setStatus] = useState('');
  const [isOpen, setIsOpen] = useState<null | HTMLSpanElement | HTMLDivElement>(null);
  const [sortedStatuses, setSortedStatuses] = useState<ITask_statuses[]>([]);

  const { isSuccess } = UseUpdateTaskStatusService({
    task_id: currentTaskStatusId as string,
    statusDataUpdate: status
  });

  if (isSuccess) setStatus('');

  useEffect(() => {
    if (taskStatuses?.length) {
      const updatedStatuses = taskStatuses.slice().sort((a, b) => {
        const positionA = typeof a.position === 'number' ? a.position : 0;
        const positionB = typeof b.position === 'number' ? b.position : 0;
        return positionA - positionB;
      });
      setSortedStatuses(updatedStatuses);
    }
  }, [taskStatuses]);

  const handleCloseStatusDropdown = () => {
    setIsOpen(null);
  };
  const handleOpenStatusDropdown = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    event.stopPropagation();
    setIsOpen(event.currentTarget);
  };

  const { cords, relativeRef } = useAbsolute(updateCords, 200);

  return (
    <>
      <div>
        <ToolTip title={taskCurrentStatus.name}>
          <button
            type="button"
            onClick={(e) => handleOpenStatusDropdown(e)}
            className="flex items-center justify-center w-full text-sm focus:outline-none hover:text-gray-700"
          >
            <div ref={relativeRef} className="mb-1">
              {statusDropdownType === 'name' ? (
                taskCurrentStatus.name
              ) : (
                <StatusIconComp color={taskCurrentStatus.color} />
              )}
            </div>
          </button>
        </ToolTip>
      </div>

      <AlsoitMenuDropdown handleClose={handleCloseStatusDropdown} anchorEl={isOpen as HTMLDivElement | null}>
        <div className="relative z-10">
          <VerticalScroll>
            <div style={{ ...cords }} className="max-h-52">
              <div className="flex flex-col items-center justify-center w-48 p-1 text-center bg-white divide-y divide-gray-100 shadow-lg outline-none h-fit ring-1 ring-black ring-opacity-5 focus:outline-none">
                {sortedStatuses.length
                  ? sortedStatuses.map((statuses) => (
                      <button
                        key={statuses.id}
                        type="button"
                        className={cl(
                          taskCurrentStatus?.name.toLowerCase() === statuses.name.toLowerCase()
                            ? `bg-${statuses.color}-200`
                            : '',
                          'flex items-center px-4 py-2 text-sm text-gray-600 rounded hover:bg-alsoit-gray-75 text-left space-x-2 w-full'
                        )}
                        onClick={() => {
                          setStatus(statuses.id);
                          setIsOpen(null);
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
                    ))
                  : null}
              </div>
            </div>
          </VerticalScroll>
        </div>
      </AlsoitMenuDropdown>
    </>
  );
}
