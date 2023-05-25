import { useRef } from 'react';
import { IField } from '../../../features/list/list.interfaces';
import { columnsHead, listColumnProps } from '../../../pages/workspace/tasks/component/views/ListColumns';
import { Column } from '../types/table';

function unique<T>(arr: T[]) {
  return [...new Set(arr)];
}

export const createHeaders = (headers: listColumnProps[]): Column[] => {
  return headers.map((item) => ({
    ...item,
    ref: useRef<HTMLTableCellElement>(null)
  }));
};

export const generateColumns = (customFields: IField[]) => {
  const customFieldNames = customFields.map((i) => ({ value: i.name, id: i.id, field: i.type, hidden: false }));
  const newColumns = unique([...columnsHead, ...customFieldNames]);

  return newColumns;
};
