import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';
import { useDispatch } from 'react-redux';
import { setArchiveList } from './listSlice';
import { closeMenu, setSpaceStatuses } from '../hubs/hubSlice';
import { IField, IListDetailRes, taskCountFields } from './list.interfaces';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useParams } from 'react-router-dom';
import { generateFilters } from '../../components/TasksHeader/lib/generateFilters';
import { UseGetHubDetails } from '../hubs/hubService';
import { IList } from '../hubs/hubs.interfaces';
import { EntityType } from '../../utils/EntityTypes/EntityType';
import { ICustomField, setNewCustomPropertyDetails, setSubtasks, setTasks } from '../task/taskSlice';
import {
  createCustomFieldColumnManager,
  deleteCustomFieldManager,
  updateCustomFieldColumnManager,
  updateCustomFieldManager
} from '../../managers/Task';
import { customPropertiesProps } from '../task/interface.tasks';

interface TaskCountProps {
  data: {
    task_statuses: taskCountFields[];
  };
}

interface IResponseList {
  data: {
    list: IList;
  };
}

interface IResCustomfieldColumns {
  data: {
    custom_field: IField;
  };
}

interface IResCustomfield {
  data: {
    custom_field: ICustomField;
  };
}

const moveList = (data: { listId: string; hubId: string; type: string }) => {
  const { hubId, listId, type } = data;
  let requestData = {};

  if (type === EntityType.hub) {
    requestData = {
      hub_id: hubId
    };
  } else {
    requestData = {
      wallet_id: hubId
    };
  }
  const response = requestNew({
    url: 'lists/' + listId + '/move',
    method: 'POST',
    data: requestData
  });
  return response;
};

export const useMoveListService = () => {
  const queryClient = useQueryClient();
  const { hubId, walletId, listId } = useParams();

  const id = hubId ?? walletId ?? listId;
  const type = hubId ? EntityType.hub : walletId ? EntityType.wallet : EntityType.list;

  const { sortAbleArr } = useAppSelector((state) => state.task);
  const sortArrUpdate = sortAbleArr.length <= 0 ? null : sortAbleArr;

  const { filters } = generateFilters();

  return useMutation(moveList, {
    onSuccess: () => {
      queryClient.invalidateQueries(['hub']);
      queryClient.invalidateQueries(['sub-hub']);
      queryClient.invalidateQueries(['lists']);
      queryClient.invalidateQueries(['task', { listId, sortArrUpdate, filters }]);
      queryClient.invalidateQueries(['task', id, type]);
      queryClient.invalidateQueries(['retrieve', id ?? 'root', 'tree']);
      queryClient.invalidateQueries(['retrieve', id ?? 'root', undefined]);
    }
  });
};

export const createListService = (data: {
  listName: string;
  hubId?: string | null;
  walletId?: string | null;
  color?: { outerColour?: string; innerColour?: string } | string;
}) => {
  const response = requestNew<IResponseList>({
    url: 'lists',
    method: 'POST',
    data: {
      name: data.listName,
      color: data.color,
      hub_id: data.hubId,
      wallet_id: data.walletId
    }
  });
  return response;
};

//edit list
export const UseEditListService = (data: {
  listName?: string;
  listId?: string | null;
  description?: string | null | undefined;
  color?: string | null | { innerColour?: string; outerColour?: string };
  shape?: string;
}) => {
  const convertToString = JSON.stringify(data.color);
  const response = requestNew<IResponseList>({
    url: `lists/${data.listId}`,
    method: 'PUT',
    data: {
      name: data.listName,
      color: convertToString,
      shape: data.shape,
      description: data.description
    }
  });
  return response;
};

//del lists
export const UseDeleteListService = (data: { id: string | null | undefined }) => {
  const listId = data.id;
  const response = requestNew<IResponseList>({
    url: `lists/${listId}`,
    method: 'DELETE'
  });
  return response;
};

export const GetTaskListCount = (value: { query: string; fetchTaskCount: boolean }) => {
  const listId = value.query;
  return useQuery(
    ['task-count', { listId }],
    async () => {
      const data = await requestNew<TaskCountProps>({
        url: `lists/${listId}/task-status-counts`,
        method: 'GET'
      });
      return data;
    },
    {
      enabled: value.fetchTaskCount
    }
  );
};

//archive list
export const UseArchiveListService = (list: { query: string | undefined | null; archiveList: boolean }) => {
  const listId = list.query;
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useQuery(
    ['lists', listId],
    async () => {
      const data = await requestNew({
        url: `lists/${listId}/archive`,
        method: 'POST'
      });
      return data;
    },
    {
      initialData: queryClient.getQueryData(['lists', listId]),
      enabled: list.archiveList,
      onSuccess: () => {
        dispatch(setArchiveList(false));
        dispatch(closeMenu());
        queryClient.invalidateQueries();
      }
    }
  );
};

//get list details
export const UseGetListDetails = (listId: string | null | undefined) => {
  const dispatch = useAppDispatch();

  const { activeItemType, activeItemId } = useAppSelector((state) => state.workspace);
  const id = activeItemId === 'list' ? activeItemId : listId;
  return useQuery(
    ['hubs', { listId, id }],
    async () => {
      const data = await requestNew<IListDetailRes>({
        url: `lists/${listId}`,
        method: 'GET'
      });
      return data;
    },
    {
      enabled: !!listId || !!id,
      onSuccess: (data) => {
        const listStatusTypes = data.data.list.task_statuses;
        if (activeItemType === 'list') {
          dispatch(setSpaceStatuses(listStatusTypes));
        }
      },
      cacheTime: 0
    }
  );
};

