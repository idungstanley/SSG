import { useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';
import { useDispatch } from 'react-redux';
import { setArchiveList, setDeleteList } from './listSlice';
import { closeMenu } from '../hubs/hubSlice';
import { IWalletRes } from '../wallet/wallet.interfaces';
import { IListDetailRes } from './list.interfaces';
// import { setChecklists } from '../task/checklist/checklistSlice';

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
export const getListService = (data: { queryKey: (string | undefined)[] }) => {
  const hubID = data.queryKey[1];
  const response = requestNew({
    url: 'lists',
    method: 'GET',
    params: {
      hub_id: hubID
    }
  });
  return response;
};

export const getListsListService = (data: { queryKey: (string | undefined)[] }) => {
  const walletID = data.queryKey[1];
  const response = requestNew({
    url: 'lists',
    method: 'GET',
    params: {
      wallet_id: walletID
    }
  });
  return response;
};

export const getListServices = (data: { Archived: boolean; walletId?: string | null }) => {
  // const queryClient = useQueryClient();
  return useQuery(['wallet', { data: data.walletId, isArchived: data.Archived ? 1 : 0 }], () =>
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
export const getListsDetailsService = (data: { queryKey: (string | undefined)[] }) => {
  const listID = data.queryKey[1];
  const response = requestNew({
    url: `lists/${listID}`,
    method: 'GET'
  });
  return response;
};

//edit list
export const UseEditListService = (data: { listName?: string; listId?: string | null }) => {
  const response = requestNew({
    url: `lists/${data.listId}`,
    method: 'PUT',
    params: {
      name: data.listName
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
  // const dispatch = useDispatch();
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
      enabled: query.activeItemType === 'list'
    }
  );
};
