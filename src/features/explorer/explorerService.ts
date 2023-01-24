import { explorerItemType } from './../../types/index';
import {
  IExplorerFile,
  IExplorerFilesAndFolders,
  IExplorerFilesRes,
  IExplorerFolder,
  IExplorerFoldersRes,
} from './explorer.interfaces';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';
import requestForBuffer from '../../app/requestForBuffer';
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
export const useGetExplorerFolders = () => {
  const queryClient = useQueryClient();

  return useQuery<IExplorerFoldersRes, unknown, IExplorerFolder[]>(
    ['explorer-folders'],
    () =>
      requestNew({
        url: 'explorer-folders',
        method: 'GET',
      }),
    {
      select: (res) => res.data.folders,
      onSuccess: (res) =>
        res.map(
          (folder) =>
            queryClient.setQueryData(['explorer-folder-1', folder.id], folder)
          // ? query name 'explorer-folder-1' using because 'explorer-folder' is already use
        ),
    }
  );
};

export const useGetExplorerFolder = (folderId?: string, isFolder?: boolean) => {
  // isFolder - needed only for Pilot/Information

  const enabled = isFolder ? !!folderId : !!folderId && isFolder;

  return useQuery<IExplorerFoldersRes>(
    ['explorer-folder', folderId],
    () =>
      requestNew({
        url: `explorer-folders/${folderId}`,
        method: 'GET',
      }),
    { enabled }
  );
};

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

export const useGetSearchFiles = (query: string) =>
  useQuery<IExplorerFilesRes, unknown, IExplorerFile[]>(
    ['folders-search', query],
    () =>
      requestNew({
        url: 'search/files',
        method: 'GET',
        params: {
          query,
        },
      }),
    {
      enabled: query.length > 2,
      select: (res) => res.data.files,
    }
  );

// files
export const useGetExplorerFiles = (folderId?: string) => {
  const queryClient = useQueryClient();

  return useQuery<IExplorerFilesRes, unknown, IExplorerFile[]>(
    ['explorer-files', folderId || 'root'],
    () =>
      requestNew({
        url: `explorer-files${folderId ? `/${folderId}` : ''}`,
        method: 'GET',
      }),
    {
      select: (res) => res.data.files,
      onSuccess: (res) =>
        res.map((file) =>
          queryClient.setQueryData(['explorer-file', file.id], file)
        ),
    }
  );
};

export const useGetExplorerFile = (
  fileId?: string | null,
  isFile?: boolean
) => {
  // isFile - needed only for Pilot/Information

  const queryClient = useQueryClient();
  const enabled = isFile ? !!fileId : !!fileId && isFile;

  return useQuery<IExplorerFile | undefined>(
    ['explorer-file', fileId],
    () => queryClient.getQueryData(['explorer-file', fileId]),
    {
      initialData: () => queryClient.getQueryData(['explorer-file', fileId]),
      enabled,
    }
  );
};

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

export const useGetFileBuffers = (id: string | null, contentType: string) => {
  const response = useQuery(
    ['buffers', id],
    () =>
      requestForBuffer({
        url: `files/${id}/contents`,
        method: 'GET',
      }),
    { enabled: !!id }
  );

  return {
    data: `data:${contentType};base64,${Buffer.from(
      response.data || '',
      'binary'
    ).toString('base64')}`,
    status: response.status,
  };
};
