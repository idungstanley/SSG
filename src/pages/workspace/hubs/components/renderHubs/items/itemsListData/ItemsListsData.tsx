import React from 'react';
import { useAppSelector } from '../../../../../../../app/hooks';
import { getTaskListService } from '../../../../../../../features/task/taskService';
import { ImyTaskData } from '../../../../../../../features/task/taskSlice';
import TaskData from '../../../../../tasks/component/taskData/TaskData';
import SubTask from '../../../../../tasks/subtasks/create/SubTask';
import RenderSubTasks from '../../../../../tasks/subtasks/subtask1/RenderSubTasks';

interface ItemsListsDataProps {
  listId: string | null;
}
export default function ItemsListsData({ listId }: ItemsListsDataProps) {
  const { data } = getTaskListService({ listId });

  const { currentParentTaskId, getSubTaskId } = useAppSelector(
    (state) => state.task
  );

  // console.log(data);

  return (
    <section>
      {/* lists */}
      <div>
        {data?.data.tasks.map((task: ImyTaskData) => {
          return (
            <div key={task.id}>
              <TaskData task={task} />

              {currentParentTaskId === task.id ? (
                <div>
                  <SubTask parentTaskId={currentParentTaskId} />
                </div>
              ) : null}
              {getSubTaskId === task.id ? <RenderSubTasks /> : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
