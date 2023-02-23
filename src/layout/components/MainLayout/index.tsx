import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
// import TopMenu from './TopMenu';
// import MyWorkspacesSlideOver from '../../../pages/account/components/MyWorkspacesSlideOver';
import ProgressBar from './ProgressBar';
import UploadModal from '../../../components/UploadModal';
import Sidebar from './Sidebar';
import { cl } from '../../../utils';
import Header from './Header';
import ExtendBtn from './Sidebar/components/extendBtn';
import { useAppSelector } from '../../../app/hooks';
import ExpandedNav from '../../../pages/workspace/views/ExpandedNav';

function MainLayout() {
  const [allowSelect, setAllowSelect] = useState(true);
  const {showExtendedBar } = useAppSelector(state=> state.workspace);

  return (
    <div className={cl('h-full flex flex-col', !allowSelect && 'select-none')}>
      <ProgressBar />
      {/* <TopMenu /> */}
      <div className="flex h-full">
        <div className="flex flex-row w-full h-full overflow-hidden">
          <div className="relative flex grow">
          {/* show extended navigation button */}
          <ExtendBtn />
          <Sidebar allowSelect={allowSelect} setAllowSelect={setAllowSelect} />
          </div>
          <div className="flex">
            {/* show the extended side navigation component*/}
            {showExtendedBar && <ExpandedNav />}
          <div className="flex flex-col flex-1 shrink-0"
          >
            <Header />
            <div className="w-full h-ful">
              <Outlet />
            </div>
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
