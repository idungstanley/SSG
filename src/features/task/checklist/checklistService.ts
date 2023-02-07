import requestNew from "../../../app/requestNew";
// import { getOneTaskServices } from "../taskService";
import { useDispatch } from "react-redux";
// import { getchecklist } from "./checklistSlice";
import { useQuery, useQueryClient } from "@tanstack/react-query";

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
