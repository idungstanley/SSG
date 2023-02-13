import React from 'react';
import Header from './components/Header';
import BreadcrumbSection from './components/Breadcrumb';
import Main from './components/Main';
import CreateOrRenameItemSlideOver from './components/sideOvers/CreateOrRenameItemSlideOver';
import { useAppSelector } from '../../app/hooks';
import ExpandedNav from '../../views/ExpandedNav';
import ShareItemModal from '../../components/ShareItemModal';
import DragContext from './components/DragContext';

export default function ExplorerPage() {
  const { showExtendedBar } = useAppSelector((state) => state.workspace);

  return (
    <>
      <DragContext>
        <main className="flex w-full h-full flex-row">
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
        </main>
      </DragContext>

      <CreateOrRenameItemSlideOver />
      <ShareItemModal />
    </>
  );
}
