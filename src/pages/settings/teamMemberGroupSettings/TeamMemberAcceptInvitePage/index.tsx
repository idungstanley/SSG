import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAcceptTeamMemberInvite } from '../../../../features/settings/teamMemberInvites/teamMemberInviteService';
import RegisterPage from '../../../workspace/createWorkspace/auth/RegisterPage/index';
import NotFoundPage from '../../../NotFoundPage';
import AcceptInvite from './AcceptInvite';

export default function TeamMemberAcceptInvite() {
  const { inviteCode } = useParams();

  useEffect(() => {
    if (inviteCode) {
      localStorage.setItem('teamMemberInviteCode', JSON.stringify(inviteCode));
    }
  }, [inviteCode]);

  const { data } = useAcceptTeamMemberInvite();
  const user = data?.data.user;

  return data?.message == 'Unauthenticated' ? (
    <RegisterPage />
  ) : inviteCode ? (
    <AcceptInvite user={user} />
  ) : (
    <NotFoundPage />
  );
}
