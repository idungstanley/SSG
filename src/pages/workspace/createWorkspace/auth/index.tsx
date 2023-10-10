import React, { memo, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AlsoitIcon from '../../../../assets/icons/AlsoitIcon';
import ProgressBar from '../../../../layout/components/MainLayout/ProgressBar';
import { Toaster } from 'react-hot-toast';

const data = [
  {
    massage: "Don't have an account?",
    link: '/auth/register',
    title: 'Sign Up'
  },
  {
    massage: 'Already have an account?',
    link: '/auth/login',
    title: 'Sign In'
  }
];

interface WrapperProps {
  children: ReactNode;
}

function Wrapper({ children }: WrapperProps) {
  const { pathname } = useLocation();

  const isSignUpPath = pathname.split('/')[2] === 'signup';
  const selectedData = data[isSignUpPath ? 1 : 0];

  return (
    <div className="min-h-full relative flex items-center justify-center">
      <ProgressBar />
      {/* <TopMenu /> */}
      <Toaster position="bottom-left" />
      <div className="flex justify-between p-6 absolute top-0 left-0 right-0">
        <div className="flex items-center gap-3">
          <AlsoitIcon />
          <h2 className="hidden sm:block text-xl font-bold tracking-tight text-gray-900">ALSOIT.IO</h2>
        </div>
        <div className="flex items-center gap-3">
          <p className="hidden sm:block whitespace-nowrap">{selectedData.massage}</p>
          <Link
            to={selectedData.link}
            className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            {selectedData.title}
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
}

export default memo(Wrapper);
