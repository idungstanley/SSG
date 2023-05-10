import React from 'react';
import { getWorkspaceService } from '../../../../../features/workspace/workspaceService';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { setActiveTab } from '../../../../../features/settings/user/userSettingsSlice';
import { cl } from '../../../../../utils';
import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

function Workspace() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { activeTab } = useAppSelector((state) => state.userSetting);
  const workspaceOptions = [
    {
      id: 1,
      title: 'Settings',
      onClick: () => {
        dispatch(setActiveTab('Settings'));
        navigate('construction');
      }
    },
    {
      id: 2,
      title: 'People',
      onClick: () => {
        dispatch(setActiveTab('People'));
        navigate('construction');
      }
    },
    {
      id: 3,
      title: 'Teams',
      child: [
        {
          id: 1,
          title: 'Team Members',
          onClick: () => {
            dispatch(setActiveTab('Team Members'));
            navigate('team-members');
          }
        },
        {
          id: 2,
          title: 'Team Member Invites',
          onClick: () => {
            dispatch(setActiveTab('Team Member Invites'));
            navigate('team-members/invites');
          }
        },
        {
          id: 3,
          title: 'Team Member Groups',
          onClick: () => {
            dispatch(setActiveTab('Team Member Groups'));
            navigate('team-members/groups');
          }
        },
        {
          id: 4,
          title: 'Permissions',
          onClick: () => {
            dispatch(setActiveTab('Permissions'));
            navigate('construction');
          }
        }
      ]
    },
    {
      id: 4,
      title: 'Spaces',
      onClick: () => {
        dispatch(setActiveTab('Spaces'));
        navigate('construction');
      }
    },
    {
      id: 5,
      title: 'Imports/Exports',
      onClick: () => {
        dispatch(setActiveTab('Imports/Exports'));
        navigate('construction');
      }
    },
    {
      id: 6,
      title: 'Apps',
      onClick: () => {
        dispatch(setActiveTab('Apps'));
        navigate('construction');
      }
    },
    {
      id: 7,
      title: 'Integrations',
      onClick: () => {
        dispatch(setActiveTab('Integrations'));
        navigate('construction');
      }
    },
    {
      id: 8,
      title: 'Upgrade',
      onClick: () => {
        dispatch(setActiveTab('Upgrade'));
        navigate('construction');
      }
    },
    {
      id: 9,
      title: 'Trash',
      onClick: () => {
        dispatch(setActiveTab('Trash'));
        navigate('construction');
      }
    },
    {
      id: 10,
      title: 'Security & Permissions',
      onClick: () => {
        dispatch(setActiveTab('Security & Permissions'));
        navigate('construction');
      }
    }
  ];

  // Get current workspace name
  const { data: workSpaceData } = getWorkspaceService();

  return (
    <div>
      <div className="heading h-14 bg-gray-200 flex items-center px-6">
        <h1 className="font-bold" style={{ fontSize: '15px' }}>
          {workSpaceData?.data.workspace.name?.toUpperCase()}
        </h1>
      </div>
      {workspaceOptions.map((setting) => {
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
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Workspace;
