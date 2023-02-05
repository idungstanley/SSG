import requestNew from "../../../app/requestNew";
// import { getOneTaskServices } from "../taskService";
// import { useDispatch } from "react-redux";
// import { getchecklist } from "./checklistSlice";
import { useQuery, useQueryClient } from "@tanstack/react-query";

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
      // onSuccess: (data) => {
      //   const taskData = data.data.tasks.map((task) => {
      //     queryClient.setQueryData(['task', task.id], task);
      //     return { ...task };
      //   });
      //   dispatch(getTaskData(taskData));
      // },
    }
  );
};
