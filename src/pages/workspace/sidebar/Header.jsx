import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setShowSidebar } from '../../../features/workspace/workspaceSlice';
import Nav from '../nav/Nav';

const config = [
  {
    path: '',
    title: 'Home',
    newd: null,
    Cleared: null,
    Assigned: 'Agenda',
    buttonLabel: 'Calendar',
  },
  {
    path: '/notification',
    title: 'Notification',
    newd: 'New',
    Cleared: 'Clear',
    Assigned: 'Assigned to me',
    buttonLabel: 'All',
  },
  {
    path: '/community',
    title: 'Community',
    newd: null,
    Cleared: null,
    Assigned: 'Agenda',
    buttonLabel: 'Calendar',
  },
  {
    path: '/goals',
    title: '',
    newd: null,
    Cleared: null,
    Assigned: null,
    buttonLabel: null,
  },
  {
    path: '/inbox',
    title: 'Inbox',
    newd: null,
    Cleared: null,
    Assigned: 'Agenda',
    buttonLabel: 'Calendar',
  },
];

export default function Header() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { showSidebar } = useSelector((state) => state.workspace);

  const headerData = config.find((i) => `/workspace${i.path}` === pathname);

  return (
    <div className="top-0 flex flex-shrink-0 bg-white shadow">
      {!showSidebar ? (
        <button
          type="button"
          className="border-r px-4 text-gray-500 focus:outline-none ring-0 focus:ring-0"
          onClick={() => dispatch(setShowSidebar(true))}
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
            />
          </svg>
        </button>
      ) : null}
      {headerData ? (
        <div className="flex-1">
          <Nav
            navName={headerData.title}
            newd={headerData.newd}
            Cleared={headerData.Cleared}
            buttonLabel={headerData.buttonLabel}
            Assigned={headerData.Assigned}
          />
        </div>
      ) : null}
    </div>
  );
}
