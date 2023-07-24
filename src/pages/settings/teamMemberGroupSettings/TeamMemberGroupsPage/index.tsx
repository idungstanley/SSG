import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { Spinner } from '../../../../common';
import { SimpleSectionHeading, Button, EmptyStateSimple } from '../../../../components';
import Breadcrumb from '../../components/Breadcrumb';
import Table from './components/Table';
import { setCreateTeamMemberGroupSlideOverVisibility } from '../../../../features/general/slideOver/slideOverSlice';
import CreateTeamMemberGroupSlideOver from './components/slideOvers/CreateTeamMemberGroupSlideOver';
import { useGetTeamMemberGroups } from '../../../../features/settings/teamMemberGroups/teamMemberGroupService';
import { useAppSelector } from '../../../../app/hooks';

export default function TeamMemberGroupsPage() {
  const dispatch = useDispatch();

  const { teamMemberGroupsPaginationPage } = useAppSelector((state) => state.teamMemberGroup);
  const { status, data } = useGetTeamMemberGroups(teamMemberGroupsPaginationPage);

  const { currentWorkspaceId } = useAppSelector((state) => state.auth);

  return (
    <>
      <div className="h-full flex-1 flex flex-col overflow-hidden bg-gray-50">
        <Breadcrumb
          pages={[
            {
              name: 'Team members',
              href: `${currentWorkspaceId}/settings/team-members`,
              current: false
            },
            {
              name: 'Groups',
              href: `${currentWorkspaceId}/settings/team-members/groups`,
              current: true
            }
          ]}
        />
        <main className="flex-1 flex flex-col h-full overflow-y-scroll pb-10 px-4 sm:px-6 lg:px-6">
          <div className="my-10">
            <SimpleSectionHeading
              title="Team member groups"
              description="Manage team member groups"
              actions={
                <Button
                  buttonStyle="primary"
                  onClick={() => dispatch(setCreateTeamMemberGroupSlideOverVisibility(true))}
                  loading={false}
                  label="Create group"
                  width={50}
                />
              }
            />
          </div>

          {status === 'loading' && (
            <div className="mx-auto w-6 justify-center">
              <Spinner size={8} color="#0F70B7" />
            </div>
          )}

          {status === 'success' && data.data.team_member_groups?.length === 0 && (
            <div className="flex flex-1 h-full">
              <div className="m-auto">
                <EmptyStateSimple
                  title="Create your first group"
                  description="Do more with team member groups"
                  ctaText="Create"
                  ctaOnClick={() => dispatch(setCreateTeamMemberGroupSlideOverVisibility(true))}
                  showCta
                />
              </div>
            </div>
          )}

          {status === 'success' && data.data.team_member_groups?.length !== 0 && <Table />}
        </main>
      </div>
      <CreateTeamMemberGroupSlideOver />
    </>
  );
}
