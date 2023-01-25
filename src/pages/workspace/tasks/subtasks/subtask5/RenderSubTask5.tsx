import React, { useState } from 'react';
import { useAppSelector } from '../../../../../app/hooks';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTaskListService2 } from '../../../../../features/task/taskService';
import SubTask from '../create/SubTask';
import Template5 from './Template5';

interface RenderSubTask2Props {
  parentId: string | null;
}

export default function RendersubTask5({ parentId }: RenderSubTask2Props) {
  const navigate = useNavigate();
  const { currentParentTaskId, currentParentSubTaskId4 } = useAppSelector(
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
