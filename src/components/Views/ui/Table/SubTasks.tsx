import { useEffect } from 'react';
import { DragOverlay } from '@dnd-kit/core';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { useSubTasks } from '../../../../features/task/taskService';
import { Row } from './Row';
import { OverlayRow } from './OverlayRow';
import { setSubtasks } from '../../../../features/task/taskSlice';
import { ITaskFullList, Task } from '../../../../features/task/interface.tasks';
import { listColumnProps } from '../../../../pages/workspace/tasks/component/views/ListColumns';
import { ITask_statuses } from '../../../../features/list/list.interfaces';

interface SubTasksProps {
  listId: string;
  parentTask: Task;
  columns: listColumnProps[];
  paddingLeft: number;
  taskStatuses?: ITask_statuses[];
  level: number;
  isSplitSubtask?: boolean;
}

export function SubTasks({
  listId,
  parentTask,
  columns,
  paddingLeft,
  taskStatuses,
  level,
  isSplitSubtask
}: SubTasksProps) {
  const dispatch = useAppDispatch();

  const { draggableItemId } = useAppSelector((state) => state.list);
  const { subtasks } = useAppSelector((state) => state.task);

  const { data: tasks } = useSubTasks(parentTask.id, subtasks);

  const draggableItem = draggableItemId
    ? (tasks || subtasks[parentTask.id])?.find((i: ITaskFullList) => i.id === draggableItemId)
    : null;

  useEffect(() => {
    if (tasks?.length && !subtasks[parentTask.id]) {
      const tasksWithListId = tasks.map((item) => {
        return {
          ...item,
          parentName: parentTask.name,
          custom_field_columns: parentTask.custom_field_columns,
          list_id: listId
        };
      });
      dispatch(setSubtasks({ ...subtasks, [parentTask.id]: tasksWithListId as ITaskFullList[] }));
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
          {subtasks[parentTask.id]?.map((i) => (
            <Row
              paddingLeft={paddingLeft}
              listId={listId}
              columns={columns}
              task={i}
              key={i.id}
              isListParent={false}
              taskStatuses={taskStatuses}
              level={level}
              isSplitSubtask={isSplitSubtask}
            />
          ))}
        </>
      ) : null}
    </>
  );
}
