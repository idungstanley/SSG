import requestNew from '../../app/requestNew';
import {
  IAttachmentsRes,
  ICheckListRes,
  IFullTaskRes,
  ILineUpTaskRes,
  ITaskCreateProps,
  ITaskFullList,
  ITaskListRes,
  ITaskRecurResponse,
  ITaskRes,
  ITimeEntriesRes,
  ITimeEntryParams,
  IUserCalendarParams,
  IUserSettingsRes,
  IUserSettingsUpdateRes,
  Task,
  TaskId,
  newTaskDataRes
} from './interface.tasks';
import { QueryClient, useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  SortOption,
  setAssignOnHoverState,
  setCurrentTeamMemberId,
  setDuplicateTaskObj,
  setGlobalSearchResult,
  setNewTaskPriority,
  setNewTaskStatus,
  setRootTaskIds,
  setScreenRecording,
  setScreenRecordingMedia,
  setSelectedListIds,
  setSelectedTasksArray,
  setSubtasks,
  setTasks,
  setTimeAssignee,
  setTimeAssigneeFilter,
  setTimerStatus,
  setToggleAssignCurrentTaskId,
  setTriggerAutoSave,
  setTriggerSaveSettings,
  setTriggerSaveSettingsModal,
  setUpdateTimerDuration
} from './taskSlice';
import { UpdateTaskProps } from './interface.tasks';
import { useUploadRecording } from '../workspace/workspaceService';
import { useParams } from 'react-router-dom';
import { setPickedDateState, setTimerLastMemory, toggleMute } from '../workspace/workspaceSlice';
import { generateFilters, generateFiltersSubtasks } from '../../components/TasksHeader/lib/generateFilters';
import Duration from '../../utils/TimerDuration';
import { EntityType } from '../../utils/EntityTypes/EntityType';
import {
  addNewTaskManager,
  findCurrentTaskManager,
  multipleTasksDateUpdateManager,
  taskAssignessUpdateManager,
  taskDateUpdateManager,
  taskMoveToListManager,
  taskMoveToSubtaskManager,
  taskPriorityUpdateManager,
  taskStatusUpdateManager,
  taskWatchersUpdateManager,
  updateTaskSubtasksCountManager
} from '../../managers/Task';
import { ITeamMembersAndGroup } from '../settings/teamMembersAndGroups.interfaces';
import { useDispatch } from 'react-redux';
import { updateListTasksCountManager } from '../../managers/List';
import { getHub, setStatusesToMatch } from '../hubs/hubSlice';
import { setFilteredResults } from '../search/searchSlice';
import { addNewSubtaskManager } from '../../managers/Subtask';
import { IList } from '../hubs/hubs.interfaces';
import { setDragOverItem, setDragOverList, setDragOverTask, setDraggableItem } from '../list/listSlice';
import { FilterWithId, FiltersOption } from '../../components/TasksHeader/ui/Filter/types/filters';
import { pilotTabs } from '../../app/constants/pilotTabs';
import { setChecklists } from './checklist/checklistSlice';
import { StatusProps } from '../../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';
import { setMatchData } from '../general/prompt/promptSlice';
import { MultipleTaskStatuses } from '../../pages/workspace/tasks/multipleStatuses/MultipleStatuses';

export const useDeleteAttachment = ({ id }: { id: string }) => {
  const data = requestNew({
    url: `attachments/${id}`,
    method: 'DELETE'
  });
  return data;
};

export const useGetAttachments = (query: {
  activeItemId: string | null | undefined;
  activeItemType?: string | null;
}) => {
  const { activeItemType, activeItemId } = query;
  const fetch = activeItemType && activeItemId ? true : false;
  return useQuery(
    ['attachments', { query }],
    async () => {
      const data = await requestNew<IAttachmentsRes>({
        url: `attachments?type=${activeItemType}&id=${activeItemId}`,
        method: 'GET'
      });
      return data;
    },
    {
      enabled: fetch,
      cacheTime: 0
    }
  );
};

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

export const multipleTaskMove = (data: {
  taskIds: TaskId[];
  moveAfterId?: string;
  listId?: string;
  overType: string;
  status_matches?: { from: string; to: string }[];
}) => {
  const { taskIds, listId, overType, moveAfterId } = data;
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
    url: 'tasks/multiple/move',
    method: 'POST',
    data: { ...requestData, ids: taskIds, status_matches: data.status_matches }
  });
  return response;
};

interface ErrorMultipleMoveResponse {
  data: {
    data: {
      allowed_statuses: StatusProps[];
      match_status: StatusProps[];
    };
  };
}

