import requestNew from '../../app/requestNew';
import {
  IFullTaskRes,
  ITaskFullList,
  ITaskListRes,
  ITaskRes,
  ITimeEntriesRes,
  ITimeEntryParams,
  IUserCalendarParams,
  IUserSettingsRes,
  IUserSettingsUpdateRes,
  TaskId,
  newTaskDataRes
} from './interface.tasks';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  setScreenRecording,
  setScreenRecordingMedia,
  setSelectedListIds,
  setSelectedTasksArray,
  setSubtasks,
  setTasks,
  setTimerStatus,
  setToggleAssignCurrentTaskId,
  setTriggerSaveSettings,
  setTriggerSaveSettingsModal,
  setUpdateTimerDuration
} from './taskSlice';
import { UpdateTaskProps } from './interface.tasks';
import RecordRTC from 'recordrtc';
import { useUploadRecording } from '../workspace/workspaceService';
import { useParams } from 'react-router-dom';
import { setPickedDateState, setTimerLastMemory, toggleMute } from '../workspace/workspaceSlice';
import { generateFilters } from '../../components/TasksHeader/lib/generateFilters';
import Duration from '../../utils/TimerDuration';
import { EntityType } from '../../utils/EntityTypes/EntityType';
import {
  taskAssignessUpdateManager,
  taskDateUpdateManager,
  taskMoveManager,
  taskPriorityUpdateManager,
  taskStatusUpdateManager
} from '../../managers/Task';
import { ITeamMembersAndGroup } from '../settings/teamMembersAndGroups.interfaces';
import { useDispatch } from 'react-redux';
import { runTimer } from '../../utils/TimerCounter';

//edit a custom field
export const UseEditCustomFieldService = (data: {
  id?: string | null;
  name?: string;
  options?: { name: string; color: string }[];
  color?: string | null;
}) => {
  const response = requestNew({
    url: `custom-fields/${data.id}`,
    method: 'PUT',
    data: {
      name: data.name,
      color: data.color === null ? undefined : data.color,
      options: data.options
    }
  });
  return response;
};

export const UseSaveTaskFilters = () => {
  const { filters } = generateFilters();
  const mutation = useMutation(async ({ key }: { key: string }) => {
    const data = requestNew({
      url: 'settings',
      method: 'PUT',
      data: {
        key,
        value: filters
      }
    });
    return data;
  });

  return mutation;
};

export const moveTask = (data: { taskId: TaskId; moveAfterId?: string; listId?: string; overType: string }) => {
  const { taskId, listId, overType, moveAfterId } = data;
  let requestData = {};
  if (overType === EntityType.list) {
    requestData = {
      list_id: listId
    };
  } else if (overType === EntityType.task && moveAfterId) {
    requestData = {
      move_after_id: moveAfterId
    };
  } else {
    requestData = { parent_id: listId };
  }
  const response = requestNew({
    url: 'tasks/' + taskId + '/move',
    method: 'POST',
    data: requestData
  });
  return response;
};

export const useSaveData = () => {
  const mutation = useMutation(
    async ({ key, value }: { key: string; value: IUserCalendarParams } | ITimeEntryParams) => {
      const data = requestNew<IUserSettingsUpdateRes>({
        url: 'settings',
        method: 'PUT',
        data: {
          key,
          value
        }
      });
      return (await data).data;
    }
  );

  return mutation;
};

export const useGetUserSettingsData = ({ keys }: { keys: string }) => {
  return useQuery(['calendar-data'], async () => {
    const data = await requestNew<IUserSettingsRes>({
      url: 'settings',
      method: 'GET',
      params: {
        key: keys
      }
    });

    return data;
  });
};

