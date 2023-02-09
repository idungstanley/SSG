import React from 'react';
import { useAppSelector } from '../../../../../app/hooks';
import { getTaskListService2 } from '../../../../../features/task/taskService';
import SubTask from '../create/SubTask';
import Template from './Template';
import RendersubTask2 from '../subtask2/RendersubTask2';
import { dataProps } from '../../../../../components/Index/walletIndex/WalletIndex';

export default function RenderSubTasks() {
  const { getSubTaskId, currentParentTaskId, currentParentSubTaskId } =
    useAppSelector((state) => state.task);

  const { data } = getTaskListService2({
    parentId: getSubTaskId,
  });

  return (
    <>
      {data?.data.tasks.map((task: dataProps) => (
        <section key={task.id}>
          <Template task={task} />
          <div>
            {currentParentTaskId === task.id ? (
              <div>
                <SubTask parentTaskId={currentParentTaskId} />
              </div>
            ) : null}

            {currentParentSubTaskId === task.id ? (
              <div>
                <RendersubTask2 parentId={currentParentSubTaskId} />
              </div>
            ) : null}
          </div>
        </section>
      ))}
    </>
  );
}
