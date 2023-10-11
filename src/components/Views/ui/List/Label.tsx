import { Task } from '../../../../features/task/interface.tasks';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setSelectedTasksArray } from '../../../../features/task/taskSlice';
import ListAddModal from './ListAddModal';
import CollapseIcon from '../collapseIcon/CollapseIcon';
import { IListColor } from './List';
import { FilterDropdown } from '../../../TasksHeader/ui/Filter/FilterDropdown';
import { Search } from '../../../TasksHeader/ui/Search/Search';
import { Sort } from '../../../TasksHeader/ui/Sort/Sort';
import { AssigneeSplitSubtasks } from '../../../TasksHeader/ui/Assignee/AssigneeSplitSubtasks';
import statusbox from '../../../.././assets/icons/statusbox.svg';

interface LabelProps {
  showTable: boolean;
  listName?: string;
  hubName?: string;
  ListColor?: IListColor;
  tasks?: Task[];
  isSplitSubtasks?: boolean;
  parentId?: string;
  onClickChevron: () => void;
}

export function Label({
  showTable,
  listName,
  hubName,
  tasks,
  ListColor,
  isSplitSubtasks,
  parentId,
  onClickChevron
}: LabelProps) {
  const dispatch = useAppDispatch();

  const { selectedTasksArray } = useAppSelector((state) => state.task);

  const allChecked = tasks?.every((value) => selectedTasksArray.includes(value.id));

  const handleCheckedGroupTasks = () => {
    const updatedTaskIds: string[] = [...selectedTasksArray];
    if (allChecked) {
      tasks?.forEach((task) => {
        const taskIndex = updatedTaskIds.indexOf(task.id);
        // Remove Task already in selectedTasksArray
        updatedTaskIds.splice(taskIndex, 1);
      });
    } else {
      tasks?.forEach((task) => {
        const taskIndex = updatedTaskIds.indexOf(task.id);
        if (taskIndex === -1) {
          updatedTaskIds.push(task.id);
        }
      });
    }
    dispatch(setSelectedTasksArray(updatedTaskIds));
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div
          className="flex items-center justify-between space-x-10 bg-purple-500 -mt-1 p-1 pr-7 rounded-tl-2xl -ml-0.5 gap-4 h-8"
          style={{ backgroundColor: ListColor?.outerColour === null ? 'black' : (ListColor?.outerColour as string) }}
        >
          <div className="flex items-center pl-2 space-x-2 text-sm text-white w-fit">
            <img src={statusbox} alt="" className="pr-1 border-r cursor-pointer" onClick={handleCheckedGroupTasks} />
            <CollapseIcon color="#A854F7" active={showTable} onToggle={onClickChevron} hoverBg="white" />
            <h1>{listName ?? 'Loading...'}</h1>
          </div>
          <button className="flex items-center justify-center h-6 bg-gray-200 rounded-sm">
            <ListAddModal handleCheckedGroupTasks={handleCheckedGroupTasks} ListColor={ListColor} />
          </button>
        </div>
        <p className="ml-3">{hubName}</p>
      </div>
      {isSplitSubtasks ? (
        <div className="flex items-center justify-end mr-5">
          <Sort isSplitSubtasks={true} />
          <FilterDropdown isSplitSubtasks={true} parentId={parentId as string} />
          <AssigneeSplitSubtasks isSplitSubtasks={true} parentId={parentId as string} />
          <Search isSplitSubtasks={true} parentId={parentId as string} />
        </div>
      ) : null}
    </div>
  );
}
