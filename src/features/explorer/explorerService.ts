import {
  IExplorerFile,
  IExplorerFilesAndFolders,
  IExplorerFilesRes,
  IExplorerFolder,
  IExplorerFoldersRes,
} from './explorer.interfaces';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';
import { IExplorerAndSharedData } from '../shared/shared.interfaces';

// Get folder
export const useGetFolder = (
  folderId?: string | null,
  isSuccessMainReq?: boolean
) => {
  const queryClient = useQueryClient();
  const enabled = !!folderId && isSuccessMainReq;

  return useQuery<IExplorerAndSharedData | undefined>(
    ['explorer_folder', folderId],
    () => queryClient.getQueryData(['explorer_folder', folderId]),
    {
      enabled,
      initialData: () =>
        queryClient.getQueryData(['explorer_folder', folderId]),
    }
  );
};

// Get file
export const useGetFile = (fileId?: string | null) => {
  const queryClient = useQueryClient();

  return useQuery<IExplorerAndSharedData | undefined>(
    ['explorer_file', fileId],
    () => queryClient.getQueryData(['explorer_file', fileId]),
    {
      enabled: !!fileId,
      initialData: () => queryClient.getQueryData(['explorer_file', fileId]),
    }
  );
};

// Get all explorer files and folders (for a specific folder)
export const useGetExplorerFilesAndFolders = (folderId?: string) => {
  const queryClient = useQueryClient();

  return useQuery<IExplorerFilesAndFolders>(
    ['explorer_files_and_folders', !folderId ? 'root-folder' : folderId],
    async () =>
      requestNew({
        url: folderId ? `explorer/${folderId}` : 'explorer',
        method: 'GET',
      }),
    {
      onSuccess: (data) => {
        if (data.data.current_folder) {
          queryClient.setQueryData(
            ['explorer_folder', data.data.current_folder.id],
            data.data.current_folder
          );
        }

        data.data.folders.map((folder) =>
          queryClient.setQueryData(['explorer_folder', folder.id], folder)
        );
        data.data.files.map((file) =>
          queryClient.setQueryData(['explorer_file', file.id], file)
        );
      },
    }
  );
};

// folders
export const useGetExplorerFolders = () =>
  useQuery<IExplorerFoldersRes, unknown, IExplorerFolder[]>(
    ['explorer-folders'],
    () =>
      requestNew({
        url: 'explorer-folders',
        method: 'GET',
      }),
    { select: (res) => res.data.folders }
  );

export const useGetExplorerFolder = (folderId?: string) =>
  useQuery<IExplorerFoldersRes>(
    ['explorer-folder', folderId],
    () =>
      requestNew({
        url: `explorer-folders/${folderId}`,
        method: 'GET',
      }),
    { enabled: !!folderId }
  );

export const useGetSearchFolders = (query: string) =>
  useQuery<IExplorerFoldersRes, unknown, IExplorerFolder[]>(
    ['folders-search', query],
    () =>
      requestNew({
        url: 'search/folders',
        method: 'GET',
        params: {
          query,
        },
      }),
    {
      enabled: query.length > 2,
      select: (res) => res.data.folders,
    }
  );

// files
export const useGetExplorerFiles = (folderId?: string) =>
  useQuery<IExplorerFilesRes, unknown, IExplorerFile[]>(
    ['explorer-files', folderId || 'root'],
    () =>
      requestNew({
        url: `explorer-files${folderId ? `/${folderId}` : ''}`,
        method: 'GET',
      }),
    { select: (res) => res.data.files }
  );

const multipleDeleteFiles = (fileIds: string[]) => {
  const response = requestNew({
    url: 'explorer/multiple-delete',
    method: 'POST',
    params: {
      file_ids: fileIds,
    },
  });
  return response;
};

export const useMultipleDeleteFiles = (folderId?: string) => {
  const queryClient = useQueryClient();

  return useMutation(multipleDeleteFiles, {
    onSuccess: () => {
      queryClient.invalidateQueries(['explorer-files', folderId || 'root']);
    },
  });
};
