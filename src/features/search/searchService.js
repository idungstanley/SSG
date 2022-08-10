import { useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';

// Search everything
export const useSearchEverything = (query, resultsType, searchFileContents) => {
  var url;

  const queryClient = useQueryClient();

  if (resultsType === 'files') {
    url = '/search/files';
  } else if (resultsType === 'folders') {
    url = '/search/folders';
  }

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
      enabled: query.length >= 2,
      onSuccess: (data) => {
        if (resultsType === 'files') {
          data.data.files.map((file) => queryClient.setQueryData(['search_everything_file', file.id], file));
        } else if (resultsType === 'folders') {
          data.data.folders.map((folder) => queryClient.setQueryData(['search_everything_folder', folder.id], folder));
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
