import { useDispatch } from 'react-redux';
import requestNew from '../../app/requestNew';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { setArchiveWallet } from './walletSlice';
import { closeMenu, setSpaceStatuses } from '../hubs/hubSlice';
import { IWallet, IWalletDetailRes } from './wallet.interfaces';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { generateFilters } from '../../components/TasksHeader/lib/generateFilters';
import { EntityType } from '../../utils/EntityTypes/EntityType';

interface IResponseWallet {
  data: {
    wallet: IWallet;
  };
}

const moveWallet = (data: { parent_id?: string; walletId?: string; hubId?: string; overType: string }) => {
  const { walletId, parent_id, overType, hubId } = data;

  const requestData = overType === EntityType.wallet ? { parent_id } : { hub_id: hubId };

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
  const type = hubId ? EntityType.hub : walletId ? EntityType.wallet : EntityType.list;

  const { sortAbleArr } = useAppSelector((state) => state.task);
  const sortArrUpdate = sortAbleArr.length <= 0 ? null : sortAbleArr;

  const { filters } = generateFilters();

  return useMutation(moveWallet, {
    onSuccess: () => {
      queryClient.invalidateQueries(['task', { listId, sortArrUpdate, filters }]);
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
  const response = requestNew<IResponseWallet>({
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

//edit wallet
export const UseEditWalletService = (data: {
  walletName?: string;
  walletId?: string | null;
  description?: string | null | undefined;
  color?: string | null | { innerColour?: string; outterColour?: string };
}) => {
  const response = requestNew<IResponseWallet>({
    url: `wallets/${data.walletId}`,
    method: 'PUT',
    params: {
      name: data.walletName,
      color: data.color,
      description: data.description
    }
  });
  return response;
};

//del wallet
export const UseDeleteWalletService = (data: { id: string | null | undefined }) => {
  const walletId = data.id;
  const response = requestNew<IResponseWallet>({
    url: `wallets/${walletId}`,
    method: 'DELETE'
  });
  return response;
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
  const dispatch = useAppDispatch();

  return useQuery(
    ['wallet-details', { query }],
    async () => {
      const data = await requestNew<IWalletDetailRes>({
        url: `wallets/${query.activeItemId}`,
        method: 'GET'
      });
      return data;
    },
    {
      enabled: query.activeItemType === 'wallet' && !!query.activeItemId,
      onSuccess: (data) => {
        const walletTaskStatus = data.data.wallet.task_statuses;
        if (query.activeItemType === EntityType.wallet) {
          console.log(walletTaskStatus);
          dispatch(setSpaceStatuses(walletTaskStatus));
        }
      }
    }
  );
};
