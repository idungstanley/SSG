import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar';

function Index() {
  return (
    <main className="flex w-full overflow-y-scroll">
      <section className="w-2/12">
        <Sidebar />
      </section>
      <section className="w-10/12">
        <Outlet />
      </section>
    </main>
  );
}

export default Index;
