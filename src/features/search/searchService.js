import { useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';

export const useSearch = (query, searchFileContents, enabled) => {
  // const queryClient = useQueryClient();

  const explorer = useQuery(
    ['search_explorer', { query, searchFileContents }],
    async () => requestNew({
      url: '/search',
      method: 'GET',
      params: {
        content_search: searchFileContents,
        query,
      },
    }),
    {
      enabled: !!enabled && query.length > 2,
      // onSuccess: (data) => {
      //   data.data.files?.map((file) => queryClient.setQueryData(['search_everything_file', file.id], file));
      //   data.data.folders?.map((folder) => queryClient.setQueryData(
      //     ['search_everything_folder', folder.id],
      //     folder,
      //   ));
      // },
    },
  );

  const inbox = useQuery(
    ['search_inbox', { query, searchFileContents }],
    async () => requestNew({
      url: '/search/inbox-files',
      method: 'GET',
      params: {
        query,
      },
    }),
    {
      enabled: !!enabled && query.length > 2,
      // onSuccess: (data) => {
      //   if (resultsType === 'files') {
      //     data.data.files.map((file) => queryClient.setQueryData(['search_everything_file', file.id], file));
      //   } else if (resultsType === 'folders') {
      //     data.data.folders.map((folder) => queryClient.setQueryData(
      //       ['search_everything_folder', folder.id],
      //       folder,
      //     ));
      //   }
    },
  );

  return {
    files: explorer?.data?.data.files,
    folders: explorer?.data?.data.folders,
    inbox: inbox?.data?.data.inbox_files,
    explorerStatus: explorer?.status,
    inboxStatus: inbox?.status,
  };
};

// Search everything
export const useSearchEverything = (
  query,
  resultsType,
  searchFileContents,
  enabled,
) => {
  const queryClient = useQueryClient();

  const url = resultsType === 'files' ? '/search/files' : '/search/folders';

  return useQuery(
    ['search_everything', { query, resultsType, searchFileContents }],
    async () => requestNew({
      url,
      method: 'GET',
      params: {
        content_search: searchFileContents,
        query,
      },
    }),
    {
      enabled: !!enabled && query.length > 2,
      onSuccess: (data) => {
        if (resultsType === 'files') {
          data.data.files.map((file) => queryClient.setQueryData(['search_everything_file', file.id], file));
        } else if (resultsType === 'folders') {
          data.data.folders.map((folder) => queryClient.setQueryData(
            ['search_everything_folder', folder.id],
            folder,
          ));
        }
      },
    },
  );
};

// Get search everything file
export const useGetSearchEverythingFile = (fileId) => {
  const queryClient = useQueryClient();

  return useQuery(
    ['search_everything_file', fileId],
    () => queryClient.getQueryData(['search_everything_file', fileId]),
    {
      enabled: fileId != null,
      initialData: () => queryClient.getQueryData(['search_everything_file', fileId]),
    },
  );
};

// Get search everything file
export const useGetSearchEverythingFolder = (folderId) => {
  const queryClient = useQueryClient();

  return useQuery(
    ['search_everything_folder', folderId],
    () => queryClient.getQueryData(['search_everything_folder', folderId]),
    {
      enabled: folderId != null,
      initialData: () => queryClient.getQueryData(['search_everything_folder', folderId]),
    },
  );
};
