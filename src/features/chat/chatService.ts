import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';
import { itemType } from '../../types';
import { IChatsRes, IChatFromList, IChatRes, IChat, IMessage } from './chat.interfaces';
// import { UploadResult, UploadedUppyFile } from '@uppy/core';

export const useGetChats = (data: { type?: itemType; id?: string | null }) =>
  useQuery<IChatsRes, unknown, IChatFromList[]>(
    ['chats', data.id],
    () =>
      requestNew({
        url: 'chats',
        method: 'GET',
        params: {
          type: data.type,
          id: data.id
        }
      }),
    {
      enabled: !!data.id && !!data.type,
      select: (chats) => chats.data.chats
    }
  );

export const useGetChat = (id: string | null) =>
  useQuery<IChatRes, unknown, { chat: IChat; messages: IMessage[] }>(
    ['chat', id],
    () =>
      requestNew({
        url: `chats/${id}`,
        method: 'GET'
      }),
    {
      enabled: !!id,
      select: (chat) => chat.data
    }
  );

const createChat = (data: { id?: string | null; name?: string; type?: itemType }) => {
  const request = requestNew({
    url: 'chats',
    method: 'POST',
    data
  });
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
  const request = requestNew({
    url: `chats/${id}`,
    method: 'DELETE'
  });
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

const sendMessageToChat = (data: {
  chatId: string | null;
  message: string;
  selectedMessage: IMessage | null;
  // files: UploadedUppyFile<Record<string, unknown>, Record<string, unknown>>[];
  // files: Blob[] | File[] | Promise<Blob> | Blob;
  files: Blob;
  // files: string[];
}) => {
  const { chatId, message, selectedMessage, files } = data;
  console.log(files, 'from service');
  const request = requestNew({
    url: `chats/${chatId}/message`,
    method: 'POST',
    data: {
      message: message,
      reply_on_id: selectedMessage ? selectedMessage?.id : '',
      files
    }
  });
  return request;
};

export const useSendMessageToChat = () => {
  const queryClient = useQueryClient();

  return useMutation(sendMessageToChat, {
    onSuccess: () => {
      queryClient.invalidateQueries(['chat']);
    }
  });
};

const addTeamMemberToChat = (data: { chatId: string | null; teamMemberId: string }) => {
  const request = requestNew({
    url: `chats/${data.chatId}/team-member/${data.teamMemberId}`,
    method: 'POST'
  });
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
  const request = requestNew({
    url: `chats/${data.chatId}/team-member/${data.teamMemberId}`,
    method: 'DELETE'
  });
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
