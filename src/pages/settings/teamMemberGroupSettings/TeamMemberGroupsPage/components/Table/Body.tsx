import React from 'react';
import Row from './Row';
import { useGetTeamMemberGroups } from '../../../../../../features/settings/teamMemberGroups/teamMemberGroupService';
import { useAppSelector } from '../../../../../../app/hooks';

export default function Body() {
  const { teamMemberGroupsPaginationPage } = useAppSelector((state) => state.teamMemberGroup);

  const { data } = useGetTeamMemberGroups(teamMemberGroupsPaginationPage);

  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {data?.data.team_member_groups?.map((teamMemberGroup) => (
        <Row key={teamMemberGroup.id} teamMemberGroupId={teamMemberGroup.id} />
      ))}
    </tbody>
  );
}
