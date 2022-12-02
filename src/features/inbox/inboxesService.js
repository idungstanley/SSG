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

export const useGetActiveInboxes = () => {
  const queryClient = useQueryClient();

  return useQuery(
    ['active-inboxes'],
    () => requestNew({
      url: 'inboxes',
      method: 'GET',
    }),
    {
      onSuccess: (data) => {
        data.data.inboxes.map((inbox) => queryClient.setQueryData(['active-inbox', inbox.id], inbox));
      },
    },
  );
};

export const useGetActiveInbox = (inboxId) => {
  const queryClient = useQueryClient();

  return useQuery(
    ['active-inbox', inboxId],
    () => queryClient.getQueryData(['active-inbox', inboxId]),
    {
      initialData: () => queryClient.getQueryData(['active-inbox', inboxId]),
    },
  );
};

// trashed
export const useGetTrashedInboxes = () => {
  const queryClient = useQueryClient();

  return useQuery(
    ['trashed-inboxes'],
    () => requestNew({
      url: 'inboxes/trashed',
      method: 'GET',
    }),
    {
      onSuccess: (data) => {
        data.data.inboxes.map((inbox) => queryClient.setQueryData(['trashed-inbox', inbox.id], inbox));
      },
    },
  );
};

export const useGetTrashedInbox = (inboxId) => {
  const queryClient = useQueryClient();

  return useQuery(
    ['trashed-inbox', inboxId],
    () => queryClient.getQueryData(['trashed-inbox', inboxId]),
    {
      initialData: () => queryClient.getQueryData(['trashed-inbox', inboxId]),
    },
  );
};

const prefetchedInbox = {
  id: 'e31eaf13-2bb4-4081-9cc7-c940a5734ec8',
  email_key: '263816694002409315',
  name: 'react ts',
  initials: 'RT',
  colour: '#10B981',
  unfiled_count: 3,
  is_new: false,
  has_email_whitelist: 0,
  last_received_at: '2022-11-26 11:59:11',
  last_filed_at: null,
  archived_at: null,
  created_at: '2022-11-25T18:17:20.000000Z',
  updated_at: '2022-11-26T11:59:11.000000Z',
  is_watch: false,
};

// Get inbox
export const useGetInbox = (inboxId, type) => {
  const queryClient = useQueryClient();
  const queryName = `${type}-inbox`;

  return useQuery(
    [queryName, inboxId],
    () => queryClient.getQueryData([queryName, inboxId]),
    {
      initialData: prefetchedInbox,
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
      initialData: () => queryClient.getQueryData(['archived-inbox', inboxId]),
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
      initialData: () => queryClient.getQueryData(['hidden-inbox', inboxId]),
    },
  );
};

// Get all pinned inboxes
export const useGetPinnedInboxes = () => {
  const queryClient = useQueryClient();

  return useQuery(
    ['pinned-inboxes'],
    async () => requestNew({
      url: 'inboxes/pinned',
      method: 'GET',
    }),
    {
      onSuccess: (data) => {
        data.data.pinned_inboxes.map((inbox) => queryClient.setQueryData(['pinned-inbox', inbox.id], inbox));
      },
    },
  );
};

export const useGetPinnedInbox = (inboxId) => {
  // TODO: If not in cache... get from endpoint (hard get)
  // Default data should use the previously set data TODO check...

  const queryClient = useQueryClient();

  return useQuery(
    ['pinned-inbox', inboxId],
    () => queryClient.getQueryData(['pinned-inbox', inboxId]),
    {
      initialData: () => queryClient.getQueryData(['pinned-inbox', inboxId]),
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
      queryClient.invalidateQueries(['pinned-inboxes']);
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
      queryClient.invalidateQueries(['active-inboxes']);
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
      queryClient.invalidateQueries(['active-inboxes']);
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
      queryClient.invalidateQueries(['active-inboxes']);
      queryClient.invalidateQueries(['archived-inboxes']);
    },
  });
};

