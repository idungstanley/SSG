import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';

// ! comments
const getItemComments = (data) => {
  const request = requestNew(
    {
      url: 'comments',
      method: 'GET',
      params: {
        type: data.type,
        id: data.id,
      },
    },
    true,
  );
  return request;
};

export const useGetItemComments = (data) => useQuery([`comments-${data.id}`], () => getItemComments(data));

const createItemComment = (data) => {
  const request = requestNew(
    {
      url: 'comments',
      method: 'POST',
      data: {
        message: data.message,
        type: data.type,
        id: data.id,
      },
    },
    true,
  );
  return request;
};

export const useCreateItemComment = (id) => {
  const queryClient = useQueryClient();

  return useMutation(createItemComment, {
    onSuccess: () => {
      queryClient.invalidateQueries([`comments-${id}`]);
    },
  });
};

const deleteItemComment = (data) => {
  const request = requestNew(
    {
      url: `comments/${data.id}`,
      method: 'DELETE',
    },
    true,
  );
  return request;
};

export const useDeleteItemComment = (id) => {
  const queryClient = useQueryClient();

  return useMutation(deleteItemComment, {
    onSuccess: () => {
      queryClient.invalidateQueries([`comments-${id}`]);
    },
  });
};

const editItemComment = (data) => {
  const request = requestNew(
    {
      url: `comments/${data.id}`,
      method: 'PUT',
      data: {
        message: data.message,
      },
    },
    true,
  );
  return request;
};

export const useEditItemComment = (id) => {
  const queryClient = useQueryClient();

  return useMutation(editItemComment, {
    onSuccess: () => {
      queryClient.invalidateQueries([`comments-${id}`]);
    },
  });
};
