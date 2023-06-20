import { ITaskFullList } from '../../../../../../features/task/interface.tasks';

export interface IUnFilteredTaskData {
  unFilteredTaskData: ITaskFullList[];
}

function TaskBoardTemplate({ unFilteredTaskData }: IUnFilteredTaskData) {
  return <div className="gap-5 pl-5 dynamic pt-14">{JSON.stringify(unFilteredTaskData)}</div>;
}

export default TaskBoardTemplate;
