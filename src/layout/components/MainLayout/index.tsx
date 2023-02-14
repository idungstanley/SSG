import React from 'react';
import { Outlet } from 'react-router-dom';

// import TopMenu from './TopMenu';
import MyWorkspacesSlideOver from '../../../pages/account/components/MyWorkspacesSlideOver';
import ProgressBar from './ProgressBar';
import UploadModal from '../../../components/UploadModal';
import Sidebar from './sidebar/Sidebar';
import Header from './sidebar/Header';

function MainLayout() {
  return (
    <div className="h-full flex flex-col">
      <ProgressBar />
      {/* <TopMenu /> */}
      <div className="flex h-full">
        <div className="flex flex-row w-full h-full overflow-hidden">
          <Sidebar />

          <div className="flex flex-col flex-1 grow">
            <Header />
            <main className="flex-1">
              <div className="mx-auto sm:px-0">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </div>

      <UploadModal />
      <MyWorkspacesSlideOver />
    </div>
  );
}

export default MainLayout;
