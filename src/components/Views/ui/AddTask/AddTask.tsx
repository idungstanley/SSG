import { useEffect, useRef, useState } from 'react';
import { useAddTask } from '../../../../features/task/taskService';
import Assignee from '../../../../pages/workspace/tasks/assignTask/Assignee';
import { UseGetListDetails } from '../../../../features/list/listService';
import { ITask_statuses } from '../../../../features/list/list.interfaces';
import { useAppSelector } from '../../../../app/hooks';
import ToolTip from '../../../Tooltip/Tooltip';
import CreateTaskCalender from '../../../../assets/icons/CreateTaskCalender';
import CreateTaskPriority from '../../../../assets/icons/CreateTaskPriority';
import CreateTaskTaskTag from '../../../../assets/icons/CreateTaskTaskTag';
import CreateTaskTaskEdit from '../../../../assets/icons/CreateTaskTaskEdit';
import CreateTaskTaskCancel from '../../../../assets/icons/CreateTaskTaskCancel';
import { listColumnProps } from '../../../../pages/workspace/tasks/component/views/ListColumns';
import { Task } from '../../../../features/task/interface.tasks';
import TaskPriority from '../../../../pages/workspace/tasks/component/taskData/priority';
import NewSubTaskTemplate from '../Table/newTaskTemplate/NewSubTaskTemplate';

interface AddTaskFieldProps {
  parentId: string;
  status?: string;
  paddingLeft?: number;
  isListParent: boolean;
  columns?: listColumnProps[];
  task: Task;
  onClose: VoidFunction;
}

export function AddTask({ onClose, paddingLeft, parentId, isListParent, columns, task }: AddTaskFieldProps) {
  const { currTeamMemberId, newTaskPriority } = useAppSelector((state) => state.task);

  const [statusId, setStatusId] = useState<string>('');

  const nameRef = useRef<HTMLInputElement>(null);

  const { mutate: onAdd } = useAddTask(task);

  const { data: list } = UseGetListDetails(parentId);

  const taskTemplate = NewSubTaskTemplate();

  useEffect(() => {
    const minPosition = Math.min(...(list?.data.list.task_statuses.map((status) => status.position) || []));
    const statusObj: ITask_statuses | undefined = list?.data.list.task_statuses.find(
      (statusObj: ITask_statuses) => statusObj.position === minPosition
    );
    if (statusObj) {
      const newStatusId: string = statusObj.id;
      setStatusId(newStatusId);
    }
  }, []);

  const onClickSave = () => {
    if (nameRef.current) {
      const name = nameRef.current.value;

      onAdd({
        name,
        isListParent,
        id: parentId,
        assignees: [currTeamMemberId] as string[],
        newTaskPriority,
        task_status_id: statusId as string
      });

      onClose();
    }
  };

  return (
    <tr className="contents group ">
      <td className="relative z-20 flex items-center w-full pl-7">
        <div className="h-full bg-primary-50"></div>
        <div style={{ paddingLeft, width: '99%' }} className="flex items-center h-12 mx-2 bg-white border-t opacity-90">
          <input
            ref={nameRef}
            required
            minLength={2}
            type="text"
            autoFocus
            onKeyDown={(e) => (e.key === 'Enter' ? onClickSave() : null)}
            placeholder="Enter task name"
            className="flex-grow text-sm border-transparent appearance-none l-2 focus:border-transparent focus:ring-0"
          />
        </div>

        <div className="absolute flex items-center space-x-2 right-4">
          <div className="flex items-center ml-2 space-x-1">
            <span className="cursor-pointer">
              <CreateTaskTaskEdit />
            </span>
            <span className="cursor-pointer">
              <CreateTaskTaskTag />
            </span>
            <span className="cursor-pointer">
              <Assignee option="getTeamId" />
            </span>
            <span className="cursor-pointer">
              <TaskPriority task={taskTemplate} />
            </span>
            <span className="cursor-pointer">
              <CreateTaskCalender />
            </span>
            <button
              onClick={onClickSave}
              className="flex items-center px-6 py-1 text-sm text-white rounded-md cursor-pointer bg-alsoit-success"
            >
              Save
            </button>
            <ToolTip title="Cancel">
              <div onClick={onClose} className="cursor-pointer">
                <CreateTaskTaskCancel />
              </div>
            </ToolTip>
          </div>
        </div>
      </td>

      {columns?.map((_, index) => (
        <td key={index} className="z-10 flex items-center justify-center w-full h-full bg-white border-t opacity-90" />
      ))}
    </tr>
  );
}
