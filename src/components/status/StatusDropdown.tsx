import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { UseUpdateTaskStatusService } from '../../features/task/taskService';
import { useAbsolute } from '../../hooks/useAbsolute';
import { Status, Task } from '../../features/task/interface.tasks';
import StatusIconComp from '../../assets/icons/StatusIconComp';
import ToolTip from '../Tooltip/Tooltip';
import { ITask_statuses } from '../../features/list/list.interfaces';
import { setNewTaskStatus, setStatusId } from '../../features/task/taskSlice';
import { StatusDropDownModal } from './Components/StatusDropDownModal';
import DropdownWithHeader from '../Pilot/components/TimeClock/components/DropdownWithHeader';

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
              {statusDropdownType === 'name' ? (
                taskCurrentStatus?.name
              ) : (
                <StatusIconComp color={taskCurrentStatus?.color as string} />
              )}
            </div>
          </button>
        </ToolTip>
      </div>
      {isOpen && (
        <DropdownWithHeader
          setAnchor={handleCloseStatusDropdown}
          anchor={isOpen as HTMLDivElement | null}
          header="task status"
          subHeader="select status"
        >
          <StatusDropDownModal
            cords={cords}
            handleStatusSelection={handleStatusSelection}
            sortedStatuses={sortedStatuses}
            taskCurrentStatus={taskCurrentStatus}
            taskId={task?.id as string}
          />
        </DropdownWithHeader>
      )}
    </div>
  );
}