export const useMoveTask = () => {
  const dispath = useDispatch();
  const queryClient = useQueryClient();
  const { hubId, walletId, listId } = useParams();

  const id = hubId ?? walletId ?? listId;

  const { draggableTask, dragOverTask } = useAppSelector((state) => state.list);
  const { tasks, subtasks } = useAppSelector((state) => state.task);

  return useMutation(moveTask, {
    onSuccess: () => {
      const { updatedTasks, updatedSubtasks } = taskMoveManager(
        draggableTask as ITaskFullList,
        dragOverTask as ITaskFullList,
        tasks,
        subtasks
      );
      if (!draggableTask?.parent_id) {
        dispath(setTasks(updatedTasks));
      } else {
        dispath(setSubtasks(updatedSubtasks));
      }
      queryClient.invalidateQueries(['lists']);
      queryClient.invalidateQueries(['task']);
      queryClient.invalidateQueries(['retrieve', id ?? 'root', 'tree']);
    }
  });
};

const addTask = (data: {
  name: string;
  id: string;
  isListParent: boolean;
  task_status_id: string;
  assignees?: string[];
}) => {
  const { name, id, isListParent, task_status_id, assignees } = data;

  const parentId = isListParent ? { list_id: id } : { parent_id: id };

  const response = requestNew<newTaskDataRes>({
    url: 'tasks',
    method: 'POST',
    data: {
      name,
      ...parentId,
      assignees,
      task_status_id
    }
  });
  return response;
};

export const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation(addTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(['task']);
      queryClient.invalidateQueries(['sub-tasks']);
    }
  });
};

export const deleteTask = (data: { selectedTasksArray: string[] }) => {
  const request = requestNew({
    url: 'tasks/multiple/delete',
    method: 'POST',
    data: {
      ids: data.selectedTasksArray
    }
  });
  return request;
};

export const createTaskService = (data: {
  name: string;
  task_status_id?: string;
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
      task_status_id: data.task_status_id,
      list_id: data.showMenuDropdown || data.getListId,
      parent_id: data.parentTaskId
    }
  });
  return response;
};

