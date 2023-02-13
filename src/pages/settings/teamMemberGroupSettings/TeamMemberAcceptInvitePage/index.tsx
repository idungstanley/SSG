import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAcceptTeamMemberInvite } from '../../../../features/settings/teamMemberInvites/teamMemberInviteService';
import RegisterPage from '../../../workspace/createWorkspace/auth/RegisterPage/index';
import NotFoundPage from '../../../NotFoundPage';

import { Button } from '../../../../components';
export default function TeamMemberAcceptInvite() {
  const { inviteCode } = useParams();

  useEffect(() => {
    if (inviteCode) {
      localStorage.setItem('teamMemberInviteCode', JSON.stringify(inviteCode));
    }
  }, [inviteCode]);

  const { status, data } = useAcceptTeamMemberInvite();

  const handleAcceptInvite = () => {
    if (status == 'success') {
      localStorage.setItem('user', JSON.stringify(data?.data.user));
    } else if (data?.message == 'Unauthenticated') {
      <RegisterPage />;
    }
    window.location.href = '/workspace';
  };

  return data?.message == 'Unauthenticated' ? (
    <RegisterPage />
  ) : inviteCode ? (
    <main className="flex min-h-full flex-col bg-white mx-auto w-full max-w-7xl flex-grow justify-center px-4 sm:px-6 lg:px-8 text-center">
      <p className="mt-2 text-base text-gray-500">
        Click on the button to proceed into workspace
      </p>
      <div className="mt-6">
        <Button
          buttonStyle="primary"
          onClick={handleAcceptInvite}
          label={'Accept'}
          padding="py-2 px-4"
          height="h-10"
          width="w-40"
        />
      </div>
    </main>
  ) : (
    <NotFoundPage />
  );
}
