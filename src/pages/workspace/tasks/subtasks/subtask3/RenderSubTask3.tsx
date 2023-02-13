import React from 'react';
import { useAppSelector } from '../../../../../app/hooks';
import { getTaskListService2 } from '../../../../../features/task/taskService';
import SubTask from '../create/SubTask';
import Template3 from './Template3';
import RendersubTask4 from '../subtask4/RenderSubTask4';
import { ImyTaskData } from '../../../../../features/task/taskSlice';

interface RenderSubTask2Props {
  parentId: string | null;
}

export default function RendersubTask3({ parentId }: RenderSubTask2Props) {
  const { currentParentTaskId, currentParentSubTaskId3 } = useAppSelector(
    (state) => state.task
  );

  const { data } = getTaskListService2({
    parentId: parentId,
  });

  return (
    <>
      {data?.data.tasks.map((task: ImyTaskData) => (
        <section key={task.id}>
          <Template3 task={task} />
          <div>
            {currentParentTaskId === task.id ? (
              <div>
                <SubTask parentTaskId={currentParentTaskId} />
              </div>
            ) : null}
            {currentParentSubTaskId3 === task.id ? (
              <div>
                <RendersubTask4 parentId={currentParentSubTaskId3} />
              </div>
            ) : null}
          </div>
        </section>
      ))}
    </>
  );
}
