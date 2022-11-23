import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';

// Get all inboxes
export const useGetInboxes = () => {
  const queryClient = useQueryClient();

  return useQuery(
    ['inboxes'],
    () => requestNew({
      url: 'inboxes',
      method: 'GET',
      params: {
        show_hidden: 0,
      },
    }),
    {
      onSuccess: (data) => {
        data.data.inboxes.map((inbox) => queryClient.setQueryData(['inbox', inbox.id], inbox));
      },
    },
  );
};

export const useGetHiddenInboxes = () => {
  const queryClient = useQueryClient();

  return useQuery(
    ['hidden-inboxes'],
    () => requestNew({
      url: 'inboxes',
      method: 'GET',
      params: {
        show_hidden: 1,
      },
    }),
    {
      onSuccess: (data) => {
        data.data.inboxes.map((inbox) => queryClient.setQueryData(['hidden-inbox', inbox.id], inbox));
      },
    },
  );
};

// Get all pinned inboxes
export const useGetPinnedInboxes = () => {
  const queryClient = useQueryClient();

  return useQuery(
    ['pinned_inboxes'],
    async () => requestNew({
      url: 'inboxes/pinned',
      method: 'GET',
    }),
    {
      onSuccess: (data) => {
        data.data.pinned_inboxes.map((inbox) => queryClient.setQueryData(['inbox', inbox.id], inbox));
      },
    },
  );
};

// Get inbox
export const useGetInbox = (inboxId) => {
  // TODO: If not in cache... get from endpoint (hard get)
  // Default data should use the previously set data TODO check...

  const queryClient = useQueryClient();

  return useQuery(
    ['inbox', inboxId],
    () => queryClient.getQueryData(['inbox', inboxId]),
    {
      initialData: () => queryClient.getQueryData(['inbox', inboxId]),
    },
  );
};

export const useGetHiddenInbox = (inboxId) => {
  // TODO: If not in cache... get from endpoint (hard get)
  // Default data should use the previously set data TODO check...

  const queryClient = useQueryClient();

  return useQuery(
    ['hidden-inbox', inboxId],
    () => queryClient.getQueryData(['hidden-inbox', inboxId]),
    {
      initialData: () => queryClient.getQueryData(['hidden-inbox', inboxId]),
    },
  );
};

// Create inbox
export const createInboxService = async (data) => {
  const response = requestNew({
    url: 'inboxes',
    method: 'POST',
    data: {
      name: data.name,
      email_username: data.emailUsername,
    },
  });
  return response;
};

// Pin inbox
export const pinInboxService = async (data) => {
  const response = requestNew({
    url: `inboxes/${data.inboxId}/pin`,
    method: 'POST',
  });
  return response;
};

export function usePinInbox(inboxId) {
  const queryClient = useQueryClient();

  return useMutation(() => pinInboxService({ inboxId }), {
    onSuccess: () => {
      queryClient.invalidateQueries(['pinned_inboxes']);
    },
  });
}

// Unpin inbox
export const unpinInboxService = async (data) => {
  const response = requestNew({
    url: `inboxes/${data.inboxId}/unpin`,
    method: 'POST',
  });
  return response;
};

export function useUnpinInbox(inboxId) {
  const queryClient = useQueryClient();

  return useMutation(() => unpinInboxService({ inboxId }), {
    onSuccess: () => {
      queryClient.invalidateQueries(['pinned_inboxes']);
    },
  });
}

// Get total inbox unfiled account
export const useGetInboxUnfiledCount = () => useQuery(['inboxes_unfiled_count'], async () => {
  const data = await requestNew({
    url: 'inboxes/unfiled-count',
    method: 'GET',
  });
  return data.data.unfiled_count;
});

export const markOpenedInbox = (id) => {
  const request = requestNew({
    url: `inboxes/${id}/mark-opened`,
    method: 'POST',
  });
  return request;
};

export const useMarkOpenedInbox = (id) => {
  const queryClient = useQueryClient();

  return useMutation(() => markOpenedInbox(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['inboxes']);
    },
  });
};

// hide inbox
export const hideOrUnhideInbox = (data) => {
  const request = requestNew({
    url: `inboxes/${data.id}/${data.hide ? 'hide' : 'unhide'}`,
    method: 'POST',
  });
  return request;
};

