import { useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';
import { IResponseGetHubs, IHubReq } from './hubs.interfaces';

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
        data.data.hubs.map((hub) =>
          queryClient.setQueryData(['hub', hub.id], hub)
        );
      },
    }
  );
};

//Delete a Hub
export const UseDeleteHubService = (hub) => {
  const hubid = hub.query;
  const queryClient = useQueryClient();
  return useQuery(
    ['hubs', hubid],
    async () => {
      const data = await requestNew(
        {
          url: `at/hubs/${hubid}`,
          method: 'DELETE',
        },
        true
      );
      return data;
    },
    {
      initialData: queryClient.getQueryData(['hubs', hubid]),
      enabled: hub.delHub
    }
  );
};

export const useGetHub = (hubId: string | null) =>
  useQuery<IHubReq>([`hub-${hubId}`], () =>
    requestNew(
      {
        url: `hubs/${hubId}`,
        method: 'GET',
      },
      false,
      true
    )
  );
