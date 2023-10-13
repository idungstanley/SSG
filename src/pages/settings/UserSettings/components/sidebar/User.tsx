import { useAppSelector, useAppDispatch } from '../../../../../app/hooks';
import { cl } from '../../../../../utils';
import { setActiveTab } from '../../../../../features/settings/user/userSettingsSlice';
import { useNavigate } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { useMutation } from '@tanstack/react-query';
import { displayPrompt } from '../../../../../features/general/prompt/promptSlice';
import { logoutService } from '../../../../../features/auth/authService';
import { setVisibility } from '../../../../../features/general/prompt/promptSlice';
import { setAuthData } from '../../../../../features/auth/authSlice';
import { logout } from '../../../../../features/auth/authSlice';
import { clearUserFromLS } from '../../../../../utils/ClearStorage';

function User() {
  const { activeTab, theme_color, userData } = useAppSelector((state) => state.userSetting);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userOptions = [
    {
      id: 'my_settings',
      title: 'My Settings',
      child: [
        {
          id: 'my_account',
          title: 'My Account',
          onClick: () => {
            dispatch(setActiveTab('My Account'));
            navigate('profile');
          }
        },
        {
          id: 'workspace_styles',
          title: 'Workspace Styles',
          onClick: () => {
            dispatch(setActiveTab('Workspace Styles'));
            navigate('construction');
          }
        },
        {
          id: 'hot_keys',
          title: 'HotKeys',
          onClick: () => {
            dispatch(setActiveTab('HotKeys'));
            navigate('construction');
          }
        },
        {
          id: 'themes',
          title: 'Themes',
          onClick: () => {
            dispatch(setActiveTab('Themes'));
            navigate('construction');
          }
        }
      ]
    },
    {
      id: 'workspaces',
      title: 'Workspaces',
      child: [
        {
          id: 'general_workspaces',
          title: 'General Workspaces',
          onClick: () => {
            dispatch(setActiveTab('General Workspaces'));
            navigate('workspaces');
          }
        },
        {
          id: 'workspace_settings',
          title: 'Workspace settings',
          onClick: () => {
            dispatch(setActiveTab('Workspace settings'));
            navigate('workspaces/settings');
          }
        }
      ]
    },
    {
      id: 'notifications',
      title: 'Notifications',
      child: [
        {
          id: 'general_information',
          title: 'General Information',
          onClick: () => {
            dispatch(setActiveTab('General Information'));
            navigate('notifications');
          }
        },
        {
          id: 'subscriber_settings',
          title: 'Subscriber Settings',
          onClick: () => {
            dispatch(setActiveTab('Subscriber Settings'));
            navigate('subscribers');
          }
        },
        {
          id: 'smart_notifications',
          title: 'Smart Notifications',
          onClick: () => {
            dispatch(setActiveTab('Smart Notifications'));
            navigate('construction');
          }
        }
      ]
    },
    {
      id: 'reward',
      title: 'Reward',
      onClick: () => {
        dispatch(setActiveTab('Reward'));
        navigate('construction');
      }
    },
    {
      id: 'logout',
      title: 'Logout',
      onClick: () => {
        dispatch(setActiveTab('Logout'));
        dispatch(
          displayPrompt('Sign out', 'Would you like to sign out of your account?', [
            {
              label: 'Sign out',
              style: 'danger',
              callback: () => {
                logoutMutation.mutate();
              }
            },
            {
              label: 'Cancel',
              style: 'plain',
              callback: () => {
                dispatch(setVisibility(false));
              }
            }
          ])
        );
      }
    },
    {
      id: 'time_clock',
      title: 'Time Clock',
      category: 'my_app',
      onClick: () => {
        dispatch(setActiveTab('Time Clock'));
        navigate('construction');
      }
    },
    {
      id: 'time_tracker',
      title: 'Time Tracker',
      category: 'my_app',
      onClick: () => {
        dispatch(setActiveTab('Time Tracker'));
        navigate('construction');
      }
    },
    {
      id: 'wiki_docs',
      title: 'Wiki Docs',
      category: 'my_app',
      onClick: () => {
        dispatch(setActiveTab('Wiki Docs'));
        navigate('construction');
      }
    }
  ];

  const logoutMutation = useMutation(logoutService, {
    onSuccess: () => {
      dispatch(setVisibility(false));

      clearUserFromLS();

      dispatch(
        setAuthData({
          user: null,
          accessToken: null,
          currentWorkspaceId: null,
          currentUserId: null
        })
      );

      dispatch(logout());
      navigate('/');
    }
  });

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
            {setting.child ? (
              <Disclosure>
                {({ open }) => (
                  <div className={cl('cursor-pointer text-gray-500')}>
                    <Disclosure.Button
                      className="flex justify-between items-center w-full font-semibold text-bold hover:bg-gray-200 pl-6 h-10"
                      style={{ fontSize: '15px' }}
                    >
                      {setting.title}
                      <ChevronRightIcon className={cl(open ? 'rotate-90 transform' : '', 'w-6 h-6')} />
                    </Disclosure.Button>
                    <Disclosure.Panel>
                      {setting.child.map((children) => {
                        return (
                          <div
                            key={children.id}
                            className={cl(
                              'h-10 flex items-center justify-between pl-10 hover:bg-gray-200 cursor-pointer'
                            )}
                            style={{
                              backgroundColor: activeTab === children.title ? '#BF00FF21' : ''
                            }}
                            onClick={children.onClick}
                          >
                            <h3 className="font-semibold text-bold" style={{ fontSize: '15px' }}>
                              {children.title}
                            </h3>
                          </div>
                        );
                      })}
                    </Disclosure.Panel>
                  </div>
                )}
              </Disclosure>
            ) : (
              <div>
                {setting.category !== 'my_app' && (
                  <>
                    <div
                      className={cl(
                        'text-gray-500',
                        'h-10 flex items-center justify-between px-6 hover:bg-gray-200 cursor-pointer'
                      )}
                      style={{
                        backgroundColor: activeTab === setting.title ? '#BF00FF21' : ''
                      }}
                      onClick={setting.onClick}
                    >
                      <h3 className="font-semibold text-bold" style={{ fontSize: '15px' }}>
                        {setting.title}
                      </h3>
                    </div>
                  </>
                )}
              </div>
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
