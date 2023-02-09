import requestNew from '../../../app/requestNew';
// import { getOneTaskServices } from "../taskService";
import { useDispatch } from 'react-redux';
// import { getchecklist } from "./checklistSlice";
import { useQuery } from '@tanstack/react-query';
import { getchecklist } from './checklistSlice';

interface dataProps {
  data: {
    task: {
      task_checklists: string[];
    };
  };
}
export const getaTaskServices = ({ task_id }: { task_id: string }) => {
  const dispatch = useDispatch();
  const onSuccess = (data: dataProps) => {
    const taskData = data.data.task;
    const checkLists = taskData.task_checklists;
    console.log(checkLists);
    dispatch(getchecklist(checkLists));
  };
  return useQuery(
    ['task', { task_id: task_id }],
    async () => {
      const data = await requestNew(
        {
          url: `at/tasks/${task_id}`,
          method: 'GET',
        },
        true
      );
      return data;
    },
    {
      enabled: task_id != null,
      onSuccess,
    }
  );
};

export const getChecklist = async (task_id: string) => {
  const data = await requestNew(
    {
      url: `at/tasks/${task_id}`,
      method: 'GET',
    },
    true
  );
  return data?.data.task.task_checklists;
};

export const UseCreateChecklist = ({
  task_id,
  trigger,
}: {
  task_id: string | null;
  trigger: boolean;
}) => {
  return useQuery(
    ['task'],
    async () => {
      const data = await requestNew(
        {
          url: `at/tasks/${task_id}/checklist`,
          method: 'POST',
          params: {
            name: 'Checklist',
          },
        },
        true
      );
      return data;
    },
    {
      enabled: trigger != false,
    }
  );
};

export const UseCreateChecklistItem = ({
  task_id,
  checklistId,
  triggerItem,
  name,
}: {
  task_id: string | null;
  checklistId: string;
  triggerItem: boolean;
  name: string;
}) => {
  return useQuery(
    ['item'],
    async () => {
      const data = await requestNew(
        {
          url: `at/tasks/${task_id}/checklist/${checklistId}`,
          method: 'POST',
          params: {
            name: name,
          },
        },
        true
      );
      return data;
    },
    {
      enabled: triggerItem != false,
    }
  );
};
