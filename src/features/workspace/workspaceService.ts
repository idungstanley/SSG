import requestNew from '../../app/requestNew';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  IAllWorkspacesRes,
  IAttachments,
  IWorkSpaceSettings,
  IWorkspaceRes,
  IWorkspaceSettingsRes,
  IWorkspaceSettingsUpdateRes,
  WorkSpaceSettingsRes
} from './workspace.interfaces';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setFetchAllWorkspace, setWorkSpaceSetting, setWorkSpaceSettingsObj, setWorkspaceData } from './workspaceSlice';
import { IFormData } from '../../components/Pilot/components/RecordScreen/Recording';

interface IData {
  name: string | number;
  companySize: string | number;
  emails: string[] | null;
  color: string | null;
}

export const createWorkspaceService = (data: IData) => {
  const response = requestNew<IWorkspaceRes>({
    url: 'workspace',
    method: 'POST',
    data: {
      name: data.name,
      company_size: data.companySize,
      emails: data.emails,
      color: data.color
    }
  });
  return response;
};
//   blob: Blob,
//   currentWorkspaceId: string | null | undefined,
//   accessToken: string | null,
//   activeItemId: string | null | undefined,
//   queryClient: QueryClient,
//   activeItemType: string | null | undefined
// ) => {
//   try {
//     const formData: IFormData = new FormData();
//     formData.append('files[0]', blob, 'recording.webm');
//     formData.append('title', 'My Recording Title');
//     formData.append('type', `${activeItemType}`);
//     formData.append('id', `${activeItemId}`);
//     const options: RequestInit = {
//       method: 'POST',
//       body: formData as BodyInit,
//       headers: currentWorkspaceId
//         ? {
//             Authorization: `Bearer ${accessToken}`,
//             current_workspace_id: currentWorkspaceId
//           }
//         : undefined
//     };

//     await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/attachments`, options);
//     // queryClient.invalidateQueries(['welcome']);
//   } catch (error) {
//     return error;
//   }
// };

export const useUploadRecording = () => {
  const uploadRecordingMutation = useMutation(
    async ({
      blob,
      currentWorkspaceId,
      accessToken,
      activeItemId,
      activeItemType
    }: {
      blob: Blob;
      currentWorkspaceId: string | null | undefined;
      accessToken: string | null;
      activeItemId: string | null | undefined;
      activeItemType: string | null | undefined;
    }) => {
      const formData: IFormData = new FormData();
      formData.append('files[0]', blob, 'recording.webm');
      formData.append('title', 'My Recording Title');
      formData.append('type', `${activeItemType}`);
      formData.append('id', `${activeItemId}`);
      const options: RequestInit = {
        method: 'POST',
        body: formData as BodyInit,
        headers: currentWorkspaceId
          ? {
              Authorization: `Bearer ${accessToken}`,
              current_workspace_id: currentWorkspaceId
            }
          : undefined
      };

      await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/attachments`, options);
    }
  );

  return uploadRecordingMutation;
};

export const getUploadAttatchment = ({ id, type }: { id: string; type: string | null | undefined }) => {
  const { currentWorkspaceId, accessToken } = useAppSelector((state) => state.auth);

  return useQuery(['attachments', { id: id }], async () => {
    const data = await requestNew<IAttachments | undefined>({
      url: 'attachments',
      method: 'GET',
      params: {
        type: type,
        id: id
      },
      headers: currentWorkspaceId
        ? {
            Authorization: `Bearer ${accessToken}`,
            current_workspace_id: currentWorkspaceId
          }
        : undefined
    });
    return data;
  });
};

export const deleteUploadedAttachment = async (data: { id: string }) => {
  const response = await requestNew({
    url: `attachments/${data.id}`,
    method: 'DELETE'
  });

  return response;
};

export const getWorkspaceService = () => {
  const dispatch = useAppDispatch();

  return useQuery(
    ['workspace'],
    async () => {
      const data = await requestNew<IWorkspaceRes | undefined>({
        url: 'workspace',
        method: 'GET'
      });
      return data;
    },
    {
      onSuccess: (data) => {
        dispatch(setWorkspaceData(data));
      }
    }
  );
};

export const getWorkSpaceSettings = () => {
  const dispatch = useAppDispatch();
  return useQuery(
    ['workspace-settings'],
    async () => {
      const data = await requestNew<IWorkspaceSettingsRes | undefined>({
        url: 'settings/workspace',
        method: 'GET'
      });

      return data;
    },
    {
      onSuccess(data) {
        dispatch(setWorkSpaceSetting(data?.data.workspace_settings));
      }
    }
  );
};

export const upDateWorkSpaceSettings = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  return useMutation(
    async ({ key, value }: { key: string; value: string | number }) => {
      const data = await requestNew<IWorkspaceSettingsUpdateRes>({
        url: 'settings/workspace/update-setting',
        method: 'POST',
        data: {
          key,
          value
        }
      });

      return data.data;
    },
    {
      onSuccess: (data) => {
        dispatch(setWorkSpaceSettingsObj(data.workspace_setting));
        queryClient.invalidateQueries(['workspace-settings']);
      }
    }
  );
};

export const getAllWorkSpaceService = () => {
  const { fetchAllWorkspace } = useAppSelector((state) => state.workspace);
  const dispatch = useAppDispatch();
  return useQuery(
    ['workspaces'],
    async () => {
      const data = await requestNew<IAllWorkspacesRes | undefined>({
        url: 'auth/account/workspaces',
        method: 'GET'
      });
      return data;
    },
    {
      enabled: !!fetchAllWorkspace,
      onSuccess: () => {
        dispatch(setFetchAllWorkspace(false));
      }
    }
  );
};

export const checkIfWorkspaceService = async () => {
  const response = requestNew({
    url: 'user/self',
    method: 'GET'
  });
  return response;
};

export const getActivityLogs = () => {
  const { activeItemType, activeItemId } = useAppSelector((state) => state.workspace);
  return useQuery(['logs', activeItemId], async () => {
    const data = await requestNew({
      url: 'api/activity-logs/list',
      method: 'POST',
      body: {
        model: activeItemType,
        model_id: activeItemId
      }
    });
    return data;
  });
};
