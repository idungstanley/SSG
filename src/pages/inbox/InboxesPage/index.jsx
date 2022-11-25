import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import PinnedInboxes from './components/PinnedInboxes';
import CreateInboxSlideOver from './components/CreateInboxSlideOver';
import Tabs from './components/Tabs';

function InboxDashboard() {
  return (
    <>
      <div className="h-full flex flex-1 flex-col w-full bg-white overflow-hidden">
        <Header />
        <div className="flex-1 h-full overflow-y-scroll">
          <PinnedInboxes />
          <Tabs />
          <Outlet />
        </div>
      </div>
      <CreateInboxSlideOver />
    </>
  );
}

export default InboxDashboard;
