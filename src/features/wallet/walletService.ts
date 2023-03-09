import { useDispatch } from 'react-redux';
import requestNew from '../../app/requestNew';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { setArchiveWallet, setDeleteWallet } from './walletSlice';
import { closeMenu } from '../hubs/hubSlice';
import { ICreateWallet, IWalletRes } from './wallet.interfaces';

export const createWalletService = (data: { name: string; hubID?: string | null; walletId?: string | null }) => {
  const response = requestNew<ICreateWallet>(
    {
      url: 'at/wallets',
      method: 'POST',
      data: {
        name: data.name,
        hub_id: data.hubID,
        parent_id: data.walletId
      }
    },
    true
  );
  return response;
};

// // get wallets
export const getWalletService = (currentWalletId: string | null) => {
  return useQuery(['wallet', currentWalletId], async () => {
    const response = await requestNew<IWalletRes | undefined>(
      {
        url: 'at/wallets',
        method: 'GET',
        params: {
          parent_id: currentWalletId //this returns for subwallet
          // hub_id: //this is the hub id
          // is_archived: //toggle archive
        }
      },
      true
    );
    return response;
  });
};

export const getWalletServices = (data: { hubId?: string | null; Archived?: boolean; parentId?: string | null }) => {
  // const queryClient = useQueryClient();
  return useQuery(['wallet', { data: [data.hubId, data.parentId], isArchived: data.Archived ? 1 : 0 }], () =>
    requestNew<IWalletRes | undefined>(
      {
        url: 'wallets',
        method: 'GET',
        params: {
          hub_id: data.hubId,
          is_archived: data.Archived ? 1 : 0, // send is_archived query
          parent_id: data.parentId //send wallet id for subwallet
        }
      },
      false,
      true
    )
  );
};

//edit wallet
export const UseEditWalletService = (data: { walletName?: string; WalletId?: string | null }) => {
  const response = requestNew(
    {
      url: `wallets/${data.WalletId}`,
      method: 'PUT',
      params: {
        name: data.walletName
      }
    },
    false,
    true
  );
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
      const data = await requestNew(
        {
          url: `at/wallets/${walletId}`,
          method: 'DELETE'
        },
        true
      );
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
export const UseArchiveWalletService = (wallet: { query: string | null; archiveWallet: boolean }) => {
  const walletId = wallet.query;
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useQuery(
    ['wallet', walletId],
    async () => {
      const data = await requestNew(
        {
          url: `at/wallets/${walletId}/archive`,
          method: 'POST'
        },
        true
      );
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
    ['hubs', query],
    async () => {
      const data = await requestNew(
        {
          url: `at/wallets/${query.activeItemId}`,
          method: 'GET'
        },
        true
      );
      return data;
    },
    {
      enabled: query.activeItemType === 'wallet' && !!query.activeItemId
    }
  );
};