export const UseGetFullTaskList = ({
  itemId,
  itemType
}: {
  itemId: string | undefined | null;
  itemType: string | null | undefined;
}) => {
  const queryClient = useQueryClient();

  const hub_id = itemType === EntityType.hub || itemType === EntityType.subHub ? itemId : null;
  const wallet_id = itemType === EntityType.wallet || itemType === EntityType.subWallet ? itemId : null;
  const { sortAbleArr } = useAppSelector((state) => state.task);
  const sortArrUpdate = sortAbleArr.length <= 0 ? null : sortAbleArr;

  const { filters } = generateFilters();

  return useInfiniteQuery(
    ['task', itemId, itemType, filters, sortArrUpdate],
    async ({ pageParam = 0 }: { pageParam?: number }) => {
      return requestNew<IFullTaskRes>({
        url: 'tasks/full-list',
        method: 'POST',
        params: {
          page: pageParam,
          hub_id,
          wallet_id
        },
        data: {
          filters,
          sorting: sortArrUpdate
        }
      });
    },
    {
      keepPreviousData: true,
      enabled: !!hub_id || !!wallet_id,
      onSuccess: (data) => {
        data.pages.map((page) => page.data.tasks.map((task) => queryClient.setQueryData(['task', task.id], task)));
      },
      getNextPageParam: (lastPage) => {
        if (lastPage?.data?.paginator.has_more_pages) {
          return Number(lastPage.data.paginator.page) + 1;
        }

        return false;
      },
      cacheTime: 0
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
      enabled: activeItemType === EntityType.task && task_id != null
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

export const UseUpdateTaskService = ({
  task_id,
  name,
  description
}: {
  task_id: string | null | undefined;
  name: string;
  description?: string | null;
}) => {
  const url = `tasks/${task_id}`;
  const response = requestNew({
    url,
    method: 'PUT',
    params: {
      name: name,
      description: description
    }
  });
  return response;
};

export const UseUpdateTaskStatusService = ({ task_id, statusDataUpdate }: UpdateTaskProps) => {
  const dispatch = useAppDispatch();

  const { selectedTaskParentId, tasks, subtasks, selectedTaskType } = useAppSelector((state) => state.task);

  return useQuery(
    ['task', { task_id, statusDataUpdate }],
    async () => {
      const data = requestNew<ITaskRes>({
        url: `tasks/${task_id}`,
        method: 'PUT',
        params: {
          task_status_id: statusDataUpdate
        }
      });
      return data;
    },
    {
      enabled: !!task_id && !!statusDataUpdate,
      cacheTime: 0,
      onSuccess: (data) => {
        if (selectedTaskParentId) {
          const updatedTasks = taskStatusUpdateManager(
            task_id as string,
            selectedTaskParentId as string,
            selectedTaskType === EntityType.task ? tasks : subtasks,
            data.data.task.status
          );
          if (selectedTaskType === EntityType.task) {
            dispatch(setTasks(updatedTasks));
          } else {
            dispatch(setSubtasks(updatedTasks));
          }
        }
        dispatch(setSelectedTasksArray([]));
        dispatch(setSelectedListIds([]));
      }
    }
  );
};
export const UseUpdateTaskDateService = ({
  task_id,
  taskDate,
  listIds,
  setTaskId
}: {
  task_id: string;
  taskDate: string;
  listIds: string[];
  setTaskId: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const dispatch = useAppDispatch();

  const { pickedDateState } = useAppSelector((state) => state.workspace);
  const { tasks, subtasks, selectedTaskType } = useAppSelector((state) => state.task);

  return useQuery(
    ['task', { task_id, taskDate }],
    async () => {
      const data = requestNew<ITaskRes>({
        url: `tasks/${task_id}`,
        method: 'PUT',
        data: {
          start_date: taskDate
        }
      });
      return data;
    },
    {
      enabled: !!task_id && !!pickedDateState,
      cacheTime: 0,
      onSuccess: (data) => {
        dispatch(setPickedDateState(false));
        setTaskId(null);
        const updatedTasks = taskDateUpdateManager(
          task_id as string,
          listIds as string[],
          selectedTaskType === EntityType.task ? tasks : subtasks,
          'start_date',
          data.data.task.start_date as string
        );
        if (selectedTaskType === EntityType.task) {
          dispatch(setTasks(updatedTasks));
        } else {
          dispatch(setSubtasks(updatedTasks));
        }
      }
    }
  );
};
export const UseUpdateTaskViewSettings = ({
  task_views_id,
  taskDate
}: {
  task_views_id: string;
  taskDate: { [key: string]: boolean };
}) => {
  const { triggerSaveSettings } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();
  return useQuery(
    ['task', { task_views_id, taskDate }],
    async () => {
      const data = requestNew<ITaskRes>({
        url: `task-views/${task_views_id}`,
        method: 'PUT',
        data: {
          view_settings: taskDate
        }
      });
      return data;
    },
    {
      enabled: !!task_views_id && triggerSaveSettings,
      cacheTime: 0,
      onSuccess: () => {
        dispatch(setTriggerSaveSettings(false));
        dispatch(setTriggerSaveSettingsModal(false));
      }
    }
  );
};

export const UseUpdateTaskPrioritiesServices = ({ task_id_array, priorityDataUpdate, listIds }: UpdateTaskProps) => {
  const dispatch = useAppDispatch();

  const { currentTaskPriorityId, tasks, subtasks, selectedTaskType } = useAppSelector((state) => state.task);

  const currentTaskIds = task_id_array?.length ? task_id_array : [currentTaskPriorityId];

  return useQuery(
    ['task', { priorityDataUpdate, listIds, task_id_array }],
    async () => {
      const data = requestNew({
        url: 'tasks/multiple/priority',
        method: 'POST',
        data: {
          ids: currentTaskIds,
          priority: priorityDataUpdate
        }
      });
      return data;
    },
    {
      enabled: !!currentTaskIds.length && !!priorityDataUpdate,
      cacheTime: 0,
      onSuccess: () => {
        if (listIds) {
          const updatedTasks = taskPriorityUpdateManager(
            currentTaskIds as string[],
            listIds as string[],
            selectedTaskType === EntityType.task ? tasks : subtasks,
            priorityDataUpdate as string
          );
          if (selectedTaskType === EntityType.task) {
            dispatch(setTasks(updatedTasks));
          } else {
            dispatch(setSubtasks(updatedTasks));
          }
        }
        dispatch(setSelectedTasksArray([]));
        dispatch(setSelectedListIds([]));
      }
    }
  );
};

export const getTaskListService = (listId: string | null | undefined) => {
  const dispatch = useAppDispatch();
  const { workSpaceId } = useParams();
  const queryClient = useQueryClient();

  const { sortAbleArr } = useAppSelector((state) => state.task);
  const { currentWorkspaceId } = useAppSelector((state) => state.auth);

  const sortArrUpdate = sortAbleArr.length <= 0 ? null : sortAbleArr;

  const fetch = currentWorkspaceId === workSpaceId;

  const { filters } = generateFilters();

  return useInfiniteQuery(
    ['task', listId, { sortArrUpdate, filters }],

    async ({ pageParam = 0 }: { pageParam?: number }) => {
      return requestNew<ITaskListRes>({
        url: 'tasks/list',
        method: 'POST',
        params: {
          list_id: listId,
          page: pageParam
        },
        data: {
          sorting: sortArrUpdate,
          filters
        }
      });
    },
    {
      enabled: fetch,
      onSuccess: (data) => {
        dispatch(setTasks({}));
        data.pages.map((page) => page?.data.tasks.map((task) => queryClient.setQueryData(['task', task.id], task)));
        queryClient.invalidateQueries(['hubs']);
      },
      getNextPageParam: (lastPage) => {
        if (lastPage?.data?.paginator.has_more_pages) {
          return Number(lastPage.data.paginator.page) + 1;
        }
        return false;
      },
      cacheTime: 0
    }
  );
};

export const useSubTasks = (parentId: string) =>
  useQuery(
    ['sub-tasks', parentId],
    () =>
      requestNew<ITaskListRes>({
        url: 'tasks/list',
        method: 'POST',
        params: {
          parent_id: parentId
        }
      }),
    {
      enabled: !!parentId,
      select: (res) => res.data.tasks,
      cacheTime: 0
    }
  );

export const createTimeEntriesService = (data: { queryKey: (string | undefined)[] }) => {
  const taskID = data.queryKey[1];
  const response = requestNew({
    url: 'time-entries/start',
    method: 'POST',
    params: {
      type: EntityType.task,
      id: taskID
    }
  });
  return response;
};

export const createManualTimeEntry = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async ({
      start_date,
      end_date,
      type,
      id,
      description,
      isBillable
    }: {
      start_date: string | undefined;
      end_date: string | undefined;
      type: string | null | undefined;
      id: string | null | undefined;
      description: string | null | undefined;
      isBillable: boolean | null | undefined;
    }) => {
      const response = await requestNew({
        url: 'time-entries',
        method: 'POST',
        data: {
          start_date,
          end_date,
          type,
          id,
          description,
          isBillable
        }
      });
      return response;
    },
    {
      onSuccess: () => queryClient.invalidateQueries(['timeclock'])
    }
  );
  return mutation;
};

export const useCurrentTime = ({ workspaceId }: { workspaceId?: string }) => {
  const dispatch = useAppDispatch();
  const { data, isLoading, isError, refetch } = useQuery(
    ['timeData'],
    async () => {
      const response = await requestNew<
        { data: { time_entry: { start_date: string; model_type: string; model_id: string } } } | undefined
      >({
        method: 'GET',
        url: 'time-entries/current'
      });
      return response;
    },
    {
      onSuccess: (data) => {
        const dateData = data?.data;
        const dateString = dateData?.time_entry;
        if (dateData?.time_entry === null) {
          dispatch(setTimerStatus(false));
          dispatch(setUpdateTimerDuration({ s: 0, m: 0, h: 0 }));
          return;
        } else if (dateString) {
          const { hours, minutes, seconds } = Duration({ dateString });
          dispatch(setTimerStatus(true));
          dispatch(setUpdateTimerDuration({ s: seconds, m: minutes, h: hours }));
          dispatch(
            setTimerLastMemory({
              hubId: dateString.model_type === EntityType.hub ? dateString.model_id : null,
              activeTabId: 6,
              subhubId: dateString.model_type === EntityType.subHub ? dateString.model_id : null,
              listId: dateString.model_type === EntityType.list ? dateString.model_id : null,
              taskId: dateString.model_type === EntityType.task ? dateString.model_id : null,
              workSpaceId: workspaceId
            })
          );
        }
      }
    }
  );
  runTimer({ isRunning: !!data?.data.time_entry });

  return { data, isLoading, isError, refetch };
};

export const StartTimeEntryService = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const mutation = useMutation(
    async (query: { taskId?: string | null; type: string | null | undefined }) => {
      const res = await requestNew({
        url: 'time-entries/start',
        method: 'POST',
        params: {
          type: query.type,
          id: query.taskId
        }
      });
      return res;
    },
    {
      onSuccess: () => queryClient.invalidateQueries(['timeclock']),
      onError: (res: unknown) => {
        if ((res as { data: { message?: { title?: string } } })?.data?.message?.title === 'Timer already started') {
          dispatch(setTimerStatus(true));
        }
      }
    }
  );
  return mutation;
};

export const EndTimeEntriesService = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (data: { id: string | null | undefined; description: string; is_Billable: boolean }) => {
      const response = await requestNew({
        url: 'time-entries/stop',
        method: 'POST',
        params: {
          description: data.description,
          isbillable: data.is_Billable
        }
      });
      return response;
    },
    {
      onSuccess: () => queryClient.invalidateQueries(['timeclock'])
    }
  );

  return mutation;
};

