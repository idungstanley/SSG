import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';
import { itemType } from '../../types';
import {
  IChatsRes,
  IChatFromList,
  IChatRes,
  IChat,
  IMessage,
} from './chat.interfaces';

export const useGetChats = (data: {
  type: itemType | null;
  id: string | null;
}) =>
  useQuery<IChatsRes, unknown, IChatFromList[]>(
    ['chats', data.id],
    () =>
      requestNew(
        {
          url: 'chats',
          method: 'GET',
          params: {
            type: data.type,
            id: data.id,
          },
        },
        true
      ),
    {
      enabled: !!data.id && !!data.type,
      select: (chats) => chats.data.chats,
    }
  );

export const useGetChat = (id: string | null) =>
  useQuery<IChatRes, unknown, { chat: IChat; messages: IMessage[] }>(
    ['chat', id],
    () =>
      requestNew(
        {
          url: `chats/${id}`,
          method: 'GET',
        },
        true
      ),
    {
      enabled: !!id,
      select: (chat) => chat.data,
    }
  );

const createChat = (data: { id: string; name: string; type: itemType }) => {
  const request = requestNew(
    {
      url: 'chats',
      method: 'POST',
      data,
    },
    true
  );
  return request;
};

export const useCreateChat = (id: string | null) => {
  const queryClient = useQueryClient();

  return useMutation(createChat, {
    onSuccess: () => {
      queryClient.invalidateQueries(['chat', id]);
    },
  });
};
