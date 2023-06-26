import { useMemo, useState } from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { useList } from '../../../../features/list/listService';
import { Task } from '../../../../features/task/interface.tasks';
import { filterByAssignee, filterBySearchValue, sortTasks } from '../../../TasksHeader/lib';
import { generateColumns } from '../../lib/tableHeadUtils';
import { Table } from '../Table/Table';
import { Label } from './Label';
import { AddTask } from '../AddTask/AddTask';

interface ListProps {
  tasks: Task[];
}

export function List({ tasks }: ListProps) {
  const { sortType } = useAppSelector((state) => state.task);
  const { data } = useList(tasks[0].list_id);

  const [collapseTable, setCollapseTable] = useState(false);
  const [showNewTaskField, setShowNewTaskField] = useState(false);

  const listName = data?.name;

  const heads = useMemo(() => (data ? generateColumns(data.custom_fields) : null), [data]);

  const { filteredBySearch } = filterBySearchValue(tasks);

  const { filteredByAssignee } = filterByAssignee(filteredBySearch);

  const { sortedTasks } = sortTasks(sortType, filteredByAssignee);

  return (
    <div className="border-l-4 pt-1 border-t-4 border-purple-500 rounded-xl bg-purple-50">
      <Label listName={listName} showTable={collapseTable} onClickChevron={() => setCollapseTable((prev) => !prev)} />

      {!collapseTable && heads ? (
        <div className="relative ">
          {showNewTaskField ? (
            <div className="pl-2">
              <AddTask parentId={data?.id as string} isListParent onClose={() => setShowNewTaskField(false)} />
            </div>
          ) : null}
          {!showNewTaskField ? (
            <div className="h-5">
              <button onClick={() => setShowNewTaskField(true)} className=" p-1.5 pl-6 text-left w-fit text-xs ">
                + New Task
              </button>
            </div>
          ) : null}
          {Object.keys(sortedTasks).map((key) => (
            <Table label={key} key={key} heads={heads} data={sortedTasks[key]} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
