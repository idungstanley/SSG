import React from 'react';
import CurrentUser from './components/CurrentUser';
import SettingsGrid from './components/SettingsGrid';

export default function UserSettingsProfile() {
  return (
    <section className="p-14 overflow-auto" style={{ height: '90vh' }}>
      <div className="mb-8" role="heading">
        <h4 style={{ fontSize: '18px' }} role="heading" className="font-extrabold">
          My Settings
        </h4>
      </div>
      <section role="gridcell" className="grid grid-cols-10 gap-4 overflow-y-auto">
        <div className="col-span-1  h-screen/5">
          <CurrentUser />
        </div>
        <div className="col-span-9 h-screen/5">
          <SettingsGrid />
        </div>
      </section>
      <div className="bg-white flex items-center h-20 fixed bottom-0 w-full">
        <button className="flex justify-end bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded">
          Save Changes
        </button>
      </div>
    </section>
  );
}
