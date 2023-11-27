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
import RoundedCheckbox from '../../../Checkbox/RoundedCheckbox';
import ActiveEntityAvatar from '../../../avatar/ActiveEntityAvatar';

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

  const { selectedTasksArray, taskRootIds, subtasks } = useAppSelector((state) => state.task);

  const allChecked = tasks ? tasks.every((value) => selectedTasksArray.includes(value.id)) : false;

  const subtaskIds = (tasks: Task[]) => {
    return tasks.map((task) => task.id);
  };

  const returnSubTaskIds = (taskRootIds: string[]) => {
    return taskRootIds.map((id) => {
      if (subtasks[id]) return subtaskIds(subtasks[id]);
    });
  };

  const handleCheckedGroupTasks = () => {
    const updatedTaskIds: string[] = [...selectedTasksArray];
    if (allChecked) {
      tasks?.forEach((task) => {
        const taskIndex = updatedTaskIds.indexOf(task.id);
        // Remove Task already in selectedTasksArray
        updatedTaskIds.splice(taskIndex, 1);

        Object.keys(taskRootIds).map((item) => {
          if (item === task.id) {
            const subTaskArray = returnSubTaskIds(taskRootIds[item]);
            const flatArray = subTaskArray.flat() as string[];

            for (const value of flatArray) {
              const subTaskIndex = updatedTaskIds.indexOf(value);
              if (subTaskIndex !== -1) {
                updatedTaskIds.splice(subTaskIndex, 1);
              }
            }
          }
        });
      });
    } else {
      tasks?.forEach((task) => {
        const taskIndex = updatedTaskIds.indexOf(task.id);
        if (taskIndex === -1) {
          Object.keys(taskRootIds).map((item) => {
            if (item === task.id) {
              const subTaskArray = returnSubTaskIds(taskRootIds[item]);

              const flatArray = subTaskArray.flat() as string[];

              updatedTaskIds.push(...flatArray);
            }
          });
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
          className="flex items-center justify-between space-x-5 -mt-1 p-1 pr-7 rounded-tl-lg -ml-1 h-7 rounded-br-[5px]"
          style={{ backgroundColor: !ListColor?.outerColour ? 'black' : (ListColor?.outerColour as string) }}
        >
          <div className="flex items-center pl-2 space-x-2 text-sm text-white w-fit -mt-1">
            <RoundedCheckbox
              onChange={handleCheckedGroupTasks}
              isChecked={allChecked}
              styles={
                'w-4 h-4 rounded-full cursor-pointer focus:outline-1 focus:ring-transparent focus:border-2 text-alsoit-purple-300'
              }
            />
            <CollapseIcon color="#A854F7" active={showTable} onToggle={onClickChevron} hoverBg="white" />
            <h1 className="max-w-34 truncate">{listName ?? 'Loading...'}</h1>
          </div>
          <div className="flex items-center justify-center h-6 bg-white -mt-1 rounded-[5px] w-12">
            <ListAddModal handleCheckedGroupTasks={handleCheckedGroupTasks} ListColor={ListColor} />
          </div>
          {showTable && (
            <p className="flex items-center space-x-2 ml-3 max-w-34 truncate text-white">
              <p>
                <ActiveEntityAvatar width="w-4" height="h-4" size="8px" />
              </p>
              <p>{hubName}</p>
            </p>
          )}
        </div>
        {!showTable && (
          <p className="flex items-center space-x-2 ml-3 max-w-34 truncate">
            <p>
              <ActiveEntityAvatar width="w-4" height="h-4" size="8px" />
            </p>
            <p>{hubName}</p>
          </p>
        )}
      </div>
      {isSplitSubtasks ? (
        <div className="flex items-center justify-end mr-5">
          <Sort isSplitSubtasks={true} />
          <FilterDropdown isSplitSubtasks={true} parentId={parentId as string} />
          <AssigneeSplitSubtasks parentId={parentId as string} />
          <Search isSplitSubtasks={true} parentId={parentId as string} />
        </div>
      ) : null}
    </div>
  );
}
