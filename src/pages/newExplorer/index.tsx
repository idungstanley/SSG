import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import BreadcrumbSection from './components/Breadcrumb';
import Main from './components/Main';
import CreateOrRenameItemSlideOver from './components/sideOvers/CreateOrRenameItemSlideOver';
import Chat from '../../components/Chat';
import Watchers from '../../components/Watchers';
import Comments from '../../components/Comments';
import ShareItemModal from '../../components/ShareItemModal';
import DragContext from './components/DragContext';

export default function NewExplorerPage() {
  return (
    <>
      <DragContext>
        <main className="grid grid-cols-mainLayout w-full h-full">
          {/* sidebar */}
          <Sidebar />

          {/* header */}
          <section className="grid grid-rows-mainContent">
            <Header />

            <div className="grid grid-rows-mainContent">
              {/* Breadcrumb */}
              <BreadcrumbSection />

              {/* files list & file preview */}
              <Main />
            </div>
          </section>
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
