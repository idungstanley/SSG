import requestNew from '../../app/requestNew';
import { IFullTaskRes, ITaskFullList, ITaskListRes, ITaskRes, ITimeEntriesRes } from './interface.tasks';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch } from '../../app/hooks';
import {
  ImyTaskData2,
  // getTaskData,
  // getTaskData,
  setToggleAssignCurrentTaskId
} from './taskSlice';
import { UpdateTaskProps } from './interface.tasks';
import { IWatchersRes } from '../general/watchers/watchers.interface';
// import { ImyTaskData } from './taskSlice';

export const createTaskService = (data: {
  name: string;
  description?: string;
  showMenuDropdown?: string | null;
  getListId?: string;
  parentTaskId?: string | null;
}) => {
  const response = requestNew({
    url: 'tasks',
    method: 'POST',
    data: {
      name: data.name,
      description: data.description,
      list_id: data.showMenuDropdown || data.getListId,
      parent_id: data.parentTaskId
    }
  });
  return response;
};

export const UseGetFullTaskList = ({
  itemId,
  itemType,
  assigneeUserId
}: {
  itemId: string | undefined | null;
  itemType: string | null | undefined;
  assigneeUserId?: string | null | undefined;
}) => {
  const queryClient = useQueryClient();
  const enabled = itemType == 'hub' || itemType == 'subhub' || itemType == 'wallet' || itemType == 'subwallet';
  const hub_id = itemType === 'hub' || itemType === 'subhub' ? itemId : null;
  const wallet_id = itemType == 'wallet' || itemType == 'subwallet' ? itemId : null;
  const assignees = assigneeUserId ? (assigneeUserId == 'unassigned' ? null : [assigneeUserId]) : null;
  return useInfiniteQuery(
    ['task', itemId, itemType, assigneeUserId],
    async ({ pageParam = 0 }: { pageParam?: number }) => {
      return requestNew<IFullTaskRes>({
        url: 'tasks/full-list',
        method: 'POST',
        params: {
          page: pageParam,
          hub_id,
          wallet_id,
          assignees
        }
      });
    },
    {
      enabled,
      onSuccess: (data) => {
        data.pages.map((page) =>
          page.data.tasks.map((task: ITaskFullList) => queryClient.setQueryData(['task', task.id], task))
        );
      },
      getNextPageParam: (lastPage) => {
        if (lastPage?.data?.paginator.has_more_pages) {
          return Number(lastPage.data.paginator.page) + 1;
        }

        return false;
      }
    }
  );
};

export const getOneTaskServices = ({ task_id }: { task_id: string | undefined | null }) => {
  return useQuery(
    ['task', { task_id: task_id }],
    async () => {
      const data = await requestNew<ITaskRes | undefined>({
        url: `tasks/${task_id}`,
        method: 'GET'
      });
      return data;
    },
    {
      // enabled: false
      enabled: task_id != null
    }
  );
};

export const getOneTaskService = ({
  task_id,
  activeItemType
}: {
  task_id: string | undefined | null;
  activeItemType?: string | null | undefined;
}) => {
  // const queryClient = useQueryClient();
  return useQuery(
    ['task', { task_id: task_id }],
    async () => {
      const data = await requestNew<ITaskRes | undefined>({
        url: `tasks/${task_id}`,
        method: 'GET'
      });
      return data;
    },
    {
      // enabled: false
      enabled: activeItemType === 'task' && task_id != null
    }
  );
};

//create checklist
export const UseCreateCheckList = ({ task_id, trigger }: { task_id: string; trigger: boolean }) => {
  // const queryClient = useQueryClient();
  return useQuery(
    ['task'],
    async () => {
      const data = await requestNew({
        url: `tasks/${task_id}/checklist`,
        method: 'POST',
        params: {
          name: 'Checklist'
        }
      });
      return data;
    },
    {
      enabled: !!trigger
    }
  );
};

export const UseUpdateTaskService = ({ task_id, name }: { task_id: string | null | undefined; name: string }) => {
  const url = `tasks/${task_id}`;
  const response = requestNew({
    url,
    method: 'PUT',
    params: {
      name: name
    }
  });
  return response;
};
const updateTaskStatusService = ({ task_id, statusDataUpdate }: UpdateTaskProps) => {
  const url = `tasks/${task_id}`;
  const response = requestNew({
    url,
    method: 'PUT',
    params: {
      status: statusDataUpdate
      // priority: priorityDataUpdate,
    }
  });
  return response;
};
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

