import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';
import { useDispatch } from 'react-redux';
import { setArchiveList } from './listSlice';
import { closeMenu, setSpaceStatuses } from '../hubs/hubSlice';
import { IListDetailRes, taskCountFields } from './list.interfaces';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useParams } from 'react-router-dom';
import { generateFilters } from '../../components/TasksHeader/lib/generateFilters';
import { UseGetHubDetails } from '../hubs/hubService';
import { IList } from '../hubs/hubs.interfaces';
import { EntityType } from '../../utils/EntityTypes/EntityType';
import { setNewCustomPropertyDetails } from '../task/taskSlice';

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
  const response = requestNew<IResponseList>({
    url: `lists/${data.listId}`,
    method: 'PUT',
    params: {
      name: data.listName,
      color: data.color,
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

  const { activeItemType } = useAppSelector((state) => state.workspace);

  return useQuery(
    ['hubs', listId],
    async () => {
      const data = await requestNew<IListDetailRes>({
        url: `lists/${listId}`,
        method: 'GET'
      });
      return data;
    },
    {
      enabled: !!listId,
      onSuccess: (data) => {
        const listStatusTypes = data.data.list.task_statuses;
        if (activeItemType === 'list') {
          dispatch(setSpaceStatuses(listStatusTypes));
        }
      }
    }
  );
};

const createDropdownField = (data: {
  id?: string;
  name?: string;
  color?: string | null;
  options: { name: string; color: null | string }[] | undefined;
  type?: string;
  customType: string;
}) => {
  const { id, options, name, type, customType } = data;

  const response = requestNew({
    url: 'custom-fields',
    method: 'POST',
    data: {
      type: customType.replace(/\s+/g, '').toLowerCase(),
      name,
      entity_id: id,
      entity_type: type,
      options
    }
  });
  return response;
};

export const useCreateDropdownField = (type: string | undefined, id?: string | undefined) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);

  return useMutation(createDropdownField, {
    onSuccess: () => {
      dispatch(setNewCustomPropertyDetails({ name: '', type: 'Select Property Type', color: null }));

      if (type === EntityType.hub) {
        queryClient.invalidateQueries(['task', activeItemId, activeItemType]);
      }
      queryClient.invalidateQueries([type, id]);
    }
  });
};

const updateEntityCustomFieldValue = (data: { taskId?: string; fieldId: string; value: { value: string }[] }) => {
  const { taskId, fieldId, value } = data;

  const response = requestNew({
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

export const useUpdateEntityCustomFieldValue = (listId?: string) => {
  const queryClient = useQueryClient();

  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);
  const { filters } = generateFilters();

  return useMutation(updateEntityCustomFieldValue, {
    onSuccess: () => {
      queryClient.invalidateQueries(['task', activeItemId, activeItemType]);
      queryClient.invalidateQueries(['task', { listId }]);
      queryClient.invalidateQueries(['task', listId, 'hub', filters]);
    }
  });
};

export const useList = (listId?: string) => {
  const { workSpaceId } = useParams();
  const { currentWorkspaceId } = useAppSelector((state) => state.auth);
  const fetch = currentWorkspaceId == workSpaceId;

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
