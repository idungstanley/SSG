import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';
import { useDispatch } from 'react-redux';
import { setArchiveList, setDeleteList } from './listSlice';
import { closeMenu, getHub } from '../hubs/hubSlice';
import { IWalletRes } from '../wallet/wallet.interfaces';
import { IListDetailRes, listDetails, taskCountFields } from './list.interfaces';
import { useAppSelector } from '../../app/hooks';
import { useParams } from 'react-router-dom';
import { generateFilters } from '../../components/TasksHeader/lib/generateFilters';
import { UseGetHubDetails } from '../hubs/hubService';
import { IList } from '../hubs/hubs.interfaces';
import { setFilteredResults } from '../search/searchSlice';
import { deleteListManager } from '../../managers/List';

interface TaskCountProps {
  data: {
    task_statuses: taskCountFields[];
  };
}

const moveList = (data: { listId: string; hubId: string; type: string }) => {
  const { hubId, listId, type } = data;
  let requestData = {};

  if (type == 'hub') {
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
  const type = hubId ? 'hub' : walletId ? 'wallet' : 'list';

  const { filterTaskByAssigneeIds: assigneeUserId } = useAppSelector((state) => state.task);
  const { sortAbleArr } = useAppSelector((state) => state.task);
  const sortArrUpdate = sortAbleArr.length <= 0 ? null : sortAbleArr;

  const { filters } = generateFilters();

  return useMutation(moveList, {
    onSuccess: () => {
      queryClient.invalidateQueries(['hub']);
      queryClient.invalidateQueries(['sub-hub']);
      queryClient.invalidateQueries(['lists']);
      queryClient.invalidateQueries(['task', { listId, assigneeUserId, sortArrUpdate, filters }]);
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
  const response = requestNew({
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

// get lists
export const getListService = (data: { getCurrentHubId: string | undefined | null }) => {
  const hubID = data.getCurrentHubId;
  return useQuery(['list', hubID], async () => {
    const response = await requestNew<listDetails | undefined>({
      url: 'lists',
      method: 'GET',
      params: {
        hub_id: hubID
      }
    });
    return response;
  });
};

export const getListServices = (data: { Archived: boolean; walletId?: string | null }) => {
  // const queryClient = useQueryClient();
  return useQuery(['lists', { data: data.walletId, isArchived: data.Archived ? 1 : 0 }], () =>
    requestNew<IWalletRes | undefined>({
      url: 'lists',
      method: 'GET',
      params: {
        wallet_id: data.walletId,
        is_archived: data.Archived ? 1 : 0 // send is_archived query
        // parent_id: data.parentId, //not sure if sub list is needed
      }
    })
  );
};

//edit list
interface IResponseList {
  data: {
    list: IList;
  };
}
export const UseEditListService = (data: {
  listName?: string;
  listId?: string | null;
  description?: string | null | undefined;
  colour?: string | null | { innerColour?: string; outerColour?: string };
  shape?: string;
}) => {
  const response = requestNew<IResponseList>({
    url: `lists/${data.listId}`,
    method: 'PUT',
    params: {
      name: data.listName,
      color: data.colour,
      shape: data.shape,
      description: data.description
    }
  });
  return response;
};

//del lists
export const UseDeleteListService = (data: { id: string | null | undefined; delList: boolean }) => {
  const dispatch = useDispatch();
  const listId = data.id;
  const { hub } = useAppSelector((state) => state.hub);
  return useQuery(
    ['lists'],
    async () => {
      const data = await requestNew({
        url: `lists/${listId}`,
        method: 'DELETE'
      });
      return data;
    },
    {
      enabled: data.delList,
      onSuccess: () => {
        dispatch(setDeleteList(false));
        const updatedTree = deleteListManager(listId as string, hub);
        dispatch(getHub(updatedTree));
        dispatch(setFilteredResults(updatedTree));
      }
    }
  );
};

export const GetTaskListCount = (value: { query: string; fetchTaskCount: boolean }) => {
  const listId = value.query;
  return useQuery(
    ['task-count', { listId }],
    async () => {
      const data = await requestNew({
        url: `lists/${listId}/task-status-counts`,
        method: 'GET'
      });
      return data;
    },
    {
      enabled: value.fetchTaskCount,
      onSuccess: (data: TaskCountProps) => {
        console.log(data.data.task_statuses);
      }
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
export const UseGetListDetails = (query: {
  activeItemId: string | null | undefined;
  activeItemType: string | null | undefined;
}) => {
  return useQuery(
    ['hubs', query],
    async () => {
      const data = await requestNew<IListDetailRes>({
        url: `lists/${query.activeItemId}`,
        method: 'GET'
      });
      return data;
    },
    {
      enabled: query.activeItemType === 'list' && !!query.activeItemId
    }
  );
};

const createDropdownField = (data: { id?: string; name: string; properties: string[]; type: string }) => {
  const { id, properties, name, type } = data;

  const response = requestNew({
    url: 'custom-fields',
    method: 'POST',
    data: {
      type: 'dropdown',
      name,
      entity_id: id,
      entity_type: type,
      properties
    }
  });
  return response;
};

export const useCreateDropdownField = (type: string, id?: string) => {
  const queryClient = useQueryClient();
  const { filterTaskByAssigneeIds } = useAppSelector((state) => state.task);
  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);

  return useMutation(createDropdownField, {
    onSuccess: () => {
      if (type === 'hub') {
        queryClient.invalidateQueries(['task', activeItemId, activeItemType, filterTaskByAssigneeIds]);
      }
      queryClient.invalidateQueries([type, id]);
    }
  });
};

const updateEntityCustomFieldValue = (data: { taskId?: string; fieldId: string; value: string }) => {
  const { taskId, fieldId, value } = data;

  const response = requestNew({
    url: `custom-fields/${fieldId}`,
    method: 'PUT',
    data: {
      type: 'task',
      id: taskId,
      values: [value]
    }
  });
  return response;
};

export const useUpdateEntityCustomFieldValue = (listId?: string) => {
  const queryClient = useQueryClient();
  const { filterTaskByAssigneeIds } = useAppSelector((state) => state.task);
  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);
  const { filters } = generateFilters();

  return useMutation(updateEntityCustomFieldValue, {
    onSuccess: () => {
      // if (activeItemType === 'hub') {
      queryClient.invalidateQueries(['task', activeItemId, activeItemType, filterTaskByAssigneeIds]);
      // }
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
    const { data } = UseGetHubDetails({ activeItemId: hubId, activeItemType: 'hub' });

    return data?.data.hub.task_statuses;
  }
};
