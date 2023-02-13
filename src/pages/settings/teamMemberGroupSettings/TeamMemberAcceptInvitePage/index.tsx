import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAcceptTeamMemberInvite } from '../../../../features/settings/teamMemberInvites/teamMemberInviteService';
import { Spinner } from '../../../../common';
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

  const { status, data } = useAcceptTeamMemberInvite();

  // if (status == 'loading') {
  //   return (
  //     <div className="flex justify-center relative top-52 bottom-52">
  //       <Spinner size={10} color={'#6B7280'} />
  //     </div>
  //   );
  // }

  if (status == 'success') {
    localStorage.setItem('user', JSON.stringify(data?.data.user));
  }

  // if (data?.message == 'Unauthenticated') <RegisterPage />;
  // return inviteCode ? <AcceptInvite /> : <NotFoundPage />;
  return data?.message == 'Unauthenticated' ? (
    <RegisterPage />
  ) : inviteCode ? (
    <AcceptInvite />
  ) : (
    <NotFoundPage />
  );
}
