import { ImyTaskData } from '../../../../../features/task/taskSlice';
import { ITaskFullList, TaskValue } from '../../../../../features/task/interface.tasks';

export interface TagItem {
  id: string;
  name: string;
  color: string;
}

export interface renderDataProps {
  taskColField?: TaskValue;
  col?: { field: string; id: string };
  task?: ImyTaskData | undefined | ITaskFullList;
  getSubTaskId?: string | null | undefined;
  handleGetSubTask?: (id: string | undefined) => void;
  ShowPlusIcon?: null | boolean;
  entity_type?: string;
  entity_id?: string;
}
