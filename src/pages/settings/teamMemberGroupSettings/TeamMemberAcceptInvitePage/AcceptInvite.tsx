import React from 'react';
import { Button } from '../../../../components';

export default function AcceptInvite() {
  const handleAcceptInvite = () => {
    window.location.href = '/workspace';
  };
  return (
    <main className="flex min-h-full flex-col bg-white mx-auto w-full max-w-7xl flex-grow justify-center px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        Click on the button to proceed into workspace
      </h1>
      {/* <p className="mt-2 text-base text-gray-500">
        Sorry, we couldn’t find the page you’re looking for.
      </p> */}
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
