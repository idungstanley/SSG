import React from 'react';
import { useLocation } from 'react-router-dom';
import Nav from '../../../../../pages/workspace/nav/Nav';

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
    path: '/',
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
    title: 'Goals',
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
  {
    path: '/dashboard',
    title: 'Dashboard',
    newd: null,
    Cleared: null,
    Assigned: 'Agenda',
    buttonLabel: 'Calendar',
  },
  {
    path: '/calendar',
    title: 'Calendar',
    newd: null,
    Cleared: null,
    Assigned: 'Agenda',
    buttonLabel: 'Calendar',
  },
  {
    path: '/favorites',
    title: 'Favorites',
    newd: null,
    Cleared: null,
    Assigned: 'Agenda',
    buttonLabel: 'Calendar',
  },
];

export default function Header() {
  const { pathname } = useLocation();
  const headerData = config.find((i) => `${i.path}` === pathname);

  return headerData ? (
    <div className="flex-1 border-b" style={{ height: '60px' }}>
      <Nav
        navName={headerData.title}
        newd={headerData.newd}
        Cleared={headerData.Cleared}
        buttonLabel={headerData.buttonLabel}
        Assigned={headerData.Assigned}
      />
    </div>
  ) : null;
}
