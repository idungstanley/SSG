import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';
import {
  IExplorerSearchRes,
  IInboxSearchRes,
  ISavedSearch,
  ISavedSearchesRes,
} from './search.interfaces';

export const useSearch = (
  query: string,
  searchFileContents: boolean,
  enabled: boolean
) => {
  const explorer = useQuery<IExplorerSearchRes>(
    ['search_explorer', { query, searchFileContents }],
    async () =>
      requestNew({
        url: '/search',
        method: 'GET',
        params: {
          content_search: searchFileContents,
          query,
        },
      }),
    {
      enabled: !!enabled && query.length > 2,
    }
  );

  const inbox = useQuery<IInboxSearchRes>(
    ['search_inbox', { query, searchFileContents }],
    async () =>
      requestNew({
        url: '/search/inbox-files',
        method: 'GET',
        params: {
          query,
        },
      }),
    {
      enabled: !!enabled && query.length > 2,
    }
  );

  return {
    files: explorer?.data?.data.files,
    folders: explorer?.data?.data.folders,
    inbox: inbox?.data?.data.inbox_files,
    explorerStatus: explorer?.status,
    inboxStatus: inbox?.status,
  };
};

export const useGetSearchedItemDetails = (data: {
  type: string;
  id: string | null;
}) => {
  const { type, id } = data;

  const url = `/${type}/${id}/details`;

  return useQuery(['search-details', id], () =>
    requestNew({
      url,
      method: 'GET',
    })
  );
};

export const useGetSavedSearches = () => {
  return useQuery<ISavedSearchesRes, unknown, ISavedSearch[]>(
    ['savedSearches'],
    () =>
      requestNew(
        {
          url: 'settings',
          method: 'GET',
          params: {
            keys: 'task_search',
          },
        },
        true
      ),
    { select: (saved) => saved.data.settings }
  );
};

const saveSearchValue = (value: string) => {
  const request = requestNew(
    {
      url: 'settings',
      method: 'PUT',
      data: {
        keys: [{ key: 'task_search', value }],
      },
    },
    true
  );
  return request;
};

export const useSaveSearchValue = () => {
  const queryClient = useQueryClient();

  return useMutation(saveSearchValue, {
    onSuccess: () => {
      queryClient.invalidateQueries(['savedSearches']);
    },
  });
};
