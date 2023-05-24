import { listColumnProps } from '../../workspace/tasks/component/views/ListColumns';

export interface Column extends listColumnProps {
  ref: React.RefObject<HTMLTableCellElement>;
}

type ValueOf<T> = T[keyof T];

export type TaskFullListValue = ValueOf<ITaskFullList>;
