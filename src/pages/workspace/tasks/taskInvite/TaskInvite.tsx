import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOneTaskService, getOneTaskServices } from '../../../../features/task/taskService';
import { useAppSelector } from '../../../../app/hooks';

export default function TaskInvite() {
  const navigate = useNavigate();
  const { currentWorkspaceId } = useAppSelector((state) => state.auth);

  const { taskInvite } = useParams();

  const { data: task } = getOneTaskServices({ task_id: taskInvite });
  const taskDetails = task?.data.task.list_id;

  console.log(taskDetails);

  if (taskDetails) {
    navigate(`/${currentWorkspaceId}/tasks/l/${taskDetails}/t/${taskInvite}`);
  }
  useEffect(() => {
    if (taskDetails) {
      navigate(`/${currentWorkspaceId}/tasks/l/${taskDetails}/t/${taskInvite}`);
    }
  }, [taskDetails]);

  return <div>check</div>;
}
