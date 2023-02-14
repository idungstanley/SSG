import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

// import TopMenu from './TopMenu';
import MyWorkspacesSlideOver from '../../../pages/account/components/MyWorkspacesSlideOver';
import ProgressBar from './ProgressBar';
import UploadModal from '../../../components/UploadModal';
import Sidebar from './sidebar/Sidebar';
import Header from './sidebar/Header';
import NewSidebar from './NewSidebar';
import { classNames } from '../../../utils';

function MainLayout() {
  const [allowSelect, setAllowSelect] = useState(true);

  return (
    <div
      className={classNames(
        'h-full flex flex-col',
        !allowSelect && 'select-none'
      )}
    >
      <ProgressBar />
      {/* <TopMenu /> */}
      <div className="flex h-full">
        <div className="flex flex-row w-full h-full overflow-hidden">
          <NewSidebar
            allowSelect={allowSelect}
            setAllowSelect={setAllowSelect}
          />
          {/* <Sidebar /> */}

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
