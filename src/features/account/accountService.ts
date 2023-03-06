import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';
import { IAccountReq, IUserParams, IUserSettings, IUserSettingsRes } from './account.interfaces';

// Get all user's workspaces
export const useGetMyWorkspaces = () => {
  const queryClient = useQueryClient();

  return useQuery<IAccountReq>(
    ['my_workspaces'],
    async () =>
      requestNew(
        {
          url: 'auth/account/workspaces',
          method: 'GET'
        },
        true
      ),
    {
      onSuccess: (data) => {
        data.data.workspaces.map((workspace) => queryClient.setQueryData(['my_workspace', workspace.id], workspace));
      }
    }
  );
};

// Switch workspace service
export const switchWorkspaceService = async (data: { workspaceId: string }) => {
  const response = requestNew<{ data: { workspace: { id: string } } }>(
    {
      url: `auth/account/workspaces/${data.workspaceId}/switch`,
      method: 'POST'
    },
    true
  );
  return response;
};

export const useGetUserSettingsKeys = (enabled: boolean) =>
  useQuery<IUserSettingsRes, unknown, IUserSettings>(
    ['user-settings'],
    () =>
      requestNew(
        {
          url: 'user/settings',
          method: 'GET',
          params: {
            keys: 'sidebar'
          }
        },
        true
      ),
    {
      enabled,
      select: (res) => res.data.settings[0]
    }
  );

export const setUserSettingsKeys = (value: IUserParams) => {
  const request = requestNew(
    {
      url: 'user/settings',
      method: 'PUT',
      data: {
        keys: [{ key: 'sidebar', value }]
      }
    },
    true
  );
  return request;
};

export const useSetUserSettingsKeys = () => {
  const queryClient = useQueryClient();

  return useMutation(setUserSettingsKeys, {
    onSuccess: () => {
      queryClient.invalidateQueries(['user-settings']);
    }
  });
};
