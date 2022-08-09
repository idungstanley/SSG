import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SearchIcon } from '@heroicons/react/solid';
import { AdjustmentsIcon } from '@heroicons/react/outline';
import { Spinner } from '../../../common';
import { SimpleSectionHeading, InputWithTrailingButton } from '../../../components';
import Breadcrumb from '../components/Breadcrumb';
import Table from './components/Table';
import { setTeamMembersSearchQuery } from '../../../features/settings/teamMembers/teamMemberSlice';
import { useGetTeamMembersQuery } from '../../../features/settings/teamMembers/teamMemberApi';

export default function TeamMembersPage() {
  const dispatch = useDispatch();

  const teamMembersPaginationPage = useSelector((state) => state.teamMember.teamMembersPaginationPage);
  const teamMembersSearchQuery = useSelector((state) => state.teamMember.teamMembersSearchQuery);

  const { isFetching } = useGetTeamMembersQuery({
    page: teamMembersPaginationPage,
    search: teamMembersSearchQuery,
  });

  const onChange = (e) => {
    dispatch(setTeamMembersSearchQuery(e.target.value));
  };

  return (
    <div className="h-full flex-1 flex flex-col overflow-hidden bg-gray-50">
      <Breadcrumb
        pages={[
          { name: 'Team members', href: '/settings/team-members', current: true },
        ]}
      />
      <main className="flex-1 h-full overflow-y-scroll pb-10 px-4 sm:px-6 lg:px-6">
        <div className="my-10">
          <SimpleSectionHeading
            title="Team members"
            description="Manage all team members in your workspace"
            actions={(
              <InputWithTrailingButton
                icon={<SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />}
                buttonInner={(
                  <>
                    <AdjustmentsIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span>Filter</span>
                  </>
                )}
                buttonOnClick={() => alert('Filter by active or deactivated TODO')}
                placeholder="Search team members"
                name="search-team-members"
                value={teamMembersSearchQuery}
                onChange={onChange}
              />
            )}
          />
        </div>

        {isFetching ? (
          <div className="mx-auto w-6 justify-center">
            <Spinner size={22} color="#0F70B7" />
          </div>
        ) : (
          <Table />
        )}
      </main>
    </div>
  );
}
