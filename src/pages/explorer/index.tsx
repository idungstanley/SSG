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
import ExpandedNav from '../workspace/views/ExpandedNav';
import ShareItemModal from '../../components/ShareItemModal';
import DragContext from './components/DragContext';

export default function ExplorerPage() {
  const { showExtendedBar } = useAppSelector((state) => state.workspace);

  return (
    <>
      <DragContext>
        <main className="flex w-full h-full">
          {/* sidebar */}
          <Sidebar />

          {/* header */}
          <div className="ml-80 flex w-full flex-row">
            {showExtendedBar && <ExpandedNav />}
            <section className="w-full h-full">
              <Header />

              <div className="grid h-full grid-rows-mainContent">
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
