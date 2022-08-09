import React from 'react';
import { useSelector } from 'react-redux';
import Row from './Row';

// Features
import { useGetTeamMemberInvitesQuery } from '../../../../../features/settings/teamMemberInvites/teamMemberInviteApi';

export default function Body() {
  const teamMemberInvitesPaginationPage = useSelector((state) => state.teamMemberInvite.teamMemberInvitesPaginationPage);

  const { data } = useGetTeamMemberInvitesQuery({
    page: teamMemberInvitesPaginationPage,
  });

  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {data.data.team_member_invites.map((teamMemberInvite) => (
        <Row teamMemberInvite={teamMemberInvite} />
      ))}
    </tbody>
  );
}
