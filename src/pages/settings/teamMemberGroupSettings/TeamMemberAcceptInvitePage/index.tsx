import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAcceptTeamMemberInvite } from '../../../../features/settings/teamMemberInvites/teamMemberInviteService';
import { Spinner } from '../../../../common';
import FullScreenMessage from '../../../../components/CenterMessage/FullScreenMessage';

export default function TeamMemberAcceptInvite() {
  const { inviteCode } = useParams();
  inviteCode
    ? localStorage.setItem('teamMemberInviteCode', JSON.stringify(inviteCode))
    : '';
  const { status } = useAcceptTeamMemberInvite();
  setTimeout(() => {
    if (status === 'loading') {
      window.location.reload();
    }
  }, 2000);

  if (status === 'success') {
    localStorage.removeItem('teamMemberInviteCode');
  }
  return status === 'loading' ? (
    <div className="flex justify-center relative top-52 bottom-52">
      <Spinner size={10} color={'#6B7280'} />
    </div>
  ) : status === 'success' ? (
    <Navigate to="/workspace" />
  ) : (
    <FullScreenMessage
      title="Oops, an error occurred :("
      description="Please try again later."
    />
  );
}
