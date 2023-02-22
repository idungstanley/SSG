import React from 'react';
import Header from './components/Header';
import BreadcrumbSection from './components/Breadcrumb';
import Main from './components/Main';
import CreateOrRenameItemSlideOver from './components/sideOvers/CreateOrRenameItemSlideOver';
import ShareItemModal from '../../components/ShareItemModal';
import DragContext from './components/DragContext';
import PageWrapper from '../../components/PageWrapper';

export default function ExplorerPage() {
  return (
    <PageWrapper
      header={<Header />}
      additional={
        <>
          <CreateOrRenameItemSlideOver />
          <ShareItemModal />
        </>
      }
    >
      {/* files list, breadcrumb, file preview */}
      <div className="flex flex-col w-full h-full">
        {/* Breadcrumb */}
        <BreadcrumbSection />
        {/* files list & file preview */}

        <DragContext>
          <Main />
        </DragContext>
      </div>
    </PageWrapper>
  );
}
