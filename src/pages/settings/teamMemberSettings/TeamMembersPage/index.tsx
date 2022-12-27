import React from 'react';
import { useDispatch } from 'react-redux';
import { Spinner } from '../../../../common';
import { SimpleSectionHeading, SearchInput } from '../../../../components';
import Breadcrumb from '../../components/Breadcrumb';
import Table from './components/Table';
import { setTeamMembersSearchQuery } from '../../../../features/settings/teamMembers/teamMemberSlice';
import { useGetTeamMembers } from '../../../../features/settings/teamMembers/teamMemberService';
import { useAppSelector } from '../../../../app/hooks';

export default function TeamMembersPage() {
  const dispatch = useDispatch();

  const { teamMembersPaginationPage, teamMembersSearchQuery } = useAppSelector(
    (state) => state.teamMember
  );

  const { status } = useGetTeamMembers({
    page: teamMembersPaginationPage,
    query: teamMembersSearchQuery,
  });

  const onChange = (value: string) => {
    dispatch(setTeamMembersSearchQuery(value));
  };

  return (
    <div className="h-full flex-1 flex flex-col overflow-hidden bg-gray-50">
      <Breadcrumb
        pages={[
          {
            name: 'Team members',
            href: '/settings/team-members',
            current: true,
          },
        ]}
      />
      <main className="flex-1 h-full overflow-y-scroll pb-10 px-4 sm:px-6 lg:px-6">
        <div className="my-10">
          <SimpleSectionHeading
            title="Team members"
            description="Manage all team members in your workspace"
            actions={
              <SearchInput
                loading={status === 'loading'}
                placeholder="Search team members"
                value={teamMembersSearchQuery}
                onChange={onChange}
              />
            }
          />
        </div>

        {status === 'loading' ? (
          <div className="mx-auto w-6 justify-center">
            <Spinner size={8} color="#0F70B7" />
          </div>
        ) : (
          <Table />
        )}
      </main>
    </div>
  );
}
