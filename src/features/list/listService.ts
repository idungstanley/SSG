import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';
import { useDispatch } from 'react-redux';
import { setArchiveList, setDeleteList } from './listSlice';
import { closeMenu } from '../hubs/hubSlice';
import { IWalletRes } from '../wallet/wallet.interfaces';
import { IListDetailRes, listDetails } from './list.interfaces';
import { useAppSelector } from '../../app/hooks';

export const createListService = (data: { listName: string; hubId?: string | null; walletId?: string | null }) => {
  const response = requestNew({
    url: 'lists',
    method: 'POST',
    data: {
      name: data.listName,
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

// get list details
// export const getListsDetailsService = (data: { queryKey: (string | undefined)[] }) => {
//   const listID = data.queryKey[1];
//   const response = requestNew({
//     url: `lists/${listID}`,
//     method: 'GET'
//   });
//   return response;
// };

//edit list
export const UseEditListService = (data: {
  listName?: string;
  listId?: string | null;
  description?: string | null | undefined;
  colour?: string | null | { innerColour?: string; outerColour?: string };
  shape?: string;
}) => {
  const response = requestNew({
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
export const UseDeleteListService = (data: { query: string | null | undefined; delList: boolean }) => {
  const dispatch = useDispatch();
  const listId = data.query;
  const queryClient = useQueryClient();
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
        queryClient.invalidateQueries();
        dispatch(setDeleteList(false));
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
      enabled: query.activeItemId === 'list' && !!query.activeItemId
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

  return useMutation(updateEntityCustomFieldValue, {
    onSuccess: () => {
      // if (activeItemType === 'hub') {
      queryClient.invalidateQueries(['task', activeItemId, activeItemType, filterTaskByAssigneeIds]);
      // }
      queryClient.invalidateQueries(['task', { listId }]);
      queryClient.invalidateQueries(['task', listId, 'hub']);
    }
  });
};

export const useList = (listId?: string) =>
  useQuery(
    ['list', listId],
    () =>
      requestNew<IListDetailRes>({
        url: `lists/${listId}`,
        method: 'GET'
      }),
    { enabled: !!listId, select: (res) => res.data.list }
  );
