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
      <div className="  m-auto shadow-xl" style={{ width: '1250px' }}>
        <div
          className="flex items-end m-auto justify-between mt-10 border-2 items-center bg-gray-200"
          style={{ height: '60px', width: '1250px' }}
        >
          <div className="font-medium text-black p-6" style={{ fontSize: '15px' }}>
            WORKSPACE
          </div>
          <div className="font-medium text-black" style={{ fontSize: '15px' }}>
            AVATAR
          </div>
          <div className="font-medium text-black" style={{ fontSize: '15px' }}>
            LAST TIME VISITED
          </div>
          <div className="font-medium text-black p-6" style={{ fontSize: '15px' }}>
            DATE CREATED
          </div>
        </div>
        <div
          className="flex items-end m-auto justify-between  border-2 items-center hover:bg-fuchsia-200"
          style={{ height: '60px', width: '1250px' }}
        >
          <div className="font-medium text-black p-6" style={{ fontSize: '15px' }}>
            ELASTIC GROUP
          </div>
          <div className="font-medium text-black mr-8" style={{ fontSize: '15px' }}>
            <AvatarWithInitials initials={'NS'} backgroundColour={'red'} height="h-10" width="w-10" />
          </div>
          <div className="font-medium text-black mr-14" style={{ fontSize: '15px' }}>
            13 HOURS AGO
          </div>
          <div className="font-medium text-black p-6  mr-4" style={{ fontSize: '15px' }}>
            10/12/2023
          </div>
        </div>
        <div
          className="flex items-end m-auto justify-between  border-2 items-center hover:bg-fuchsia-200"
          style={{ height: '60px', width: '1250px' }}
        >
          <div className="font-medium text-black p-6" style={{ fontSize: '15px' }}>
            ALSO WORKSPACE
          </div>
          <div className="font-medium text-black -ml-14" style={{ fontSize: '15px' }}>
            <AvatarWithInitials initials={'AW'} backgroundColour={'blue'} height="h-10" width="w-10" />
          </div>
          <div className="font-medium text-black mr-10 " style={{ fontSize: '15px' }}>
            2 DAYS AGO
          </div>
          <div className="font-medium text-black p-6  mr-4" style={{ fontSize: '15px' }}>
            10/12/2023
          </div>
        </div>
      </div>
    </main>
  );
}
export default WorkspaceSettings;
