import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar';
import Header from './sidebar/Header';
import UploadModal from '../../components/UploadModal';
// import Chat from '../../components/Chat';

function Index() {
  const { showSidebar } = useAppSelector((state) => state.workspace);

  return (
    <>
      <UploadModal />
      <Sidebar />
      <div className="flex h-full w-full">
        <div className={`flex flex-1 flex-col ${showSidebar ? 'pl-64' : ''}`}>
          <Header />
          <main className="flex-1">
            <div
              className={`py-6 mx-auto px-4 sm:px-6 ${
                showSidebar ? 'px-8' : ''
              }`}
            >
              <Outlet />
            </div>
          </main>
        </div>
        {/* <Chat /> */}
      </div>
    </>
  );
}

export default Index;
