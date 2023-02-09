import React from 'react';
import { MdDragIndicator } from 'react-icons/md';
import { RiCheckboxBlankFill } from 'react-icons/ri';
import { useAppSelector } from '../../../../../../../app/hooks';
import { getTaskListService } from '../../../../../../../features/task/taskService';
import TaskData from '../../../../../tasks/component/taskData/TaskData';
import SubTask from '../../../../../tasks/subtasks/create/SubTask';
import RenderSubTasks from '../../../../../tasks/subtasks/subtask1/RenderSubTasks';

interface listIdprops {
  listId: string;
}

export default function ListTemplate({ listId }: listIdprops) {
  const { data } = getTaskListService({ listId });
  const { currentParentTaskId, getSubTaskId } = useAppSelector(
    (state) => state.task
  );

    return (
      <div className="">
        {data?.data.tasks.map((task) => {
          return (
            <div key={task.id} className="capitalize">
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
    );
}
