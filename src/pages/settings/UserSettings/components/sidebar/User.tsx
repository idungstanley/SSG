import React from 'react';
import { useAppSelector } from '../../../../../app/hooks';
import { cl } from '../../../../../utils';

interface username {
  userName: string | undefined;
}

function User({ userName }: username) {
  const { activeTab, theme_color } = useAppSelector((state) => state.userSetting);
  const userOptions = [
    {
      id: 1,
      title: 'My Settings'
    },
    {
      id: 2,
      title: 'Workspaces'
    },
    {
      id: 3,
      title: 'Notifications'
    },
    {
      id: 4,
      title: 'Reward'
    },
    {
      id: 5,
      title: 'Logout'
    },
    {
      id: 6,
      title: 'My Apps'
    },
    {
      id: 7,
      title: 'Time Clock'
    },
    {
      id: 8,
      title: 'Time Tracker'
    },
    {
      id: 9,
      title: 'Wiki Docs'
    }
  ];
  const userNameFormatted = userName ? userName.slice(0, 1).toUpperCase() + userName.slice(1) : '';
  return (
    <div>
      <div className="heading h-auto py-2 bg-gray-200 flex items-center px-6">
        <h1 className="font-bold" style={{ fontSize: '10px' }}>
          {userNameFormatted}
        </h1>
      </div>
      {userOptions.map((setting) => {
        return (
          <div
            key={setting.id}
            className={cl(
              activeTab === setting.title ? 'text-white' : '',
              'py-2 flex items-center px-6 hover:bg-gray-200 cursor-pointer'
            )}
            style={{ backgroundColor: activeTab === setting.title ? (theme_color as string) : '' }}
          >
            <h3 className="font-medium" style={{ fontSize: '10px' }}>
              {setting.title}
            </h3>
          </div>
        );
      })}
    </div>
  );
}

export default User;
