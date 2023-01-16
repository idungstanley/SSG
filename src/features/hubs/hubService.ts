import { useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';
import { IResponseGetHubs, IHubReq } from './hubs.interfaces';
import { setArchiveHub, setDelHub } from './hubSlice';
import { useDispatch } from 'react-redux';

export const createHubService = (data: {
  name: string;
  currHubId?: string;
  currentWorkspaceId?: string;
}) => {
  const response = requestNew(
    {
      url: 'hubs',
      method: 'POST',
      data: {
        name: data.name,
        current_workspace_id: data.currentWorkspaceId,
        parent_id: data.currHubId,
      },
    },
    false,
    true
  );
  return response;
};

// get all hubs
export const useGetHubList = ({ query }) => {
  const queryClient = useQueryClient();

  return useQuery<IResponseGetHubs>(
    ['hubs', { isArchived: query ? 1 : 0 }],
    () =>
      requestNew(
        {
          url: 'hubs',
          method: 'GET',
          params: {
            is_archived: query ? 1 : 0,
          },
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

//get subhub
export const useGetSubHub = ({ parentId }) => {
  return useQuery<IResponseGetHubs>(
    ['hubs', { parentId: parentId }],
    () =>
      requestNew(
        {
          url: `hubs/${parentId}`,
          method: 'GET',
        },
        false,
        true
      ),
    {
      enabled: parentId != null,
    }
  );
};

//edit a hub
export const useEditHubService = (data: {
  name: string;
  currentWorkspaceId?: string;
  currHubId?: string | null;
}) => {
  const response = requestNew(
    {
      url: `hubs/${data.currHubId}`,
      method: 'PUT',
      params: {
        name: data.name,
        current_workspace_id: data.currentWorkspaceId,
      },
    },
    false,
    true
  );
  return response;
};

//Delete a Hub
export const UseDeleteHubService = (hub) => {
  const dispatch = useDispatch();
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
      enabled: hub.delHub,
      onSuccess: () => {
        queryClient.invalidateQueries(['hubs']);
        dispatch(setDelHub(false));
      },
    }
  );
};

//archive hub
export const ArchiveHubService = (hub) => {
  const hubid = hub.query;
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useQuery(
    ['hubs', hubid],
    async () => {
      const data = await requestNew(
        {
          url: `at/hubs/${hubid}/archive`,
          method: 'POST',
        },
        true
      );
      return data;
    },
    {
      initialData: queryClient.getQueryData(['hubs', hubid]),
      enabled: hub.archiveHub,
      onSuccess: () => {
        dispatch(setArchiveHub(false));
      },
    }
  );
};

export const useGetHubWallet = (hubId: string | null) =>
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
