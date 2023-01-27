import React, { useState } from 'react';
import { useAppSelector } from '../../../../../app/hooks';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTaskListService2 } from '../../../../../features/task/taskService';
import SubTask from '../create/SubTask';
import Template from './Template';
import RendersubTask2 from '../subtask2/RendersubTask2';

export default function RenderSubTasks() {
  const navigate = useNavigate();
  const { getSubTaskId, currentParentTaskId, currentParentSubTaskId } =
    useAppSelector((state) => state.task);

  const { data } = getTaskListService2({
    parentId: getSubTaskId,
  });

  const [openTaskModal, setOpenTaskModal] = useState(false);

  const handleTaskModal = (id: string) => {
    setOpenTaskModal(true);
    navigate(`/workspace/t/${id}`);
  };

  return (
    <>
      {data?.data.tasks.map((task) => (
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
