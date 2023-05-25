import { ITaskFullList } from '../../../features/task/interface.tasks';
import { ImyTaskData } from '../../../features/task/taskSlice';
import { listColumnProps } from '../../workspace/tasks/component/views/ListColumns';

export interface Column extends listColumnProps {
  ref: React.RefObject<HTMLTableCellElement>;
}

type ValueOf<T> = T[keyof T];

export type Task = ImyTaskData | ITaskFullList;

export type TaskValue = ValueOf<Task>;
