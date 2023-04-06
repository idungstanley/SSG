import React from 'react';

function User() {
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

  return (
    <div>
      <div className="heading h-auto py-2 bg-gray-200 flex items-center px-6">
        <h1 className="font-bold" style={{ fontSize: '10px' }}>
          SALIFU NURUDEEN
        </h1>
      </div>
      {userOptions.map((setting) => {
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

export default User;
