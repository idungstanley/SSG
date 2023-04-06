import React from 'react';

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

  return (
    <div>
      <div className="heading h-auto py-2 bg-gray-200 flex items-center px-6">
        <h1 className="font-bold" style={{ fontSize: '10px' }}>
          ELASTIC GROUP WORKSPACE
        </h1>
      </div>
      {workspaceOptions.map((setting) => {
        return (
          <div
            key={setting.id}
            className="py-1 border-b border-gray-400 flex items-center px-6 hover:bg-gray-200 cursor-pointer"
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

export default Workspace;
