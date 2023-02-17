import React from 'react';
import Header from './components/Header';
import BreadcrumbSection from './components/Breadcrumb';
import Main from './components/Main';
import CreateOrRenameItemSlideOver from './components/sideOvers/CreateOrRenameItemSlideOver';
import ShareItemModal from '../../components/ShareItemModal';
import DragContext from './components/DragContext';
import Pilot from '../../components/Pilot';

export default function ExplorerPage() {
  return (
    <>
      <DragContext>
        <main className="flex flex-col w-full h-full">
          <Header />

          <div className="flex w-full h-full">
            {/* files list, breadcrumb, file preview */}
            <div className="flex h-full w-full flex-col">
              {/* Breadcrumb */}
              <BreadcrumbSection />
              {/* files list & file preview */}
              <Main />
            </div>

            <Pilot />
          </div>
        </main>
      </DragContext>

      <CreateOrRenameItemSlideOver />
      <ShareItemModal />
    </>
  );
}
