import { useMemo } from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { useList } from '../../../../features/list/listService';
import { Task } from '../../../../features/task/interface.tasks';
import { filterByAssignee, filterBySearchValue, sortTasks } from '../../../TasksHeader/lib';
import { generateColumns } from '../../lib/tableHeadUtils';
import { Table } from '../Table/Table';

interface ListProps {
  tasks: Task[];
}

export function List({ tasks }: ListProps) {
  const { sortType } = useAppSelector((state) => state.task);
  const { data } = useList(tasks[0].list_id);

  const listName = data?.name;

  const heads = useMemo(() => (data ? generateColumns(data.custom_fields) : null), [data]);

  const { filteredBySearch } = filterBySearchValue(tasks);

  const { filteredByAssignee } = filterByAssignee(filteredBySearch);

  const { sortedTasks } = sortTasks(sortType, filteredByAssignee);

  return (
    <div className="rounded-lg bg-purple-50 border-l-4 border-purple-500">
      <div className="flex">
        <h1 className="rounded-br-md p-2 px-4 text-white text-sm bg-purple-500 w-fit">{listName}</h1>
      </div>

      {heads ? (
        <div className="space-y-10">
          {Object.keys(sortedTasks).map((key) => (
            <Table label={key} key={key} heads={heads} data={sortedTasks[key]} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
