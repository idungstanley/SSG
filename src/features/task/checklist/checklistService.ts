import requestNew from "../../../app/requestNew";
// import { getOneTaskServices } from "../taskService";
import { useDispatch } from "react-redux";
// import { getchecklist } from "./checklistSlice";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getchecklist } from "./checklistSlice";

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

export const getChecklist = async (task_id) => {
  const dispatch = useDispatch();
  const data = await requestNew(
    {
      url: `at/tasks/${task_id}`,
      method: "GET",
    },
    true
  );
  return data?.data.task.task_checklists;
};

export const UseCreateChecklist = ({ task_id, trigger }) => {
  return useQuery(
    ["task"],
    async () => {
      const data = await requestNew(
        {
          url: `at/tasks/${task_id}/checklist`,
          method: "POST",
          params: {
            name: "Checklist",
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
}) => {
  return useQuery(
    ["item"],
    async () => {
      const data = await requestNew(
        {
          url: `at/tasks/${task_id}/checklist/${checklistId}`,
          method: "POST",
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
