import React from 'react';
import { useAppSelector, useAppDispatch } from '../../../../../app/hooks';
import { cl } from '../../../../../utils';
import { setActiveTab } from '../../../../../features/settings/user/userSettingsSlice';
import { useNavigate } from 'react-router-dom';

function User() {
  const { activeTab, theme_color, userData } = useAppSelector((state) => state.userSetting);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userOptions = [
    {
      id: 1,
      title: 'My Settings',
      onClick: () => {
        dispatch(setActiveTab('My Settings'));
        navigate('profile');
      }
    },
    {
      id: 2,
      title: 'Workspaces',
      onClick: () => {
        dispatch(setActiveTab('Workspaces'));
        navigate('construction');
      }
    },
    {
      id: 3,
      title: 'Notifications',
      onClick: () => {
        dispatch(setActiveTab('Notifications'));
        navigate('notifications');
      }
    },
    {
      id: 4,
      title: 'Reward',
      onClick: () => {
        dispatch(setActiveTab('Reward'));
        navigate('construction');
      }
    },
    {
      id: 5,
      title: 'Logout',
      onClick: () => {
        dispatch(setActiveTab('Logout'));
        navigate('construction');
      }
    },
    {
      id: 7,
      title: 'Time Clock',
      category: 'my_app',
      onClick: () => {
        dispatch(setActiveTab('Time Clock'));
        navigate('construction');
      }
    },
    {
      id: 8,
      title: 'Time Tracker',
      category: 'my_app',
      onClick: () => {
        dispatch(setActiveTab('Time Tracker'));
        navigate('construction');
      }
    },
    {
      id: 9,
      title: 'Wiki Docs',
      category: 'my_app',
      onClick: () => {
        dispatch(setActiveTab('Wiki Docs'));
        navigate('construction');
      }
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
          <>
            {setting.category !== 'my_app' && (
              <div
                key={setting.id}
                className={cl(
                  activeTab === setting.title ? 'opacity-50 text-black' : 'text-gray-500',
                  'h-10 flex items-center px-6 hover:bg-gray-200 cursor-pointer'
                )}
                style={{
                  backgroundColor: activeTab === setting.title ? (theme_color as string) : ''
                }}
                onClick={setting.onClick}
              >
                <h3 className="font-semibold text-bold" style={{ fontSize: '15px' }}>
                  {setting.title}
                </h3>
              </div>
            )}
          </>
        );
      })}
      <div className="heading h-14 bg-gray-200 flex items-center px-6">
        <h1 className="font-bold" style={{ fontSize: '15px' }}>
          MY APPS
        </h1>
      </div>
      {userOptions.map((setting) => {
        return (
          <>
            {setting.category === 'my_app' && (
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
            )}
          </>
        );
      })}
    </div>
  );
}

export default User;
