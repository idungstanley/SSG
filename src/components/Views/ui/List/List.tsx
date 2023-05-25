import { useMemo } from 'react';
import { useList } from '../../../../features/list/listService';
import { Task } from '../../../../features/task/interface.tasks';
import { generateColumns } from '../../lib/tableHeadUtils';
import { Table } from '../Table/Table';

interface ListProps {
  tasks: Task[];
}

export function List({ tasks }: ListProps) {
  const { data } = useList(tasks[0].list_id);

  const listName = data?.name;

  const heads = useMemo(() => (data ? generateColumns(data.custom_fields) : null), [data]);

  return (
    <div className="rounded-lg bg-purple-50 border-l-4 border-purple-500">
      <div className="flex">
        <h1 className="rounded-br-md p-2 px-4 text-white text-sm bg-purple-500 w-fit">{listName}</h1>
      </div>
      {heads ? <Table heads={heads} data={tasks} /> : null}
    </div>
  );
}
