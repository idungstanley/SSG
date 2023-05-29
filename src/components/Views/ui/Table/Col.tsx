import { TdHTMLAttributes } from 'react';
import { MdDragIndicator } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { ImyTaskData } from '../../../../features/task/taskSlice';
import { cl } from '../../../../utils';
import Assignee from '../../../../pages/workspace/tasks/assignTask/Assignee';
import DropdownFieldWrapper from '../../../../pages/workspace/tasks/component/taskData/dropdown/DropdownFieldWrapper';
import TaskPriority from '../../../../pages/workspace/tasks/component/taskData/priority';
import TaskStatus from '../../../../pages/workspace/tasks/component/taskData/status';
import DateForTask from '../../../../pages/workspace/tasks/component/taskData/taskDate';
import TaskTag from '../../../../pages/workspace/tasks/component/taskData/taskTag';
import { listColumnProps } from '../../../../pages/workspace/tasks/component/views/ListColumns';
import { Task, TaskValue } from '../../../../features/task/interface.tasks';

interface ColProps extends TdHTMLAttributes<HTMLTableCellElement> {
  value: TaskValue;
  field: Pick<listColumnProps, 'field'>['field'];
  task: Task;
  fieldId: string;
  sticky?: boolean;
}

const DEFAULT_COL_BG = 'bg-white opacity-90';
const ACTIVE_COL_BG = 'bg-primary-200 opacity-90';

export function Col({ value, field, fieldId, sticky, task, ...props }: ColProps) {
  const { taskId } = useParams();
  const COL_BG = taskId === task?.id ? ACTIVE_COL_BG : DEFAULT_COL_BG;

  //  fields config
  const fields: Record<string, JSX.Element> = {
    priority: <TaskPriority task={task as ImyTaskData} />,
    status: <TaskStatus taskColField={value} task={task as ImyTaskData} />,
    name: <TaskName task={task} bg={COL_BG} />,
    created_at: <DateForTask taskColField={value} />,
    updated_at: <DateForTask taskColField={value} />,
    dropdown: (
      <DropdownFieldWrapper
        taskId={task.id}
        fieldId={fieldId}
        listId={task.list_id}
        taskCustomFields={task.custom_fields}
      />
    ),
    tags: <TaskTag task={task as ImyTaskData} taskColField={value} />,
    assignees: <Assignee task={task as ImyTaskData} itemId={task.id} option="task" />
  };

  return sticky ? (
    <td
      className="sticky cursor-pointer flex left-0 text-center justify-center items-center text-sm font-medium text-gray-900"
      {...props}
    >
      {field in fields ? fields[field] : String(value)}
    </td>
  ) : (
    <td
      className={cl(COL_BG, 'relative flex border-t justify-center items-center text-sm font-medium text-gray-900')}
      {...props}
    >
      {field in fields ? fields[field] : String(value)}
    </td>
  );
}

// temporary component
interface TaskNameProps {
  task: Task;
  bg: string;
}

function TaskName({ task, bg }: TaskNameProps) {
  return (
    <>
      {/* change me */}
      <div className="bg-purple-50 w-10 h-full flex items-center space-x-1">
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

      <div className={cl(bg, 'border-t w-full h-full py-4 p-4')}>{task.name}</div>
    </>
  );
}
