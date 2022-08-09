import { useQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../../app/requestNew';

// Get team member groups
export const useGetTeamMemberGroups = (page) => {
  const queryClient = useQueryClient();

  return useQuery(
    ['team_member_groups', { page }],
    async () => {
      const url = 'settings/team-member-groups';

      return requestNew({
        url,
        method: 'GET',
        params: {
          page,
        },
      });
    },
    {
      onSuccess: (data) => {
        data.data.team_member_groups.map((teamMemberGroup) => queryClient.setQueryData(['team_member_group', teamMemberGroup.id], teamMemberGroup));
      },
    },
  );
};

// Get team member group
export const useGetTeamMemberGroup = (teamMemberGroup) => {
  const queryClient = useQueryClient();
  return queryClient.getQueryData(['team_member_group', teamMemberGroup]);
};
