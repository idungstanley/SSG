import React from 'react';
import { useParams } from 'react-router-dom';
import Row from './Row';
import { useGetTeamMemberGroup } from '../../../../../../features/settings/teamMemberGroups/teamMemberGroupService';

export default function Body() {
  const { teamMemberGroupId } = useParams();
  const { data: teamMemberGroup, status } = useGetTeamMemberGroup(teamMemberGroupId);

  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {status === 'success' && teamMemberGroup.group_team_members.map((groupTeamMember) => (
        <Row key={groupTeamMember.id} groupTeamMember={groupTeamMember} />
      ))}
    </tbody>
  );
}
