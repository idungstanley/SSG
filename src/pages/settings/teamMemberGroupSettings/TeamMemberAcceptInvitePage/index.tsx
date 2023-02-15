import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAcceptTeamMemberInvite } from '../../../../features/settings/teamMemberInvites/teamMemberInviteService';
import RegisterPage from '../../../workspace/createWorkspace/auth/RegisterPage/index';
import NotFoundPage from '../../../NotFoundPage/NotFoundPage';

import { Button } from '../../../../components';
export default function TeamMemberAcceptInvite() {
  const { inviteCode } = useParams();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('accessToken') as string);
    if (inviteCode) {
      localStorage.setItem('teamMemberInviteCode', JSON.stringify(inviteCode));
    }
    if (!token) {
      <RegisterPage />;
    }
  }, [inviteCode]);

  const { data } = useAcceptTeamMemberInvite();

  console.log(data);

  const handleAcceptInvite = () => {
    // if (status == 'success') {
    //   localStorage.setItem('user', JSON.stringify(data?.data.user));
    //   localStorage.setItem('currentWorkspaceId', JSON.stringify(data?.data.user.default_workspace_id));
    // }
    window.location.href = '/workspace';
  };

  return inviteCode ? (
    <main className="flex min-h-full flex-col bg-white mx-auto w-full max-w-7xl flex-grow justify-center px-4 sm:px-6 lg:px-8 text-center">
      <p className="mt-2 text-base text-gray-500">
        Click on this button to proceed into workspace
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
