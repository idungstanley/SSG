import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import requestNew from "../../app/requestNew";
import { IResponseGetHubs, IHubReq } from "./hubs.interfaces";
import {
  closeMenu,
  getHub,
  setDelFavId,
  setShowFavEditInput,
  // setshowMenuDropdown,
  setTriggerAddToFav,
  setTriggerFavUpdate,
} from "./hubSlice";
import { setArchiveHub, setDelHub } from "./hubSlice";

export const createHubService = (data: {
  name: string;
  currHubId?: string | null;
  currentWorkspaceId?: string;
}) => {
  const response = requestNew(
    {
      url: "hubs",
      method: "POST",
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
export const useGetHubList = ({ query }: { query: number | null }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useQuery<IResponseGetHubs>(
    ["hubs", { isArchived: query ? 1 : 0 }],
    () =>
      requestNew(
        {
          url: "hubs",
          method: "GET",
          params: {
            is_archived: query ? 1 : 0,
          },
        },
        false,
        true
      ),
    {
      onSuccess: (data) => {
        const hubData = data.data.hubs.map((hub) => {
          queryClient.setQueryData(["hub", hub.id], hub);
          return { ...hub, isOpen: false };
        });
        dispatch(getHub(hubData));
      },
    }
  );
};

export const useGetHubChildren = ({
  query,
}: {
  query: string | null | undefined;
}) => {
  const hubId = query;

  return useQuery(["hubs", hubId], async () => {
    const data = await requestNew(
      {
        url: `at/hubs/${hubId}`,
        method: "GET",
      },
      true
    );
    return data;
  });
};

//get subhub
export const useGetSubHub = ({ parentId }: { parentId: string | null }) => {
  return useQuery<IResponseGetHubs>(
    ["hubs", { parentId: parentId }],
    () =>
      requestNew(
        {
          url: `hubs/${parentId}`,
          method: "GET",
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
      method: "PUT",
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
export const UseDeleteHubService = (data: {
  query: string | null;
  delHub: boolean;
}) => {
  const dispatch = useDispatch();
  const hubid = data.query;
  const queryClient = useQueryClient();
  return useQuery(
    ["hubs"],
    async () => {
      const data = await requestNew(
        {
          url: `at/hubs/${hubid}`,
          method: "DELETE",
        },
        true
      );
      return data;
    },
    {
      // initialData: queryClient.getQueryData(['hubs', hubid]),
      enabled: data.delHub,
      // retry: false,
      onSuccess: () => {
        queryClient.invalidateQueries();
        dispatch(setDelHub(false));
      },
    }
  );
};

//archive hub
export const ArchiveHubService = (hub: {
  query: string | null;
  archiveHub: boolean;
}) => {
  const hubid = hub.query;
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useQuery(
    ["hubs", hubid],
    async () => {
      const data = await requestNew(
        {
          url: `at/hubs/${hubid}/archive`,
          method: "POST",
        },
        true
      );
      return data;
    },
    {
      initialData: queryClient.getQueryData(["hubs", hubid]),
      enabled: hub.archiveHub,
      onSuccess: () => {
        dispatch(setArchiveHub(false));
        dispatch(closeMenu());
        queryClient.invalidateQueries();
      },
    }
  );
};

//get hub details
export const UseGetHubDetails = (query: {
  activeItemId?: string;
  activeItemType?: string | null;
}) => {
  return useQuery(
    ["hubs", query],
    async () => {
      const data = await requestNew(
        {
          url: `at/hubs/${query.activeItemId}/details`,
          method: "GET",
        },
        true
      );
      return data;
    },
    {
      enabled:
        (query.activeItemType === "hub" || query.activeItemType === "subhub") &&
        !!query.activeItemId,
    }
  );
};

export const useGetHubWallet = (hubId: string | null) =>
  useQuery<IHubReq>([`hub-${hubId}`], () =>
    requestNew(
      {
        url: `hubs/${hubId}`,
        method: "GET",
      },
      false,
      true
    )
  );

export const useAddToFavourites = (data: {
  query: string | null;
  type: string | null;
  trigger: boolean;
}) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  let newType: string | null = null;
  const { query, type, trigger } = data;
  if (type === "hubs" || type === "subhub") {
    newType = "hub";
  } else {
    newType = type;
  }
  return useQuery(
    ["favorites", { query }],
    async () => {
      const data = requestNew(
        {
          url: `/favorites`,
          method: "POST",
          params: {
            type: newType,
            id: query,
          },
        },
        true
      );
      return data;
    },
    {
      enabled: !!trigger,
      onSuccess: () => {
        dispatch(setTriggerAddToFav(false));
        dispatch(closeMenu());
        queryClient.invalidateQueries();
      },
    }
  );
};

export const useGetFavourites = () => {
  // const queryClient = useQueryClient();
  // const dispatch = useDispatch();
  return useQuery(["favorites"], async () => {
    const data = await requestNew(
      {
        url: `/favorites`,
        method: "GET",
      },
      true
    );
    return data;
  });
};

export const UseDeleteFav = (req: { delFav: string | null }) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const id = req.delFav;
  return useQuery(
    ["favorites", { id }],
    async () => {
      const data = await requestNew(
        {
          url: `/favorites/${id}`,
          method: "DELETE",
        },
        true
      );
      return data;
    },
    {
      enabled: id != null,
      onSuccess: () => {
        queryClient.invalidateQueries();
        dispatch(setDelFavId(null));
      },
      onError: () => {
        dispatch(setDelFavId(null));
      },
    }
  );
};

export const UseUpdateFavService = ({
  favId,
  name,
  trigger,
}: {
  favId: string | null;
  name: string;
  trigger: boolean;
}) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  return useQuery(
    ["favorite", { favId, name }],
    async () => {
      const data = requestNew(
        {
          url: `/favorites/${favId}`,
          method: "PUT",
          params: {
            name: name,
          },
        },
        true
      );
      return data;
    },
    {
      enabled: favId != null && trigger !== false,
      onSuccess: () => {
        queryClient.invalidateQueries();
        dispatch(setShowFavEditInput(null));
        dispatch(setTriggerFavUpdate(false));
      },
    }
  );
};
