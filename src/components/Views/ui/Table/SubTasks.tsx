import { useEffect } from 'react';
import { DragOverlay } from '@dnd-kit/core';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { useSubTasks } from '../../../../features/task/taskService';
import { Column } from '../../types/table';
import { Row } from './Row';
import { OverlayRow } from './OverlayRow';
import { setSubtasks } from '../../../../features/task/taskSlice';
import { ITaskFullList } from '../../../../features/task/interface.tasks';

interface SubTasksProps {
  listId: string;
  parentId: string;
  columns: Column[];
  paddingLeft: number;
  level: number;
}

export function SubTasks({ listId, parentId, columns, paddingLeft, level }: SubTasksProps) {
  const dispatch = useAppDispatch();

  const { draggableItemId } = useAppSelector((state) => state.list);
  const { subtasks } = useAppSelector((state) => state.task);

  const { data: tasks } = useSubTasks(parentId);

  const draggableItem = draggableItemId ? tasks?.find((i) => i.id === draggableItemId) : null;

  useEffect(() => {
    if (tasks?.length) {
      const tasksWithListId = tasks.map((item) => {
        return {
          ...item,
          list_id: listId
        };
      });
      dispatch(setSubtasks({ ...subtasks, [parentId]: tasksWithListId as ITaskFullList[] }));
    }
  }, [tasks]);

  return (
    <>
      {draggableItem ? (
        <DragOverlay>
          <OverlayRow columns={columns} task={draggableItem} />
        </DragOverlay>
      ) : null}
      {Object.keys(subtasks).length ? (
        <>
          {subtasks[parentId]?.map((i) => (
            <Row
              paddingLeft={paddingLeft}
              listId={listId}
              columns={columns}
              task={i}
              key={i.id}
              isListParent={false}
              level={level}
            />
          ))}
        </>
      ) : null}
    </>
  );
}
