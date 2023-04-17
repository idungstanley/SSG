import React from 'react';
import { getWorkspaceService } from '../../../../../features/workspace/workspaceService';

function Workspace() {
  const workspaceOptions = [
    {
      id: 1,
      title: 'Settings'
    },
    {
      id: 2,
      title: 'People'
    },
    {
      id: 3,
      title: 'Teams'
    },
    {
      id: 4,
      title: 'Spaces'
    },
    {
      id: 5,
      title: 'Imports/Exports'
    },
    {
      id: 6,
      title: 'Apps'
    },
    {
      id: 7,
      title: 'Integrations'
    },
    {
      id: 8,
      title: 'Upgrade'
    },
    {
      id: 9,
      title: 'Trash'
    },
    {
      id: 10,
      title: 'Security & Permissions'
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
            className="h-10 flex items-center px-6 hover:bg-gray-200 cursor-pointer border-b border-gray-300"
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
