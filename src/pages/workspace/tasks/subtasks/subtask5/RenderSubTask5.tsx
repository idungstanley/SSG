import React from 'react';
import { useAppSelector } from '../../../../../app/hooks';
import { getTaskListService2 } from '../../../../../features/task/taskService';
import SubTask from '../create/SubTask';
import Template5 from './Template5';
import { ImyTaskData } from '../../../../../features/task/taskSlice';

interface RenderSubTask2Props {
  parentId: string | null;
}

export default function RendersubTask5({ parentId }: RenderSubTask2Props) {
  // const navigate = useNavigate();
  const { currentParentTaskId } = useAppSelector(
    (state) => state.task
  );

  const { data } = getTaskListService2({
    parentId: parentId,
  });

  return (
    <>
      {data?.data.tasks.map((task: ImyTaskData) => (
        <section key={task.id}>
          <Template5 task={task} />
          <div>
            {currentParentTaskId === task.id ? (
              <div>
                <SubTask parentTaskId={currentParentTaskId} />
              </div>
            ) : null}
          </div>
        </section>
      ))}
    </>
  );
}
