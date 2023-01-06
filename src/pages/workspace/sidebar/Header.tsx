import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { setShowSidebar } from '../../../features/workspace/workspaceSlice';
import ExpandedNav from '../../../views/ExpandedNav';
import Nav from '../nav/Nav';

interface configData {
  path: string;
  title: string;
  newd: string | null;
  Cleared: string | null;
  Assigned: string | null;
  buttonLabel: string | null;
}

const config: configData[] = [
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
  const { pathname } = useLocation();
  const headerData = config.find((i) => `/workspace${i.path}` === pathname);
  return (
    <div className="top-0 flex flex-shrink-0 bg-white shadow">
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
