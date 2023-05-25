import { useQuery } from '@tanstack/react-query';
// import { useAppDispatch } from '../../../app/hooks';
import requestNew from '../../../app/requestNew';
import { ITagRes } from './tag.interfaces';

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
          type: 'task',
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
