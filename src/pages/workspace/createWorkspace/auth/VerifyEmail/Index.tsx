import React from 'react';
import Wrapper from '..';
import ProgressBar from '../../../../../layout/components/MainLayout/ProgressBar';
import { Button } from '../../../../../components';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useVerifyEmailService } from '../../../../../features/auth/authService';

function VerifyEmail() {
  const { verificationCode } = useParams();
  const navigate = useNavigate();

  const verifyEmail = useMutation(useVerifyEmailService, {
    onSuccess: () => {
      navigate('/');
    }
  });

  const handleAcceptInvite = async () => {
    await verifyEmail.mutateAsync({
      verificationCode
    });
  };

  return (
    <Wrapper>
      <main className="flex flex-col justify-center flex-grow w-full min-h-full px-4 mx-auto text-center bg-white max-w-7xl sm:px-6 lg:px-8">
        <ProgressBar />
        <p className="mt-2 text-base text-gray-500">Click on this button to verify your email</p>
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
    </Wrapper>
  );
}

export default VerifyEmail;
