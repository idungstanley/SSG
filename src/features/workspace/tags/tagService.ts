import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { useAppDispatch } from '../../../app/hooks';
import requestNew from '../../../app/requestNew';
import { AddTagRes, ITagRes, TagsRes } from './tag.interfaces';
import { Tag, TagId, TaskId } from '../../task/interface.tasks';
import { EntityType } from '../../../utils/EntityTypes/EntityType';

export const useTags = () => {
  return useQuery(
    ['tags'],
    () =>
      requestNew<TagsRes>({
        url: 'tags',
        method: 'GET'
      }),
    { select: (res) => res.data.tags }
  );
};

export const UseCreateTagService = ({ name }: { name: string }) => {
  const url = 'tags';
  const response = requestNew({
    url,
    method: 'POST',
    data: {
      name: name
    }
  });
  return response;
};

const addTag = (data: { name: string; color: string }) => {
  const response = requestNew<AddTagRes>({
    url: 'tags',
    method: 'POST',
    data
  });
  return response;
};

export const useAddTag = () => {
  const queryClient = useQueryClient();

  return useMutation(addTag, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tags']);
    }
  });
};

const assignTag = (data: { tagId: TagId; entityId: string; entityType: string }) => {
  const { tagId, entityId, entityType } = data;

  const response = requestNew({
    url: 'tags/' + tagId + '/assign',
    method: 'POST',
    data: {
      type: entityType,
      id: entityId,
      color: 'purple'
    }
  });
  return response;
};

export const useAssignTag = (taskId: string) => {
  const queryClient = useQueryClient();

  return useMutation(assignTag, {
    onSuccess: () => {
      queryClient.invalidateQueries(['task']);
      queryClient.invalidateQueries(['sub-tasks', taskId]);
      queryClient.invalidateQueries(['checklist']);
    }
  });
};

const deleteTag = (data: { tagId: TagId }) => {
  const { tagId } = data;

  const response = requestNew({
    url: 'tags/' + tagId,
    method: 'DELETE'
  });
  return response;
};

export const useDeleteTag = (entityId: string, entityType: string) => {
  const queryClient = useQueryClient();

  return useMutation(deleteTag, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tags']);
      queryClient.invalidateQueries(['task']);
      entityType === EntityType.task
        ? queryClient.invalidateQueries(['sub-tasks', entityId])
        : queryClient.invalidateQueries(['checklists', entityId]);
    }
  });
};

const updateTag = (data: Pick<Tag, 'id'> & Partial<Omit<Tag, 'id'>>) => {
  const { id, name, color } = data;
  // const id = data.id;

  const response = requestNew({
    url: 'tags/' + id,
    method: 'PUT',
    data: {
      name,
      color
    }
  });
  return response;
};

export const useUpdateTag = (entityId: string, entityType: string) => {
  const queryClient = useQueryClient();

  return useMutation(updateTag, {
    onSuccess: () => {
      queryClient.invalidateQueries(['tags']);
      queryClient.invalidateQueries(['task']);
      entityType === EntityType.task
        ? queryClient.invalidateQueries(['sub-tasks', entityId])
        : queryClient.invalidateQueries(['checklists', entityId]);
    }
  });
};

export const UseGetAllTagsService = () => {
  return useQuery(['tags'], async () => {
    const data = await requestNew<ITagRes | undefined>({
      url: 'tags',
      method: 'GET'
    });
    return data;
  });
};

export const UseUpdateTagService = ({
  color,
  tag_id,
  name
}: {
  color?: string;
  tag_id: string | null | undefined;
  name?: string;
}) => {
  const url = `tags/${tag_id}`;
  const response = requestNew({
    url,
    method: 'PUT',
    data: {
      name: name,
      color: color
    }
  });
  return response;
};

export const UseDeleteTagsService = ({ trigger, tag_id }: { trigger: number; tag_id: string | null | undefined }) => {
  const url = `tags/${tag_id}`;
  const response = requestNew({
    url,
    method: 'DELETE',
    params: {
      confirm: trigger
    }
  });
  return response;
};

//assign tags
export const UseAssignTagService = ({
  tagId,
  currentTaskIdForTag,
  entity_type
}: {
  tagId: string | null;
  currentTaskIdForTag: string | null | undefined;
  entity_type?: string;
}) => {
  const url = `tags/${tagId}/assign`;
  const response = requestNew({
    url,
    method: 'POST',
    params: {
      type: entity_type,
      id: currentTaskIdForTag
    }
  });
  return response;
};

//un-assign tags
export const UseUnAssignTagService = ({
  tagId,
  currentTaskIdForTag,
  entity_type
}: {
  tagId: string | null;
  currentTaskIdForTag: string | null | undefined;
  entity_type: string | undefined;
}) => {
  const url = `tags/${tagId}/unassign`;
  const response = requestNew({
    url,
    method: 'POST',
    params: {
      type: entity_type,
      id: currentTaskIdForTag
    }
  });
  return response;
};

//unassign tags
export const UseUnAssignTagFromTask = ({
  tagId,
  currentTaskIdForTag
}: {
  tagId: string;
  currentTaskIdForTag: string;
}) => {
  return useQuery(
    ['task', { tagId: tagId, currentTaskIdForTag: currentTaskIdForTag }],
    async () => {
      const data = await requestNew({
        url: `tags/${tagId}/unassign`,
        method: 'POST',
        params: {
          type: EntityType.task,
          id: currentTaskIdForTag
        }
      });
      return data;
    },
    {
      enabled: !!tagId
    }
  );
};

const unassignTag = (data: { tagId: TagId; entityId: TaskId; entityType: string }) => {
  const { tagId, entityId, entityType } = data;

  const response = requestNew({
    url: 'tags/' + tagId + '/unassign',
    method: 'POST',
    data: {
      type: entityType,
      id: entityId
    }
  });
  return response;
};

export const useUnassignTag = (entityId: string) => {
  const queryClient = useQueryClient();

  return useMutation(unassignTag, {
    onSuccess: () => {
      queryClient.invalidateQueries(['task']);
      queryClient.invalidateQueries(['sub-tasks', entityId]);
    }
  });
};
