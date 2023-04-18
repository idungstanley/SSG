import React from 'react';
import Header from '../../../../../layout/components/MainLayout/Sidebar/components/Header/index';
import Workspace from './Workspace';
import { Outlet } from 'react-router-dom';
import User from './User';

function SideBarSettings() {
  return (
    <section className="flex">
      <section style={{ height: '100vh' }} className="w-1/5 bg-white h-screen border-r-2 border-gray-300 overflow-auto">
        <section>
          <Header />
        </section>
        <section>
          <Workspace />
        </section>
        <section>
          <User />
        </section>
      </section>
      {/* outlets */}
      <div style={{ height: '100vh' }} className="w-4/5 h-screen bg-gray-200 flex">
        <Outlet />
      </div>
    </section>
  );
}

export default SideBarSettings;
