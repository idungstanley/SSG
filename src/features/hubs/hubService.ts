import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import requestNew from '../../app/requestNew';
import { IHubReq, IFavoritesRes, IHubDetailRes, IHubsRes, IHub } from './hubs.interfaces';
import { closeMenu, setShowFavEditInput, setSpaceStatuses, setTriggerFavUpdate } from './hubSlice';
import { setArchiveHub } from './hubSlice';
import { generateFilters } from '../../components/TasksHeader/lib/generateFilters';
import { EntityType } from '../../utils/EntityTypes/EntityType';
import { Hub, List, StatusProps, Wallet } from '../../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';
import { matchedStatusProps } from '../../common/Prompt';

interface IResponseHub {
  data: {
    hub: IHub;
  };
}

const moveHub = (data: { parent_id: string; hubId: string }) => {
  const { hubId, parent_id } = data;
  const response = requestNew({
    url: 'hubs/' + hubId + '/move',
    method: 'POST',
    data: {
      parent_id: parent_id
    }
  });
  return response;
};

export const useMoveHubsService = () => {
  const queryClient = useQueryClient();
  const { hubId, walletId, listId } = useParams();

  const id = hubId ?? walletId ?? listId;
  const type = hubId ? EntityType.hub : walletId ? EntityType.wallet : EntityType.list;

  const { filterTaskByAssigneeIds: assigneeUserId } = useAppSelector((state) => state.task);
  const { sortAbleArr } = useAppSelector((state) => state.task);
  const sortArrUpdate = sortAbleArr.length <= 0 ? null : sortAbleArr;

  const { filters } = generateFilters();

  return useMutation(moveHub, {
    onSuccess: () => {
      queryClient.invalidateQueries(['hub']);
      queryClient.invalidateQueries(['sub-hub']);
      queryClient.invalidateQueries(['task']);
      queryClient.invalidateQueries(['task', { listId, assigneeUserId, sortArrUpdate, filters }]);
      queryClient.invalidateQueries(['task', id, type]);
      queryClient.invalidateQueries(['retrieve', id ?? 'root', 'tree']);
      queryClient.invalidateQueries(['retrieve', id ?? 'root', undefined]);
    }
  });
};

export const createHubService = (data: {
  name: string;
  color?: string;
  currHubId?: string | null;
  currentWorkspaceId?: string;
  confirmAction?: number | undefined;
}) => {
  const response = requestNew<IResponseHub>({
    url: 'hubs',
    method: 'POST',
    data: {
      name: data.name,
      color: data.color,
      current_workspace_id: data.currentWorkspaceId,
      parent_id: data.currHubId,
      confirm: data.confirmAction
    }
  });
  return response;
};

export const useGetAllHubs = () => {
  return useQuery(
    ['retrieve'],
    () =>
      requestNew<IHubsRes>({
        url: 'hubs',
        method: 'GET'
      }),
    {
      select: (res) => res.data
    }
  );
};

interface IActiveHubRes {
  data: {
    tree: [Hub | Wallet | List];
  };
}

export const useGetActiveHubChildren = ({ hub_id }: { hub_id?: string | null }) => {
  const id = hub_id;
  return useQuery(
    ['retrieve', id ? id : 'root'],
    () =>
      requestNew<IActiveHubRes>({
        url: 'tree',
        method: 'GET',
        params: {
          hub_id
        }
      }),
    {
      select: (res) => res.data
    }
  );
};

export const useGetHubChildren = ({ query, enabled }: { query: string | null | undefined; enabled?: boolean }) => {
  const hubId = query;

  return useQuery(
    ['hubs', hubId],
    async () => {
      const data = await requestNew<IHubReq>({
        url: `/hubs/${hubId}`,
        method: 'GET'
      });
      return data;
    },
    { enabled: enabled ? enabled : !!hubId }
  );
};

//edit a hub
export const UseEditHubService = (data: {
  hubId?: string | null;
  name?: string;
  currentWorkspaceId?: string;
  currHubId?: string | null;
  description?: string | null | undefined;
  color?: string | null | { innerColour?: string; outterColour?: string };
}) => {
  const response = requestNew<IResponseHub>({
    url: `hubs/${data.hubId}`,
    method: 'POST',
    params: {
      name: data.name,
      color: data.color,
      current_workspace_id: data.currentWorkspaceId,
      description: data.description
    }
  });
  return response;
};

//Delete a Hub
export const UseDeleteHubService = (data: { id: string | null | undefined }) => {
  const hubid = data.id;
  const response = requestNew({
    url: `hubs/${hubid}`,
    method: 'DELETE'
  });
  return response;
};

//status service
export const statusService = (statusTypes: StatusProps[]) => {
  const { statusTaskListDetails } = useAppSelector((state) => state.list);
  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);

  return useQuery(['status'], async () => {
    const data = await requestNew({
      url: 'task-statuses',
      method: 'POST',
      data: {
        model_id: statusTaskListDetails.listId,
        model_type: 'list',
        from_model: activeItemType,
        from_model_id: activeItemId,
        statuses: statusTypes
      }
    });
    return data;
  });
};

export const statusTypesService = (data: {
  model_id?: string;
  model?: string;
  from_model?: string | null;
  from_model_id?: string | null;
  statuses: StatusProps[];
  status_matches?: matchedStatusProps[];
}) => {
  const response = requestNew<unknown>({
    url: 'task-statuses',
    method: 'POST',
    data: {
      model_id: data.model_id,
      model: data.model,
      from_model: data.from_model,
      from_model_id: data.from_model_id,
      statuses: data.statuses,
      status_matches: data.status_matches
    }
  });
  return response;
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
        url: `hubs/${hubid}/archive`,
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
  const dispatch = useAppDispatch();
  const { workSpaceId } = useParams();
  const { currentWorkspaceId } = useAppSelector((state) => state.auth);

  const fetch = currentWorkspaceId == workSpaceId;
  return useQuery(
    ['hub-details', query],
    async () => {
      const data = await requestNew<IHubDetailRes>({
        url: `hubs/${query.activeItemId}/details`,
        method: 'GET'
      });
      return data;
    },
    {
      enabled: (query.activeItemType === 'hub' || query.activeItemType === 'subhub') && !!query.activeItemId && fetch,
      onSuccess: (data) => {
        if (query.activeItemType === 'hub' || query.activeItemType === 'subhub') {
          dispatch(setSpaceStatuses(data.data.hub.task_statuses));
        }
      }
    }
  );
};

const addToFavorite = (data: {
  query: string | null | undefined;
  type: string | null | undefined;
  // trigger: boolean;
}) => {
  let newType: string | null | undefined = null;
  const { query, type } = data;
  if (type === 'hubs' || type === EntityType.subHub) {
    newType = EntityType.hub;
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
