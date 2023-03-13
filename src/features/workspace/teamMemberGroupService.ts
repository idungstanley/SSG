import { InfiniteData, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';
import { ITeamMembersAndGroupsReq } from './teamMembers.intrfaces';

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
    async ({ pageParam = 0 }: { pageParam?: number }) => {
      const url = 'settings/team-member-groups';

      return requestNew<ITeamMembersAndGroupsReq>({
        url,
        method: 'GET',
        params: {
          page: pageParam,
          search: query
        }
      });
    },
    {
      onSuccess: (data: InfiniteData<ITeamMembersAndGroupsReq>) => {
        data.pages.map((page) =>
          page.data.team_member_groups.map((teamMemberGroup: teamgroupType) =>
            queryClient.setQueryData(['team_member_group', teamMemberGroup.id], teamMemberGroup)
          )
        );
      },
      getNextPageParam: (lastPage) => {
        const hasMorePages = lastPage.data?.pagination.has_more_pages;
        if (hasMorePages) {
          return Number(lastPage.data.pagination.page) + 1;
        }

        return false;
      }
    }
  );
};
