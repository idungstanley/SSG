import React, { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import MainLogo from '../../assets/branding/main-logo.png';

const data = [
  {
    massage: "Don't have an account?",
    link: '/auth/register',
    title: 'Sign Up',
  },
  {
    massage: 'Already have an account?',
    link: '/auth/login',
    title: 'Sign In',
  },
];

function Wrapper({ children }) {
  const { pathname } = useLocation();
  const isSignIn = pathname.split('/')[2] === 'login' ? 0 : 1;

  return (
    <div className="min-h-full relative flex items-center justify-center">
      <div className="flex justify-between p-6 absolute top-0 left-0 right-0">
        <div className="flex items-center gap-3">
          <img className="mx-auto h-10 w-auto" src={MainLogo} alt="Workflow" />
          <h2 className="hidden sm:block text-xl font-bold tracking-tight text-gray-900">
            ALSO WORKSPACE
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <p className="hidden sm:block whitespace-nowrap">{data[isSignIn].massage}</p>
          <Link
            to={data[isSignIn].link}
            className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            {data[isSignIn].title}
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
}

export default memo(Wrapper);

Wrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
