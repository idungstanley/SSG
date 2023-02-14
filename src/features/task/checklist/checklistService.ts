import requestNew from "../../../app/requestNew";
import { useDispatch } from "react-redux";
import {
  setTriggerChecklistUpdate,
  setTriggerDelChecklist,
  setTriggererChecklistItemDel,
  setTriggerItemtUpdate,
} from "./checklistSlice";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const UseCreateClistService = ({ task_id }: { task_id: string | null}) => {
  const url = `/checklists`;
  const response = requestNew(
    {
      url,
      method: "POST",
      data: {
        name: "Checklist",
        id: task_id,
        type: "task",
      },
    },
    true
  );
  return response;
};

export const UseGetAllClistService = ({ task_id }: { task_id: string | null}) => {
  return useQuery(["clist", { task_id }], async () => {
    const data = await requestNew(
      {
        url: `at/tasks/${task_id}`,
        method: "GET",
      },
      true
    );
    return data;
  });
};

export const UseCreatelistItemService = ({
  checklist_id,
  name,
}: {
  checklist_id: string;
  name: string;
}) => {
  const url = `/checklists/${checklist_id}`;
  const response = requestNew(
    {
      url,
      method: "POST",
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
}: {
  checklist_id: string;
  name: string;
  triggerUpdate: boolean;
}) => {
  const dispatch = useDispatch();
  return useQuery(
    ["checklist", { checklist_id }],
    async () => {
      const data = requestNew(
        {
          url: `/checklists/${checklist_id}`,
          method: "PUT",
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
  name,
  triggerItemUpdate,
  itemId,
  done,
}: {
  triggerItemUpdate: boolean;
  itemId: string;
  done: number;
  checklist_id: string;
  name: string;
}) => {
  const dispatch = useDispatch();
  return useQuery(
    ["checklist", { itemId, done, name }],
    async () => {
      const data = requestNew(
        {
          url: `/checklists/${checklist_id}/item/${itemId}`,
          method: "PUT",
          params: {
            name: name,
            is_done: done,
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

//Delete a Checklist
export const UseDeleteChecklistService = (data: {
  query: string | null;
  delChecklist: boolean;
}) => {
  const dispatch = useDispatch();
  const checklist_id = data.query;
  const queryClient = useQueryClient();
  return useQuery(
    ["checklist"],
    async () => {
      const data = await requestNew(
        {
          url: `checklists/${checklist_id}`,
          method: "DELETE",
        },
        true
      );
      return data;
    },
    {
      enabled: data.delChecklist,
      onSuccess: () => {
        queryClient.invalidateQueries();
        dispatch(setTriggerDelChecklist(false));
      },
    }
  );
};

//Delete a Checklist Item
export const UseDeleteChecklistItemService = (data: {
  query: string | null;
  itemId: string | null;
  delItem: boolean;
}) => {
  const dispatch = useDispatch();
  const checklist_id = data.query;
  const itemId = data.itemId;
  const queryClient = useQueryClient();
  return useQuery(
    ["checklist"],
    async () => {
      const data = await requestNew(
        {
          url: `/checklists/${checklist_id}/item/${itemId}`,
          method: "DELETE",
        },
        true
      );
      return data;
    },
    {
      enabled: data.delItem,
      onSuccess: () => {
        queryClient.invalidateQueries();
        dispatch(setTriggererChecklistItemDel(false));
      },
    }
  );
};
