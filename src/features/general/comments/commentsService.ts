import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../../app/requestNew';
import { itemType } from '../../../types';
import { ICommentsRes } from './comments.interfaces';

export const useGetItemComments = (data: { type?: itemType | string; id?: string | null }) =>
  useQuery(
    ['comments', data.id],
    () =>
      requestNew<ICommentsRes>({
        url: 'comments',
        method: 'GET',
        params: {
          type: data.type,
          id: data.id
        }
      }),
    {
      enabled: !!data.type && !!data.id,
      select: (comments) => comments.data.comments
    }
  );

const createItemComment = (data: { id: string; message: string; type: itemType | string }) => {
  const request = requestNew({
    url: 'comments',
    method: 'POST',
    data: {
      message: data.message,
      type: data.type,
      id: data.id
    }
  });
  return request;
};

export const useCreateItemComment = (id?: string | null) => {
  const queryClient = useQueryClient();

  return useMutation(createItemComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', id]);
    }
  });
};

const deleteItemComment = (data: { id: string }) => {
  const request = requestNew({
    url: `comments/${data.id}`,
    method: 'DELETE'
  });
  return request;
};

export const useDeleteItemComment = (id?: string | null) => {
  const queryClient = useQueryClient();

  return useMutation(deleteItemComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', id]);
    }
  });
};

const editItemComment = (data: { id: string; message: string }) => {
  const request = requestNew({
    url: `comments/${data.id}`,
    method: 'PUT',
    data: {
      message: data.message
    }
  });
  return request;
};

export const useEditItemComment = (id?: string | null) => {
  const queryClient = useQueryClient();

  return useMutation(editItemComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', id]);
    }
  });
};
