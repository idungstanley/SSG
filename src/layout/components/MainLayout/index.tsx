import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

// import TopMenu from './TopMenu';
// import MyWorkspacesSlideOver from '../../../pages/account/components/MyWorkspacesSlideOver';
import ProgressBar from './ProgressBar';
import UploadModal from '../../../components/UploadModal';
import Sidebar from './Sidebar';
import { cl } from '../../../utils';
import Header from './Header';
// import { useAppSelector } from '../../../app/hooks';

function MainLayout() {
  const [allowSelect, setAllowSelect] = useState(true);
  // const {sidebarWidthRD } = useAppSelector(state=> state.workspace);

  return (
    <div className={cl('h-full flex flex-col', !allowSelect && 'select-none')}>
      <ProgressBar />
      {/* <TopMenu /> */}
      <div className="flex h-full">
        <div className="flex flex-row w-full h-full overflow-hidden">
          <div className="flex grow">
          <Sidebar allowSelect={allowSelect} setAllowSelect={setAllowSelect} />
          </div>
          <div className="flex flex-col flex-1 shrink-0"
          >
            <Header />
            <div className="w-full h-ful">
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
