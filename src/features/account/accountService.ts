import { useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';
import { IAccountReq } from './account.interfaces';

// Get all user's workspaces
export const useGetMyWorkspaces = () => {
  const queryClient = useQueryClient();

  return useQuery<IAccountReq>(
    ['my_workspaces'],
    async () =>
      requestNew(
        {
          url: 'auth/account/workspaces',
          method: 'GET',
        },
        true
      ),
    {
      onSuccess: (data) => {
        data.data.workspaces.map((workspace) =>
          queryClient.setQueryData(['my_workspace', workspace.id], workspace)
        );
      },
    }
  );
};

// Switch workspace service
export const switchWorkspaceService = async (data: { workspaceId: string }) => {
  const response = requestNew(
    {
      url: `auth/account/workspaces/${data.workspaceId}/switch`,
      method: 'POST',
    },
    true
  );
  return response;
};
