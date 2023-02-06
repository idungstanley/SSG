import requestNew from "../../../app/requestNew";
// import { getOneTaskServices } from "../taskService";
import { useDispatch } from "react-redux";
// import { getchecklist } from "./checklistSlice";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getchecklist, updateChecklist } from "./checklistSlice";
import axios from "axios";

export const createChecklistService = (data) => {
  const { taskId } = data;
  const response = requestNew(
    {
      url: `/at/tasks/${taskId}/checklist`,
      method: "POST",
      data: {
        name: data.name,
      },
    },
    true
  );
  return response;
};

export const getaTaskServices = ({ task_id }) => {
  const dispatch = useDispatch();
  const onSuccess = (data) => {
    const taskData = data.data.task;
    const checkLists = taskData.task_checklists;
    console.log(checkLists);
    dispatch(getchecklist(checkLists));
  };
  return useQuery(
    ["task", { task_id: task_id }],
    async () => {
      const data = await requestNew(
        {
          url: `at/tasks/${task_id}`,
          method: "GET",
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

export const createChecklist = (data) => {
  const { taskId } = data;
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useQuery(
    ["hubs", taskId],
    async () => {
      const res = await requestNew(
        {
          url: `/at/tasks/${taskId}/checklist`,
          method: "POST",
          data: {
            name: data.name,
          },
        },
        true
      );
      return res;
    },
    {
      initialData: queryClient.getQueryData(["checklists", taskId]),
      enabled: taskId != null,
      onSuccess: (data) => {
        console.log(data.data);
        dispatch(updateChecklist(data.data));
      },
    }
  );
};

export const getChecklist = async ({ task_id }) => {
  const data = await requestNew(
    {
      url: `at/tasks/${task_id}`,
      method: "GET",
    },
    true
  );
  console.log(data);
  return data;
};
