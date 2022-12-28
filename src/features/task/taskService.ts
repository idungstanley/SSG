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
        parent_id: data.parentTaskId,
      },
    },
    true
  );
  return response;
};

export const getOneTaskService = (data) => {
  const taskId = data.queryKey[1];
  const response = requestNew(
    {
      url: `at/tasks/${taskId}`,
      method: 'GET',
    },
    true
  );
  return response;
};

export const getTaskListService = (data) => {
  const listId = data.queryKey[1];
  const response = requestNew(
    {
      url: 'at/tasks',
      method: 'GET',
      params: {
        list_id: listId,
      },
    },
    true
  );
  return response;
};

export const createTimeEntriesService = (data) => {
  const taskID = data.queryKey[1];
  const response = requestNew(
    {
      url: 'time-entries/start',
      method: 'POST',
      params: {
        type: 'task',
        id: taskID,
      },
    },
    true
  );
  return response;
};

export const EndTimeEntriesService = (data) => {
  const response = requestNew(
    {
      url: 'time-entries/stop',
      method: 'POST',
      params: {
        description: data.description,
        is_billable: data.isBillable,
      },
    },
    true
  );
  return response;
};

export const GetTimeEntriesService = (data) => {
  const taskID = data.queryKey[1];
  const response = requestNew(
    {
      url: 'time-entries',
      method: 'GET',
      params: {
        type: 'task',
        id: taskID,
      },
    },
    true
  );
  return response;
};

export const UpdateTimeEntriesService = (data) => {
  const response = requestNew(
    {
      url: `time-entries/${data.id}`,
      method: 'PUT',
      params: {
        description: data.description,
        is_billable: data.isBillable,
        start_date: data.start_date,
        end_date: data.end_date,
      },
    },
    true
  );
  return response;
};

export const AddTaskWatcherService = (data) => {
  const taskID = data.queryKey[1];
  const response = requestNew(
    {
      url: 'watch',
      method: 'POST',
      params: {
        type: 'task',
        id: taskID,
      },
    },
    true
  );
  return response;
};

export const GetTaskWatcherService = (data) => {
  const taskID = data.queryKey[1];
  const response = requestNew(
    {
      url: 'watch',
      method: 'GET',
      params: {
        type: 'task',
        id: taskID,
      },
    },
    true
  );
  return response;
};
