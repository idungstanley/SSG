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
  const { currTeamMemberId } = useAppSelector((state) => state.task);

  const [statusId, setStatusId] = useState<string>('');

  const nameRef = useRef<HTMLInputElement>(null);

  const { mutate: onAdd } = useAddTask(task);

  const { data: list } = UseGetListDetails(parentId);

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
        task_status_id: statusId as string
      });

      onClose();
    }
  };

  return (
    <tr className="contents group ">
      <td className="relative z-20 w-full flex items-center pl-7">
        <div className="h-full bg-primary-50"></div>
        <div style={{ paddingLeft, width: '99%' }} className="border-t flex items-center h-12 mx-2 bg-white opacity-90">
          <input
            ref={nameRef}
            required
            minLength={2}
            type="text"
            autoFocus
            onKeyDown={(e) => (e.key === 'Enter' ? onClickSave() : null)}
            placeholder="Enter task name"
            className="border-transparent l-2 text-sm appearance-none focus:border-transparent focus:ring-0 flex-grow"
          />
        </div>

        <div className="absolute right-4 flex items-center space-x-2">
          <div className="flex ml-2 items-center space-x-1">
            <CreateTaskTaskEdit />
            <CreateTaskTaskTag />
            <Assignee option="getTeamId" />
            <CreateTaskPriority />
            <CreateTaskCalender />
            <button
              onClick={onClickSave}
              className="px-6 py-1 text-white text-sm rounded-md bg-alsoit-success flex items-center"
            >
              Save
            </button>
            <ToolTip title="Cancel">
              <div onClick={onClose}>
                <CreateTaskTaskCancel />
              </div>
            </ToolTip>
          </div>
        </div>
      </td>

      {columns?.map((_, index) => (
        <td key={index} className="z-10 border-t bg-white w-full h-full opacity-90 flex items-center justify-center" />
      ))}
    </tr>
  );
}
