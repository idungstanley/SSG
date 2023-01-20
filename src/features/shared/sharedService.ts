import {
  ISharedFiles,
  ISharedFolders,
  IExplorerAndSharedData,
  IShareLinkRes,
  IShareLink,
  expiresIn,
  IPublishRes,
} from './shared.interfaces';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';
import { explorerItemType } from '../../types';

export const useGetFolder = (folderId: string | null, enabled = true) => {
  const queryClient = useQueryClient();

  return useQuery<IExplorerAndSharedData | undefined>(
    ['shared_folder', folderId],
    () => queryClient.getQueryData(['shared_folder', folderId]),
    {
      enabled: folderId != null && enabled,
      initialData: () => queryClient.getQueryData(['shared_folder', folderId]),
    }
  );
};

// Get file
export const useGetFile = (fileId: string | null, enabled = true) => {
  const queryClient = useQueryClient();

  return useQuery<IExplorerAndSharedData | undefined>(
    ['shared_file', fileId],
    () => queryClient.getQueryData(['shared_file', fileId]),
    {
      enabled: fileId != null && enabled,
      initialData: () => queryClient.getQueryData(['shared_file', fileId]),
    }
  );
};

export const useGetSharedFiles = () => {
  const queryClient = useQueryClient();

  return useQuery<ISharedFiles>(
    ['shared_files', 'root-file'],
    async () =>
      requestNew({
        url: 'files/shared',
        method: 'GET',
      }),
    {
      onSuccess: (data) => {
        if (data.data.current_file != null) {
          queryClient.setQueryData(
            ['shared_file', data.data.current_file.id],
            data.data.current_file
          );
        }
        data.data.files.map((file) =>
          queryClient.setQueryData(['shared_file', file.id], file)
        );
      },
    }
  );
};

export const useGetSharedFolders = () => {
  const queryClient = useQueryClient();

  return useQuery<ISharedFolders>(
    ['shared_folders', 'root-folder'],
    async () =>
      requestNew({
        url: 'folders/shared',
        method: 'GET',
      }),
    {
      onSuccess: (data) => {
        if (data.data.current_folder != null) {
          queryClient.setQueryData(
            ['shared_folder', data.data.current_folder.id],
            data.data.current_folder
          );
        }

        data.data.folders.map((folder) =>
          queryClient.setQueryData(['shared_folder', folder.id], folder)
        );
      },
    }
  );
};

export const useGetSharedFilesAndFolders = () => {
  const queryClient = useQueryClient();

  const folders = useQuery<ISharedFolders>(
    ['shared_folders', 'root-folder'],
    async () =>
      requestNew({
        url: 'folders/shared',
        method: 'GET',
      }),
    {
      onSuccess: (data) => {
        if (data.data.current_folder != null) {
          queryClient.setQueryData(
            ['shared_folder', data.data.current_folder.id],
            data.data.current_folder
          );
        }

        data.data.folders.map((folder) =>
          queryClient.setQueryData(['shared_folder', folder.id], folder)
        );
      },
    }
  );

  const files = useQuery<ISharedFiles>(
    ['shared_files', 'root-file'],
    async () =>
      requestNew({
        url: 'files/shared',
        method: 'GET',
      }),
    {
      onSuccess: (data) => {
        if (data.data.current_file != null) {
          queryClient.setQueryData(
            ['shared_file', data.data.current_file.id],
            data.data.current_file
          );
        }
        data.data.files.map((file) =>
          queryClient.setQueryData(['shared_file', file.id], file)
        );
      },
    }
  );

  const data = files.data &&
    folders.data && {
      files: files.data.data.files,
      folders: folders.data.data.folders,
    };
  const refetch = () => {
    files.refetch();
    folders.refetch();
  };

  return {
    data,
    status: {
      files: files.status,
      folders: folders.status,
    },
    refetch,
  };
};

const shareItem = (data: {
  type: explorerItemType;
  itemId: string;
  userId: string;
}) => {
  const { type, itemId, userId } = data;

  const request = requestNew({
    method: 'POST',
    url: `${type}s/${itemId}/share/${userId}`,
  });
  return request;
};

export const useShareItem = () => useMutation(shareItem);

export const useGetShareLink = (id: string | null) =>
  useQuery<IShareLinkRes, unknown, IShareLink>(
    ['share-link', id || 'root'],
    () =>
      requestNew({
        url: `share-documents-links${id ? '/' + id : ''}`,
        method: 'GET',
      }),
    {
      select: (res) => res.data.share_documents_link,
    }
  );

const addOrRemoveItemToOrFromLink = (data: {
  linkId: string;
  itemId: string;
  type: explorerItemType;
  action: 'add' | 'remove';
}) => {
  const { linkId, action, type, itemId } = data;

  const response = requestNew({
    url: `share-documents-links/${linkId}/${action}-${type}/${itemId}`,
    method: 'POST',
  });
  return response;
};

export const useAddOrRemoveItemToOrFromLink = (linkId?: string) => {
  const queryClient = useQueryClient();

  return useMutation(addOrRemoveItemToOrFromLink, {
    onSuccess: () => {
      queryClient.invalidateQueries(['share-link', linkId || 'root']);
    },
  });
};

const getPublishLink = (data: {
  linkId: string;
  expiresIn: expiresIn;
}): Promise<IPublishRes> => {
  const { linkId, expiresIn } = data;

  const response = requestNew({
    url: `share-documents-links/${linkId}/publish`,
    method: 'POST',
    data: {
      expires_in: expiresIn,
    },
  });
  return response;
};

export const useGetPublishLink = (linkId?: string) => {
  const queryClient = useQueryClient();

  return useMutation(getPublishLink, {
    onSuccess: () => {
      queryClient.invalidateQueries(['share-link', 'root']);
      queryClient.invalidateQueries(['share-link', linkId]);
    },
  });
};
