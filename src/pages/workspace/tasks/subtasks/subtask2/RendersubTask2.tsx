import React from 'react';
import { useAppSelector } from '../../../../../app/hooks';
import { getTaskListService2 } from '../../../../../features/task/taskService';
import SubTask from '../create/SubTask';
import Template2 from './Template2';
import RendersubTask3 from '../subtask3/RenderSubTask3';
import { ImyTaskData } from '../../../../../features/task/taskSlice';

interface RenderSubTask2Props {
  parentId: string | null;
}

export default function RendersubTask2({ parentId }: RenderSubTask2Props) {
  const { currentParentTaskId, currentParentSubTaskId2 } = useAppSelector((state) => state.task);

  const { data } = getTaskListService2({
    parentId: parentId
  });

  return (
    <>
      {data?.data.tasks.map((task: ImyTaskData) => (
        <section key={task.id}>
          <Template2 task={task} />
          <div>
            {currentParentTaskId === task.id ? (
              <div>
                <SubTask parentTaskId={currentParentTaskId} />
              </div>
            ) : null}
            {currentParentSubTaskId2 === task.id ? (
              <div>
                <RendersubTask3 parentId={currentParentSubTaskId2} />
              </div>
            ) : null}
          </div>
        </section>
      ))}
    </>
  );
}
