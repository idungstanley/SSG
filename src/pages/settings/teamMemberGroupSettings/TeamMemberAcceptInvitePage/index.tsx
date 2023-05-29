import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAcceptTeamMemberInvite } from '../../../../features/settings/teamMemberInvites/teamMemberInviteService';
import RegisterPage from '../../../workspace/createWorkspace/auth/RegisterPage/index';
import NotFoundPage from '../../../NotFoundPage/NotFoundPage';

import { Button } from '../../../../components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ProgressBar from '../../../../layout/components/MainLayout/ProgressBar';
export default function TeamMemberAcceptInvite() {
  const queryClient = useQueryClient();
  const { inviteCode } = useParams();
  // const [acceptInviteTrigger, setAcceptInviteTrigger] = useState<boolean>(false);
  const token: string = JSON.parse(localStorage.getItem('accessToken') as string) as string;

  const acceptInvite = useMutation(useAcceptTeamMemberInvite, {
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      localStorage.setItem('user', JSON.stringify(data?.data.user));
      localStorage.setItem('currentWorkspaceId', JSON.stringify(data?.data.user.default_workspace_id));
      window.location.href = '/';
    }
  });

  useEffect(() => {
    if (inviteCode) {
      localStorage.setItem('teamMemberInviteCode', JSON.stringify(inviteCode));
    }

    // if (token) {
    //   setAcceptInviteTrigger(true);
    // }
  }, [inviteCode]);

  // const { data } = useAcceptTeamMemberInvite(acceptInviteTrigger);

  const handleAcceptInvite = async () => {
    await acceptInvite.mutateAsync({
      invite: inviteCode
    });
    // if (data?.data) {
    //   localStorage.setItem('user', JSON.stringify(data?.data.user));
    // }
  };

  // return !token ? (
  //   <RegisterPage />
  // ) : inviteCode ? (
  //   <main className="flex min-h-full flex-col bg-white mx-auto w-full max-w-7xl flex-grow justify-center px-4 sm:px-6 lg:px-8 text-center">
  //     <p className="mt-2 text-base text-gray-500">Click on this button to proceed into workspace</p>
  //     <div className="mt-6">
  //       <Button
  //         buttonStyle="primary"
  //         onClick={handleAcceptInvite}
  //         label={'Accept'}
  //         padding="py-2 px-4"
  //         height="h-10"
  //         width="w-40"
  //       />
  //     </div>
  //   </main>
  // ) : (
  //   <NotFoundPage />
  // );

  return inviteCode ? (
    token ? (
      <main className="flex min-h-full flex-col bg-white mx-auto w-full max-w-7xl flex-grow justify-center px-4 sm:px-6 lg:px-8 text-center">
        <ProgressBar />
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
