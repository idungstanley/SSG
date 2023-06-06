import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';
import { IAccountReq, IUserParams, IUserSettings, IUserSettingsRes } from './account.interfaces';

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

export const setResolution = async (data: { resolution: string }) => {
  const response = requestNew<{ data: { resolution: string } }>({
    url: '/settings',
    method: 'PUT',
    data: {
      keys: [{ key: 'sidebar', resolution: data.resolution }]
    }
  });
  return response;
};

export const useGetUserSettingsKeys = (enabled: boolean, resolution?: string | null) => {
  return useQuery<IUserSettingsRes, unknown, IUserSettings>(
    ['user-settings'],
    () =>
      requestNew({
        url: 'user/settings',
        method: 'GET',
        params: {
          keys: 'sidebar',
          resolution: resolution
        }
      }),
    {
      enabled: enabled,
      select: (res) => res.data.settings[0],
      onSuccess: (data) => {
        console.log(data);
        localStorage.setItem('userSettingsData', JSON.stringify(data));
      }
    }
  );
};

export const setUserSettingsKeys = (value: IUserParams, resolution?: string | null) => {
  const request = requestNew({
    url: 'user/settings',
    method: 'PUT',
    data: {
      keys: [{ key: 'sidebar', value, resolution: resolution }]
    }
  });
  return request;
};

export const setUserSettingsData = (enabled: boolean, value: IUserParams, resolution?: string | null) => {
  console.log(value);
  const queryClient = useQueryClient();

  return useQuery<IUserSettingsRes, unknown, IUserSettings>(
    ['user-settings', { value }],
    () =>
      requestNew({
        url: 'user/settings',
        method: 'PUT',
        data: {
          keys: [{ key: 'sidebar', value, resolution: resolution }]
        }
      }),
    {
      enabled,
      onSuccess: (data) => {
        // queryClient.invalidateQueries(['user-settings']);
        console.log(data);
      }
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
