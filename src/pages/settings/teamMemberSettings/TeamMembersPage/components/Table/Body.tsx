import React from 'react';
import Row from './Row';
import { useGetTeamMembers } from '../../../../../../features/settings/teamMembers/teamMemberService';
import { useAppSelector } from '../../../../../../app/hooks';

export default function Body() {
  const { teamMembersPaginationPage, teamMembersSearchQuery } = useAppSelector((state) => state.teamMember);

  const { status, data } = useGetTeamMembers({
    page: teamMembersPaginationPage,
    query: teamMembersSearchQuery
  });

  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {status === 'success' &&
        data.data.team_members?.map((teamMember) => <Row key={teamMember.id} teamMemberId={teamMember.id} />)}
    </tbody>
  );
}