export const useMultipleTaskMove = (list?: IList, type?: 'id_only') => {
  const dispatch = useDispatch();

  const { draggableTask, dragOverList } = useAppSelector((state) => state.list);
  const { tasks, subtasks, selectedTasksArray } = useAppSelector((state) => state.task);
  const { hub } = useAppSelector((state) => state.hub);

  return useMutation(multipleTaskMove, {
    onSuccess: () => {
      if (type === 'id_only') {
        let newTasks = { ...tasks };
        let newSubtasks = { ...subtasks };
        let newTree = [...hub];
        selectedTasksArray.forEach((id) => {
          const currentTask = findCurrentTaskManager(id, tasks, subtasks);
          const { updatedTasks, updatedSubtasks, updatedTree } = taskMoveToListManager(
            currentTask as ITaskFullList,
            list as IList,
            newTasks,
            newSubtasks,
            newTree,
            selectedTasksArray
          );
          newTasks = updatedTasks;
          newSubtasks = updatedSubtasks;
          newTree = updatedTree;
        });
        dispatch(setTasks(newTasks));
        dispatch(setSubtasks(newSubtasks));
        dispatch(getHub(newTree));
        dispatch(setFilteredResults(newTree));
      }
      if (dragOverList) {
        // move to list
        const { updatedTasks, updatedSubtasks, updatedTree } = taskMoveToListManager(
          draggableTask as ITaskFullList,
          dragOverList as IList,
          tasks,
          subtasks,
          hub,
          selectedTasksArray
        );
        dispatch(setTasks(updatedTasks));
        dispatch(setSubtasks(updatedSubtasks));
        dispatch(getHub(updatedTree));
        dispatch(setFilteredResults(updatedTree));
      }
      dispatch(setSelectedTasksArray([]));
      dispatch(setDraggableItem(null));
      dispatch(setDragOverList(null));
      dispatch(setDragOverTask(null));
    },
    onError: (err: ErrorMultipleMoveResponse) => {
      const matchData = err.data.data.match_status;
      if (matchData) {
        dispatch(setMatchData(matchData));
        dispatch(setStatusesToMatch(err.data.data.allowed_statuses));
      }
    }
  });
};

export const moveTask = (data: {
  taskId: TaskId;
  moveAfterId?: string;
  listId?: string;
  overType: string;
  status_from?: string;
  status_to?: string;
}) => {
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
    data: {
      ...requestData,
      status_from: data.status_from,
      status_to: data.status_to
    }
  });
  return response;
};

interface ErrorMoveResponse {
  data: {
    data: {
      available_task_statuses: StatusProps[];
      status: StatusProps;
    };
  };
}

export const useMoveTask = () => {
  const dispatch = useDispatch();

  const { draggableTask, dragOverTask, dragOverList } = useAppSelector((state) => state.list);
  const { tasks, subtasks } = useAppSelector((state) => state.task);
  const { hub } = useAppSelector((state) => state.hub);

  return useMutation(moveTask, {
    onSuccess: () => {
      if (dragOverList) {
        // move to list
        const { updatedTasks, updatedSubtasks, updatedTree } = taskMoveToListManager(
          draggableTask as ITaskFullList,
          dragOverList as IList,
          tasks,
          subtasks,
          hub
        );
        dispatch(setTasks(updatedTasks));
        dispatch(setSubtasks(updatedSubtasks));
        dispatch(getHub(updatedTree));
        dispatch(setFilteredResults(updatedTree));
      }
      if (dragOverTask) {
        // move like sub
        const { updatedTasks, updatedSubtasks, updatedTree } = taskMoveToSubtaskManager(
          draggableTask as ITaskFullList,
          dragOverTask as ITaskFullList,
          tasks,
          subtasks,
          hub
        );
        dispatch(setTasks(updatedTasks));
        dispatch(setSubtasks(updatedSubtasks));
        dispatch(getHub(updatedTree));
        dispatch(setFilteredResults(updatedTree));
      }
      dispatch(setDraggableItem(null));
      dispatch(setDragOverItem(null));
      dispatch(setDragOverList(null));
      dispatch(setDragOverTask(null));
    },
    onError: (err: ErrorMoveResponse) => {
      const matchData = err.data.data.status;
      if (matchData) {
        dispatch(setMatchData([matchData]));
        dispatch(setStatusesToMatch(err.data.data.available_task_statuses));
      }
    }
  });
};

const addTask = (data: {
  name: string;
  id: string;
  isListParent: boolean;
  task_status_id: string;
  assignees?: string[];
  newTaskPriority?: string;
}) => {
  const { name, id, isListParent, task_status_id, assignees, newTaskPriority: priority } = data;

  const parentId = isListParent ? { list_id: id } : { parent_id: id };

  const response = requestNew<newTaskDataRes>({
    url: 'tasks',
    method: 'POST',
    data: {
      name,
      ...parentId,
      assignees,
      task_status_id,
      priority
    }
  });
  return response;
};

export const useAddTask = (task: Task) => {
  const dispatch = useAppDispatch();

  const { tasks, subtasks } = useAppSelector((state) => state.task);
  const { hub } = useAppSelector((state) => state.hub);

  return useMutation(addTask, {
    onSuccess: (data) => {
      dispatch(setNewTaskStatus(null));
      dispatch(setNewTaskPriority('normal'));
      if (data.data.task.parent_id) {
        // add subtask
        const updatedSubtasks = addNewSubtaskManager(
          subtasks,
          data.data.task as ITaskFullList,
          task.custom_field_columns,
          task.task_statuses
        );
        dispatch(setSubtasks(updatedSubtasks));
        const parentId = data.data.task.parent_id;
        const updatedTasks = updateTaskSubtasksCountManager(
          parentId as string,
          tasks,
          updatedSubtasks[parentId].length
        );
        dispatch(setTasks(updatedTasks));
      } else {
        // add task
        const updatedTasks = addNewTaskManager(
          tasks,
          data.data.task as ITaskFullList,
          task.custom_field_columns || [],
          task.task_statuses
        );
        dispatch(setTasks(updatedTasks));
        const listId = data.data.task.list_id;
        const updatedTree = updateListTasksCountManager(listId as string, hub, updatedTasks[listId].length);
        dispatch(getHub(updatedTree));
        dispatch(setFilteredResults(updatedTree));
      }
    }
  });
};

