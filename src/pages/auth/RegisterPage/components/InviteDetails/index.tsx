import React from 'react';
import { useParams } from 'react-router-dom';
import { InformationCircleIcon, XCircleIcon } from '@heroicons/react/solid';
import { useGetInviteByCode } from '../../../../../features/auth/authService';
import { Spinner } from '../../../../../common';

export default function InviteDetails() {
  const { inviteCode } = useParams();
  const { status, data } = useGetInviteByCode(inviteCode);

  if (inviteCode == null) {
    return null;
  }

  return status === 'loading' ? (
    <Spinner size={8} color="#0F70B7" />
  ) : (status === 'success' ? (
    <div className="rounded-md bg-blue-50 p-4 mt-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-blue-800">
            You have been invited to
            &quot;
            {data.data.team_member_invite.workspace.name}
            &quot;
          </h3>
          <div className="mt-2 text-sm text-blue-700">
            <p>
              By registering, you are accepting the invite to join their workspace. You must register with the same email as the invite:
              {' '}
              {data.data.team_member_invite.email}
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="rounded-md bg-red-50 p-4 mt-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">This invite is no longer valid.</h3>
        </div>
      </div>
    </div>
  ));
}