export const GetTimeEntriesService = ({
  itemId,
  trigger,
  is_active,
  page,
  include_filters
}: {
  itemId: string | null | undefined;
  trigger: string | null | undefined;
  is_active?: number;
  page?: number;
  include_filters?: boolean;
  team_member_group_ids?: string[];
}) => {
  const { timeSortArr } = useAppSelector((state) => state.task);
  const updatesortArr = timeSortArr.length === 0 ? null : timeSortArr;
  return useQuery(
    ['timeclock', { itemId: itemId }, updatesortArr, is_active],
    async () => {
      const data = await requestNew<ITimeEntriesRes | undefined>({
        url: 'time-entries',
        method: 'GET',
        params: {
          type: trigger,
          id: itemId,
          team_member_group_ids: null,
          is_active: is_active,
          page,
          include_filters,
          sorting: updatesortArr
        }
      });
      return data;
    },
    {
      enabled: trigger != null,
      keepPreviousData: true
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

export const DeleteTimeEntriesService = (data: { timeEntryDeleteTriggerId: string | null }) => {
  const response = requestNew({
    url: `time-entries/${data.timeEntryDeleteTriggerId}`,
    method: 'DELETE'
  });
  return response;
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
          type: EntityType.task,
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
          type: EntityType.task,
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
  team_member_id,
  teams
}: {
  taskId: string | null | undefined;
  team_member_id: string | null;
  teams: boolean;
}) => {
  const request = requestNew({
    url: teams ? '/group-assignee/assign' : '/assignee/assign',
    method: 'POST',
    data: {
      id: taskId,
      ...(teams ? { team_member_group_id: team_member_id } : { team_member_id }),
      type: EntityType.task
    }
  });
  return request;
};

export const UseTaskAssignService = (taskId: string, user: ITeamMembersAndGroup) => {
  const dispatch = useAppDispatch();

  const { selectedTaskParentId, tasks, subtasks, selectedTaskType } = useAppSelector((state) => state.task);
  return useMutation(AssignTask, {
    onSuccess: () => {
      const updatedTasks = taskAssignessUpdateManager(
        taskId,
        selectedTaskParentId,
        selectedTaskType === EntityType.task ? tasks : subtasks,
        user,
        true
      );
      if (selectedTaskType === EntityType.task) {
        dispatch(setTasks(updatedTasks));
      } else {
        dispatch(setSubtasks(updatedTasks));
      }
      dispatch(setToggleAssignCurrentTaskId(null));
    }
  });
};

// Unassign Task
const UnassignTask = ({
  taskId,
  team_member_id,
  teams
}: {
  taskId: string | null | undefined;
  team_member_id: string | null;
  teams: boolean;
}) => {
  const request = requestNew({
    url: teams ? '/group-assignee/unassign' : '/assignee/unassign',
    method: 'POST',
    data: {
      ...(teams ? { team_member_group_id: team_member_id } : { team_member_id: team_member_id }),
      id: taskId,
      type: EntityType.task
    }
  });
  return request;
};

export const UseTaskUnassignService = (taskId: string, user: ITeamMembersAndGroup) => {
  const dispatch = useAppDispatch();

  const { selectedTaskParentId, tasks, subtasks, selectedTaskType } = useAppSelector((state) => state.task);

  return useMutation(UnassignTask, {
    onSuccess: () => {
      const updatedTasks = taskAssignessUpdateManager(
        taskId,
        selectedTaskParentId,
        selectedTaskType === EntityType.task ? tasks : subtasks,
        user,
        false
      );
      if (selectedTaskType === EntityType.task) {
        dispatch(setTasks(updatedTasks));
      } else {
        dispatch(setSubtasks(updatedTasks));
      }
      dispatch(setToggleAssignCurrentTaskId(null));
    }
  });
};

export const startMediaStream = async () => {
  const mediaDevices = navigator.mediaDevices;
  const audioConstraints: MediaTrackConstraints = {
    echoCancellation: true,
    noiseSuppression: true,
    sampleRate: 44100
  };

  const videoStream: MediaStream = await mediaDevices.getDisplayMedia({
    audio: audioConstraints,
    video: true
  });
  const audioStream: MediaStream = await mediaDevices.getUserMedia({ audio: true });

  const [videoTrack] = videoStream.getVideoTracks();
  const [audioTrack] = audioStream.getAudioTracks();
  const stream = new MediaStream([videoTrack, audioTrack]);

  const recorder = new RecordRTC(stream, { type: 'video' });
  await recorder.startRecording();
  return { recorder, stream };
};

export function useMediaStream() {
  const dispatch = useAppDispatch();
  const { mutateAsync: startStream, isLoading: isStarting } = useMutation(startMediaStream);
  const queryClient = useQueryClient();
  const { activeItemId, activeItemType, isMuted } = useAppSelector((state) => state.workspace);
  const { currentWorkspaceId, accessToken } = useAppSelector((state) => state.auth);
  const { mutate } = useUploadRecording();
  const { stream } = useAppSelector((state) => state.task);

  const handleStartStream = async () => {
    const { stream, recorder } = await startStream();
    stream.getAudioTracks().forEach((track) => {
      track.enabled = false;
    });
    dispatch(setScreenRecording('recording'));
    dispatch(setScreenRecordingMedia({ recorder, stream }));
    return { stream, recorder };
  };

  const handleStopStream = async ({ stream, recorder }: { stream: MediaStream | null; recorder: RecordRTC | null }) => {
    recorder?.stopRecording(async () => {
      const blob: Blob | undefined = recorder?.getBlob();
      if (blob && currentWorkspaceId && accessToken && activeItemId && activeItemType) {
        mutate({
          blob,
          currentWorkspaceId,
          accessToken,
          activeItemId,
          activeItemType
        });
        const tracks = stream?.getTracks();
        if (tracks) {
          tracks.forEach((track) => track.stop());
        }
        // Invalidate React Query
        queryClient.invalidateQueries(['attachments']);
      }
    });

    dispatch(setScreenRecording('idle'));
    const newAction: { recorder: RecordRTC | null; stream: MediaStream | null } = {
      stream: null,
      recorder: null
    };
    dispatch(setScreenRecordingMedia(newAction));
  };

  const handleToggleMute = () => {
    if (stream) {
      const audioTracks = stream.getAudioTracks();
      if (audioTracks.length > 0) {
        audioTracks.map((tracks) => (tracks.enabled = !isMuted)); // Toggle the enabled state of the audio track
        dispatch(toggleMute());
      }
    }
  };

  return {
    handleStartStream,
    handleStopStream,
    handleToggleMute,
    isStarting
  };
}
