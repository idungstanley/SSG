import { DragOverlay } from '@dnd-kit/core';
import { useAppSelector } from '../../../../app/hooks';
import { useSubTasks } from '../../../../features/task/taskService';
import { Column } from '../../types/table';
import { Row } from './Row';
import { OverlayRow } from './OverlayRow';

interface SubTasksProps {
  parentId: string;
  columns: Column[];
  paddingLeft: number;
}

export function SubTasks({ parentId, columns, paddingLeft }: SubTasksProps) {
  const { draggableItemId } = useAppSelector((state) => state.list);

  const { data: tasks } = useSubTasks(parentId);

  const draggableItem = draggableItemId ? tasks?.find((i) => i.id === draggableItemId) : null;

  return (
    <>
      {draggableItem ? (
        <DragOverlay>
          <OverlayRow columns={columns} task={draggableItem} />
        </DragOverlay>
      ) : null}
      {tasks?.map((i) => (
        <Row paddingLeft={paddingLeft} columns={columns} task={i} key={i.id} isListParent={false} />
      ))}
    </>
  );
}
