import React, { memo, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MainLogo from '../../../../assets/branding/main-logo.png';

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

  const isSignInPath = pathname.split('/')[2] === 'login';
  const selectedData = data[isSignInPath ? 0 : 1];

  return (
    <div className="min-h-full relative flex items-center justify-center">
      <div className="flex justify-between p-6 absolute top-0 left-0 right-0">
        <div className="flex items-center gap-3">
          <img className="mx-auto h-10 w-auto" src={MainLogo} alt="Workflow" />
          <h2 className="hidden sm:block text-xl font-bold tracking-tight text-gray-900">ALSO WORKSPACE</h2>
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
