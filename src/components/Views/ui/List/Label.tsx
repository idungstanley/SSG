import { Chevron } from '../Chevron';
import { Task } from '../../../../features/task/interface.tasks';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setSelectedTasksArray } from '../../../../features/task/taskSlice';
import ListAddModal from './ListAddModal';

interface LabelProps {
  listName?: string;
  hubName?: string;
  onClickChevron: () => void;
  showTable: boolean;
  tasks?: Task[];
}

export function Label({ listName, onClickChevron, hubName, showTable, tasks }: LabelProps) {
  const { selectedTasksArray } = useAppSelector((state) => state.task);

  const dispatch = useAppDispatch();

  const handleCheckedGroupTasks = () => {
    const updatedTaskIds: string[] = [...selectedTasksArray];

    tasks?.forEach((task) => {
      const taskIndex = updatedTaskIds.indexOf(task.id);

      if (taskIndex === -1) {
        //Add Task not in selectedTasksArray
        updatedTaskIds.push(task.id);
      } else {
        // Remove Task already in selectedTasksArray
        updatedTaskIds.splice(taskIndex, 1);
      }
    });
    dispatch(setSelectedTasksArray(updatedTaskIds));
  };
  return (
    <div className="flex items-center">
      <div className="flex justify-between space-x-10 items-center bg-purple-500 rounded-br-md -mt-1 p-1 pr-7 rounded-l-md -ml-1">
        <div className="flex space-x-2 items-center pl-2 text-sm text-white  w-fit">
          <Chevron onToggle={onClickChevron} active={showTable} hoverBg="white" color="#A854F7" />
          <h1 className="">{listName ?? 'Loading...'}</h1>
        </div>
        <button className="rounded-sm bg-gray-200 flex justify-center items-center h-6">
          {/* <span>Add </span> */}
          <ListAddModal handleCheckedGroupTasks={handleCheckedGroupTasks} />
        </button>
      </div>

      <p className="ml-3">{hubName}</p>
    </div>
  );
}