export const UseUpdateTaskStatusService2 = () => {
  const queryClient = useQueryClient();
  return useMutation(updateTaskStatusService, {
    onSuccess: () => {
      queryClient.invalidateQueries(['task']);
      // queryClient.setQueryData(['task'], (oldQueryData) => {
      // return oldQueryData?.pages?.[0].data.tasks.map((task) => {
      //   if (task.id == data.data.task.id) {
      //     console.log(oldQueryData?.pages?.[0].data.tasks);
      //     // return {
      //     //   ...task,
      //     //   status: data.data.task.status
      //     // };
      //   }
      // });

      // const newData = oldQueryData?.pages?.[0].data.tasks.filter((task) => {
      //   return task.id !== data.data.task.id;
      // });
      // newData.push(data.data.task);
      // return newData;
      // });
    }
  });
};

export const UseUpdateTaskStatusServices = ({ task_id, priorityDataUpdate }: UpdateTaskProps) => {
  const queryClient = useQueryClient();
  return useQuery(
    ['task', { task_id, priorityDataUpdate }],
    async () => {
      const data = requestNew({
        url: `tasks/${task_id}`,
        method: 'PUT',
        params: {
          priority: priorityDataUpdate
        }
      });
      return data;
    },
    {
      // enabled: statusDataUpdate !== '' || priorityDataUpdate !== '',
      enabled: task_id != null && priorityDataUpdate !== '',
      onSuccess: () => {
        queryClient.invalidateQueries(['task']);
      }
    }
  );
};

export const getTaskListService = ({
  listId,
  assigneeUserId
}: {
  listId: string | null | undefined;
  assigneeUserId: string | undefined | null;
}) => {
  // const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const assignees = assigneeUserId ? (assigneeUserId == 'unassigned' ? null : [assigneeUserId]) : null;
  return useInfiniteQuery(
    ['task', { listId: listId, assigneeUserId }],

    async ({ pageParam = 0 }: { pageParam?: number }) => {
      return requestNew<ITaskListRes | undefined>({
        url: 'tasks/list',
        method: 'POST',
        params: {
          list_id: listId,
          page: pageParam,
          assignees
        }
      });
    },
    {
      onSuccess: (data) => {
        data.pages.map((page) =>
          page?.data.tasks.map((task: ImyTaskData2) => queryClient.setQueryData(['task', task.id], task))
        );
      },
      getNextPageParam: (lastPage) => {
        if (lastPage?.data?.paginator.has_more_pages) {
          return Number(lastPage.data.paginator.page) + 1;
        }

        return false;
      }
    }
  );
};

export const getTaskListService2 = (query: { parentId: string | null | undefined }) => {
  return useQuery(
    ['task', { query: query.parentId }],
    async () => {
      const data = await requestNew<ITaskListRes | undefined>({
        url: 'tasks/list',
        method: 'POST',
        params: {
          parent_id: query.parentId
        }
      });
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
      }
    }
  );
};

export const createTimeEntriesService = (data: { queryKey: (string | undefined)[] }) => {
  const taskID = data.queryKey[1];
  const response = requestNew({
    url: 'time-entries/start',
    method: 'POST',
    params: {
      type: 'task',
      id: taskID
    }
  });
  return response;
};

export const StartTimeEntryService = (query: { taskId?: string | null; trigger: boolean }) => {
  // const queryClient = useQueryClient();
  return useQuery(
    ['timeclock', { query: query.taskId }],
    async () => {
      const data = await requestNew({
        url: 'time-entries/start',
        method: 'POST',
        params: {
          type: 'task',
          id: query.taskId
        }
      });
      return data;
    },
    {
      enabled: query.trigger,
      onSuccess: () => {
        // queryClient.invalidateQueries();
      }
    }
  );
};

export const EndTimeEntriesService = (data: {
  description: string | undefined;
  isBillable: string | undefined;
  trigger: boolean;
}) => {
  return useQuery(
    ['timeclock'],
    async () => {
      const response = requestNew({
        url: 'time-entries/stop',
        method: 'POST',
        params: {
          description: data.description,
          is_billable: data.isBillable
        }
      });
      return response;
    },
    {
      enabled: data.trigger
    }
  );
};

