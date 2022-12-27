import React from 'react';
import Row from './Row';
import { useGetTeamMemberInvites } from '../../../../../../features/settings/teamMemberInvites/teamMemberInviteService';
import { useAppSelector } from '../../../../../../app/hooks';

export default function Body() {
  const { teamMemberInvitesPaginationPage } = useAppSelector(
    (state) => state.teamMemberInvite
  );

  const { status, data } = useGetTeamMemberInvites(
    teamMemberInvitesPaginationPage
  );

  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {status === 'success' &&
        data.data.team_member_invites.map((teamMemberInvite) => (
          <Row
            teamMemberInviteId={teamMemberInvite.id}
            key={teamMemberInvite.id}
          />
        ))}
    </tbody>
  );
}
