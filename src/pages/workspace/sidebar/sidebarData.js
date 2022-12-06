/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
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
  { name: 'FAVOURITE' },
  { name: 'HUBS' },
  { name: 'INBOX' },
  { name: 'FILES' },
  { name: 'DASHBOARD' },
  { name: 'DIRECTORY' },
];