const duplicateTask = (data: {
  task_name: string;
  task_id: string;
  list_id: string;
  is_everything: boolean;
  copy?: string[];
}) => {
  const { task_name, task_id, list_id, is_everything, copy } = data;

  const availableFilter = copy?.filter((item) => {
    return item !== 'everything';
  });

  const custom_is_everything = copy?.includes('everything');

  const response = requestNew<newTaskDataRes>({
    url: `tasks/${task_id}/duplicate`,
    method: 'POST',
    data: {
      name: task_name,
      list_id,
      is_everything: copy?.length ? custom_is_everything : is_everything,
      copy: custom_is_everything ? null : availableFilter
    }
  });
  return response;
};

export const useDuplicateTask = (task?: Task) => {
  const { duplicateTaskObj } = useAppSelector((state) => state.task);
  const { tasks } = useAppSelector((state) => state.task);
  const { hub } = useAppSelector((state) => state.hub);

  const dispatch = useAppDispatch();
  return useMutation(duplicateTask, {
    onSuccess: (data) => {
      dispatch(setDuplicateTaskObj({ ...duplicateTaskObj, popDuplicateTaskModal: true }));

      const updatedTasks = addNewTaskManager(
        tasks,
        data.data.task as ITaskFullList,
        task?.custom_field_columns || [],
        task?.task_statuses || []
      );
      dispatch(setTasks(updatedTasks));
      const listId = data.data.task.list_id;
      const updatedTree = updateListTasksCountManager(listId as string, hub, updatedTasks[listId].length);
      dispatch(getHub(updatedTree));
      dispatch(setFilteredResults(updatedTree));
      dispatch(setSelectedTasksArray([]));
    }
  });
};

const multipleDuplicateTasks = (data: { ids: string[]; list_id: string; is_everything: boolean; copy?: string[] }) => {
  const { ids, list_id, is_everything, copy } = data;

  const custom_is_everything = copy?.includes('everything');

  const response = requestNew({
    url: 'tasks/multiple/duplicate',
    method: 'POST',
    data: {
      ids,
      list_id,
      is_everything: copy?.length ? custom_is_everything : is_everything
    }
  });
  return response;
};

export const useMultipleDuplicateTasks = (list: IList) => {
  const dispatch = useAppDispatch();

  const { duplicateTaskObj, tasks, subtasks, selectedTasksArray } = useAppSelector((state) => state.task);
  const { hub } = useAppSelector((state) => state.hub);

  return useMutation(multipleDuplicateTasks, {
    onSuccess: () => {
      dispatch(setDuplicateTaskObj({ ...duplicateTaskObj, popDuplicateTaskModal: true }));
      let updatedTasks = { ...tasks };
      let updatedSubtasks = { ...subtasks };
      selectedTasksArray.forEach((id) => {
        let currentTask = findCurrentTaskManager(id, tasks, subtasks);
        if (currentTask) {
          currentTask = {
            ...currentTask,
            list: list,
            list_id: list.id
          };
          if (currentTask.parent_id) {
            updatedSubtasks = addNewSubtaskManager(
              updatedSubtasks,
              currentTask as ITaskFullList,
              currentTask?.custom_field_columns || [],
              currentTask?.task_statuses || []
            );
          } else {
            updatedTasks = addNewTaskManager(
              updatedTasks,
              currentTask as ITaskFullList,
              currentTask?.custom_field_columns || [],
              currentTask?.task_statuses || []
            );
          }
        }
      });
      dispatch(setTasks(updatedTasks));
      dispatch(setSubtasks(updatedSubtasks));
      const listId = list.id;
      const updatedTree = updateListTasksCountManager(listId as string, hub, updatedTasks[listId].length);
      dispatch(getHub(updatedTree));
      dispatch(setFilteredResults(updatedTree));
      dispatch(setSelectedTasksArray([]));
    }
  });
};

export const archiveTask = (data: { selectedTasksArray: string[] }) => {
  const request = requestNew({
    url: 'tasks/multiple/archive',
    method: 'POST',
    data: {
      ids: data.selectedTasksArray
    }
  });
  return request;
};

export const unarchiveTask = (data: { selectedTasksArray: string[] }) => {
  const request = requestNew({
    url: 'tasks/multiple/unarchive',
    method: 'POST',
    data: {
      ids: data.selectedTasksArray
    }
  });
  return request;
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

interface ITasksStatusesRes {
  data: {
    statuses: MultipleTaskStatuses[];
  };
}

export const getTasksStatuses = (selectedTasksArray: string[], anchorEl: HTMLElement | null) => {
  return useQuery(
    [selectedTasksArray],
    async () => {
      const request = await requestNew<ITasksStatusesRes>({
        url: 'tasks/multiple/get-statuses',
        method: 'POST',
        data: {
          ids: selectedTasksArray
        }
      });
      return request?.data.statuses;
    },
    {
      enabled: !!selectedTasksArray.length && !!anchorEl,
      cacheTime: 0
    }
  );
};

export const multipleUpdateStatus = (data: { ids: string[]; status: string }) => {
  const { ids, status } = data;
  const response = requestNew({
    url: 'tasks/multiple/statuses',
    method: 'POST',
    data: {
      ids,
      status
    }
  });
  return response;
};

export const useMultipleUpdateStatus = () => {
  const queryClient = useQueryClient();

  return useMutation(multipleUpdateStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries(['task']);
    }
  });
};

