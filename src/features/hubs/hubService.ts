import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import requestNew from '../../app/requestNew';
import { getWallet } from '../wallet/walletSlice';
import { IResponseGetHubs, IHubReq } from './hubs.interfaces';
import { getHub } from './hubSlice';

export const createHubService = (data: {
  name: string;
  currentWorkspaceId?: string;
}) => {
  const response = requestNew(
    {
      url: 'hubs',
      method: 'POST',
      data: {
        name: data.name,
        current_workspace_id: data.currentWorkspaceId,
      },
    },
    false,
    true
  );
  return response;
};

// get all hubs
export const useGetHubList = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useQuery<IResponseGetHubs>(
    ['hubs'],
    () =>
      requestNew(
        {
          url: 'hubs',
          method: 'GET',
        },
        false,
        true
      ),
    {
      onSuccess: (data) => {
        const hubData = data.data.hubs.map((hub) => {
          queryClient.setQueryData(['hub', hub.id], hub);
          return { ...hub, isOpen: false };
        });
        dispatch(getHub(hubData));
      },
    }
  );
};

export const useGetHub = (hubId: string | null) => {
  const dispatch = useDispatch();
  return useQuery<IHubReq>(
    [`hub-${hubId}`],
    () =>
      requestNew(
        {
          url: `hubs/${hubId}`,
          method: 'GET',
        },
        false,
        true
      ),
    {
      enabled: hubId != null,
      onSuccess: (data) => {
        const WalletData = data.data.wallets.map((hub) => ({
          ...hub,
          isOpen: false,
        }));
        dispatch(getWallet(WalletData));
      },
    }
  );
};
