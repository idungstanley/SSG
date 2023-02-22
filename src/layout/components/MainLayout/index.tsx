import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

// import TopMenu from './TopMenu';
// import MyWorkspacesSlideOver from '../../../pages/account/components/MyWorkspacesSlideOver';
import ProgressBar from './ProgressBar';
import UploadModal from '../../../components/UploadModal';
import Sidebar from './Sidebar';
import { cl } from '../../../utils';
import Header from './Header';

function MainLayout() {
  const [allowSelect, setAllowSelect] = useState(true);

  return (
    <div className={cl('h-full flex flex-col', !allowSelect && 'select-none')}>
      <ProgressBar />
      {/* <TopMenu /> */}
      <div className="flex h-full">
        <div className="flex flex-row w-full h-full overflow-hidden">
          <Sidebar allowSelect={allowSelect} setAllowSelect={setAllowSelect} />

          <div className="flex flex-col flex-grow">
            <Header />

            <div className="flex flex-row w-full h-full">
              <Outlet />
            </div>
          </div>
        </div>
      </div>

      <UploadModal />
      {/* <MyWorkspacesSlideOver /> */}
    </div>
  );
}

export default MainLayout;
