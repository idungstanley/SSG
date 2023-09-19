import { useEffect } from 'react';
import { ITaskFullList } from '../../../../features/task/interface.tasks';
import { useSubTasks } from '../../../../features/task/taskService';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setSubtasks } from '../../../../features/task/taskSlice';

interface ISeparateSubtasksProps {
  listId: string;
  parentId: string;
  parentName: string;
}

export function SeparateSubtasks({ listId, parentId, parentName }: ISeparateSubtasksProps) {
  const dispatch = useAppDispatch();

  const { subtasks } = useAppSelector((state) => state.task);

  const { data: tasks } = useSubTasks(parentId);

  useEffect(() => {
    if (tasks?.length && !subtasks[parentId]) {
      const tasksWithListId = tasks.map((item) => {
        return {
          ...item,
          parentName,
          list_id: listId
        };
      });
      dispatch(setSubtasks({ ...subtasks, [parentId]: tasksWithListId as ITaskFullList[] }));
    }
  }, [tasks, subtasks]);

  return tasks?.length ? (
    <>
      {tasks.map((task) => (
        <>
          <SeparateSubtasks listId={listId} parentId={task.id} parentName={parentName} />
        </>
      ))}
    </>
  ) : null;
}
