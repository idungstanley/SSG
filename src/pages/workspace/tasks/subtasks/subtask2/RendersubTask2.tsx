import React, { useState } from 'react';
import { useAppSelector } from '../../../../../app/hooks';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTaskListService2 } from '../../../../../features/task/taskService';
import SubTask from '../create/SubTask';
import Template2 from './Template2';
import RendersubTask3 from '../subtask3/RenderSubTask3';

interface RenderSubTask2Props {
  parentId: string | null;
}

export default function RendersubTask2({ parentId }: RenderSubTask2Props) {
  const navigate = useNavigate();
  const { currentParentTaskId, currentParentSubTaskId2 } = useAppSelector(
    (state) => state.task
  );

  const { data } = getTaskListService2({
    parentId: parentId,
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
