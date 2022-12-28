import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import requestNew from '../../app/requestNew';

// Get team members in the workspace
interface Iprops {
  query: string | number
}
interface teamMemberType {
  id: string
}
export const useGetTeamMembers = ({ query }: Iprops) => {
  const queryClient = useQueryClient();

  return useInfiniteQuery(
    ['team_members', { query }],
    async ({ pageParam = 0 }) => {
      const url = 'settings/team-members';

      return requestNew({
        url,
        method: 'GET',
        params: {
          page: pageParam,
          search: query,
        },
      }, true);
    },
    {
      onSuccess: (data) => {
        data.pages.map((page) => page.data.team_members.map((teamMember: teamMemberType) => queryClient.setQueryData(['team_member', teamMember.id], teamMember)));
      },
      getNextPageParam: (lastPage) => {
        if (lastPage?.data?.pagination.has_more_pages) {
          return Number(lastPage.data.pagination.page) + 1;
        }

        return false;
      },
    },
  );
};
