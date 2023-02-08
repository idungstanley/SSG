import requestNew from "../../../app/requestNew";
// import { getOneTaskServices } from "../taskService";
import { useDispatch } from "react-redux";
// import { getchecklist } from "./checklistSlice";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { setTriggerChecklistUpdate } from "./checklistSlice";

export const UseCreateClistService = ({ task_id }: any) => {
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

export const UseGetAllClistService = ({ task_id }) => {
  const queryClient = useQueryClient();
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

export const UseCreatelistItemService = ({ checklist_id, name }: any) => {
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
}: any) => {
  const queryClient = useQueryClient();
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
