import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import NewSidebar from './sidebar/NewSidebar';
import Header from './sidebar/Header';
// import Sidebar from './sidebar/Sidebar';

function Index() {
  const { showSidebar } = useSelector((state) => state.workspace);

  return (
    <div>
      <NewSidebar />
      {/* <Sidebar /> */}
      <div className={`flex flex-1 flex-col ${showSidebar ? 'pl-64' : ''}`}>
        <Header />
        <main className="flex-1">
          <div
            className={`py-6 mx-auto px-4 sm:px-6 ${showSidebar ? 'px-8' : ''}`}
          >
            <div className="py-4">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Index;
