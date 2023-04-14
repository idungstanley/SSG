import { TeamMemberWithStatus } from '../../../features/community/community';

export const useSplitTeamMembers = (teamMembers: TeamMemberWithStatus[]) => {
  const online: TeamMemberWithStatus[] = [];
  const offline: TeamMemberWithStatus[] = [];

  teamMembers.forEach((i) => (i.is_online ? online.push(i) : offline.push(i)));

  return { online, offline };
};
