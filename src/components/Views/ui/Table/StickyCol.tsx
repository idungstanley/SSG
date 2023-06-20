import { ReactNode, TdHTMLAttributes, useRef } from 'react';
import { RxTriangleDown, RxTriangleRight } from 'react-icons/rx';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { Task } from '../../../../features/task/interface.tasks';
import { cl } from '../../../../utils';
import { ACTIVE_COL_BG, DEFAULT_COL_BG } from '../../config';
import { UseUpdateTaskService } from '../../../../features/task/taskService';
import StatusDropdown from '../../../status/StatusDropdown';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setShowPilotSideOver } from '../../../../features/general/slideOver/slideOverSlice';
import { setTaskIdForPilot } from '../../../../features/task/taskSlice';
import { setActiveItem } from '../../../../features/workspace/workspaceSlice';

interface ColProps extends TdHTMLAttributes<HTMLTableCellElement> {
  task: Task;
  children: ReactNode;
  showSubTasks: boolean;
  setShowSubTasks: (i: boolean) => void;
  paddingLeft?: number;
  tags: ReactNode;
  dragElement: ReactNode;
}

export function StickyCol({
  showSubTasks,
  setShowSubTasks,
  children,
  tags,
  task,
  paddingLeft = 0,
  dragElement,
  ...props
}: ColProps) {
  const { currentWorkspaceId } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { taskId, hubId } = useParams();
  const COL_BG = taskId === task.id ? ACTIVE_COL_BG : DEFAULT_COL_BG;

  const onClickTask = () => {
    navigate(`/${currentWorkspaceId}/tasks/h/${hubId}/t/${task.id}`, { replace: true });
    dispatch(
      setShowPilotSideOver({
        id: task.id,
        type: 'task',
        show: true,
        title: task.name
      })
    );
    dispatch(setTaskIdForPilot(task.id));
    dispatch(
      setActiveItem({
        activeItemId: task.id,
        activeItemType: 'task',
        activeItemName: task.name
      })
    );
  };

  const onToggleDisplayingSubTasks = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setShowSubTasks(!showSubTasks);
  };

  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const editTaskMutation = useMutation(UseUpdateTaskService, {
    onSuccess: () => {
      queryClient.invalidateQueries(['task']);
    }
  });
  const handleEditTask = async (e: React.KeyboardEvent<HTMLDivElement>, id: string) => {
    e.preventDefault();
    await editTaskMutation.mutateAsync({
      name: inputRef.current?.innerText as string,
      task_id: id
    });
  };

  return (
    <td
      className="sticky left-0 flex items-start justify-start text-sm font-medium text-start text-gray-900 cursor-pointer"
      onClick={onClickTask}
      {...props}
    >
      <div className="flex items-center w-10 h-full space-x-1 bg-purple-50">
        <input
          type="checkbox"
          id="checked-checkbox"
          className="w-2 h-2 rounded-full opacity-0 cursor-pointer focus:outline-1 focus:ring-transparent group-hover:opacity-100 focus:border-2 focus:opacity-100 "
          style={{ marginLeft: '-1px' }}
        />

        {dragElement}
      </div>

      <div style={{ paddingLeft }} className={cl(COL_BG, 'relative border-t w-full h-10 py-4 p-4 flex items-center ')}>
        <button onClick={onToggleDisplayingSubTasks} className="">
          {showSubTasks ? (
            <RxTriangleDown className="w-4 h-4 text-gray-600" />
          ) : (
            <RxTriangleRight className="w-4 h-4 text-gray-600" />
          )}
        </button>
        <StatusDropdown TaskCurrentStatus={task.status} />
        <div className="flex flex-col items-start justify-start space-y-1">
          <p
            contentEditable={true}
            ref={inputRef}
            onKeyDown={(e) => (e.key === 'Enter' ? handleEditTask(e, task.id) : null)}
          >
            {task.name}
          </p>

          {tags}
        </div>
        {children}
      </div>
    </td>
  );
}
