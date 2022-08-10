import React from 'react';
import { useSelector } from 'react-redux';
import Row from './Row';
import { useGetTeamMemberInvites } from '../../../../../../features/settings/teamMemberInvites/teamMemberInviteService';

export default function Body() {
  const teamMemberInvitesPaginationPage = useSelector((state) => state.teamMemberInvite.teamMemberInvitesPaginationPage);

  const { status, data } = useGetTeamMemberInvites({
    page: teamMemberInvitesPaginationPage,
  });

  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {status === 'success' && data.data.team_member_invites.map((teamMemberInvite) => (
        <Row teamMemberInviteId={teamMemberInvite.id} />
      ))}
    </tbody>
  );
}
