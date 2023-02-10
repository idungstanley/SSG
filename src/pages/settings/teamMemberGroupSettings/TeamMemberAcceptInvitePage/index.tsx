import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAcceptTeamMemberInvite } from '../../../../features/settings/teamMemberInvites/teamMemberInviteService';
import { Spinner } from '../../../../common';
import RegisterPage from '../../../workspace/createWorkspace/auth/RegisterPage/index';
import NotFoundPage from '../../../NotFoundPage';

export default function TeamMemberAcceptInvite() {
  const { inviteCode } = useParams();

  useEffect((): any => {
    // const token = JSON.parse(localStorage.getItem('accessToken') as string);
    if (inviteCode) {
      localStorage.setItem('teamMemberInviteCode', JSON.stringify(inviteCode));
    }

    // if (!token) {
    //   return <RegisterPage />;
    // }
  }, [inviteCode]);

  const { status, data } = useAcceptTeamMemberInvite();

  console.log(data);

  if (status == 'loading') {
    setTimeout(() => {
      window.location.reload();
      return (
        <div className="flex justify-center relative top-52 bottom-52">
          <Spinner size={10} color={'#6B7280'} />
        </div>
      );
    }, 200);
  }

  if (status == 'success') {
    localStorage.setItem('user', JSON.stringify(data?.data.user));
  }
  return data?.message == 'Unauthenticated' ? (
    <RegisterPage />
  ) : status === 'success' ? (
    <Navigate to="/workspace" />
  ) : (
    <NotFoundPage />
  );
}