const clearEntityCustomFieldValue = (data: { taskId?: string; fieldId: string }) => {
  const { taskId, fieldId } = data;

  const response = requestNew({
    url: `custom-fields/${fieldId}/clear`,
    method: 'PUT',
    data: {
      type: 'task',
      id: taskId
    }
  });
  return response;
};

export const useClearEntityCustomFieldValue = () => {
  const queryClient = useQueryClient();

  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);
  const { filters } = generateFilters();

  return useMutation(clearEntityCustomFieldValue, {
    onSuccess: () => {
      queryClient.invalidateQueries(['task', activeItemId, activeItemType, filters]);
    }
  });
};

const createDropdownField = (data: {
  id?: string;
  name?: string;
  color?: string | null;
  options: { name: string; color: null | string }[] | undefined;
  type?: string;
  customType: string;
  style?: { is_bold: string; is_underlined: string; is_italic: string };
  properties?: customPropertiesProps;
}) => {
  const { id, options, name, type, customType, style, color, properties } = data;
  const response = requestNew<IResCustomfieldColumns>({
    url: 'custom-fields',
    method: 'POST',
    data: {
      type: customType.replace(/\s+/g, '').toLowerCase(),
      name,
      color,
      is_bold: style?.is_bold,
      is_italic: style?.is_italic,
      is_underlined: style?.is_underlined,
      model_id: id,
      model: type,
      options,
      properties
    }
  });
  return response;
};

export const useCreateDropdownField = () => {
  const dispatch = useAppDispatch();

  const { tasks, subtasks, entityForCustom } = useAppSelector((state) => state.task);

  return useMutation(createDropdownField, {
    onSuccess: (data) => {
      dispatch(setNewCustomPropertyDetails({ name: '', type: 'Select Property Type', color: null }));
      const updatedList = createCustomFieldColumnManager(
        entityForCustom.type === EntityType.task ? subtasks : tasks,
        data.data.custom_field,
        entityForCustom.type === EntityType.task ? entityForCustom.id : ''
      );
      if (entityForCustom.type === EntityType.task) {
        dispatch(setSubtasks(updatedList));
      } else {
        dispatch(setTasks(updatedList));
      }
    }
  });
};

const updateDropdownField = (data: { data: IField; newFields: { [key: string]: unknown } }) => {
  const response = requestNew<IResCustomfieldColumns>({
    url: `custom-fields/${data.data.id}`,
    method: 'PUT',
    data: {
      ...data.data,
      ...data.newFields
    }
  });
  return response;
};

export const useUpdateDropdownField = (parentId: string) => {
  const dispatch = useAppDispatch();

  const { tasks, subtasks } = useAppSelector((state) => state.task);

  return useMutation(updateDropdownField, {
    onSuccess: (data) => {
      dispatch(setNewCustomPropertyDetails({ name: '', type: 'Select Property Type', color: null }));
      const { updatedTasks, updatedSubtasks } = updateCustomFieldColumnManager(
        tasks,
        subtasks,
        data.data.custom_field,
        parentId
      );
      dispatch(setTasks(updatedTasks));
      dispatch(setSubtasks(updatedSubtasks));
    }
  });
};

const updateEntityCustomFieldValue = (data: {
  taskId?: string;
  fieldId: string;
  value: { value: string; type?: string; lat?: number; lon?: number }[];
}) => {
  const { taskId, fieldId, value } = data;

  const response = requestNew<IResCustomfield>({
    url: `custom-fields/${fieldId}/value`,
    method: 'PUT',
    data: {
      type: 'task',
      id: taskId,
      values: value
    }
  });
  return response;
};

export const useUpdateEntityCustomFieldValue = (taskId: string) => {
  const dispatch = useAppDispatch();

  const { tasks, subtasks } = useAppSelector((state) => state.task);

  return useMutation(updateEntityCustomFieldValue, {
    onSuccess: (data) => {
      const { updatedTasks, updatedSubtasks } = updateCustomFieldManager(
        tasks,
        subtasks,
        data.data.custom_field,
        taskId
      );
      dispatch(setTasks(updatedTasks));
      dispatch(setSubtasks(updatedSubtasks));
    }
  });
};

export const useList = (listId?: string) => {
  const { workSpaceId } = useParams();
  const { currentWorkspaceId } = useAppSelector((state) => state.auth);
  const fetch = currentWorkspaceId === workSpaceId;

  return useQuery(
    ['list', listId],
    () =>
      requestNew<IListDetailRes>({
        url: `lists/${listId}`,
        method: 'GET'
      }),
    { enabled: !!listId && fetch, select: (res) => res.data.list }
  );
};

export const useTaskStatuses = () => {
  const { hubId, listId } = useParams();

  if (listId) {
    const { data } = useList(listId);

    return data?.task_statuses;
  } else if (hubId) {
    const { data } = UseGetHubDetails({ activeItemId: hubId, activeItemType: EntityType.hub });

    return data?.data.hub.task_statuses;
  }
};

const deleteCustomField = (data: { columnId?: string; listId: string; type: string }) => {
  const { columnId, listId, type } = data;

  const response = requestNew({
    url: `custom-fields/${columnId}/model?model=${type}&model_id=${listId}`,
    method: 'DELETE'
  });
  return response;
};

export const useDeleteCustomField = (columnId: string, listId: string) => {
  const dispatch = useAppDispatch();

  const { tasks, subtasks } = useAppSelector((state) => state.task);

  return useMutation(deleteCustomField, {
    onSuccess: () => {
      const { updatedTasks, updatedSubtasks } = deleteCustomFieldManager(tasks, subtasks, columnId, listId);
      dispatch(setTasks(updatedTasks));
      dispatch(setSubtasks(updatedSubtasks));
    }
  });
};
