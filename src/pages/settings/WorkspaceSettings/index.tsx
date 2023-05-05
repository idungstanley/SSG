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
      <table className="table-auto border-collapse  border border-slate-400 mt-10 m-auto" style={{ width: '1250px' }}>
        <thead className="bg-gray-200" style={{ height: '60px' }}>
          <tr className="border border-slate-300 ">
            <th className="font-medium text-black   " style={{ fontSize: '15px' }}>
              WORKSPACE
            </th>
            <th className="font-medium text-black" style={{ fontSize: '15px' }}>
              AVATAR
            </th>
            <th className="font-medium text-black" style={{ fontSize: '15px' }}>
              LAST TIME VISITED
            </th>
            <th className="font-medium text-black " style={{ fontSize: '15px' }}>
              DATE CREATED
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border border-slate-300 hover:bg-fuchsia-200 " style={{ height: '60px' }}>
            <td>ELASTIC GROUP</td>
            <td>
              <AvatarWithInitials initials={'NS'} backgroundColour={'red'} height="h-10" width="w-10" />
            </td>
            <td> 13 HOURS AGO</td>
            <td>10/12/2023</td>
          </tr>
          <tr className="hover:bg-fuchsia-200" style={{ height: '60px' }}>
            <td>ALSO WORKSPACE</td>
            <td>
              <AvatarWithInitials initials={'AW'} backgroundColour={'blue'} height="h-10" width="w-10" />
            </td>
            <td> 2 DAYS AGO</td>
            <td>10/12/2023</td>
          </tr>
        </tbody>
        {/* </div> */}
        {/* <div
          className="flex items-end m-auto justify-between  border-2 items-center hover:bg-fuchsia-200"
          style={{ height: '60px', width: '1250px' }}
        > */}
        {/* <div className="font-medium text-black p-6" style={{ fontSize: '15px' }}>
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
        </div> */}
      </table>
    </main>
  );
}
export default WorkspaceSettings;
