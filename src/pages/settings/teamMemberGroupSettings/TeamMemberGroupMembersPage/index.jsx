import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetTeamMemberGroup } from '../../../../features/settings/teamMemberGroups/teamMemberGroupService';
import { Button, EmptyStateSimple } from '../../../../components';
import { Spinner } from '../../../../common';
import Breadcrumb from '../../components/Breadcrumb';
import TabbedHeading from '../components/TabbedHeading';
import Table from './components/Table';
import { setAddGroupTeamMemberSlideOverVisibility } from '../../../../features/general/slideOver/slideOverSlice';
import AddGroupTeamMemberSlideOver from './components/slideOvers/AddGroupTeamMemberSlideOver';

function TeamMemberGroupMembersPage() {
  const dispatch = useDispatch();
  const { teamMemberGroupId } = useParams();
  const { data: teamMemberGroup, status } = useGetTeamMemberGroup(teamMemberGroupId);

  const addMember = () => {
    dispatch(setAddGroupTeamMemberSlideOverVisibility(true));
  };

  return (
    <>
      <div className="h-full flex flex-col w-full flex-1 bg-white overflow-hidden">
        <Breadcrumb
          pages={[
            { name: 'Team members', href: '/settings/team-members', current: false },
            { name: 'Groups', href: '/settings/team-members/groups', current: false },
            { name: (teamMemberGroup ? teamMemberGroup.name : 'Loading...'), href: `/settings/team-members/groups/${teamMemberGroup ? teamMemberGroup.id : null}`, current: true },
          ]}
        />
        <div className="flex-1 flex flex-col h-full overflow-y-scroll pb-10 px-4 sm:px-6 lg:px-6">
          <div className="my-10">
            <TabbedHeading
              selectedTabKey="members"
              actions={(
                <Button
                  buttonStyle="primary"
                  onClick={addMember}
                  loading={false}
                  label="Add member"
                  width="w-36"
                />
              )}
            />
          </div>

          {status === 'success' && teamMemberGroup.group_team_members?.length !== 0 && (
            <Table />
          )}

          {status === 'loading' && (
            <div className="mx-auto w-6 justify-center">
              <Spinner size={22} color="#0F70B7" />
            </div>
          )}

          {status === 'success' && teamMemberGroup.group_team_members?.length === 0 && (
            <div className="flex flex-1 h-full bg-white">
              <div className="m-auto">
                <EmptyStateSimple
                  title="No members have been added"
                  description="Add the group's first member"
                  ctaText="Add member"
                  ctaOnClick={addMember}
                  showCta
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <AddGroupTeamMemberSlideOver />
    </>
  );
}

export default TeamMemberGroupMembersPage;
