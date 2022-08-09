import React from 'react';
import { useSelector } from 'react-redux';
import Row from './Row';

// Features
import { useGetTeamMembersQuery } from '../../../../../features/settings/teamMembers/teamMemberApi';

export default function Body() {
  const teamMembersPaginationPage = useSelector((state) => state.teamMember.teamMembersPaginationPage);
  const teamMembersSearchQuery = useSelector((state) => state.teamMember.teamMembersSearchQuery);

  const { data } = useGetTeamMembersQuery({
    page: teamMembersPaginationPage,
    search: teamMembersSearchQuery,
  });

  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {data.data.team_members.map((teamMember) => (
        <Row teamMember={teamMember} />
      ))}
    </tbody>
  );
}
