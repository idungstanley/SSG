import { useQuery } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';
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
  type: 'folder' | 'file' | null
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
