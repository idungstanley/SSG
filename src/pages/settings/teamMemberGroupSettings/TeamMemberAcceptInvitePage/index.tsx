import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAcceptTeamMemberInvite } from '../../../../features/settings/teamMemberInvites/teamMemberInviteService';
import { Spinner } from '../../../../common';
import RegisterPage from '../../../workspace/createWorkspace/auth/RegisterPage/index';
import NotFoundPage from '../../../NotFoundPage';

export default function TeamMemberAcceptInvite() {
  const { inviteCode } = useParams();
  inviteCode
    ? localStorage.setItem('teamMemberInviteCode', JSON.stringify(inviteCode))
    : '';
  const { status, data } = useAcceptTeamMemberInvite();

  console.log(data);

  if (status == 'loading') {
    return (
      <div className="flex justify-center relative top-52 bottom-52">
        <Spinner size={10} color={'#6B7280'} />
      </div>
    );
  }

  if (status == 'success') {
    localStorage.setItem('user', JSON.stringify(data?.data.user));
  }

  return data?.message === 'Unauthenticated' ? (
    <RegisterPage />
  ) : status === 'success' ? (
    <Navigate to="/workspace" />
  ) : (
    <NotFoundPage />
  );
}
//  https://dev.alsoworkspace.com/accept-invite/81444843fb4412b4b24680363ff266e4fcc67f5397
