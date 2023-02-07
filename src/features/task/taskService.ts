import requestNew from '../../app/requestNew';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch } from '../../app/hooks';
import { getTaskData, setToggleAssignCurrentTaskId } from './taskSlice';
import { useDispatch } from 'react-redux';
import { UpdateTaskProps } from './interface.tasks';

export const createTaskService = (data) => {
  const response = requestNew(
    {
      url: 'at/tasks',
      method: 'POST',
      data: {
        name: data.name,
        description: data.description,
        list_id: data.showMenuDropdown || data.getListId,
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

//getOneTask
export const getOneTaskServices = ({ task_id }) => {
  // const queryClient = useQueryClient();
  return useQuery(
    ['task', { task_id: task_id }],
    async () => {
      const data = await requestNew(
        {
          url: `at/tasks/${task_id}`,
          method: 'GET',
        },
        true
      );
      return data;
    },
    {
      enabled: task_id != null,
    }
  );
};

//create checklist
export const UseCreateCheckList = ({ task_id, trigger }) => {
  // const queryClient = useQueryClient();
  return useQuery(
    ['task'],
    async () => {
      const data = await requestNew(
        {
          url: `at/tasks/${task_id}/checklist`,
          method: 'POST',
          params: {
            name: 'Checklist',
          },
        },
        true
      );
      return data;
    },
    {
      enabled: !!trigger,
    }
  );
};

export const UseUpdateTaskStatusService = ({
  task_id,
  statusDataUpdate,
  priorityDataUpdate,
}: UpdateTaskProps) => {
  const queryClient = useQueryClient();
  return useQuery(
    ['task', { task_id, statusDataUpdate, priorityDataUpdate }],
    async () => {
      const data = requestNew(
        {
          url: `at/tasks/${task_id}`,
          method: 'PUT',
          params: {
            status: statusDataUpdate,
            // priority: priorityDataUpdate,
          },
        },
        true
      );
      return data;
    },
    {
      // enabled: statusDataUpdate !== '' || priorityDataUpdate !== '',
      enabled: task_id != null && statusDataUpdate !== '',
      onSuccess: () => {
        queryClient.invalidateQueries(['task']);
      },
    }
  );
};

export const UseUpdateTaskStatusServices = ({
  task_id,
  priorityDataUpdate,
}: UpdateTaskProps) => {
  const queryClient = useQueryClient();
  return useQuery(
    ['task', { task_id, priorityDataUpdate }],
    async () => {
      const data = requestNew(
        {
          url: `at/tasks/${task_id}`,
          method: 'PUT',
          params: {
            priority: priorityDataUpdate,
          },
        },
        true
      );
      return data;
    },
    {
      // enabled: statusDataUpdate !== '' || priorityDataUpdate !== '',
      enabled: task_id != null && priorityDataUpdate !== '',
      onSuccess: () => {
        queryClient.invalidateQueries(['task']);
      },
    }
  );
};

export const getTaskListService = ({ listId }) => {
  const dispatch = useAppDispatch();

  const queryClient = useQueryClient();
  return useQuery(
    ['task', { listId: listId }],
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
        dispatch(getTaskData(taskData));
      },
    }
  );
};
// getTaskListService();

export const getTaskListService2 = (query: { parentId: string | null }) => {
  // const dispatch = useAppDispatch();

  // const queryClient = useQueryClient();
  return useQuery(
    ['task', { query: query.parentId }],
    async () => {
      const data = await requestNew(
        {
          url: 'at/tasks/list',
          method: 'POST',
          params: {
            parent_id: query.parentId,
          },
        },
        true
      );
      return data;
    },
    {
      enabled: query.parentId != null,
      onSuccess: () => {
        // const taskData = data.data.tasks.map((task) => {
        //   queryClient.setQueryData(['task', task.id], task);
        //   return { ...task };
        // });
        // dispatch(getTaskData(taskData));
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

export const StartTimeEntryService = (query) => {
  // const queryClient = useQueryClient();
  return useQuery(
    ['timeclock', { query: query.taskId }],
    async () => {
      const data = await requestNew(
        {
          url: 'time-entries/start',
          method: 'POST',
          params: {
            type: 'task',
            id: query.taskId,
          },
        },
        true
      );
      return data;
    },
    {
      enabled: query.trigger,
      onSuccess: () => {
        // queryClient.invalidateQueries();
      },
    }
  );
};

export const EndTimeEntriesService = (data) => {
  return useQuery(
    ['timeclock'],
    async () => {
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
    },
    {
      enabled: data.trigger,
    }
  );
};

export const GetTimeEntriesService = ({ taskId, trigger }) => {
  // const queryClient = useQueryClient();
  // const dispatch = useDispatch();
  return useQuery(
    ['timeclock', { taskId: taskId }],
    async () => {
      const data = await requestNew(
        {
          url: 'time-entries',
          method: 'GET',
          params: {
            type: 'task',
            id: taskId,
          },
        },
        true
      );
      return data;
    },
    {
      enabled: trigger == 'task',
    }
  );
};

export const UpdateTimeEntriesService = (data) => {
  const response = requestNew(
    {
      url: `time-entries/${data.time_entry_id}`,
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
  return useQuery(
    ['timeclock', { data: data.timeEntryDeleteTriggerId }],
    async () => {
      const response = requestNew(
        {
          url: `time-entries/${data.timeEntryDeleteTriggerId}`,
          method: 'DELETE',
        },
        true
      );
      return response;
    },
    {
      enabled: data.timeEntryDeleteTriggerId != null,
    }
  );
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
    ['watcher', taskId],
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

//Assign task to team member
export const UseAssignTaskService = ({ task_id, team_member_id }) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  return useQuery(
    ['assign', { team_member_id: team_member_id }],
    async () => {
      const data = await requestNew(
        {
          url: `at/tasks/${task_id}/assign-member/${team_member_id}`,
          method: 'POST',
        },
        true
      );
      return data;
    },
    {
      onSuccess: () => {
        dispatch(setToggleAssignCurrentTaskId(null));
      },
      initialData: queryClient.getQueryData(['assign', team_member_id]),
      enabled: team_member_id != null,
    }
  );
};

//Unassign task from team member
export const UseUnAssignTaskService = ({
  task_id,
  team_member_id,
  unAssignTrigger,
}) => {
  const queryClient = useQueryClient();
  return useQuery(
    ['unassign', { team_member_id: team_member_id }],
    async () => {
      const data = await requestNew(
        {
          url: `at/tasks/${task_id}/unassign-member/${team_member_id}`,
          method: 'POST',
        },
        true
      );
      return data;
    },
    {
      initialData: queryClient.getQueryData(['unassign', team_member_id]),
      enabled: unAssignTrigger,
    }
  );
};

//assign tags
export const UseAssignTagToTask = ({ tagId, currentTaskIdForTag }) => {
  const queryClient = useQueryClient();
  return useQuery(
    ['tags', { tagId: tagId, currentTaskIdForTag: currentTaskIdForTag }],
    async () => {
      const data = await requestNew(
        {
          url: `tags/${tagId}/assign`,
          method: 'POST',
          params: {
            type: 'task',
            id: currentTaskIdForTag,
          },
        },
        true
      );
      return data;
    },
    {
      initialData: queryClient.getQueryData(['tags', tagId]),
      enabled: !!tagId,
    }
  );
};
