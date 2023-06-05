import { useSubTasks } from '../../../../features/task/taskService';
import { Column } from '../../types/table';
import { Row } from './Row';

interface SubTasksProps {
  parentId: string;
  columns: Column[];
  paddingLeft: number;
}

export function SubTasks({ parentId, columns, paddingLeft }: SubTasksProps) {
  const { data: tasks } = useSubTasks(parentId);

  return (
    <>
      {tasks?.map((i) => (
        <Row paddingLeft={paddingLeft} columns={columns} task={i} key={i.id} />
      ))}
    </>
  );
}
