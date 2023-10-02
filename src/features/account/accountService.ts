import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';
import { IAccountReq, IUserCalendarParams, IUserParams, IUserSettings, IUserSettingsRes } from './account.interfaces';
import { SetUserSettingsStore } from './accountSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

// Get all user's workspaces
export const useGetMyWorkspaces = () => {
  const queryClient = useQueryClient();

  return useQuery<IAccountReq>(
    ['my_workspaces'],
    async () =>
      requestNew({
        url: 'auth/account/workspaces',
        method: 'GET'
      }),
    {
      onSuccess: (data) => {
        data.data.workspaces.map((workspace) => queryClient.setQueryData(['my_workspace', workspace.id], workspace));
      }
    }
  );
};

// Switch workspace service
export const switchWorkspaceService = async (data: { workspaceId: string }) => {
  const response = requestNew<{ data: { workspace: { id: string } } }>({
    url: `auth/account/workspaces/${data.workspaceId}/switch`,
    method: 'POST'
  });
  return response;
};

export const useGetUserSettingsKeys = (enabled: boolean, key: string, resolution?: string | null) => {
  const dispatch = useAppDispatch();
  const { isFavoritePinned } = useAppSelector((state) => state.workspace);
  return useQuery<IUserSettingsRes, unknown, IUserSettings>(
    ['user-settings', { isFavoritePinned }],
    () =>
      requestNew({
        url: 'user/settings',
        method: 'GET',
        params: {
          keys: key,
          resolution: resolution
        }
      }),
    {
      enabled: enabled,
      select: (res) => res.data.settings[0],
      onSuccess: (data) => {
        localStorage.setItem('userSettingsData', JSON.stringify(data));
        if (data && data.value) {
          dispatch(SetUserSettingsStore(data.value));
        }
      }
    }
  );
};

export const setUserSettingsKeys = (data: { value: IUserParams; resolution?: string | null }) => {
  const request = requestNew({
    url: 'user/settings',
    method: 'PUT',
    data: {
      keys: [{ key: 'sidebar', value: data.value, resolution: data.resolution }]
    }
  });
  return request;
};

export const setUserSettingsData = (
  enabled: boolean,
  key: string,
  value: IUserParams | IUserCalendarParams,
  resolution?: string | null
) => {
  const { isFavoritePinned } = useAppSelector((state) => state.workspace);

  const { sidebarWidth, showPreview, isFavoritePinned: isFavoritePinnedValue } = value as IUserParams;

  return useQuery<IUserSettingsRes, unknown, IUserSettings>(
    ['user-settings', { sidebarWidth, showPreview, isFavoritePinned, isFavoritePinnedValue }],
    () =>
      requestNew({
        url: 'user/settings',
        method: 'PUT',
        data: {
          keys: [{ key: key, value, resolution: resolution }]
        }
      }),
    {
      enabled: enabled || !isFavoritePinned || isFavoritePinned
    }
  );
};

export const useSetUserSettingsKeys = () => {
  const queryClient = useQueryClient();

  return useMutation(setUserSettingsKeys, {
    onSuccess: () => {
      queryClient.invalidateQueries(['user-settings']);
    }
  });
};
