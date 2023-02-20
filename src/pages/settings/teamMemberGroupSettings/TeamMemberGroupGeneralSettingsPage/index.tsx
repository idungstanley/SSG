import React from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import TabbedHeading from '../components/TabbedHeading';
import Form from './components/Form';
import { useGetTeamMemberGroup } from '../../../../features/settings/teamMemberGroups/teamMemberGroupService';

function TeamMemberGroupGeneralSettingsPage() {
  const { teamMemberGroupId } = useParams();
  const { data: teamMemberGroup } = useGetTeamMemberGroup(teamMemberGroupId);

  return (
    <div className="h-full flex flex-col w-full flex-1 bg-white overflow-hidden">
      <Breadcrumb
        pages={[
          {
            name: 'Team members',
            href: '/settings/team-members',
            current: false,
          },
          {
            name: 'Groups',
            href: '/settings/team-members/groups',
            current: false,
          },
          {
            name: teamMemberGroup ? teamMemberGroup.name : 'Loading...',
            href: `/settings/team-members/groups/${
              teamMemberGroup ? teamMemberGroup.id : null
            }`,
            current: true,
          },
        ]}
      />
      <div className="flex-1 h-full overflow-y-scroll pb-10 px-4 sm:px-6 lg:px-6">
        <div className="my-10">
          <TabbedHeading selectedTabKey="general" />
        </div>
        <Form />
      </div>
    </div>
  );
}

export default TeamMemberGroupGeneralSettingsPage;
