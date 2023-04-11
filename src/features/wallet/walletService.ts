import { useDispatch } from 'react-redux';
import requestNew from '../../app/requestNew';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { setArchiveWallet, setDeleteWallet } from './walletSlice';
import { closeMenu } from '../hubs/hubSlice';
import { ICreateWallet, IWalletDetailRes, IWalletRes } from './wallet.interfaces';

export const createWalletService = (data: { name: string; hubID?: string | null; walletId?: string | null }) => {
  const response = requestNew<ICreateWallet>({
    url: 'wallets',
    method: 'POST',
    data: {
      name: data.name,
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
  const response = requestNew({
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
export const UseDeleteWalletService = (data: { query: string | null | undefined; delWallet: boolean }) => {
  const dispatch = useDispatch();
  const walletId = data.query;
  const queryClient = useQueryClient();
  return useQuery(
    ['wallets'],
    async () => {
      const data = await requestNew({
        url: `wallets/${walletId}`,
        method: 'DELETE'
      });
      return data;
    },
    {
      enabled: data.delWallet,
      onSuccess: () => {
        queryClient.invalidateQueries();
        dispatch(setDeleteWallet(false));
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
