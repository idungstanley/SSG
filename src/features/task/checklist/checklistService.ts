import requestNew from "../../../app/requestNew";

export const createChecklistService = (data) => {
  const { taskId } = data;
  const response = requestNew(
    {
      url: `/api/at/tasks/${taskId}/checklist`,
      method: "POST",
      data: {
        name: data.name,
      },
    },
    true
  );
  return response;
};
