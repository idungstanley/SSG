import { useEffect } from 'react';
import { DragOverlay } from '@dnd-kit/core';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { useSubTasks } from '../../../../features/task/taskService';
import { Row } from './Row';
import { OverlayRow } from './OverlayRow';
import { setSubtasks } from '../../../../features/task/taskSlice';
import { ITaskFullList } from '../../../../features/task/interface.tasks';
import { listColumnProps } from '../../../../pages/workspace/tasks/component/views/ListColumns';
import { ITask_statuses } from '../../../../features/list/list.interfaces';

interface SubTasksProps {
  listId: string;
  parentId: string;
  columns: listColumnProps[];
  paddingLeft: number;
  taskStatuses?: ITask_statuses[];
  level: number;
}

export function SubTasks({ listId, parentId, columns, paddingLeft, taskStatuses, level }: SubTasksProps) {
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
              taskStatuses={taskStatuses}
              level={level}
            />
          ))}
        </>
      ) : null}
    </>
  );
}
