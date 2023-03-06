import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';

// Get team member groups in the workspace

interface Iprops {
  query: string | number;
}

interface teamgroupType {
  id: string;
}
export const useGetTeamMemberGroups = ({ query }: Iprops) => {
  const queryClient = useQueryClient();

  return useInfiniteQuery(
    ['team_member_groups', { query }],
    async ({ pageParam = 0 }) => {
      const url = 'settings/team-member-groups';

      return requestNew(
        {
          url,
          method: 'GET',
          params: {
            page: pageParam,
            search: query
          }
        },
        true
      );
    },
    {
      onSuccess: (data) => {
        data.pages.map((page) =>
          page.data.team_member_groups.map((teamMemberGroup: teamgroupType) =>
            queryClient.setQueryData(['team_member_group', teamMemberGroup.id], teamMemberGroup)
          )
        );
      },
      getNextPageParam: (lastPage) => {
        if (lastPage?.data?.pagination.has_more_pages) {
          return Number(lastPage.data.pagination.page) + 1;
        }

        return false;
      }
    }
  );
};
