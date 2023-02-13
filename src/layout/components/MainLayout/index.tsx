import React from 'react';
import { Outlet } from 'react-router-dom';

import TopMenu from './TopMenu';
import MyWorkspacesSlideOver from '../../../pages/account/components/MyWorkspacesSlideOver';
import ProgressBar from './ProgressBar';

function MainLayout() {
  return (
    <div className="h-full flex flex-col">
      <ProgressBar />
      <TopMenu />
      <div className="flex h-full">
        <div className="flex-1 w-full h-full overflow-hidden">
          <Outlet />
        </div>
      </div>

      <MyWorkspacesSlideOver />
    </div>
  );
}

export default MainLayout;
