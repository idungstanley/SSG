import { useDispatch } from 'react-redux';
import requestNew from '../../app/requestNew';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { setArchiveWallet } from './walletSlice';
import { closeMenu, getHub, setSpaceStatuses, setSpaceViews } from '../hubs/hubSlice';
import { IWallet, IWalletDetailRes } from './wallet.interfaces';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { EntityType } from '../../utils/EntityTypes/EntityType';
import { setChecklists } from '../task/checklist/checklistSlice';
import { ICheckListRes } from '../task/interface.tasks';
import { findCurrentHub } from '../../managers/Hub';
import { walletMoveManager } from '../../managers/Wallet';
import { setFilteredResults } from '../search/searchSlice';
import { setDragOverItem, setDraggableItem } from '../list/listSlice';

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
  const dispatch = useDispatch();

  const { draggableItemId, dragOverItemId } = useAppSelector((state) => state.list);
  const { hub } = useAppSelector((state) => state.hub);

  return useMutation(moveWallet, {
    onSuccess: () => {
      const droppableEl = findCurrentHub(dragOverItemId as string, hub);
      const type = droppableEl.id ? EntityType.hub : EntityType.wallet;
      const updatedTree = walletMoveManager(type, draggableItemId as string, dragOverItemId as string, hub);
      dispatch(getHub(updatedTree));
      dispatch(setFilteredResults(updatedTree));
      dispatch(setDraggableItem(null));
      dispatch(setDragOverItem(null));
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
    data: {
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
          dispatch(setSpaceStatuses(walletTaskStatus));
        }
        const listViews = data.data.wallet.task_views;
        dispatch(setSpaceViews(listViews));
        dispatch(setChecklists(data?.data.wallet.checklists as ICheckListRes[]));
      },
      cacheTime: 0
    }
  );
};