const restoreOrDeleteInbox = (data) => {
  const url = data.isDeleted
    ? `inboxes/${data.inboxId}/restore`
    : `inboxes/${data.inboxId}`;
  const method = data.isDeleted ? 'POST' : 'DELETE';
  const request = requestNew({
    url,
    method,
  });
  return request;
};

export const useRestoreOrDeleteInbox = () => {
  const queryClient = useQueryClient();

  return useMutation(restoreOrDeleteInbox, {
    onSuccess: () => {
      queryClient.invalidateQueries(['trashed-inboxes']);
      queryClient.invalidateQueries(['active-inboxes']);
    },
  });
};

// responsible inboxes
// export const getResponsibleInboxes = () => {
//   const request = requestNew({
//     url: 'inboxes/responsible',
//     method: 'GET',
//   });
//   return request;
// };

export const useGetResponsibleInboxes = () => {
  useQuery(['responsible-inbox'], () => requestNew({
    url: 'inboxes/responsible',
    method: 'GET',
  }));
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

const blacklistFile = (data) => {
  const url = data.type === 'add'
    ? `inbox-files/${data.fileId}/blacklist`
    : `blacklist-inbox-files/${data.fileId}`;
  const method = data.type === 'add' ? 'POST' : 'DELETE';
  const request = requestNew({
    url,
    method,
  });
  return request;
};

export const useBlacklistFile = () => {
  const queryClient = useQueryClient();

  return useMutation(blacklistFile, {
    onSuccess: () => {
      queryClient.invalidateQueries(['blacklist-files']);
    },
  });
};

// email list
export const addEmailToList = (data) => {
  const request = requestNew({
    url: `inboxes/${data.inboxId}/email-list`,
    method: 'POST',
    data: {
      email: data.email,
    },
  });
  return request;
};

export const deleteEmailFromList = (data) => {
  const request = requestNew({
    url: `/inboxes/${data.inboxId}/email-list/${data.emailId}`,
    method: 'DELETE',
  });
  return request;
};

export const useGetEmailList = (inboxId) => useQuery([`email-list-${inboxId}`], () => requestNew({
  url: `inboxes/${inboxId}/email-list`,
  method: 'GET',
}));

export const useAddEmailToList = (inboxId) => {
  const queryClient = useQueryClient();

  return useMutation(addEmailToList, {
    onSuccess: () => {
      queryClient.invalidateQueries([`email-list-${inboxId}`]);
    },
  });
};

export const useDeleteEmailFromList = (inboxId) => {
  const queryClient = useQueryClient();

  return useMutation(deleteEmailFromList, {
    onSuccess: () => {
      queryClient.invalidateQueries([`email-list-${inboxId}`]);
    },
  });
};

// main hook
export const useInboxes = (type) => {
  const { data: pinned } = useGetPinnedInboxes();
  const { data: active, status: activeStatus } = useGetActiveInboxes();

  const pinnedIds = pinned?.data.pinned_inboxes.map((i) => i.id);
  const activeIds = active?.data.inboxes.map((i) => i.id);

  if (type === 'active') {
    const activeWithoutPinned = active?.data.inboxes.filter(
      (i) => !pinnedIds?.includes(i.id),
    );

    return { data: activeWithoutPinned, status: activeStatus, type };
  }
  if (type === 'hidden') {
    const { data: hidden, status: hiddenStatus } = useGetHiddenInboxes();

    const hiddenWithoutActive = hidden?.data.inboxes.filter(
      (i) => !activeIds?.includes(i.id),
    );

    return { data: hiddenWithoutActive, status: hiddenStatus, type };
  }
  if (type === 'archived') {
    const { data: archived, status: archivedStatus } = useGetArchivedInboxes();

    const archivedWithoutActive = archived?.data.inboxes.filter(
      (i) => !activeIds?.includes(i.id),
    );

    return { data: archivedWithoutActive, status: archivedStatus, type };
  }
  return { data: null };
};
