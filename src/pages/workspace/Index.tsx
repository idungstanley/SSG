import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar';
import Header from './sidebar/Header';
import UploadModal from '../../components/UploadModal';
// import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
// import { useDispatch } from 'react-redux';
// import {
//   setShowExtendedBar,
//   setShowSidebar,
// } from '../../features/workspace/workspaceSlice';
import ExpandedNav from '../../views/ExpandedNav';

function Index() {
  const { showSidebar, showExtendedBar, sidebarWidth } = useAppSelector(
    (state) => state.workspace
  );
  return (
    <div className="flex  flex-row">
      <UploadModal />
      <Sidebar />
      <div
        className="flex flex-1 flex-row"
        style={
          showSidebar
            ? { paddingLeft: `min(${sidebarWidth}px, 288px)` }
            : { paddingLeft: `${12}px` }
        }
      >
        {showExtendedBar && <ExpandedNav />}
        <Header />
        <main className="flex-1">
          <div
            className={`py-6 mx-auto px-4 sm:px-6 ${showSidebar ? 'px-8' : ''}`}
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Index;
