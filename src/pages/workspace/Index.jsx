import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar';

function Index() {
  return (
    <main className="flex w-full">
      <section>
        <Sidebar />
      </section>
      <Outlet />
    </main>
  );
}

export default Index;
