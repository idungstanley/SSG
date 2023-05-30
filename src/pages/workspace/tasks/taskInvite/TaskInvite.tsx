import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOneTaskServices } from '../../../../features/task/taskService';

export default function TaskInvite() {
  const navigate = useNavigate();

  const { taskInvite } = useParams();
  const { taskWorkspace } = useParams();

  const { data: task } = getOneTaskServices({ task_id: taskInvite });
  const listId = task?.data.task.list_id;

  useEffect(() => {
    if (listId) {
      navigate(`/${taskWorkspace}/tasks/l/${listId}/t/${taskInvite}`);
    }
  }, [listId]);

  return null;
}
