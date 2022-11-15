/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import { HomeIcon } from '@heroicons/react/outline';
import { NotificationOutlined, RocketFilled } from '@ant-design/icons';

export const menuItems = [
  { path: '/workspace/home', name: 'Home', icon: <HomeIcon /> },
  {
    path: '/workspace/notification',
    name: 'Notifications',
    icon: <NotificationOutlined />,
  },
  { path: '/workspace/community', name: 'Community', icon: <RocketFilled /> },
];

export const dropDownMenus = [
  { path: '/workspace/favourite', name: 'FAVOURITE' },
  { path: '/workspace/hubs', name: 'HUBS' },
  { path: '/workspace/inbox', name: 'INBOX' },
  { path: '/workspace/files', name: 'FILES' },
  { path: '/workspace/dashboard', name: 'DASHBOARD' },
  { path: '/workspace/directory', name: 'DIRECTORY' },
];
