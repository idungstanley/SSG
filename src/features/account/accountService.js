import { useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';

// Get all user's workspaces
export const useGetMyWorkspaces = () => {
  const queryClient = useQueryClient();

  return useQuery(
    ['my_workspaces'],
    async () => requestNew({
      url: 'auth/account/workspaces',
      method: 'GET',
    }, true),
    {
      onSuccess: (data) => {
        data.data.workspaces.map((workspace) => queryClient.setQueryData(['my_workspace', workspace.id], workspace));
      },
    },
  );
};

// Switch workspace service
export const switchWorkspaceService = async (data) => {
  const response = requestNew({
    url: `auth/account/workspaces/${data.workspaceId}/switch`,
    method: 'POST',
  }, true);
  return response;
};
