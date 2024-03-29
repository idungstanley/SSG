import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAcceptTeamMemberInvite } from '../../../../features/settings/teamMemberInvites/teamMemberInviteService';
import RegisterPage from '../../../workspace/createWorkspace/auth/RegisterPage/index';
import NotFoundPage from '../../../NotFoundPage/NotFoundPage';

import { Button } from '../../../../components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ProgressBar from '../../../../layout/components/MainLayout/ProgressBar';
import { Toaster } from 'react-hot-toast';

export default function TeamMemberAcceptInvite() {
  const queryClient = useQueryClient();
  const { inviteCode } = useParams();
  const token: string = JSON.parse(localStorage.getItem('accessToken') as string) as string;

  const acceptInvite = useMutation(useAcceptTeamMemberInvite, {
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      localStorage.removeItem('teamMemberInviteCode');
      localStorage.setItem('user', JSON.stringify(data?.data.user));
      localStorage.setItem('currentWorkspaceId', JSON.stringify(data?.data.user.default_workspace_id));
      window.location.href = '/';
    }
  });

  useEffect(() => {
    if (inviteCode) {
      localStorage.setItem('teamMemberInviteCode', JSON.stringify(inviteCode));
    }
  }, [inviteCode]);

  const handleAcceptInvite = async () => {
    try {
      await acceptInvite.mutateAsync({
        invite: inviteCode
      });
    } catch {
      return;
    }
  };

  return inviteCode ? (
    token ? (
      <main className="flex flex-col justify-center flex-grow w-full min-h-full px-4 mx-auto text-center bg-white max-w-7xl sm:px-6 lg:px-8">
        <ProgressBar />
        <Toaster position="bottom-left" />
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
      <RegisterPage />
    )
  ) : (
    <NotFoundPage />
  );
}
