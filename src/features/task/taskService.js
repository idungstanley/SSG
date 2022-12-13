import requestNew from '../../app/requestNew';

export const createTaskService = (data) => {
  const response = requestNew(
    {
      url: 'at/tasks',
      method: 'POST',
      data: {
        name: data.name,
        description: data.description,
        list_id: data.getListId,
      },
    },
    true,
  );
  return response;
};

export const getTaskListService = (data) => {
  const listId = data.queryKey[1];
  const response = requestNew(
    {
      url: 'at/tasks',
      method: 'GET',
      data: {
        list_id: listId,
      },
    },
    true,
  );
  return response;
};
