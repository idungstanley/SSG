import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../../app/hooks';
import { cl } from '../../../../../utils';
import { setActiveTab } from '../../../../../features/settings/user/userSettingsSlice';
import { useNavigate } from 'react-router-dom';
import { MdKeyboardArrowDown } from 'react-icons/md';

function User() {
  const { activeTab, theme_color, userData } = useAppSelector((state) => state.userSetting);
  const [isVisible, setIsVisible] = useState(false);
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
        navigate('workspaces');
      }
    },
    {
      id: 3,
      title: 'Notifications',
      onClick: () => {
        dispatch(setActiveTab('Notifications'));
        navigate('notifications');
      },
      child: [
        {
          id: 1,
          title: 'General Information',
          onClick: () => {
            navigate('notifications/general');
          }
        },
        {
          id: 2,
          title: 'Subscriber Settings',
          onClick: () => {
            navigate('notifications/subscriber');
          }
        },
        {
          id: 3,
          title: 'Smart Notifications',
          onClick: () => {
            navigate('notifications/smart');
          }
        }
      ]
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
          <div key={setting.id}>
            {setting.category !== 'my_app' && (
              <>
                <div
                  className={cl(
                    activeTab === setting.title ? 'opacity-50 text-black' : 'text-gray-500',
                    'h-10 flex items-center justify-between px-6 hover:bg-gray-200 cursor-pointer'
                  )}
                  style={{
                    backgroundColor: activeTab === setting.title ? (theme_color as string) : ''
                  }}
                  onClick={setting.onClick}
                >
                  <h3 className="font-semibold text-bold" style={{ fontSize: '15px' }}>
                    {setting.title}
                  </h3>
                  {setting.child ? (
                    <MdKeyboardArrowDown
                      style={{ height: '20px', width: '20px' }}
                      onClick={() => setIsVisible(!isVisible)}
                    />
                  ) : null}
                </div>

                {/* this carries child */}
                <section>
                  {isVisible &&
                    setting?.child?.map((children) => (
                      <div
                        key={children.id}
                        className={cl(
                          activeTab === setting.title ? 'opacity-50 text-black' : 'text-gray-500',
                          'h-10 flex items-center px-6 hover:bg-gray-200 cursor-pointer  border-b-2 border-gray-200'
                        )}
                        style={{
                          backgroundColor: activeTab === setting.title ? (theme_color as string) : ''
                        }}
                      >
                        <h3 className="font-semibold text-bold" style={{ fontSize: '15px', paddingLeft: '15px' }}>
                          {children.title}
                        </h3>
                      </div>
                    ))}
                </section>
              </>
            )}
          </div>
        );
      })}
      <div className="heading h-14 bg-gray-200 flex items-center px-6">
        <h1 className="font-bold" style={{ fontSize: '15px' }}>
          MY APPS
        </h1>
      </div>
      {userOptions.map((setting) => {
        return (
          <div key={setting.id}>
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
          </div>
        );
      })}
    </div>
  );
}

export default User;
