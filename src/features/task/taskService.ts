import requestNew from '../../app/requestNew';
import { IFullTaskRes, ITaskListRes, ITaskRes, ITimeEntriesRes, TaskId } from './interface.tasks';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setScreenRecording, setScreenRecordingMedia, setTimerStatus, setToggleAssignCurrentTaskId } from './taskSlice';
import { UpdateTaskProps } from './interface.tasks';
import { IWatchersRes } from '../general/watchers/watchers.interface';
import RecordRTC from 'recordrtc';
import { useUploadRecording } from '../workspace/workspaceService';
import { useParams } from 'react-router-dom';
import { toggleMute } from '../workspace/workspaceSlice';
import { generateFilters } from '../../components/TasksHeader/lib/generateFilters';

const moveTask = (data: { taskId: TaskId; listId: string }) => {
  const { taskId, listId } = data;

  const response = requestNew({
    url: 'tasks/' + taskId + '/move',
    method: 'POST',
    data: {
      list_id: listId
    }
  });
  return response;
};

export const useMoveTask = () => {
  const queryClient = useQueryClient();
  const { hubId, walletId, listId } = useParams();

  const id = hubId ?? walletId ?? listId;
  const type = hubId ? 'hub' : walletId ? 'wallet' : 'list';

  const { filterTaskByAssigneeIds: assigneeUserId } = useAppSelector((state) => state.task);
  const { sortAbleArr } = useAppSelector((state) => state.task);
  const sortArrUpdate = sortAbleArr.length <= 0 ? null : sortAbleArr;

  const { filters } = generateFilters();

  return useMutation(moveTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(['lists']);
      queryClient.invalidateQueries(['task', { listId, assigneeUserId, sortArrUpdate, filters }]);
      queryClient.invalidateQueries(['task', id, type]);
      queryClient.invalidateQueries(['retrieve', id ?? 'root', 'tree']);
      queryClient.invalidateQueries(['retrieve', id ?? 'root', undefined]);
    }
  });
};

const addTask = (data: { name: string; id: string; isListParent: boolean }) => {
  const { name, id, isListParent } = data;

  const parentId = isListParent ? { list_id: id } : { parent_id: id };

  const response = requestNew({
    url: 'tasks',
    method: 'POST',
    data: {
      name,
      ...parentId
    }
  });
  return response;
};

export const useAddTask = (parentTaskId?: string) => {
  const queryClient = useQueryClient();
  const { hubId, walletId, listId } = useParams();

  const id = hubId ?? walletId ?? listId;
  const type = hubId ? 'hub' : walletId ? 'wallet' : 'list';

  return useMutation(addTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(['task', id, type]);
      queryClient.invalidateQueries(['sub-tasks', parentTaskId]);
    }
  });
};

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
  // const enabled = itemType == 'hub' || itemType == 'subhub' || itemType == 'wallet' || itemType == 'subwallet';
  const hub_id = itemType === 'hub' || itemType === 'subhub' ? itemId : null;
  const wallet_id = itemType == 'wallet' || itemType == 'subwallet' ? itemId : null;
  const assignees = assigneeUserId ? (assigneeUserId == 'unassigned' ? null : [assigneeUserId]) : null;
  const { sortAbleArr } = useAppSelector((state) => state.task);
  const sortArrUpdate = sortAbleArr.length <= 0 ? null : sortAbleArr;

  const { workSpaceId } = useParams();
  const { currentWorkspaceId } = useAppSelector((state) => state.auth);
  const fetch = currentWorkspaceId == workSpaceId;

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
          wallet_id,
          assignees
        },
        data: {
          filters,
          sorting: sortArrUpdate
        }
      });
    },
    {
      keepPreviousData: true,
      enabled: fetch,
      onSuccess: (data) => {
        data.pages.map((page) => page.data.tasks.map((task) => queryClient.setQueryData(['task', task.id], task)));
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

export const UseUpdateTaskStatusService2 = () => {
  const queryClient = useQueryClient();
  return useMutation(updateTaskStatusService, {
    onSuccess: () => {
      queryClient.invalidateQueries(['task']);
      queryClient.invalidateQueries(['sub-tasks']);
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
  const queryClient = useQueryClient();
  const assignees = assigneeUserId ? (assigneeUserId == 'unassigned' ? null : [assigneeUserId]) : null;
  const { sortAbleArr } = useAppSelector((state) => state.task);
  const sortArrUpdate = sortAbleArr.length <= 0 ? null : sortAbleArr;

  const { workSpaceId } = useParams();
  const { currentWorkspaceId } = useAppSelector((state) => state.auth);
  const fetch = currentWorkspaceId == workSpaceId;

  const { filters } = generateFilters();

  return useInfiniteQuery(
    ['task', { listId, assigneeUserId, sortArrUpdate, filters }],

    async ({ pageParam = 0 }: { pageParam?: number }) => {
      return requestNew<ITaskListRes>({
        url: 'tasks/list',
        method: 'POST',
        params: {
          list_id: listId,
          page: pageParam,
          assignees
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
        data.pages.map((page) => page?.data.tasks.map((task) => queryClient.setQueryData(['task', task.id], task)));
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
    { enabled: !!parentId, select: (res) => res.data.tasks }
  );

export const getTaskListService2 = (query: { parentId: string | null | undefined }) => {
  const { workSpaceId } = useParams();
  const { currentWorkspaceId } = useAppSelector((state) => state.auth);
  const fetch = currentWorkspaceId == workSpaceId;

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
      enabled: query.parentId != null && fetch,
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
  trigger
}: {
  itemId: string | null | undefined;
  trigger: string | null | undefined;
}) => {
  const { timeSortArr } = useAppSelector((state) => state.task);
  const updatesortArr = timeSortArr.length === 0 ? null : timeSortArr;
  return useQuery(
    ['timeclock', { itemId: itemId }, updatesortArr],
    async () => {
      const data = await requestNew<ITimeEntriesRes | undefined>({
        url: 'time-entries',
        method: 'GET',
        params: {
          type: trigger,
          id: itemId,
          team_member_ids: updatesortArr
        }
      });
      return data;
    },
    {
      enabled: trigger != null
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
    data: {
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
      queryClient.invalidateQueries(['sub-tasks']);
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
    data: {
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
