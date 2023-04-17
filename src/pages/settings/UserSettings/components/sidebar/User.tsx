import React from 'react';
import { useAppSelector } from '../../../../../app/hooks';
import { cl } from '../../../../../utils';

function User() {
  const { activeTab, theme_color, userData } = useAppSelector((state) => state.userSetting);
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

  const userNameFormatted = userData?.name ? userData?.name.slice(0, 1).toUpperCase() + userData?.name.slice(1) : '';
  return (
    <div>
      <div className="heading h-14 bg-gray-200 flex items-center px-6">
        <h1 className="font-bold" style={{ fontSize: '15px' }}>
          {userNameFormatted.toUpperCase()}
        </h1>
      </div>
      {userOptions.map((setting) => {
        return (
          <div
            key={setting.id}
            className={cl(
              activeTab === setting.title ? 'opacity-50 text-black' : 'text-gray-500',
              'h-10 flex items-center px-6 hover:bg-gray-200 cursor-pointer'
            )}
            style={{
              backgroundColor: activeTab === setting.title ? (theme_color as string) : ''
            }}
          >
            <h3 className="font-semibold text-bold" style={{ fontSize: '15px' }}>
              {setting.title}
            </h3>
          </div>
        );
      })}
    </div>
  );
}

export default User;
