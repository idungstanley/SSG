import React from 'react';
import { useSelector } from 'react-redux';
import Row from './Row';
import { useGetTeamMembers } from '../../../../../../features/settings/teamMembers/teamMemberService';

export default function Body() {
  const teamMembersPaginationPage = useSelector((state) => state.teamMember.teamMembersPaginationPage);
  const teamMembersSearchQuery = useSelector((state) => state.teamMember.teamMembersSearchQuery);

  const { status, data } = useGetTeamMembers({
    page: teamMembersPaginationPage,
    query: teamMembersSearchQuery,
  });

  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {status === 'success' && data.data.team_members.map((teamMember) => (
        <Row key={teamMember.id} teamMemberId={teamMember.id} />
      ))}
    </tbody>
  );
}
