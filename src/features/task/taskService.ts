import requestNew from '../../app/requestNew';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { setWatchersData } from './taskSlice';
import { useDispatch } from 'react-redux';

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

export const getTaskListService = ({listId}) => {
  // const dispatch = useDispatch();
  const queryClient = useQueryClient();
  return useQuery(
    ['task'],
    async () => {
      const data = await requestNew(
        {
          url: 'at/tasks/list',
          method: 'POST',
          params: {
            list_id: listId,
          },
        },
        true
      );
      return data;
    },
    {
      onSuccess: (data) => {
        const taskData = data.data.tasks.map((task) => {
          queryClient.setQueryData(['task', task.id], task);
          return { ...task };
        });
      },
    }
  );
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

export const DeleteTimeEntriesService = (data) => {
  const id = data.queryKey[1];
  const response = requestNew(
    {
      url: `time-entries/${id}`,
      method: 'DELETE',
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

//Get watcher
export const UseGetWatcherService = (taskId) => {
  const queryClient = useQueryClient();
  // const dispatch = useDispatch();
  return useQuery(
    ['watcher', { taskId: taskId }],
    async () => {
      const data = await requestNew(
        {
          url: 'watch',
          method: 'GET',
          params: {
            type: 'task',
            id: taskId.query,
          },
        },
        true
      );
      return data;
    },
    {
      initialData: queryClient.getQueryData(['watcher', taskId]),
      enabled: taskId != null,
    }
  );
};

//Add watcher to task
export const AddWatcherService = ({ query }) => {
  const queryClient = useQueryClient();
  return useQuery(
    ['watcher', query],
    async () => {
      const data = await requestNew(
        {
          url: 'watch',
          method: 'POST',
          params: {
            type: 'task',
            id: query[1],
            team_member_ids: [query[0]],
          },
        },
        true
      );
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['watcher']);
      },
      initialData: queryClient.getQueryData(['watcher', query]),
      enabled: query[0] != null,
    }
  );
};

//Remove watcher to task
export const RemoveWatcherService = ({ query }) => {
  const queryClient = useQueryClient();
  return useQuery(
    ['watcher', query],
    async () => {
      const data = await requestNew(
        {
          url: 'watch/remove',
          method: 'POST',
          params: {
            type: 'task',
            id: query[1],
            team_member_ids: [query[0]],
          },
        },
        true
      );
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['watcher']);
      },
      initialData: queryClient.getQueryData(['watcher', query]),
      enabled: query[0] != null,
    }
  );
};
