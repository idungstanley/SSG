import { useSubTasks } from '../../../../features/task/taskService';
import { Column } from '../../types/table';
import { Row } from './Row';

interface SubTasksProps {
  parentId: string;
  columns: Column[];
}

export function SubTasks({ parentId, columns }: SubTasksProps) {
  const { data: tasks } = useSubTasks(parentId);

  return (
    <>
      {tasks?.map((i) => (
        <Row columns={columns} task={i} key={i.id} />
      ))}
    </>
  );
}
