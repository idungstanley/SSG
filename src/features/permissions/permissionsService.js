import { useQuery } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';

export const useGetFilteredTeamMembers = (currentUserId, activeMembers) => {
  const { data, status } = useQuery(['team-members'], async () => requestNew({
    url: 'settings/team-members',
    method: 'GET',
  }));
  const activeMembersWithCurrent = currentUserId ? [currentUserId] : [];

  if (activeMembers) {
    activeMembersWithCurrent.push(...activeMembers);
    activeMembersWithCurrent.filter((v, i, a) => a.indexOf(v) === i);
  }

  const teamMembers = data && data.data.team_members.filter((i) => !activeMembersWithCurrent.includes(i.user.id));

  return { users: teamMembers, status };
};

export const useGetDataPermissions = (id, type) => {
  // type: folder or file

  const url = `${type}s/${id}/access`;
  const queryKey = [`${type}-permissions-${id}`];

  const { data, status, refetch } = useQuery(queryKey, async () => requestNew({
    url,
    method: 'GET',
  }));

  return { data: data?.data, status, refetch };
};
