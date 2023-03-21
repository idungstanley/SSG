import React from 'react';
import CurrentUser from './components/CurrentUser';
import SettingsGrid from './components/SettingsGrid';

export default function UserSettingsProfile() {
  return (
    <section className="p-14">
      <div className="mb-4" role="heading">
        <h4 style={{ fontSize: '18px' }} role="heading" className="font-extrabold">
          My Settings
        </h4>
      </div>
      <section role="gridcell" className="grid grid-cols-10 gap-4">
        <div className="col-span-1 bg-gray-100 h-screen/5">
          <CurrentUser />
        </div>
        <div className="col-span-9 bg-gray-200 h-screen/5">
          <SettingsGrid />
        </div>
      </section>
    </section>
  );
}
