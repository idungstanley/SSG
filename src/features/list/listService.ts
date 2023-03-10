import { useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';
import { useDispatch } from 'react-redux';
import { setArchiveList, setDeleteList } from './listSlice';
import { closeMenu } from '../hubs/hubSlice';

export const createListService = (data: {
  listName: string;
  hubId?: string | null;
  walletId?: string | null;
}) => {
  const response = requestNew(
    {
      url: '/lists',
      method: 'POST',
      data: {
        name: data.listName,
        hub_id: data.hubId,
        wallet_id: data.walletId,
      },
    },
    true
  );
  return response;
};

// get lists
export const getListService = (data: {queryKey: (string | undefined)[]}) => {
  const hubID = data.queryKey[1];
  const response = requestNew(
    {
      url: '/lists',
      method: 'GET',
      params: {
        hub_id: hubID,
      },
    },
    true
  );
  return response;
};

export const getListsListService = (data: { queryKey: (string | undefined)[] }) => {
  const walletID = data.queryKey[1];
  const response = requestNew(
    {
      url: 'at/lists',
      method: 'GET',
      params: {
        wallet_id: walletID,
      },
    },
    true
  );
  return response;
};

export const getListServices = (data: {
  Archived: boolean;
  walletId?: string | null;
}) => {
  // const queryClient = useQueryClient();
  return useQuery(
    ['wallet', { data: data.walletId, isArchived: data.Archived ? 1 : 0 }],
    () =>
      requestNew(
        {
          url: 'lists',
          method: 'GET',
          params: {
            wallet_id: data.walletId,
            is_archived: data.Archived ? 1 : 0, // send is_archived query
            // parent_id: data.parentId, //not sure if sub list is needed
          },
        },
        false,
        true
      )
  );
};

// get list details
export const getListsDetailsService = (data: { queryKey: (string | undefined)[] }) => {
  const listID = data.queryKey[1];
  const response = requestNew(
    {
      url: `at/lists/${listID}`,
      method: 'GET',
    },
    true
  );
  return response;
};

//edit list
export const UseEditListService = (data: {
  listName?: string;
  listId?: string | null;
}) => {
  const response = requestNew(
    {
      url: `lists/${data.listId}`,
      method: 'PUT',
      params: {
        name: data.listName,
      },
    },
    false,
    true
  );
  return response;
};

//del lists
export const UseDeleteListService = (data: {query: string | null, delList: boolean}) => {
  const dispatch = useDispatch();
  const listId = data.query;
  const queryClient = useQueryClient();
  return useQuery(
    ['lists'],
    async () => {
      const data = await requestNew(
        {
          url: `at/lists/${listId}`,
          method: 'DELETE',
        },
        true
      );
      return data;
    },
    {
      enabled: data.delList,
      onSuccess: () => {
        queryClient.invalidateQueries();
        dispatch(setDeleteList(false));
      },
    }
  );
};

//archive list
export const UseArchiveListService = (list: {query: string | undefined | null, archiveList: boolean}) => {
  const listId = list.query;
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useQuery(
    ['lists', listId],
    async () => {
      const data = await requestNew(
        {
          url: `at/lists/${listId}/archive`,
          method: 'POST',
        },
        true
      );
      return data;
    },
    {
      initialData: queryClient.getQueryData(['lists', listId]),
      enabled: list.archiveList,
      onSuccess: () => {
        dispatch(setArchiveList(false));
        dispatch(closeMenu());
        queryClient.invalidateQueries();
      },
    }
  );
};

//get list details
export const UseGetListDetails = (query: {activeItemId: string | null | undefined, activeItemType: string | null | undefined}) => {
  return useQuery(
    ['hubs', query],
    async () => {
      const data = await requestNew(
        {
          url: `at/lists/${query.activeItemId}`,
          method: 'GET',
        },
        true
      );
      return data;
    },
    {
      enabled: query.activeItemType === 'list',
    }
  );
};
