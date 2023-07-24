import { InfiniteData, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';
import { ITeamMembersRes } from './workspace.interfaces';

// Get team members in the workspace
interface teamMemberType {
  id: string;
}

export const useGetTeamMembers = ({ query }: { query: string | number }) => {
  const queryClient = useQueryClient();

  return useInfiniteQuery(
    ['team_members', { query }],
    async ({ pageParam = 0 }: { pageParam?: number }) => {
      const url = 'settings/team-members';

      return requestNew<ITeamMembersRes>({
        url,
        method: 'GET',
        params: {
          page: pageParam,
          search: query
        }
      });
    },
    {
      onSuccess: (data: InfiniteData<ITeamMembersRes>) => {
        data.pages.map((page) =>
          page.data.team_members.map((teamMember: teamMemberType) =>
            queryClient.setQueryData(['team_member', teamMember.id], teamMember)
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
