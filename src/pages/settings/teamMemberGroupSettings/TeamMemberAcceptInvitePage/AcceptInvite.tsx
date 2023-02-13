import React from 'react';
import { Button } from '../../../../components';

interface AcceptInviteProps {
  user: {
    avatar_path: string | null;
    colour: string;
    default_workspace_id: string | null;
    email: string;
    initials: string;
    name: string;
    timezone: string;
  };
}

export default function AcceptInvite({ user }: AcceptInviteProps) {
  const handleAcceptInvite = () => {
    localStorage.setItem('user', JSON.stringify(user));
    window.location.href = '/workspace';
  };
  return (
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
  );
}
