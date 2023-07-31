import { useDispatch } from 'react-redux';
import requestNew from '../../app/requestNew';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { setArchiveWallet, setDeleteWallet } from './walletSlice';
import { closeMenu, getHub } from '../hubs/hubSlice';
import { ICreateWallet, IWallet, IWalletDetailRes, IWalletRes } from './wallet.interfaces';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { generateFilters } from '../../components/TasksHeader/lib/generateFilters';
import { setFilteredResults } from '../search/searchSlice';
import { deleteWalletManager } from '../../managers/Wallet';

interface IResponseWallet {
  data: {
    wallet: IWallet;
  };
}

const moveWallet = (data: { parent_id?: string; walletId?: string; hubId?: string; overType: string }) => {
  const { walletId, parent_id, overType, hubId } = data;

  const requestData = overType === 'wallet' ? { parent_id } : { hub_id: hubId };

  const response = requestNew({
    url: 'wallets/' + walletId + '/move',
    method: 'POST',
    data: requestData
  });

  return response;
};

export const useMoveWalletsService = () => {
  const queryClient = useQueryClient();
  const { hubId, walletId, listId } = useParams();

  const id = hubId ?? walletId ?? listId;
  const type = hubId ? 'hub' : walletId ? 'wallet' : 'list';

  const { filterTaskByAssigneeIds: assigneeUserId } = useAppSelector((state) => state.task);
  const { sortAbleArr } = useAppSelector((state) => state.task);
  const sortArrUpdate = sortAbleArr.length <= 0 ? null : sortAbleArr;

  const { filters } = generateFilters();

  return useMutation(moveWallet, {
    onSuccess: () => {
      queryClient.invalidateQueries(['task', { listId, assigneeUserId, sortArrUpdate, filters }]);
      queryClient.invalidateQueries(['task', id, type]);
      queryClient.invalidateQueries(['retrieve', id ?? 'root', 'tree']);
      queryClient.invalidateQueries(['retrieve', id ?? 'root', undefined]);
    }
  });
};

export const createWalletService = (data: {
  name: string;
  hubID?: string | null;
  walletId?: string | null;
  color?: string;
}) => {
  const response = requestNew<ICreateWallet>({
    url: 'wallets',
    method: 'POST',
    data: {
      name: data.name,
      color: data.color,
      hub_id: data.hubID,
      parent_id: data.walletId
    }
  });
  return response;
};

// // get wallets
export const getWalletService = (currentWalletId: string | null) => {
  return useQuery(['wallet', currentWalletId], async () => {
    const response = await requestNew<IWalletRes | undefined>({
      url: 'wallets',
      method: 'GET',
      params: {
        parent_id: currentWalletId //this returns for subwallet
        // hub_id: //this is the hub id
        // is_archived: //toggle archive
      }
    });
    return response;
  });
};

export const getWalletServices = (data: { hubId?: string | null; Archived?: boolean; parentId?: string | null }) => {
  // const queryClient = useQueryClient();
  return useQuery(['wallets', { data: [data.hubId, data.parentId], isArchived: data.Archived ? 1 : 0 }], () =>
    requestNew<IWalletRes | undefined>({
      url: 'wallets',
      method: 'GET',
      params: {
        hub_id: data.hubId,
        is_archived: data.Archived ? 1 : 0, // send is_archived query
        parent_id: data.parentId //send wallet id for subwallet
      }
    })
  );
};

//edit wallet
export const UseEditWalletService = (data: {
  walletName?: string;
  WalletId?: string | null;
  description?: string | null | undefined;
  walletColor?: string | null | { innerColour?: string; outterColour?: string };
}) => {
  const response = requestNew<IResponseWallet>({
    url: `wallets/${data.WalletId}`,
    method: 'PUT',
    params: {
      name: data.walletName,
      color: data.walletColor,
      description: data.description
    }
  });
  return response;
};

//del wallet
export const UseDeleteWalletService = (data: { id: string | null | undefined; delWallet: boolean }) => {
  const dispatch = useDispatch();
  const walletId = data.id;
  const { hub } = useAppSelector((state) => state.hub);
  return useQuery(
    ['wallets'],
    async () => {
      const data = await requestNew<IResponseWallet>({
        url: `wallets/${walletId}`,
        method: 'DELETE'
      });
      return data;
    },
    {
      enabled: data.delWallet,
      onSuccess: () => {
        dispatch(setDeleteWallet(false));
        const updatedTree = deleteWalletManager(walletId as string, hub);
        dispatch(getHub(updatedTree));
        dispatch(setFilteredResults(updatedTree));
      }
    }
  );
};

//archive wallet
export const UseArchiveWalletService = (wallet: { query: string | null | undefined; archiveWallet: boolean }) => {
  const walletId = wallet.query;
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useQuery(
    ['wallet', walletId],
    async () => {
      const data = await requestNew({
        url: `wallets/${walletId}/archive`,
        method: 'POST'
      });
      return data;
    },
    {
      initialData: queryClient.getQueryData(['wallet', walletId]),
      enabled: wallet.archiveWallet,
      onSuccess: () => {
        dispatch(setArchiveWallet(false));
        dispatch(closeMenu());
        queryClient.invalidateQueries();
      }
    }
  );
};

//get wallet details
export const UseGetWalletDetails = (query: { activeItemId?: string | null; activeItemType?: string | null }) => {
  return useQuery(
    ['wallet-details', query],
    async () => {
      const data = await requestNew<IWalletDetailRes>({
        url: `wallets/${query.activeItemId}`,
        method: 'GET'
      });
      return data;
    },
    {
      enabled: query.activeItemType === 'wallet' && !!query.activeItemId
      // onSuccess(data) {
      //   console.log(data.data.wallet);
      // }
    }
  );
};
