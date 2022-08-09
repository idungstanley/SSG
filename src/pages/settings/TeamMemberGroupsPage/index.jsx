import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from '../../../common';
import { SimpleSectionHeading, Button } from '../../../components';
import Breadcrumb from '../components/Breadcrumb';
import Table from './components/Table';
import { setCreateTeamMemberGroupSlideOverVisibility } from '../../../features/general/slideOver/slideOverSlice';
import TeamMemberGroupMembersSlideOver from './components/TeamMemberGroupMembersSlideOver';
import CreateTeamMemberGroupSlideOver from './components/CreateTeamMemberGroupSlideOver';
import { useGetTeamMemberGroups } from '../../../features/settings/teamMemberGroups/teamMemberGroupService';

export default function TeamMemberGroupsPage() {
  const dispatch = useDispatch();

  const teamMemberGroupsPaginationPage = useSelector((state) => state.teamMemberGroup.teamMemberGroupsPaginationPage);
  const { status } = useGetTeamMemberGroups(teamMemberGroupsPaginationPage);

  return (
    <>
      <div className="h-full flex-1 flex flex-col overflow-hidden bg-gray-50">
        <Breadcrumb
          pages={[
            { name: 'Team members', href: '/settings/team-members', current: false },
            { name: 'Groups', href: '/settings/team-members/groups', current: true },
          ]}
        />
        <main className="flex-1 h-full overflow-y-scroll pb-10 px-4 sm:px-6 lg:px-6">
          <div className="my-10">
            <SimpleSectionHeading
              title="Team member groups"
              description="Manage team member groups"
              actions={(
                <Button
                  buttonStyle="primary"
                  onClick={() => dispatch(setCreateTeamMemberGroupSlideOverVisibility(true))}
                  loading={false}
                  label="Create group"
                  paddingVertical={2}
                  paddingHorizontal={4}
                  width={50}
                />
              )}
            />
          </div>

          {status === 'loading' ? (
            <div className="mx-auto w-6 justify-center">
              <Spinner size={22} color="#0F70B7" />
            </div>
          ) : (
            <Table />
          )}
        </main>
      </div>
      <TeamMemberGroupMembersSlideOver />
      <CreateTeamMemberGroupSlideOver />
    </>
  );
}
