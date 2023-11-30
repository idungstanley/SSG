import { useEffect, useRef, useState } from 'react';
import { cl } from '../../utils';
import { RiCheckboxBlankFill } from 'react-icons/ri';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { UseUpdateTaskStatusService } from '../../features/task/taskService';
import { useAbsolute } from '../../hooks/useAbsolute';
import { Status, Task } from '../../features/task/interface.tasks';
import StatusIconComp from '../../assets/icons/StatusIconComp';
import ToolTip from '../Tooltip/Tooltip';
import AlsoitMenuDropdown from '../DropDowns';
import { VerticalScroll } from '../ScrollableContainer/VerticalScroll';
import { ITask_statuses } from '../../features/list/list.interfaces';
import { setNewTaskStatus, setStatusId } from '../../features/task/taskSlice';

interface StatusDropdownProps {
  taskCurrentStatus: Status;
  statusDropdownType?: string;
  taskStatuses?: ITask_statuses[];
  task?: Task;
  activeColumn?: boolean[];
}

export default function StatusDropdown({
  taskCurrentStatus,
  statusDropdownType,
  taskStatuses,
  task,
  activeColumn
}: StatusDropdownProps) {
  const dispatch = useAppDispatch();
  const { currentTaskStatusId, updateCords, taskColumnIndex, KeyBoardSelectedTaskData } = useAppSelector(
    (state) => state.task
  );
  // const { activeItemId } = useAppSelector((state) => state.workspace);

  const [status, setStatus] = useState('');
  const [statusName, setStatusName] = useState(taskCurrentStatus?.name);
  const [statusColor, setStatusColor] = useState(taskCurrentStatus?.color);
  const [isOpen, setIsOpen] = useState<null | HTMLSpanElement | HTMLDivElement>(null);
  const [sortedStatuses, setSortedStatuses] = useState<ITask_statuses[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

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

  const handleStatusSelection = (status: ITask_statuses) => {
    setStatus(status.id);
    setStatusName(status.name);
    setIsOpen(null);
    setStatusColor(status.color);
    dispatch(setNewTaskStatus(status));
    dispatch(setStatusId(status.id));
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      setIsOpen(containerRef.current);
    }
  };

  useEffect(() => {
    if (containerRef.current && activeColumn) {
      if (task?.id === KeyBoardSelectedTaskData?.id && activeColumn[taskColumnIndex]) {
        containerRef.current.focus();
      }
      containerRef.current.addEventListener('keydown', handleKeyDown);
    }

    return () => containerRef.current?.removeEventListener('keydown', handleKeyDown);
  }, [task, KeyBoardSelectedTaskData, taskColumnIndex, activeColumn]);

  return (
    <div tabIndex={0} ref={containerRef} className="w-full h-full flex items-center justify-center focus:ring-0">
      <div>
        <ToolTip title={statusName}>
          <button
            type="button"
            onClick={(e) => handleOpenStatusDropdown(e)}
            className="flex items-center justify-center w-full text-sm border-none focus:border-none active:ring-0 active:border-none focus:outline-none focus:ring-0 hover:text-gray-700"
          >
            <div ref={relativeRef} className="mb-1">
              {statusDropdownType === 'name' ? statusName : <StatusIconComp color={statusColor} />}
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
                          'flex items-center px-4 py-2 text-sm text-gray-600 rounded hover:bg-alsoit-gray-50 text-left space-x-2 w-full'
                        )}
                        onClick={() => handleStatusSelection(statuses)}
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
                    ))
                  : null}
              </div>
            </div>
          </VerticalScroll>
        </div>
      </AlsoitMenuDropdown>
    </div>
  );
}
