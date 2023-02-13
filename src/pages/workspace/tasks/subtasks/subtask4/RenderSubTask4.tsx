import React from 'react';
import { useAppSelector } from '../../../../../app/hooks';
import { getTaskListService2 } from '../../../../../features/task/taskService';
import SubTask from '../create/SubTask';
import Template4 from './Template4';
import RendersubTask5 from '../subtask5/RenderSubTask5';
import { ImyTaskData } from '../../../../../features/task/taskSlice';

interface RenderSubTask2Props {
  parentId: string | null;
}

export default function RendersubTask4({ parentId }: RenderSubTask2Props) {
  const { currentParentTaskId, currentParentSubTaskId4 } = useAppSelector(
    (state) => state.task
  );

  const { data } = getTaskListService2({
    parentId: parentId,
  });

  return (
    <>
      {data?.data.tasks.map((task: ImyTaskData) => (
        <section key={task.id}>
          <Template4 task={task} />
          <div>
            {currentParentTaskId === task.id ? (
              <div>
                <SubTask parentTaskId={currentParentTaskId} />
              </div>
            ) : null}
            {currentParentSubTaskId4 === task.id ? (
              <div>
                <RendersubTask5 parentId={currentParentSubTaskId4} />
              </div>
            ) : null}
          </div>
        </section>
      ))}
    </>
  );
}
