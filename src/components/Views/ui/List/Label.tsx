import { Task } from '../../../../features/task/interface.tasks';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setSelectedTasksArray } from '../../../../features/task/taskSlice';
import ListAddModal from './ListAddModal';
import CollapseIcon from '../collapseIcon/CollapseIcon';
import { IListColor } from './List';
import { FilterDropdown } from '../../../TasksHeader/ui/Filter/FilterDropdown';
import { Assignee } from '../../../TasksHeader/ui/Assignee/Assignee';
import { Search } from '../../../TasksHeader/ui/Search/Search';
import { Sort } from '../../../TasksHeader/ui/Sort/Sort';

interface LabelProps {
  listName?: string;
  hubName?: string;
  onClickChevron: () => void;
  showTable: boolean;
  ListColor?: IListColor;
  tasks?: Task[];
  isSplitSubtasks?: boolean;
}

export function Label({ listName, onClickChevron, hubName, showTable, tasks, ListColor, isSplitSubtasks }: LabelProps) {
  const dispatch = useAppDispatch();

  const { selectedTasksArray } = useAppSelector((state) => state.task);

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
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div
          className="flex items-center justify-between space-x-10 bg-purple-500 -mt-1 p-1 pr-7 rounded-tl-2xl -ml-0.5 gap-4 h-8"
          style={{ backgroundColor: ListColor?.outerColour }}
        >
          <div className="flex space-x-2 items-center pl-2 text-sm text-white  w-fit">
            <CollapseIcon color="#A854F7" active={showTable} onToggle={onClickChevron} hoverBg="white" />
            <h1>{listName ?? 'Loading...'}</h1>
          </div>
          <button className="rounded-sm bg-gray-200 flex justify-center items-center h-6">
            <ListAddModal handleCheckedGroupTasks={handleCheckedGroupTasks} ListColor={ListColor} />
          </button>
        </div>

        <p className="ml-3">{hubName}</p>
      </div>
      {isSplitSubtasks ? (
        <div className="flex items-center justify-end">
          <Sort isSplitSubtasks={true} />
          <FilterDropdown isSplitSubtasks={true} />
          <Assignee isSplitSubtasks={true} />
          <Search isSplitSubtasks={true} />
        </div>
      ) : null}
    </div>
  );
}
