import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOneTaskService, getOneTaskServices } from '../../../../features/task/taskService';
import { useAppSelector } from '../../../../app/hooks';

export default function TaskInvite() {
  const navigate = useNavigate();

  const { taskInvite } = useParams();
  const { taskWorkspace } = useParams();

  const { data: task } = getOneTaskServices({ task_id: taskInvite });
  const taskDetails = task?.data.task.list_id;

  useEffect(() => {
    if (taskDetails) {
      navigate(`/${taskWorkspace}/tasks/l/${taskDetails}/t/${taskInvite}`);
    }
  }, [taskDetails]);

  return null;
}
