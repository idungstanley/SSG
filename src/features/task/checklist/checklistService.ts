import requestNew from '../../../app/requestNew';
import { useDispatch } from 'react-redux';
import {
  setToggleAssignChecklistItemId,
  setTriggerAssignChecklistItem,
  setTriggerChecklistUpdate,
  setTriggerItemtUpdate,
  setTriggerUnassignChecklistItem
} from './checklistSlice';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch } from '../../../app/hooks';
import { setCurrTeamMemId } from '../taskSlice';

export const UseCreateClistService = ({ task_id, name }: { task_id: string | null | undefined; name: string }) => {
  const url = '/checklists';
  const response = requestNew(
    {
      url,
      method: 'POST',
      data: {
        name: name,
        id: task_id,
        type: 'task'
      }
    },
    true
  );
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
      const data = await requestNew(
        {
          url: `at/tasks/${task_id}`,
          method: 'GET'
        },
        true
      );
      return data;
    },
    {
      enabled: task_id != null && activeItemType == 'task'
    }
  );
};

export const UseCreatelistItemService = ({ checklist_id, name }: { checklist_id: string; name: string }) => {
  const url = `/checklists/${checklist_id}`;
  const response = requestNew(
    {
      url,
      method: 'POST',
      data: {
        name: name
      }
    },
    true
  );
  return response;
};

export const UseUpdateChecklistService = ({
  checklist_id,
  name,
  triggerUpdate
}: {
  checklist_id: string;
  name: string;
  triggerUpdate: boolean;
}) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  return useQuery(
    ['checklist', { checklist_id }],
    async () => {
      const data = requestNew(
        {
          url: `/checklists/${checklist_id}`,
          method: 'PUT',
          params: {
            name: name
          }
        },
        true
      );
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
  name: string | null;
}) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  return useQuery(
    ['checklist', { itemId, done, name }],
    async () => {
      const data = requestNew(
        {
          url: `/checklists/${checklist_id}/item/${itemId}`,
          method: 'PUT',
          params: {
            name: name,
            is_done: done
          }
        },
        true
      );
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
  const request = requestNew(
    {
      url: `checklists/${checklist_id}`,
      method: 'DELETE'
    },
    true
  );
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
  const request = requestNew(
    {
      url: `/checklists/${checklist_id}/item/${itemId}`,
      method: 'DELETE'
    },
    true
  );
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
export const UseAssignChecklistItemService = ({
  checklist_id,
  itemId,
  team_member_id,
  triggerAssignChecklistItem
}: {
  checklist_id: string | null;
  itemId: string | null;
  team_member_id: string | null;
  triggerAssignChecklistItem: boolean;
}) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useQuery(
    [
      'assign',
      {
        team_member_id: team_member_id,
        itemId: itemId,
        checklist_id: checklist_id
      }
    ],
    async () => {
      const data = await requestNew(
        {
          url: `/checklists/${checklist_id}/item/${itemId}/assign/${team_member_id}`,
          method: 'POST'
        },
        true
      );
      return data;
    },
    {
      onSuccess: () => {
        dispatch(setToggleAssignChecklistItemId(null));
        dispatch(setTriggerAssignChecklistItem(false));
        dispatch(setCurrTeamMemId(null));
        queryClient.invalidateQueries();
      },
      // initialData: queryClient.getQueryData(["assign", team_member_id]),
      enabled: !!team_member_id && triggerAssignChecklistItem
    }
  );
};

export const UseUnAssignChecklistItemService = ({
  checklist_id,
  itemId,
  team_member_id,
  triggerUnassignChecklistItem
}: {
  checklist_id: string | null;
  itemId: string | null;
  team_member_id: string | null;
  triggerUnassignChecklistItem: boolean;
}) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useQuery(
    [
      'unassign',
      {
        team_member_id: team_member_id,
        itemId: itemId,
        checklist_id: checklist_id
      }
    ],
    async () => {
      const data = await requestNew(
        {
          url: `/checklists/${checklist_id}/item/${itemId}/unassign/${team_member_id}`,
          method: 'POST'
        },
        true
      );
      return data;
    },
    {
      onSuccess: () => {
        dispatch(setToggleAssignChecklistItemId(null));
        dispatch(setCurrTeamMemId(null));
        dispatch(setTriggerUnassignChecklistItem(false));
        queryClient.invalidateQueries();
      },
      // initialData: queryClient.getQueryData(["unassign", team_member_id]),
      enabled: !!team_member_id && triggerUnassignChecklistItem
    }
  );
};
