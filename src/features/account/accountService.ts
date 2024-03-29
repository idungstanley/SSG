import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';
import { IAccountReq, IUserCalendarParams, IUserParams, IUserSettings, IUserSettingsRes } from './account.interfaces';
import { SetUserSettingsStore, setColourPaletteData } from './accountSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { IColourRes } from '../workspace/workspace.interfaces';
import { STORAGE_KEYS } from '../../app/config/dimensions';

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
  const { userSettingsData, sidebarWidth, pilotWidth, extendedBarWidth } = useAppSelector((state) => state.account);

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
      onSuccess(data) {
        if (data) {
          const value = data.value;
          const updatedData = {
            [STORAGE_KEYS.SIDEBAR_WIDTH]: value.sidebarWidth ? value.sidebarWidth : sidebarWidth,
            [STORAGE_KEYS.PILOT_WIDTH]: value.pilotWidth ? value.pilotWidth : pilotWidth,
            [STORAGE_KEYS.EXTENDED_BAR_WIDTH]: value.extendedBarWidth ? value.extendedBarWidth : extendedBarWidth,
            [STORAGE_KEYS.HOT_KEYS]: value.hotkeys ? value.hotkeys : []
          };
          // dispatch(setActiveHotkeyIds(value.hotkeys ? value.hotkeys : []));
          dispatch(SetUserSettingsStore({ ...userSettingsData, ...updatedData }));
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

export const setUserSettingsKeysProfile = (data: { [key: string]: boolean }) => {
  const request = requestNew({
    url: 'user/settings',
    method: 'PUT',
    data: {
      keys: [{ key: 'hotkeys', value: data.value }]
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

export const AddColour = (data: {
  name: string;
  color: string | null;
  color_name: string | null;
  is_pinned?: boolean;
}) => {
  const request = requestNew({
    url: 'color-palette',
    method: 'POST',
    data: {
      name: data.name,
      color: data.color,
      color_name: data.color_name,
      is_pinned: data.is_pinned
    }
  });
  return request;
};

//delete palette colour
export const deletePaletteColour = ({ id }: { id: string }) => {
  const request = requestNew({
    url: `color-palette/${id}`,
    method: 'DELETE'
  });
  return request;
};
//delete palette colour
export const editPaletteColour = ({
  id,
  color,
  color_name,
  is_pinned,
  name
}: {
  name: string;
  color: string | null;
  color_name: string | null;
  is_pinned?: boolean;
  id: string;
}) => {
  const request = requestNew({
    url: `color-palette/${id}`,
    method: 'PUT',
    data: {
      color: color,
      color_name: color_name,
      is_pinned: is_pinned,
      name: name
    }
  });
  return request;
};

// Get colours
export const useGetColors = () => {
  const dispatch = useAppDispatch();
  return useQuery(
    ['color-palette'],
    async () => {
      const data = await requestNew<IColourRes>({
        url: 'color-palette',
        method: 'GET'
      });
      return data;
    },
    {
      onSuccess: (data) => {
        const palettData = data.data.palette_colors;
        dispatch(setColourPaletteData(palettData));
      }
    }
  );
};
