import React from 'react';
import Wrapper from '..';
import Help from '../Help';
import { useNavigate } from 'react-router-dom';
import SendIcon from '../../../../../assets/icons/SendIcon';

function EmailSentPage() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <div className="relative mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex flex-col px-4 py-8 bg-white shadow-lg sm:rounded-lg sm:px-10 gap-7">
          <h2 className="text-2xl font-bold text-center">Recovery link sent!</h2>
          <div className="w-full flex justify-center">
            <SendIcon />
          </div>
          <h2 className="text-2xl font-medium text-center">
            If an account exists with this email address, we will send an email with instructions to reset your
            password.
          </h2>
          <button className="text-primary-600" onClick={() => navigate('/auth/login')}>
            Or Sign in
          </button>
        </div>
        <Help />
      </div>
    </Wrapper>
  );
}

export default EmailSentPage;
