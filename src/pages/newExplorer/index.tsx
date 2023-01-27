import React from 'react';
import Header from './components/Header';
import BreadcrumbSection from './components/Breadcrumb';
import Main from './components/Main';
import CreateOrRenameItemSlideOver from './components/sideOvers/CreateOrRenameItemSlideOver';
import Chat from '../../components/Chat';
import Watchers from '../../components/Watchers';
import Comments from '../../components/Comments';
import Sidebar from '../workspace/sidebar/Sidebar';
import { useAppSelector } from '../../app/hooks';
import ExpandedNav from '../../views/ExpandedNav';
import ShareItemModal from '../../components/ShareItemModal';
import DragContext from './components/DragContext';

export default function NewExplorerPage() {
  const { showSidebar, sidebarWidth, showExtendedBar } = useAppSelector(
    (state) => state.workspace
  );

  const paddingStyles = () => {
    if (showSidebar && sidebarWidth > 54) {
      return { paddingLeft: `min(${sidebarWidth}px, 321px)` };
    } else if (sidebarWidth < 55) {
      return { paddingLeft: `${54}px` };
    } else {
      return { paddingLeft: `${54}px` };
    }
  };

  return (
    <>
      <DragContext>
        <main className="flex w-full h-full">
          {/* sidebar */}
          <Sidebar />

          {/* header */}
          <div className="flex w-full flex-row" style={paddingStyles()}>
            {showExtendedBar && <ExpandedNav />}
            <section className="grid w-full grid-rows-mainContent">
              <Header />

              <div className="grid grid-rows-mainContent">
                {/* Breadcrumb */}
                <BreadcrumbSection />
                {/* files list & file preview */}
                <Main />
              </div>
            </section>
          </div>
        </main>
      </DragContext>

      <CreateOrRenameItemSlideOver />
      <Chat />
      <Watchers />
      <Comments />
      <ShareItemModal />
    </>
  );
}
