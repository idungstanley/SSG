import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAcceptTeamMemberInvite } from '../../../../features/settings/teamMemberInvites/teamMemberInviteService';
import RegisterPage from '../../../workspace/createWorkspace/auth/RegisterPage/index';
import NotFoundPage from '../../../NotFoundPage/NotFoundPage';

import { Button } from '../../../../components';
export default function TeamMemberAcceptInvite() {
  const { inviteCode } = useParams();
  const [acceptInviteTrigger, setAcceptInviteTrigger] = useState<boolean>(false);
  const token = JSON.parse(localStorage.getItem('accessToken') as string);

  useEffect(() => {
    if (inviteCode) {
      localStorage.setItem('teamMemberInviteCode', JSON.stringify(inviteCode));
    }

    setAcceptInviteTrigger(true);
  }, [inviteCode, token]);

  const { data } = useAcceptTeamMemberInvite(acceptInviteTrigger);

  const handleAcceptInvite = () => {
    if (data?.data) {
      localStorage.setItem('user', JSON.stringify(data?.data.user));
    }
    window.location.href = '/workspace';
  };

  return !token ? (
    <RegisterPage />
  ) : inviteCode ? (
    <main className="flex min-h-full flex-col bg-white mx-auto w-full max-w-7xl flex-grow justify-center px-4 sm:px-6 lg:px-8 text-center">
      <p className="mt-2 text-base text-gray-500">Click on this button to proceed into workspace</p>
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
