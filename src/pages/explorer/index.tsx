import React from 'react';
import Header from './components/Header';
import BreadcrumbSection from './components/Breadcrumb';
import Main from './components/Main';
import CreateOrRenameItemSlideOver from './components/sideOvers/CreateOrRenameItemSlideOver';

import ShareItemModal from '../../components/ShareItemModal';
import DragContext from './components/DragContext';

export default function ExplorerPage() {
  return (
    <>
      <DragContext>
        <main className="w-full h-full">
          <Header />

          <div className="grid h-full grid-rows-mainContent">
            {/* Breadcrumb */}
            <BreadcrumbSection />
            {/* files list & file preview */}
            <Main />
          </div>
        </main>
      </DragContext>

      <CreateOrRenameItemSlideOver />
      <ShareItemModal />
    </>
  );
}
