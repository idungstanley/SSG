import { useQuery } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';

export const useSearch = (query, searchFileContents, enabled) => {
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

export const useGetSearchedItemDetails = (data) => {
  const { type, id } = data;

  const url = `/${type}/${id}/details`;

  return useQuery(['search-details', id], () => requestNew({
    url,
    method: 'GET',
  }));
};
