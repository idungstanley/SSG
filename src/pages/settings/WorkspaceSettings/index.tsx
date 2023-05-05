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
      <table className="table-auto border-collapse border border-slate-400 mt-10 w-10/12 m-auto rounded">
        <thead className="bg-gray-200 py-3 h-16">
          <tr className="border border-slate-300 py-3">
            <th className="font-medium text-black text-center py-3" style={{ fontSize: '15px' }}>
              WORKSPACE
            </th>
            <th className="font-medium text-black text-center py-3" style={{ fontSize: '15px' }}>
              AVATAR
            </th>
            <th className="font-medium text-black text-center py-3" style={{ fontSize: '15px' }}>
              LAST TIME VISITED
            </th>
            <th className="font-medium text-black text-center py-3" style={{ fontSize: '15px' }}>
              DATE CREATED
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border border-slate-300 hover:bg-fuchsia-200 cursor-pointer">
            <td className="text-center py-3">ELASTIC GROUP</td>
            <td className="text-center py-3">
              <AvatarWithInitials initials={'NS'} backgroundColour={'red'} height="h-10" width="w-10" />
            </td>
            <td className="text-center py-3">13 HOURS AGO</td>
            <td className="text-center py-3">10/12/2023</td>
          </tr>
          <tr className="hover:bg-fuchsia-200 cursor-pointer">
            <td className="text-center py-3">ALSO WORKSPACE</td>
            <td className="text-center py-3">
              <AvatarWithInitials initials={'AW'} backgroundColour={'blue'} height="h-10" width="w-10" />
            </td>
            <td className="text-center py-3">2 DAYS AGO</td>
            <td className="text-center py-3">10/12/2023</td>
          </tr>
        </tbody>
      </table>

      <br />
    </main>
  );
}
export default WorkspaceSettings;
