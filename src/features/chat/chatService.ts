import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';
import { itemType } from '../../types';
import { IChatsRes, IChatFromList, IChatRes, IChat, IMessage } from './chat.interfaces';

export const useGetChats = (data: { type?: itemType; id?: string | null }) =>
  useQuery<IChatsRes, unknown, IChatFromList[]>(
    ['chats', data.id],
    () =>
      requestNew(
        {
          url: 'chats',
          method: 'GET',
          params: {
            type: data.type,
            id: data.id
          }
        },
        true
      ),
    {
      enabled: !!data.id && !!data.type,
      select: (chats) => chats.data.chats
    }
  );

export const useGetChat = (id: string | null) =>
  useQuery<IChatRes, unknown, { chat: IChat; messages: IMessage[] }>(
    ['chat', id],
    () =>
      requestNew(
        {
          url: `chats/${id}`,
          method: 'GET'
        },
        true
      ),
    {
      enabled: !!id,
      select: (chat) => chat.data
    }
  );

const createChat = (data: { id?: string | null; name?: string; type?: itemType }) => {
  const request = requestNew(
    {
      url: 'chats',
      method: 'POST',
      data
    },
    true
  );
  return request;
};

export const useCreateChat = (id?: string | null) => {
  const queryClient = useQueryClient();

  return useMutation(createChat, {
    onSuccess: () => {
      queryClient.invalidateQueries(['chats', id]);
    }
  });
};

const deleteChat = (id: string) => {
  const request = requestNew(
    {
      url: `chats/${id}`,
      method: 'DELETE'
    },
    true
  );
  return request;
};

export const useDeleteChat = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteChat, {
    onSuccess: () => {
      queryClient.invalidateQueries(['chats']);
    }
  });
};

const sendMessageToChat = (data: { chatId: string | null; message: string }) => {
  const request = requestNew(
    {
      url: `chats/${data.chatId}/message`,
      method: 'POST',
      data: {
        message: data.message
      }
    },
    true
  );
  return request;
};

export const useSendMessageToChat = () => {
  return useMutation(sendMessageToChat);
};

const addTeamMemberToChat = (data: { chatId: string | null; teamMemberId: string }) => {
  const request = requestNew(
    {
      url: `chats/${data.chatId}/team-member/${data.teamMemberId}`,
      method: 'POST'
    },
    true
  );
  return request;
};

export const useAddTeamMemberToChat = (id: string | null) => {
  const queryClient = useQueryClient();

  return useMutation(addTeamMemberToChat, {
    onSuccess: () => {
      queryClient.invalidateQueries(['chat', id]);
    }
  });
};

const deleteTeamMemberFromChat = (data: { chatId: string | null; teamMemberId: string }) => {
  const request = requestNew(
    {
      url: `chats/${data.chatId}/team-member/${data.teamMemberId}`,
      method: 'DELETE'
    },
    true
  );
  return request;
};

export const useDeleteTeamMemberFromChat = (id: string | null) => {
  const queryClient = useQueryClient();

  return useMutation(deleteTeamMemberFromChat, {
    onSuccess: () => {
      queryClient.invalidateQueries(['chat', id]);
    }
  });
};
