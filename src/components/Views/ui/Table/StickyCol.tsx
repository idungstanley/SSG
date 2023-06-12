import { ReactNode, TdHTMLAttributes } from 'react';
import { MdDragIndicator } from 'react-icons/md';
import { RxTriangleDown, RxTriangleRight } from 'react-icons/rx';
import { useParams } from 'react-router-dom';
import { Task } from '../../../../features/task/interface.tasks';
import { cl } from '../../../../utils';
import { ACTIVE_COL_BG, DEFAULT_COL_BG } from '../../config';
import inprogressIcon from '../../../../assets/icons/inprogressIcon.png';
import todoIcon from '../../../../assets/icons/todoIcon.png';
import completedIcon from '../../../../assets/icons/completedIcon.png';
import archiveIcon from '../../../../assets/icons/archiveIcon.png';
import { useSubTasks } from '../../../../features/task/taskService';
import StatusDropdown from '../../../status/StatusDropdown';

interface ColProps extends TdHTMLAttributes<HTMLTableCellElement> {
  task: Task;
  children: ReactNode;
  showSubTasks: boolean;
  setShowSubTasks: (i: boolean) => void;
  paddingLeft?: number;
}

export function StickyCol({ showSubTasks, setShowSubTasks, children, task, paddingLeft = 0, ...props }: ColProps) {
  const { taskId } = useParams();
  const COL_BG = taskId === task.id ? ACTIVE_COL_BG : DEFAULT_COL_BG;

  const onToggleDisplayingSubTasks = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setShowSubTasks(!showSubTasks);
  };

  const { data: subTasks } = useSubTasks(task.id);

  return (
    <td
      className="sticky left-0 flex items-center justify-center text-sm font-medium text-center text-gray-900 cursor-pointer h-10"
      {...props}
    >
      {/* //! change me */}
      <div className="flex items-center h-full bg-purple-50">
        <input
          type="checkbox"
          id="checked-checkbox"
          className="w-2 h-2 rounded-full opacity-0 cursor-pointer focus:outline-1 focus:ring-transparent group-hover:opacity-100 focus:border-2 focus:opacity-100 "
          style={{ marginLeft: '-1px' }}
          // ref={setNodeRef}
          // {...attributes}
          // {...listeners}
          // onClick={() => {
          //   displayNav(task?.id as string);
          // }}
        />

        <MdDragIndicator
          className="text-lg text-gray-400 transition duration-200 opacity-0 cursor-move group-hover:opacity-100"
          style={{ marginLeft: '-2px', marginRight: '-2.5px' }}
        />
      </div>

      <div
        style={{ paddingLeft }}
        className={cl(COL_BG, 'relative border-t w-full h-full py-4 p-4 flex items-center ')}
      >
        <button onClick={onToggleDisplayingSubTasks} className="">
          {showSubTasks ? (
            <RxTriangleDown
              className={`${subTasks?.length ? 'w-4 h-4 text-gray-400' : ' opacity-0 w-4 h-4 text-gray-400'}`}
            />
          ) : (
            <RxTriangleRight
              className={`${subTasks?.length ? 'w-4 h-4 text-gray-400' : ' opacity-0 w-4 h-4 text-gray-400'}`}
            />
          )}
        </button>
        <StatusDropdown TaskCurrentStatus={task.status} />
        <p>{task.name}</p>
        {children}
      </div>
    </td>
  );
}
