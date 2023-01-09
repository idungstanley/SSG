import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';
import { explorerItemType } from '../../types';
import { ITeamMembersAndGroupsReq } from '../workspace/teamMembers.intrfaces';
import { IDataAccessReq } from './permissions.interfaces';

export const useGetFilteredTeamMembers = (
  currentUserId?: string | null,
  activeMembers?: string[]
) => {
  const { data, status } = useQuery<ITeamMembersAndGroupsReq>(
    ['team-members'],
    () =>
      requestNew(
        {
          url: 'settings/team-members',
          method: 'GET',
        },
        true
      ),
    { enabled: !!currentUserId }
  );
  const activeMembersWithCurrent = currentUserId ? [currentUserId] : [];

  if (activeMembers) {
    activeMembersWithCurrent.push(...activeMembers);
    activeMembersWithCurrent.filter((v, i, a) => a.indexOf(v) === i);
  }

  const teamMembers =
    data &&
    data.data.team_members.filter(
      (i) => !activeMembersWithCurrent.includes(i.user.id)
    );

  return { users: teamMembers, status };
};

export const useGetDataAccess = (
  id: string | null,
  type: explorerItemType | null
) => {
  const url = `${type}s/${id}/access`;
  const queryKey = [`${type}-permissions-${id}`];

  const { data, status, refetch } = useQuery<IDataAccessReq>(
    queryKey,
    async () =>
      requestNew({
        url,
        method: 'GET',
      }),
    { enabled: !!id && !!type }
  );

  return { data: data?.data, status, refetch };
};

const removeAccessForData = (dat: {
  type: explorerItemType | null;
  itemType: 'member' | 'member-group';
  dataId: string | null;
  isActiveUser: boolean;
  accessToId: string;
}) => {
  const { type, dataId, itemType, isActiveUser, accessToId } = dat;

  const url = `${type}s/${dataId}/access/${
    isActiveUser ? 'leave' : 'remove-access'
  }`;

  const data = isActiveUser
    ? null
    : { access_type: itemType, access_to_id: accessToId };

  const response = requestNew({
    method: 'POST',
    url,
    data,
  });
  return response;
};

export const useRemoveAccessForData = (
  type: explorerItemType | null,
  id: string | null
) => {
  const queryClient = useQueryClient();

  return useMutation(removeAccessForData, {
    onSuccess: () => {
      queryClient.invalidateQueries([`${type}-permissions-${id}`]);
    },
  });
};

const changeAccessForData = (data: {
  dataId: string | null;
  key: string;
  accessToId: string;
  type: explorerItemType | null;
  itemType: 'member' | 'member-group';
}) => {
  const { key, accessToId, type, dataId, itemType } = data;
  const url = `${type}s/${dataId}/access/change-access-level`;

  const response = requestNew({
    method: 'POST',
    url,
    data: {
      access_type: itemType,
      access_to_id: accessToId,
      access_level_key: key,
    },
  });
  return response;
};

export const useChangeAccessForData = (
  type: explorerItemType | null,
  id: string | null
) => {
  const queryClient = useQueryClient();

  return useMutation(changeAccessForData, {
    onSuccess: () => {
      queryClient.invalidateQueries([`${type}-permissions-${id}`]);
    },
  });
};

const addAccessForData = (data: {
  dataId: string | null;
  accessToId: string;
  type: explorerItemType | null;
  itemType: 'member' | 'member-group';
}) => {
  const { type, dataId, itemType, accessToId } = data;

  const url = `${type}s/${dataId}/access/add-access`;

  const response = requestNew({
    method: 'POST',
    url,
    data: {
      access_type: itemType,
      access_to_id: accessToId,
      access_level_key: 'read',
    },
  });
  return response;
};

export const useAddAccessForData = (
  type: explorerItemType | null,
  id: string | null
) => {
  const queryClient = useQueryClient();

  return useMutation(addAccessForData, {
    onSuccess: () => {
      queryClient.invalidateQueries([`${type}-permissions-${id}`]);
    },
  });
};
