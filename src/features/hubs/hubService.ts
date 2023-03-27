import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import requestNew from '../../app/requestNew';
import { IResponseGetHubs, IHubReq, IFavoritesRes, IHubDetailRes } from './hubs.interfaces';
import { closeMenu, getHub, setShowFavEditInput, setTriggerFavUpdate } from './hubSlice';
import { setArchiveHub, setDelHub } from './hubSlice';

export const createHubService = (data: {
  name: string;
  currHubId?: string | null;
  currentWorkspaceId?: string;
  confirmAction?: number | undefined;
}) => {
  const response = requestNew({
    url: 'hubs',
    method: 'POST',
    data: {
      name: data.name,
      current_workspace_id: data.currentWorkspaceId,
      parent_id: data.currHubId,
      confirm: data.confirmAction
    }
  });
  return response;
};

// get all hubs
export const useGetHubList = ({ query }: { query: number | null }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useQuery<IResponseGetHubs>(
    ['hubs', { isArchived: query ? 1 : 0 }],
    () =>
      requestNew({
        url: 'hubs',
        method: 'GET',
        params: {
          is_archived: query ? 1 : 0
        }
      }),
    {
      onSuccess: (data) => {
        const hubData = data.data.hubs.map((hub) => {
          queryClient.setQueryData(['hub', hub.id], hub);
          return { ...hub, isOpen: false };
        });
        dispatch(getHub(hubData));
      }
    }
  );
};

export const useGetHubChildren = ({ query }: { query: string | null | undefined }) => {
  const hubId = query;

  return useQuery(['hubs', hubId], async () => {
    const data = await requestNew<IHubReq>({
      url: `at/hubs/${hubId}`,
      method: 'GET'
    });
    return data;
  });
};

//get subhub
export const useGetSubHub = ({ parentId }: { parentId: string | null }) => {
  return useQuery<IResponseGetHubs>(
    ['hubs', { parentId: parentId }],
    () =>
      requestNew({
        url: `hubs/${parentId}`,
        method: 'GET'
      }),
    {
      enabled: parentId != null
    }
  );
};

//edit a hub
export const useEditHubService = (data: {
  name?: string;
  currentWorkspaceId?: string;
  currHubId?: string | null;
  color?: string | null;
}) => {
  const response = requestNew({
    url: `hubs/${data.currHubId}`,
    method: 'POST',
    params: {
      name: data.name,
      color: data.color,
      current_workspace_id: data.currentWorkspaceId
    }
  });
  return response;
};

//Delete a Hub
export const UseDeleteHubService = (data: { query: string | null | undefined; delHub: boolean }) => {
  const dispatch = useDispatch();
  const hubid = data.query;
  const queryClient = useQueryClient();
  return useQuery(
    ['hubs'],
    async () => {
      const data = await requestNew({
        url: `at/hubs/${hubid}`,
        method: 'DELETE'
      });
      return data;
    },
    {
      // initialData: queryClient.getQueryData(['hubs', hubid]),
      enabled: data.delHub,
      // retry: false,
      onSuccess: () => {
        queryClient.invalidateQueries();
        dispatch(setDelHub(false));
      }
    }
  );
};

//archive hub
export const ArchiveHubService = (hub: { query: string | null | undefined; archiveHub: boolean }) => {
  const hubid = hub.query;
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useQuery(
    ['hubs', hubid],
    async () => {
      const data = await requestNew({
        url: `at/hubs/${hubid}/archive`,
        method: 'POST'
      });
      return data;
    },
    {
      initialData: queryClient.getQueryData(['hubs', hubid]),
      enabled: hub.archiveHub,
      onSuccess: () => {
        dispatch(setArchiveHub(false));
        dispatch(closeMenu());
        queryClient.invalidateQueries();
      }
    }
  );
};

//get hub details
export const UseGetHubDetails = (query: {
  activeItemId: string | null | undefined;
  activeItemType?: string | null;
}) => {
  return useQuery(
    ['hubs', query],
    async () => {
      const data = await requestNew<IHubDetailRes>({
        url: `hubs/${query.activeItemId}/details`,
        method: 'GET'
      });
      return data;
    },
    {
      enabled: (query.activeItemType === 'hub' || query.activeItemType === 'subhub') && !!query.activeItemId
    }
  );
};

export const useGetHubWallet = (hubId: string | null) =>
  useQuery([`hub-${hubId}`], () =>
    requestNew<IHubReq | undefined>({
      url: `hubs/${hubId}`,
      method: 'GET'
    })
  );

const addToFavorite = (data: {
  query: string | null | undefined;
  type: string | null | undefined;
  // trigger: boolean;
}) => {
  let newType: string | null | undefined = null;
  const { query, type } = data;
  if (type === 'hubs' || type === 'subhub') {
    newType = 'hub';
  } else {
    newType = type;
  }
  const response = requestNew({
    url: '/favorites',
    method: 'POST',
    params: {
      type: newType,
      id: query
    }
  });
  return response;
};

export const useCreateFavorite = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  return useMutation(addToFavorite, {
    onSuccess: () => {
      queryClient.invalidateQueries(['favorites']);
      dispatch(closeMenu());
    }
  });
};

export const useGetFavourites = () => {
  return useQuery(['favorites'], async () => {
    const data = await requestNew<IFavoritesRes>({
      url: '/favorites',
      method: 'GET'
    });
    return data;
  });
};

const unfavoriteEntity = (req: { delFav: string | null }) => {
  const id = req.delFav;
  const request = requestNew({
    url: `/favorites/${id}`,
    method: 'DELETE'
  });
  return request;
};

export const useUnfavoriteEntity = () => {
  const queryClient = useQueryClient();

  return useMutation(unfavoriteEntity, {
    onSuccess: () => {
      queryClient.invalidateQueries(['favorites']);
    }
  });
};

export const UseUpdateFavService = ({
  favId,
  name,
  trigger
}: {
  favId: string | null;
  name: string | null;
  trigger: boolean;
}) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  return useQuery(
    ['favorite', { favId, name }],
    async () => {
      const data = requestNew({
        url: `/favorites/${favId}`,
        method: 'PUT',
        params: {
          name: name
        }
      });
      return data;
    },
    {
      enabled: favId != null && trigger !== false,
      onSuccess: () => {
        queryClient.invalidateQueries();
        dispatch(setShowFavEditInput(null));
        dispatch(setTriggerFavUpdate(false));
      }
    }
  );
};
