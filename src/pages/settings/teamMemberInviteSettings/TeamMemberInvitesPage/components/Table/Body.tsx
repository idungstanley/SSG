import React from 'react';
import Row from './Row';
import { useGetTeamMemberInvites } from '../../../../../../features/settings/teamMemberInvites/teamMemberInviteService';
import { useAppSelector, useAppDispatch } from '../../../../../../app/hooks';
import { SetTriggerGetTeammeberInvite } from '../../../../../../features/settings/teamMemberInvites/teamMemberInviteSlice';

export default function Body() {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(SetTriggerGetTeammeberInvite(true));
  }, []);
  const { teamMemberInvitesPaginationPage, triggerGetTeammeberInvite } = useAppSelector(
    (state) => state.teamMemberInvite
  );

  const { status, data } = useGetTeamMemberInvites(teamMemberInvitesPaginationPage, triggerGetTeammeberInvite);

  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {status === 'success' &&
        data.data.team_member_invites.map((teamMemberInvite) => (
          <Row teamMemberInviteId={teamMemberInvite.id} key={teamMemberInvite.id} />
        ))}
    </tbody>
  );
}
