import requestNew from '../../../app/requestNew';
// import { getOneTaskServices } from "../taskService";
import { useDispatch } from 'react-redux';
// import { getchecklist } from "./checklistSlice";
import { useQuery } from '@tanstack/react-query';
import {
  setTriggerChecklistUpdate,
  setTriggerItemtUpdate,
} from './checklistSlice';

export const UseCreateClistService = ({ task_id }: { task_id: string }) => {
  const url = `/checklists`;
  const response = requestNew(
    {
      url,
      method: 'POST',
      data: {
        name: 'Checklist',
        id: task_id,
        type: 'task',
      },
    },
    true
  );
  return response;
};

export const UseGetAllClistService = ({ task_id }: {task_id: string }) => {
  return useQuery(['clist', { task_id }], async () => {
    const data = await requestNew(
      {
        url: `at/tasks/${task_id}`,
        method: 'GET',
      },
      true
    );
    return data;
  });
};

export const UseCreatelistItemService = ({ checklist_id, name }: {checklist_id: string, name: string}) => {
  const url = `/checklists/${checklist_id}`;
  const response = requestNew(
    {
      url,
      method: 'POST',
      data: {
        name: name,
      },
    },
    true
  );
  return response;
};

export const UseUpdateChecklistService = ({
  checklist_id,
  name,
  triggerUpdate,
}: {checklist_id: string, name: string, triggerUpdate: boolean}) => {
  const dispatch = useDispatch();
  return useQuery(
    ['checklist', { checklist_id }],
    async () => {
      const data = requestNew(
        {
          url: `/checklists/${checklist_id}`,
          method: 'PUT',
          params: {
            name: name,
          },
        },
        true
      );
      return data;
    },
    {
      enabled: checklist_id != null && triggerUpdate !== false,
      onSuccess: () => {
        dispatch(setTriggerChecklistUpdate(false));
      },
    }
  );
};

export const UseUpdateChecklistItemService = ({
  checklist_id,
  // name,
  triggerItemUpdate,
  itemId,
  is_done,
}: {
  triggerItemUpdate: boolean;
  itemId: string;
  is_done: number;
  checklist_id: string;
}) => {
  const dispatch = useDispatch();
  return useQuery(
    ['edit-item', { itemId }],
    async () => {
      const data = requestNew(
        {
          url: `/checklists/${checklist_id}/item/${itemId}`,
          method: 'PUT',
          params: {
            is_done: is_done,
            // name: "Deen",
          },
        },
        true
      );
      return data;
    },
    {
      enabled: checklist_id != null && triggerItemUpdate !== false,
      onSuccess: () => {
        dispatch(setTriggerItemtUpdate(false));
      },
    }
  );
};