export const GetTimeEntriesService = ({
  taskId,
  trigger
}: {
  taskId: string | null | undefined;
  trigger: string | null | undefined;
}) => {
  return useQuery(
    ['timeclock', { taskId: taskId }],
    async () => {
      const data = await requestNew<ITimeEntriesRes | undefined>({
        url: 'time-entries',
        method: 'GET',
        params: {
          type: trigger,
          id: taskId
        }
      });
      return data;
    },
    {
      enabled: true
    }
  );
};

export const UpdateTimeEntriesService = (data: {
  time_entry_id: string | undefined;
  description: string | undefined;
  isBillable: number;
  start_date: string | null | undefined;
  end_date: string | null | undefined;
}) => {
  const response = requestNew({
    url: `time-entries/${data.time_entry_id}`,
    method: 'PUT',
    params: {
      description: data.description,
      is_billable: data.isBillable,
      start_date: data.start_date,
      end_date: data.end_date
    }
  });
  return response;
};

export const DeleteTimeEntriesService = (data: { timeEntryDeleteTriggerId: string | null | undefined }) => {
  return useQuery(
    ['timeclock', { data: data.timeEntryDeleteTriggerId }],
    async () => {
      const response = requestNew({
        url: `time-entries/${data.timeEntryDeleteTriggerId}`,
        method: 'DELETE'
      });
      return response;
    },
    {
      enabled: data.timeEntryDeleteTriggerId != null
    }
  );
};

export const AddTaskWatcherService = (data: { queryKey: string[] }) => {
  const taskID = data.queryKey[1];
  const response = requestNew({
    url: 'watch',
    method: 'POST',
    params: {
      type: 'task',
      id: taskID
    }
  });
  return response;
};

//Get watcher
export const UseGetWatcherService = (taskId: { query: string | null | undefined }) => {
  const queryClient = useQueryClient();
  // const dispatch = useDispatch();
  return useQuery(
    ['watcher', taskId],
    async () => {
      const data = await requestNew<IWatchersRes | undefined>({
        url: 'watch',
        method: 'GET',
        params: {
          type: 'task',
          id: taskId.query
        }
      });
      return data;
    },
    {
      initialData: queryClient.getQueryData(['watcher', taskId]),
      enabled: taskId != null
    }
  );
};

//Add watcher to task
export const AddWatcherService = ({ query }: { query: (string | undefined | null)[] }) => {
  const queryClient = useQueryClient();
  return useQuery(
    ['watcher', query],
    async () => {
      const data = await requestNew({
        url: 'watch',
        method: 'POST',
        params: {
          type: 'task',
          id: query[1],
          team_member_ids: [query[0]]
        }
      });
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['watcher']);
      },
      initialData: queryClient.getQueryData(['watcher', query]),
      enabled: query[0] != null
    }
  );
};

//Remove watcher to task
export const RemoveWatcherService = ({ query }: { query: (string | null | undefined)[] }) => {
  const queryClient = useQueryClient();
  return useQuery(
    ['watcher', query],
    async () => {
      const data = await requestNew({
        url: 'watch/remove',
        method: 'POST',
        params: {
          type: 'task',
          id: query[1],
          team_member_ids: [query[0]]
        }
      });
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['watcher']);
      },
      initialData: queryClient.getQueryData(['watcher', query]),
      enabled: query[0] != null
    }
  );
};

// Assign Checklist Item
const AssignTask = ({
  taskId,
  team_member_id
}: {
  taskId: string | null | undefined;
  team_member_id: string | null;
}) => {
  const request = requestNew({
    url: '/assignee/assign',
    method: 'POST',
    params: {
      team_member_id: team_member_id,
      id: taskId,
      type: 'task'
    }
  });
  return request;
};

export const UseTaskAssignService = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation(AssignTask, {
    onSuccess: () => {
      dispatch(setToggleAssignCurrentTaskId(null));
      queryClient.invalidateQueries(['task']);
    }
  });
};

// Unassign Task
const UnassignTask = ({
  taskId,
  team_member_id
}: {
  taskId: string | null | undefined;
  team_member_id: string | null;
}) => {
  const request = requestNew({
    url: '/assignee/unassign',
    method: 'POST',
    params: {
      team_member_id: team_member_id,
      id: taskId,
      type: 'task'
    }
  });
  return request;
};

export const UseUnassignTask = () => {
  const queryClient = useQueryClient();

  const dispatch = useAppDispatch();
  return useMutation(UnassignTask, {
    onSuccess: () => {
      dispatch(setToggleAssignCurrentTaskId(null));
      queryClient.invalidateQueries(['task']);
    }
  });
};
