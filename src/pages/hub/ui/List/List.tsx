import { useEffect, useMemo, useRef, useState } from 'react';
import { IField } from '../../../../features/list/list.interfaces';
import { useList } from '../../../../features/list/listService';
import { ITaskFullList } from '../../../../features/task/interface.tasks';
import { columnsHead, listColumnProps } from '../../../workspace/tasks/component/views/ListColumns';
import { Table } from '../Table/Table';

interface ListProps {
  tasks: ITaskFullList[];
}
function unique<T>(arr: T[]) {
  return [...new Set(arr)];
}

export interface Column extends listColumnProps {
  ref: React.RefObject<HTMLTableCellElement>;
}

export const createHeaders = (headers: listColumnProps[]): Column[] => {
  return headers.map((item) => ({
    ...item,
    ref: useRef<HTMLTableCellElement>(null)
  }));
};

const generateColumns = (customFields: IField[]) => {
  const customFieldNames = customFields.map((i) => ({ value: i.name, id: i.id, field: i.type, hidden: false }));
  const newColumns = unique([...columnsHead, ...customFieldNames]);

  return newColumns;
};

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
