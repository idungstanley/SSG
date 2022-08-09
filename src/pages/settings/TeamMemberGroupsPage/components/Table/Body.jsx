import React from 'react';
import { useSelector } from 'react-redux';
import Row from './Row';
import { useGetTeamMemberGroups } from '../../../../../features/settings/teamMemberGroups/teamMemberGroupService';

export default function Body() {
  const teamMemberGroupsPaginationPage = useSelector((state) => state.teamMemberGroup.teamMemberGroupsPaginationPage);

  const { data } = useGetTeamMemberGroups(teamMemberGroupsPaginationPage);

  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {data.data.team_member_groups.map((teamMemberGroup) => (
        <Row teamMemberGroup={teamMemberGroup} />
      ))}
    </tbody>
  );
}