export const addNewField = (data: { ids: string[]; custom_field_id: string; values: string }) => {
  const { ids, custom_field_id, values } = data;
  const request = requestNew({
    url: 'tasks/multiple/custom-fields',
    method: 'POST',
    data: {
      ids,
      custom_field_id,
      values: [{ value: values }]
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

export const UseGetEverythingTasks = () => {
  const queryClient = useQueryClient();

  const { draggableItemId } = useAppSelector((state) => state.list);

  const { sortAbleArr, toggleAllSubtask, separateSubtasksMode, splitSubTaskState, isFiltersUpdated } = useAppSelector(
    (state) => state.task
  );
  const sortArrUpdate = sortAbleArr.length <= 0 ? null : sortAbleArr;

  const { filters } = generateFilters();

  return useInfiniteQuery(
    [
      'task',
      filters,
      isFiltersUpdated,
      sortArrUpdate,
      draggableItemId,
      toggleAllSubtask,
      separateSubtasksMode,
      splitSubTaskState
    ],
    async ({ pageParam = 0 }: { pageParam?: number }) => {
      return requestNew<IFullTaskRes>({
        url: 'tasks/everything',
        method: 'POST',
        data: {
          filters,
          sorting: sortArrUpdate,
          expand_all: toggleAllSubtask || separateSubtasksMode || splitSubTaskState ? 1 : 0,
          page: pageParam
        }
      });
    },
    {
      enabled: location.pathname.includes('everything') && !draggableItemId && isFiltersUpdated,
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

export const UseGetFullTaskList = ({
  itemId,
  itemType
}: {
  itemId: string | undefined | null;
  itemType: string | null | undefined;
}) => {
  const queryClient = useQueryClient();

  // const { draggableItemId } = useAppSelector((state) => state.list);

  const hub_id = itemType === EntityType.hub || itemType === EntityType.subHub ? itemId : null;
  const wallet_id = itemType === EntityType.wallet || itemType === EntityType.subWallet ? itemId : null;
  const { sortAbleArr, toggleAllSubtask, separateSubtasksMode, splitSubTaskState, isFiltersUpdated } = useAppSelector(
    (state) => state.task
  );
  const sortArrUpdate = sortAbleArr.length <= 0 ? null : sortAbleArr;

  const { filters } = generateFilters();

  return useInfiniteQuery(
    [
      'task',
      itemId,
      itemType,
      filters,
      isFiltersUpdated,
      sortArrUpdate,
      // draggableItemId,
      toggleAllSubtask,
      separateSubtasksMode,
      splitSubTaskState
    ],
    async ({ pageParam = 0 }: { pageParam?: number }) => {
      return requestNew<IFullTaskRes>({
        url: 'tasks/full-list',
        method: 'POST',
        data: {
          filters,
          sorting: sortArrUpdate,
          expand_all: toggleAllSubtask || separateSubtasksMode || splitSubTaskState ? 1 : 0,
          page: pageParam,
          hub_id,
          wallet_id
        }
      });
    },
    {
      enabled: (!!hub_id || !!wallet_id) && isFiltersUpdated,
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
  const dispatch = useAppDispatch();
  return useQuery(
    ['task', { task_id: task_id }],
    async () => {
      const data = await requestNew<ITaskRes | undefined>({
        url: `tasks/${task_id}`,
        method: 'GET',
        params: { include_root_ids: 1 }
      });
      return data;
    },
    {
      // enabled: false
      onSuccess: (data) => {
        dispatch(setRootTaskIds(data?.data.task.root_task_ids));
        dispatch(setChecklists(data?.data.task.checklists as ICheckListRes[]));
      },
      enabled: task_id != null,
      cacheTime: 0
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
        data: {
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
    data: {
      name: name,
      description: description
    }
  });
  return response;
};

export const UseUpdateTaskStatusService = ({ task_id, statusDataUpdate }: UpdateTaskProps) => {
  const dispatch = useAppDispatch();

  const { selectedTaskParentId, tasks, subtasks, selectedTaskType, currentTaskStatusId } = useAppSelector(
    (state) => state.task
  );

  return useQuery(
    ['task', { task_id, statusDataUpdate }],
    async () => {
      const data = requestNew<ITaskRes>({
        url: `tasks/${task_id}`,
        method: 'PUT',
        data: {
          task_status_id: statusDataUpdate
        }
      });
      return data;
    },
    {
      enabled: !!task_id && !!statusDataUpdate && currentTaskStatusId != '0',
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
  type,
  setTaskId,
  setResetDate
}: {
  task_id: string;
  taskDate: string;
  listIds: string[];
  type: string;
  setTaskId: React.Dispatch<React.SetStateAction<string | null>>;
  setResetDate: React.Dispatch<React.SetStateAction<boolean>>;
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
          [type as string]: taskDate
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
        setResetDate(false);
        const updatedTasks = taskDateUpdateManager(
          task_id as string,
          listIds as string[],
          selectedTaskType === EntityType.task ? tasks : subtasks,
          type as string,
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

export const useMultipleUpdateTasksDate = (data: { ids: string[]; type: string; date: string; listIds: string[] }) => {
  const dispatch = useAppDispatch();

  const { pickedDateState } = useAppSelector((state) => state.workspace);
  const { tasks, subtasks } = useAppSelector((state) => state.task);

  const { ids, type, date, listIds } = data;
  return useQuery(
    ['task', { ids, date }],
    async () => {
      const data = requestNew<ITaskRes>({
        url: 'tasks/multiple/dates',
        method: 'POST',
        data: {
          ids,
          [type]: date
        }
      });
      return data;
    },
    {
      enabled: !!ids.length && !!date && !!type && !!pickedDateState,
      cacheTime: 0,
      onSuccess: () => {
        dispatch(setPickedDateState(false));
        const { updatedTasks, updatedSubtasks } = multipleTasksDateUpdateManager(
          ids as string[],
          listIds as string[],
          tasks,
          subtasks,
          type as string,
          date as string
        );
        dispatch(setTasks(updatedTasks as Record<string, ITaskFullList[]>));
        dispatch(setSubtasks(updatedSubtasks as Record<string, ITaskFullList[]>));
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
  const { triggerSaveSettings, triggerAutoSave } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();
  return useQuery(
    ['task', { task_views_id, taskDate, triggerAutoSave }],
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
        dispatch(setTriggerAutoSave(false));
        dispatch(setTriggerSaveSettingsModal(false));
      }
    }
  );
};

export const UseUpdateTaskPrioritiesServices = ({ task_id_array, priorityDataUpdate, listIds }: UpdateTaskProps) => {
  const dispatch = useAppDispatch();

  const { currentTaskPriorityId, tasks, subtasks } = useAppSelector((state) => state.task);

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
      enabled: !!currentTaskIds.length && !!priorityDataUpdate && currentTaskPriorityId != '0',
      cacheTime: 0,
      onSuccess: () => {
        if (listIds) {
          const { updatedTasks, updatedSubtasks } = taskPriorityUpdateManager(
            currentTaskIds as string[],
            listIds as string[],
            tasks,
            subtasks,
            priorityDataUpdate as string
          );
          dispatch(setTasks(updatedTasks as Record<string, ITaskFullList[]>));
          dispatch(setSubtasks(updatedSubtasks as Record<string, ITaskFullList[]>));
        }
        dispatch(setSelectedTasksArray([]));
        dispatch(setSelectedListIds([]));
      }
    }
  );
};

export const getTaskListService = (listId: string | null | undefined) => {
  const { workSpaceId } = useParams();

  const { sortAbleArr, toggleAllSubtask, separateSubtasksMode, splitSubTaskState, isFiltersUpdated } = useAppSelector(
    (state) => state.task
  );
  const { currentWorkspaceId } = useAppSelector((state) => state.auth);
  // const { draggableItemId } = useAppSelector((state) => state.list);

  const sortArrUpdate = sortAbleArr.length <= 0 ? null : sortAbleArr;

  const fetch = currentWorkspaceId === workSpaceId;

  const { filters } = generateFilters();

  return useInfiniteQuery(
    [
      'task',
      listId,
      filters,
      isFiltersUpdated,
      sortArrUpdate,
      // `draggableItemId`,
      toggleAllSubtask,
      separateSubtasksMode,
      splitSubTaskState
    ],
    async ({ pageParam = 0 }: { pageParam?: number }) => {
      return requestNew<ITaskListRes>({
        url: 'tasks/list',
        method: 'POST',
        data: {
          sorting: sortArrUpdate,
          filters,
          expand_all: toggleAllSubtask || separateSubtasksMode || splitSubTaskState ? 1 : 0,
          list_id: listId,
          page: pageParam
        }
      });
    },
    {
      enabled: fetch && isFiltersUpdated && (!!listId || separateSubtasksMode || splitSubTaskState || toggleAllSubtask),
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

export const useSubTasks = (parentId: string, subtasks: Record<string, ITaskFullList[]>) =>
  useQuery(
    ['sub-tasks', parentId],
    () =>
      requestNew<ITaskListRes>({
        url: 'tasks/list',
        method: 'POST',
        data: {
          parent_id: parentId
        }
      }),
    {
      enabled: !!parentId && !subtasks[parentId],
      select: (res) => res.data.tasks,
      cacheTime: 0
    }
  );

export const createTimeEntriesService = (data: { queryKey: (string | undefined)[] }) => {
  const taskID = data.queryKey[1];
  const response = requestNew({
    url: 'time-entries/start',
    method: 'POST',
    data: {
      type: EntityType.task,
      id: taskID
    }
  });
  return response;
};

export const createManualTimeEntry = () => {
  const queryClient = useQueryClient();
  const { data, isError, isLoading, mutateAsync, isSuccess } = useMutation(
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
      onSuccess: () => queryClient.invalidateQueries(['timeEntries'])
    }
  );
  return { data, isError, isLoading, mutateAsync, isSuccess };
};

export const useCurrentTime = ({ workspaceId }: { workspaceId?: string }) => {
  const dispatch = useAppDispatch();

  const { activeView } = useAppSelector((state) => state.workspace);

  const { status, refetch, data } = useQuery(
    ['timeData'],
    async () => {
      const response = await requestNew<
        { data: { time_entry: { start_date: string; model: string; model_id: string } } } | undefined
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

        const entityCheck = (): boolean => {
          const validEntityTypes = [
            EntityType.hub,
            EntityType.list,
            EntityType.subHub,
            EntityType.subWallet,
            EntityType.subtask,
            EntityType.task,
            EntityType.wallet
          ];

          if (dateString?.model !== undefined) {
            return validEntityTypes.includes(dateString.model);
          }

          return false;
        };

        if (dateData?.time_entry === null) {
          dispatch(setTimerStatus(false));
          dispatch(setUpdateTimerDuration({ s: 0, m: 0, h: 0 }));
          return;
        } else if (dateString) {
          const { hours, minutes, seconds } = Duration({ dateString });
          dispatch(setTimerStatus(true));
          dispatch(setUpdateTimerDuration({ s: seconds, m: minutes, h: hours }));

          entityCheck() &&
            dispatch(
              setTimerLastMemory({
                hubId: dateString.model === EntityType.hub ? dateString.model_id : null,
                activeTabId: pilotTabs.UTILITIES,
                listId: dateString.model === EntityType.list ? dateString.model_id : null,
                taskId: dateString.model === EntityType.task ? dateString.model_id : null,
                workSpaceId: workspaceId,
                viewId: activeView?.id as string
              })
            );
        }
      }
    }
  );
  return { status, refetch, data };
};

export const StartTimeEntryService = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const mutation = useMutation(
    async (query: { taskId?: string | null; type: string | null | undefined }) => {
      const res = await requestNew({
        url: 'time-entries/start',
        method: 'POST',
        data: {
          type: query.type,
          id: query.taskId
        }
      });
      return res;
    },
    {
      onSuccess: () => queryClient.invalidateQueries(['timeEntries']),
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
        data: {
          description: data.description,
          isbillable: data.is_Billable
        }
      });
      return response;
    },
    {
      onSuccess: () => queryClient.invalidateQueries(['timeEntries'])
    }
  );

  return mutation;
};

export const GetTimeEntriesService = ({
  itemId,
  trigger,
  is_active,
  page,
  include_filters,
  team_member_group_ids
}: {
  itemId: string | null | undefined;
  trigger: string | null | undefined;
  is_active?: number;
  page?: number;
  include_filters?: boolean;
  team_member_group_ids?: string[];
  sorting?: string[];
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
          team_member_group_ids: team_member_group_ids,
          is_active: is_active,
          page,
          include_filters: include_filters ? 1 : 0,
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

// Define a mutation function to fetch time entries
async function fetchTimeEntries({
  itemId,
  trigger,
  is_active,
  page,
  include_filters,
  team_member_ids,
  sorting
}: {
  itemId: string | null | undefined;
  trigger: string | null | undefined;
  is_active?: number;
  page?: number;
  include_filters?: boolean;
  team_member_ids?: string[];
  sorting?: SortOption[];
}) {
  const data = await requestNew<ITimeEntriesRes | undefined>({
    url: 'time-entries',
    method: 'GET',
    params: {
      type: trigger,
      id: itemId,
      team_member_ids,
      is_active,
      page,
      include_filters: include_filters ? 1 : 0,
      sorting
    }
  });
  return data;
}

export function useGetTimeEntriesMutation() {
  const dispatch = useAppDispatch();
  const { currentUserId } = useAppSelector((state) => state.auth);
  return useMutation(fetchTimeEntries, {
    onSuccess(data) {
      const teammembers = data?.data.time_entries.map((member) => member.team_member);
      const currentTeamMember = teammembers?.map((member) => {
        if (member.user.id === currentUserId) return member.id;
      });

      dispatch(setTimeAssigneeFilter(data));
      dispatch(setTimeAssignee(teammembers));
      currentTeamMember && dispatch(setCurrentTeamMemberId(currentTeamMember));
    }
  });
}

function fetchTimeEntriesQuery({ queryKey }: { queryKey: [string, TimeEntriesQueryParams] }) {
  const [, params] = queryKey;
  return requestNew<ITimeEntriesRes | undefined>({
    url: 'time-entries',
    method: 'GET',
    params
  });
}

// Define your custom query key function for timeentries
function queryKeyFn(queryParams: TimeEntriesQueryParams): [string, TimeEntriesQueryParams] {
  return ['timeEntries', queryParams];
}
interface TimeEntriesQueryParams {
  id: string | null | undefined;
  type: string | null | undefined;
  is_active?: number;
  page?: number;
  include_filters?: boolean;
  team_member_ids?: string[];
  sorting?: SortOption[];
}

// Use React Query to fetch time entries
export function useTimeEntriesQuery(queryParams: TimeEntriesQueryParams) {
  const queryKey = queryKeyFn(queryParams);

  return useQuery(queryKey, fetchTimeEntriesQuery);
}

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
    data: {
      description: data.description,
      is_billable: data.isBillable,
      start_date: data.start_date,
      end_date: data.end_date
    }
  });
  return response;
};

const deleteTimeEntry = async (timeEntryId: string) => {
  const response = await requestNew({
    url: `time-entries/${timeEntryId}`,
    method: 'DELETE'
  });
  return response;
};

export function useDeleteTimeEntryMutation() {
  const queryClient = useQueryClient();

  return useMutation(deleteTimeEntry, {
    onSuccess: () => {
      queryClient.invalidateQueries(['timeEntries']);
    }
  });
}

//Add watcher to task
export const AddWatcherService = ({ query }: { query: (string | undefined | null)[] }) => {
  const queryClient = useQueryClient();
  return useQuery(
    ['watcher', query],
    async () => {
      const data = await requestNew({
        url: 'watch',
        method: 'POST',
        data: {
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
        data: {
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

// Assign Watchers
const watchersAssignTask = ({ ids, team_member_ids }: { ids: string[]; team_member_ids: string[] | null }) => {
  const request = requestNew({
    url: 'tasks/multiple/watchers',
    method: 'POST',
    data: { ids, team_member_ids }
  });
  return request;
};

export const UseTaskWatchersAssignService = (taskIds: string[], user: ITeamMembersAndGroup, listIds: string[]) => {
  const dispatch = useAppDispatch();
  const { tasks, subtasks } = useAppSelector((state) => state.task);

  return useMutation(watchersAssignTask, {
    onSuccess: () => {
      dispatch(setAssignOnHoverState(false));
      const { updatedTasks, updatedSubtasks } = taskWatchersUpdateManager(taskIds, listIds, tasks, subtasks, user);
      dispatch(setTasks(updatedTasks as Record<string, ITaskFullList[]>));
      dispatch(setSubtasks(updatedSubtasks as Record<string, ITaskFullList[]>));
      dispatch(setToggleAssignCurrentTaskId(null));
      dispatch(setSelectedTasksArray([]));
      dispatch(setSelectedListIds([]));
    }
  });
};

const GlobalSearch = ({ searchValue }: { searchValue: string }) => {
  const request = requestNew<IFullTaskRes>({
    url: '/search/tasks',
    method: 'POST',
    data: {
      search: searchValue
    }
  });
  return request;
};

export const UseGlobalSearch = () => {
  const dispatch = useAppDispatch();
  return useMutation(GlobalSearch, {
    onSuccess: (data) => {
      dispatch(setGlobalSearchResult(data.data.tasks));
    }
  });
};

export const GetAddLineUpTask = () => {
  return useQuery(['lineup_tasks'], async () => {
    const data = await requestNew<ILineUpTaskRes | undefined>({
      url: '/tasks/lineup',
      method: 'GET'
    });
    return data;
  });
};

export const GetRecentsTask = () => {
  return useQuery(['recent_tasks'], async () => {
    const data = await requestNew<ILineUpTaskRes | undefined>({
      url: '/tasks/recent',
      method: 'GET'
    });
    return data;
  });
};

const AddLineUpTask = ({ taskId, team_member_id }: { taskId: string; team_member_id: string }) => {
  const request = requestNew({
    url: `/tasks/${taskId}/lineup`,
    method: 'POST',
    data: {
      team_member_ids: team_member_id
    }
  });
  return request;
};

export const RemoveLineUpTask = ({ taskId, team_member_id }: { taskId: string; team_member_id?: string }) => {
  const request = requestNew({
    url: `/tasks/${taskId}/lineup`,
    method: 'DELETE',
    data: {
      team_member_id
    }
  });
  return request;
};

export const UseAddLineUpTask = () => {
  const queryClient = useQueryClient();

  return useMutation(AddLineUpTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(['lineup_tasks']);
    }
  });
};

// Assign Checklist Item
const AssignTask = ({
  ids,
  team_member_id,
  teams
}: {
  ids: string[];
  team_member_id: string | null;
  teams: boolean;
}) => {
  const request = requestNew({
    url: teams ? '/group-assignee/assign' : '/tasks/multiple/assignees',
    method: 'POST',
    data: {
      ids: ids,
      ...(teams ? { team_member_group_id: team_member_id } : { team_member_ids: [team_member_id] }),
      type: EntityType.task
    }
  });
  return request;
};

export const UseTaskAssignService = (taskIds: string[], user: ITeamMembersAndGroup, listIds: string[]) => {
  const dispatch = useAppDispatch();

  const { tasks, subtasks } = useAppSelector((state) => state.task);

  return useMutation(AssignTask, {
    onSuccess: () => {
      dispatch(setAssignOnHoverState(false));
      const { updatedTasks, updatedSubtasks } = taskAssignessUpdateManager(
        taskIds,
        listIds,
        tasks,
        subtasks,
        user,
        true
      );
      dispatch(setTasks(updatedTasks as Record<string, ITaskFullList[]>));
      dispatch(setSubtasks(updatedSubtasks as Record<string, ITaskFullList[]>));
      dispatch(setToggleAssignCurrentTaskId(null));
      dispatch(setSelectedTasksArray([]));
      dispatch(setSelectedListIds([]));
    }
  });
};

// Unassign Task
const UnassignTask = ({
  taskId,
  team_member_id,
  teams
}: {
  taskId: string;
  team_member_id: string | null;
  teams: boolean;
}) => {
  const request = requestNew({
    url: teams ? '/group-assignee/unassign' : '/assignee/unassign',
    method: 'POST',
    data: {
      ...(teams ? { team_member_group_id: team_member_id } : { team_member_id }),
      id: taskId,
      type: EntityType.task
    }
  });
  return request;
};

export const UseTaskUnassignService = (taskIds: string[], user: ITeamMembersAndGroup, listIds: string[]) => {
  const dispatch = useAppDispatch();

  const { tasks, subtasks } = useAppSelector((state) => state.task);

  return useMutation(UnassignTask, {
    onSuccess: () => {
      const { updatedTasks, updatedSubtasks } = taskAssignessUpdateManager(
        taskIds,
        listIds,
        tasks,
        subtasks,
        user,
        false
      );
      dispatch(setTasks(updatedTasks as Record<string, ITaskFullList[]>));
      dispatch(setSubtasks(updatedSubtasks as Record<string, ITaskFullList[]>));
      dispatch(setToggleAssignCurrentTaskId(null));
      dispatch(setSelectedTasksArray([]));
      dispatch(setSelectedListIds([]));
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

  const recorder = new MediaRecorder(stream);
  await recorder.start();
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

  const handleStopStream = async ({ blob }: { blob: Blob | undefined }) => {
    const combinedStream = new MediaStream();
    const recorder = new MediaRecorder(combinedStream);
    dispatch(setScreenRecordingMedia({ recorder, stream: combinedStream }));
    if (blob && currentWorkspaceId && accessToken && activeItemId && activeItemType) {
      mutate(
        {
          blob,
          currentWorkspaceId,
          accessToken,
          activeItemId,
          activeItemType
        },
        {
          onSuccess: () => queryClient.invalidateQueries(['attachments'])
        }
      );
    }

    dispatch(setScreenRecording('idle'));
    const newAction: { recorder: MediaRecorder | null; stream: MediaStream | null } = {
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

export function useGetTaskRecuring({ taskId }: { taskId?: string }) {
  return useQuery(['recurring'], async () => {
    const data = await requestNew<ITaskRecurResponse>({
      url: `tasks/${taskId}/recur`,
      method: 'GET'
    });

    return data.data;
  });
}

export function useCreateTaskRecuring() {
  const queryClient = new QueryClient();
  return useMutation(
    async ({ taskId, execution_type, type, new_task, recur_options, type_options }: ITaskCreateProps) => {
      const data = await requestNew<ITaskRecurResponse>({
        url: `tasks/${taskId}/recur`,
        method: 'POST',
        data: {
          execution_type,
          type,
          new_task,
          recur_options,
          type_options
        }
      });
      return data.data;
    },
    {
      onSuccess() {
        queryClient.invalidateQueries(['recurring']);
      },
      onError(err: { statusText: string }) {
        throw err.statusText;
      }
    }
  );
}

interface IFilterRes {
  data: {
    filter: {
      data: FilterWithId[];
      model: string;
      model_id: string;
    };
  };
}

const addFiltersForTask = (data: { taskId?: string; filters: FilterWithId[] | null }) => {
  const { taskId, filters } = data;

  const response = requestNew<IFilterRes>({
    url: 'filters',
    method: 'POST',
    data: {
      model: 'task',
      model_id: taskId,
      filters
    }
  });
  return response;
};

export const useAddFiltersForTask = () => {
  const dispatch = useAppDispatch();

  const { tasks, subtasks } = useAppSelector((state) => state.task);

  return useMutation(addFiltersForTask, {
    onSuccess: (data) => {
      const parentId = data.data.filter.model_id;
      const updatedTasks = { ...tasks };
      const updatedSubtasks = { ...subtasks };

      Object.keys(tasks).forEach((listId) => {
        updatedTasks[listId] = updatedTasks[listId].map((task) => {
          if (parentId === task.id) {
            return {
              ...task,
              filters: data.data.filter
            };
          }
          return task;
        });
      });
      Object.keys(subtasks).forEach((listId) => {
        updatedSubtasks[listId] = updatedSubtasks[listId].map((task) => {
          if (parentId === task.id) {
            return {
              ...task,
              filters: data.data.filter
            };
          }
          return task;
        });
      });
      dispatch(setTasks(updatedTasks));
      dispatch(setSubtasks(updatedSubtasks));
    }
  });
};

const updateSubtaskFilters = (data: { parentId: string; filters: { op: FiltersOption; fields: FilterWithId[] } }) => {
  const { filters } = generateFiltersSubtasks(data.filters.op, data.filters.fields);
  const response = requestNew<IFullTaskRes>({
    url: 'tasks/list',
    method: 'POST',
    data: {
      filters,
      parent_id: data.parentId
    }
  });
  return response;
};

export const useUpdateSubtaskFilters = () => {
  const dispatch = useAppDispatch();

  const { tasks, subtasks } = useAppSelector((state) => state.task);

  return useMutation(updateSubtaskFilters, {
    onSuccess: (data) => {
      if (data.data.tasks.length) {
        const parentId = data.data.tasks[0].parent_id;
        let parent: ITaskFullList | null = null;
        Object.keys(tasks).forEach((listId) => {
          tasks[listId].forEach((task) => {
            if (parentId === task.id) {
              parent = task;
            }
          });
        });

        Object.keys(subtasks).forEach((listId) => {
          subtasks[listId].forEach((task) => {
            if (parentId === task.id) {
              parent = task;
            }
          });
        });

        const tasksWithListId = data.data.tasks.map((item) => {
          return {
            ...item,
            parentName: parent?.name,
            task_statuses: parent?.task_statuses,
            custom_field_columns: parent?.custom_field_columns,
            list_id: parent?.list_id,
            list: parent?.list
          };
        });
        dispatch(setSubtasks({ ...subtasks, [parentId as string]: tasksWithListId as ITaskFullList[] }));
      }
    }
  });
};
