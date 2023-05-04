import React from 'react';
import { AvatarWithInitials } from '../../../components';
import notificationFrame from '../../../assets/branding/notificationFrame.png';

function WorkspaceSettings() {
  return (
    <main className="flex-1 h-full overflow-y-scroll pb-10 px-4 sm:px-6 lg:px-6 bg-white w-full">
      <div
        className="mt-5 flex items-center rounded-t-md pl-5"
        style={{ backgroundImage: `url(${notificationFrame})`, height: '122px' }}
      ></div>
      <section className="-mt-12 w-11/12 m-auto flex justify-between items-end">
        <div className="flex items-end">
          <AvatarWithInitials initials={'NS'} backgroundColour={'red'} height="h-24" width="w-24" />
          <h3 className="font-medium" style={{ fontSize: '15px' }}>
            ELASTIC WORKSPACE
          </h3>
        </div>
        <div>
          <button className="p-1 rounded text-sm border border-gray-500 mx-2 w-16 h-8">Cancel</button>
          <button
            className="p-1 rounded text-sm border border-gray-500 mx-2 text-white w-16 h-8"
            style={{ backgroundColor: '#BF00FF' }}
          >
            Save
          </button>
        </div>
      </section>
    </main>
  );
}
export default WorkspaceSettings;