export const useHideOrUnhideInbox = () => {
  const queryClient = useQueryClient();

  return useMutation(hideOrUnhideInbox, {
    onSuccess: () => {
      queryClient.invalidateQueries(['inboxes']);
      queryClient.invalidateQueries(['hidden-inboxes']);
    },
  });
};

// delete
export const deleteInboxService = (id) => {
  const request = requestNew({
    url: `inboxes/${id}`,
    method: 'DELETE',
  });
  return request;
};

export const useDeleteInbox = (id) => {
  const queryClient = useQueryClient();

  return useMutation(() => deleteInboxService(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['inboxes']);
    },
  });
};

// responsible inboxes
export const getResponsibleInboxes = () => {
  const request = requestNew({
    url: 'inboxes/responsible',
    method: 'GET',
  });
  return request;
};

export const useGetResponsibleInboxes = () => {
  const queryClient = useQueryClient();

  return useQuery(['responsible-inbox'], () => getResponsibleInboxes(), {
    onSuccess: (data) => {
      // ! set actual data, not pinned_inboxes
      data.data.pinned_inboxes.map((inbox) => queryClient.setQueryData(['responsible-inbox', inbox.id], inbox));
    },
  });
};

// responsible file team members
export const useGetResponsibleTeamMembers = (inboxId) => {
  const queryClient = useQueryClient();

  return useQuery(
    ['responsible-team-members'],
    () => requestNew({
      url: `inboxes/${inboxId}/responsible-team-members`,
      method: 'GET',
    }),
    {
      onSuccess: (data) => {
        // eslint-disable-next-line no-console
        console.log(data, queryClient);
        // data.data.inboxes.map((inbox) => queryClient.setQueryData(['inbox', inbox.id], inbox));
      },
    },
  );
};

// blacklist
export const getBlacklistFiles = () => {
  const request = requestNew({
    url: 'blacklist-inbox-files',
    method: 'GET',
  });
  return request;
};

export const useGetBlacklistFiles = () =>
// const queryClient = useQueryClient();

  // eslint-disable-next-line implicit-arrow-linebreak
  useQuery(['blacklist-files'], () => getBlacklistFiles(), {
    onSuccess: () => {
      // eslint-disable-next-line no-console
      // ! set blacklist files
    },
  });

export const addFileToBlacklist = (fileId) => {
  const request = requestNew({
    url: `inbox-files/${fileId}/blacklist`,
    method: 'POST',
  });
  return request;
};

export const useAddFileToBlacklist = (fileId) => {
  const queryClient = useQueryClient();

  return useMutation(() => addFileToBlacklist(fileId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['blacklist-files']);
    },
  });
};

export const deleteBlacklistFile = (fileId) => {
  const request = requestNew({
    url: `blacklist-inbox-files/${fileId}`,
    method: 'DELETE',
  });
  return request;
};

export const useDeleteBlacklistFile = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteBlacklistFile, {
    onSuccess: () => {
      queryClient.invalidateQueries(['blacklist-files']);
    },
  });
};

// email list
export const getEmailList = (inboxId) => {
  const request = requestNew({
    url: `inboxes/${inboxId}/email-list`,
    method: 'GET',
  });
  return request;
};

export const addEmailToList = (inboxId, email) => {
  const request = requestNew({
    url: `inboxes/${inboxId}/email-list`,
    method: 'POST',
    data: {
      email,
    },
  });
  return request;
};

export const deleteEmailFromList = (inboxId, emailId) => {
  const request = requestNew({
    url: `/inboxes/${inboxId}/email-list/${emailId}`,
    method: 'DELETE',
  });
  return request;
};

export const useGetEmailList = (inboxId) => {
  const queryClient = useQueryClient();

  return useQuery(['email-list'], () => getEmailList(inboxId), {
    onSuccess: () => {
      // eslint-disable-next-line no-console
      console.log(queryClient);
      // queryClient.invalidateQueries(['blacklist-files']);
    },
  });
};

export const useAddEmailToList = () => {
  const queryClient = useQueryClient();

  return useMutation(addEmailToList, {
    onSuccess: () => {
      queryClient.invalidateQueries(['email-list']);
    },
  });
};

export const useDeleteEmailFromList = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteBlacklistFile, {
    onSuccess: () => {
      queryClient.invalidateQueries(['blacklist-files']);
    },
  });
};
