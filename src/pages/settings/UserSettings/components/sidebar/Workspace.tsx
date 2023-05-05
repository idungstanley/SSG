import React from 'react';
import { getWorkspaceService } from '../../../../../features/workspace/workspaceService';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { setActiveTab } from '../../../../../features/settings/user/userSettingsSlice';
import { cl } from '../../../../../utils';

function Workspace() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { activeTab, theme_color } = useAppSelector((state) => state.userSetting);
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
      onClick: () => {
        dispatch(setActiveTab('Teams'));
        navigate('team-members');
      }
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
            <h3 className="font-semibold text-gray-500" style={{ fontSize: '15px' }}>
              {setting.title}
            </h3>
          </div>
        );
      })}
    </div>
  );
}

export default Workspace;
