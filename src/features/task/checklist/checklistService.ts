import requestNew from '../../../app/requestNew';
import { useDispatch } from 'react-redux';
import { setToggleAssignChecklistItemId, setTriggerChecklistUpdate, setTriggerItemtUpdate } from './checklistSlice';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch } from '../../../app/hooks';
import { ITaskRes } from '../interface.tasks';
import { setToggleAssignCurrentTaskId } from '../taskSlice';

export const UseCreateChecklistService = ({
  item_id,
  name,
  type
}: {
  item_id: string | null | undefined;
  name: string;
  type: string | null | undefined;
}) => {
  const url = '/checklists';
  const response = requestNew({
    url,
    method: 'POST',
    data: {
      name: name,
      id: item_id,
      type: type
    }
  });
  return response;
};

export const UseGetAllClistService = ({
  task_id,
  activeItemType
}: {
  task_id: string | null | undefined;
  activeItemType: string | null | undefined;
}) => {
  return useQuery(
    ['checklist', { task_id }],
    async () => {
      const data = await requestNew<ITaskRes>({
        url: `tasks/${task_id}`,
        method: 'GET'
      });
      return data;
    },
    {
      enabled: task_id != null && activeItemType == 'task'
    }
  );
};

export const UseCreatelistItemService = ({ checklist_id, name }: { checklist_id: string; name: string }) => {
  const url = `/checklists/${checklist_id}`;
  const response = requestNew({
    url,
    method: 'POST',
    data: {
      name: name
    }
  });
  return response;
};

export const UseUpdateChecklistService = ({
  checklist_id,
  name,
  triggerUpdate
}: {
  checklist_id: string;
  name: string | null | undefined;
  triggerUpdate: boolean;
}) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  return useQuery(
    ['checklist', { checklist_id }],
    async () => {
      const data = requestNew({
        url: `/checklists/${checklist_id}`,
        method: 'PUT',
        params: {
          name: name
        }
      });
      return data;
    },
    {
      enabled: checklist_id != null && triggerUpdate !== false,
      onSuccess: () => {
        dispatch(setTriggerChecklistUpdate(false));
        queryClient.invalidateQueries(['checklist']);
      }
    }
  );
};

export const UseUpdateChecklistItemService = ({
  checklist_id,
  name,
  triggerItemUpdate,
  itemId,
  done
}: {
  triggerItemUpdate: boolean;
  itemId: string;
  done: number;
  checklist_id: string;
  name: string | null | undefined;
}) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  return useQuery(
    ['checklist', { itemId, done, name }],
    async () => {
      const data = requestNew({
        url: `/checklists/${checklist_id}/item/${itemId}`,
        method: 'PUT',
        params: {
          name: name,
          is_done: done
        }
      });
      return data;
    },
    {
      enabled: checklist_id != null && triggerItemUpdate !== false,
      onSuccess: () => {
        queryClient.invalidateQueries();
        dispatch(setTriggerItemtUpdate(false));
      }
    }
  );
};

// Delete Checklist
const deleteChecklist = (data: { query: string | null }) => {
  const checklist_id = data.query;
  const request = requestNew({
    url: `checklists/${checklist_id}`,
    method: 'DELETE'
  });
  return request;
};

export const useDeleteChecklist = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteChecklist, {
    onSuccess: () => {
      queryClient.invalidateQueries(['checklist']);
    }
  });
};

//Delete a Checklist Item
const deleteChecklistItem = (data: { query: string | null; itemId: string | undefined }) => {
  const checklist_id = data.query;
  const itemId = data.itemId;
  const request = requestNew({
    url: `/checklists/${checklist_id}/item/${itemId}`,
    method: 'DELETE'
  });
  return request;
};

export const useDeleteChecklistItem = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteChecklistItem, {
    onSuccess: () => {
      queryClient.invalidateQueries(['checklist']);
    }
  });
};

// Assign Checklist Item
const AssignChecklistItem = ({
  itemId,
  team_member_id
}: {
  itemId: string | null | undefined;
  team_member_id: string | null;
}) => {
  const request = requestNew({
    url: '/assignee/assign',
    method: 'POST',
    params: {
      team_member_id: team_member_id,
      id: itemId,
      type: 'checklist_item'
    }
  });
  return request;
};

export const UseChecklistItemAssignee = () => {
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();
  return useMutation(AssignChecklistItem, {
    onSuccess: () => {
      dispatch(setToggleAssignChecklistItemId(null));
      queryClient.invalidateQueries(['checklist']);
    }
  });
};

// Unassign Checklist Item
const UnassignChecklistItem = ({
  itemId,
  team_member_id
}: {
  itemId: string | null | undefined;
  team_member_id: string | null;
}) => {
  const request = requestNew({
    url: '/assignee/unassign',
    method: 'POST',
    params: {
      team_member_id: team_member_id,
      id: itemId,
      type: 'checklist_item'
    }
  });
  return request;
};

export const UseChecklistItemUnassignee = () => {
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();
  return useMutation(UnassignChecklistItem, {
    onSuccess: () => {
      dispatch(setToggleAssignChecklistItemId(null));
      dispatch(setToggleAssignCurrentTaskId(null));

      queryClient.invalidateQueries(['task']);
    }
  });
};
