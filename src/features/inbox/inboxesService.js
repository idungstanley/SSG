import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';

// Get all inboxes
export const useGetInboxes = () => {
  const queryClient = useQueryClient();

  return useQuery(
    ['inboxes'],
    async () => requestNew({
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
export const useGetInboxUnfiledCount = () => useQuery(
  ['inboxes_unfiled_count'],
  async () => {
    const data = await requestNew({
      url: 'inboxes/unfiled-count',
      method: 'GET',
    });
    return data.data.unfiled_count;
  },
);

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
export const hideOrUnhideInbox = async (id, type) => {
  // type: hide / unhide

  const request = await requestNew({
    url: `inboxes/${id}/${type}`,
    method: 'POST',
  });
  return request;
};

export const useHideOrUnhideInbox = (id, type) => {
  const queryClient = useQueryClient();

  return useMutation(() => hideOrUnhideInbox(id, type), {
    onSuccess: () => {
      queryClient.invalidateQueries(['inboxes']);
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
export const getResponsibleInboxes = async () => {
  const request = await requestNew({
    url: 'inboxes/responsible',
    method: 'GET',
  });
  return request;
};

export const useGetResponsibleInboxes = () => {
  const queryClient = useQueryClient();

  return useQuery(
    ['responsible-inbox'],
    () => getResponsibleInboxes(),
    {
      onSuccess: (data) => {
        // ! set actual data, not pinned_inboxes
        data.data.pinned_inboxes.map((inbox) => queryClient.setQueryData(['responsible-inbox', inbox.id], inbox));
      },
    },
  );
};
