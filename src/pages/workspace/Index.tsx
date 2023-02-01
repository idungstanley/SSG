import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar';
import Header from './sidebar/Header';
import UploadModal from '../../components/UploadModal';
import ExpandedNav from '../../views/ExpandedNav';

function Index() {
  const { showSidebar, showExtendedBar, sidebarWidth } = useAppSelector(
    (state) => state.workspace
  );
  const paddingStyles = () => {
    if (showSidebar && sidebarWidth > 230) {
      return { paddingLeft: `min(${sidebarWidth}px, 321px)` };
    } else if (sidebarWidth > 55 && sidebarWidth < 230) {
      return { paddingLeft: `${230}px` };
    } else if (showSidebar === false) {
      return { paddingLeft: `${54}px` };
    }
  };
  console.log(sidebarWidth);

  return (
    <div className="flex flex-row">
      <UploadModal />
      <Sidebar />
      <div className="flex flex-row w-full" style={paddingStyles()}>
        {showExtendedBar && <ExpandedNav />}
        <div className="flex flex-col flex-1 grow">
          <Header />
          <main className="flex-1">
            <div className={`mx-auto sm:px-0 ${showSidebar ? 'px-8' : ''}`}>
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Index;
