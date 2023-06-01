import { TdHTMLAttributes } from 'react';
import { MdDragIndicator } from 'react-icons/md';
import { RxTriangleDown, RxTriangleRight } from 'react-icons/rx';
import { useParams } from 'react-router-dom';
import { Task } from '../../../../features/task/interface.tasks';
import { cl } from '../../../../utils';
import { ACTIVE_COL_BG, DEFAULT_COL_BG } from '../../config';

interface ColProps extends TdHTMLAttributes<HTMLTableCellElement> {
  task: Task;
  setShowNewTaskField: (i: boolean) => void;
  showSubTasks: boolean;
  setShowSubTasks: (i: boolean) => void;
  paddingLeft?: number;
}

export function StickyCol({
  showSubTasks,
  setShowSubTasks,
  setShowNewTaskField,
  task,
  paddingLeft = 0,
  ...props
}: ColProps) {
  const { taskId } = useParams();
  const COL_BG = taskId === task.id ? ACTIVE_COL_BG : DEFAULT_COL_BG;

  const onToggleDisplayingSubTasks = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setShowSubTasks(!showSubTasks);
  };

  return (
    <td
      className="sticky left-0 flex items-center justify-center text-sm font-medium text-center text-gray-900 cursor-pointer"
      {...props}
    >
      {/* //! change me */}
      <div className="flex items-center w-10 h-full space-x-1 bg-purple-50">
        <input
          type="checkbox"
          id="checked-checkbox"
          className="w-3 h-3 rounded-full opacity-0 cursor-pointer focus:outline-1 focus:ring-transparent group-hover:opacity-100 focus:border-2 focus:opacity-100"
          // ref={setNodeRef}
          // {...attributes}
          // {...listeners}
          // onClick={() => {
          //   displayNav(task?.id as string);
          // }}
        />

        <MdDragIndicator className="text-lg text-gray-400 transition duration-200 opacity-0 cursor-move group-hover:opacity-100" />
      </div>

      <div style={{ paddingLeft }} className={cl(COL_BG, 'relative border-t w-full h-full py-4 p-4 flex items-center')}>
        <button onClick={onToggleDisplayingSubTasks}>
          {showSubTasks ? (
            <RxTriangleDown className="w-4 h-4 text-gray-600" />
          ) : (
            <RxTriangleRight className="w-4 h-4 text-gray-600" />
          )}
        </button>
        <p>{task.name}</p>

        {/* show create subtask field */}
        <div className="absolute top-0 bottom-0 right-0 flex items-center justify-center">
          <button className="p-1" onClick={() => setShowNewTaskField(true)}>
            @
          </button>
        </div>
      </div>
    </td>
  );
}
