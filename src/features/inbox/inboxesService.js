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
    }),
    {
      onSuccess: (data) => {
        data.data.inboxes.map((inbox) => queryClient.setQueryData(['inbox', inbox.id], inbox));
      },
    },
  );
};

// Get inbox
export const useGetInbox = (inboxId, type) => {
  // TODO: If not in cache... get from endpoint (hard get)
  // Default data should use the previously set data TODO check...

  const queryClient = useQueryClient();
  const queryName = type === 'active' ? 'inbox' : `${type}-inbox`;

  return useQuery(
    [queryName, inboxId],
    () => queryClient.getQueryData([queryName, inboxId]),
    {
      initialData: () => queryClient.getQueryData(['inbox', inboxId]),
    },
  );
};

// archived inboxes
export const useGetArchivedInboxes = () => {
  const queryClient = useQueryClient();

  return useQuery(
    ['archived-inboxes'],
    () => requestNew({
      url: 'inboxes',
      method: 'GET',
      params: {
        is_archived: 1,
      },
    }),
    {
      onSuccess: (data) => {
        data.data.inboxes.map((inbox) => queryClient.setQueryData(['archived-inbox', inbox.id], inbox));
      },
    },
  );
};

export const useGetArchivedInbox = (inboxId) => {
  // TODO: If not in cache... get from endpoint (hard get)
  // Default data should use the previously set data TODO check...

  const queryClient = useQueryClient();

  return useQuery(
    ['archived-inbox', inboxId],
    () => queryClient.getQueryData(['archived-inbox', inboxId]),
    {
      initialData: () => queryClient.getQueryData(['inbox', inboxId]),
    },
  );
};

// hidden inboxes
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

export const useGetHiddenInbox = (inboxId) => {
  // TODO: If not in cache... get from endpoint (hard get)
  // Default data should use the previously set data TODO check...

  const queryClient = useQueryClient();

  return useQuery(
    ['hidden-inbox', inboxId],
    () => queryClient.getQueryData(['hidden-inbox', inboxId]),
    {
      initialData: () => queryClient.getQueryData(['inbox', inboxId]),
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

const pinOrUnpinInbox = (data) => {
  const response = requestNew({
    url: `inboxes/${data.inboxId}/${data.isPinned ? 'unpin' : 'pin'}`,
    method: 'POST',
  });
  return response;
};

export function usePinOrUnpinInbox() {
  const queryClient = useQueryClient();

  return useMutation(pinOrUnpinInbox, {
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
    url: `inboxes/${data.id}/${data.isHidden ? 'unhide' : 'hide'}`,
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

// archive inbox
export const archiveOrUnarchiveInbox = (data) => {
  const request = requestNew({
    url: `inboxes/${data.id}/${data.isArchived ? 'unarchive' : 'archive'}`,
    method: 'POST',
  });
  return request;
};

export const useArchiveOrUnarchiveInbox = () => {
  const queryClient = useQueryClient();

  return useMutation(archiveOrUnarchiveInbox, {
    onSuccess: () => {
      queryClient.invalidateQueries(['inboxes']);
      queryClient.invalidateQueries(['archived-inboxes']);
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

// main hook
export const useInboxes = (type) => {
  const { data: pinned } = useGetPinnedInboxes();
  const { data: active, status: activeStatus } = useGetInboxes();

  const pinnedIds = pinned?.data.pinned_inboxes.map((i) => i.id);
  const activeIds = active?.data.inboxes.map((i) => i.id);

  if (type === 'active') {
    const activeWithoutPinned = active?.data.inboxes.filter((i) => !pinnedIds?.includes(i.id));

    return { data: activeWithoutPinned, status: activeStatus, type };
  }
  if (type === 'hidden') {
    const { data: hidden, status: hiddenStatus } = useGetHiddenInboxes();

    const hiddenWithoutActive = hidden?.data.inboxes.filter((i) => !activeIds?.includes(i.id));

    return { data: hiddenWithoutActive, status: hiddenStatus, type };
  }
  if (type === 'archived') {
    const { data: archived, status: archivedStatus } = useGetArchivedInboxes();

    const archivedWithoutActive = archived?.data.inboxes.filter((i) => !activeIds?.includes(i.id));

    return { data: archivedWithoutActive, status: archivedStatus, type };
  }
  return { data: null };
};
