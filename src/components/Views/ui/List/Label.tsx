import { Chevron } from '../Chevron';
import { Task } from '../../../../features/task/interface.tasks';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setSelectedTasksArray } from '../../../../features/task/taskSlice';
import ListAddModal from './ListAddModal';
import CollapseIcon from '../collapseIcon/CollapseIcon';
import { IListColor } from './List';

interface LabelProps {
  listName?: string;
  hubName?: string;
  onClickChevron: () => void;
  showTable: boolean;
  ListColor?: IListColor;
  tasks?: Task[];
}

export function Label({ listName, onClickChevron, hubName, showTable, tasks, ListColor }: LabelProps) {
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
      <div
        className="flex items-center justify-between space-x-10 bg-purple-500 -mt-1 p-1 pr-7 rounded-tl-2xl -ml-0.5 gap-4 h-8"
        style={{ backgroundColor: ListColor?.outerColour }}
      >
        <div className="flex space-x-2 items-center pl-2 text-sm text-white  w-fit">
          <CollapseIcon color="#A854F7" active={showTable} onToggle={onClickChevron} hoverBg="white" />
          <h1 className="">{listName ?? 'Loading...'}</h1>
        </div>
        <button className="rounded-sm bg-gray-200 flex justify-center items-center h-6">
          {/* <span>Add </span> */}
          <ListAddModal handleCheckedGroupTasks={handleCheckedGroupTasks} ListColor={ListColor} />
        </button>
      </div>

      <p className="ml-3">{hubName}</p>
    </div>
  );
}
