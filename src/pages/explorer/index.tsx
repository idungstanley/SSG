import Header from './components/Header';
import BreadcrumbSection from './components/Breadcrumb';
import Main from './components/Main';
import CreateOrRenameItemSlideOver from './components/sideOvers/CreateOrRenameItemSlideOver';
import ShareItemModal from '../../components/ShareItemModal';
import DragContext from './components/DragContext';
import PageWrapper from '../../components/PageWrapper';
import PilotSection, { pilotConfig } from './components/PilotSection';

export default function ExplorerPage() {
  return (
    <>
      <PilotSection />
      <PageWrapper
        pilotConfig={pilotConfig}
        header={<Header />}
        additional={
          <>
            <CreateOrRenameItemSlideOver />
            <ShareItemModal />
          </>
        }
        extendedBar={
          <div className="w-full p-2 h-full space-y-5">
            <h1>Extended bar for explorer</h1>

            <div className="w-45 h-35 flex items-center justify-center border">box</div>
          </div>
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
    </>
  );
}
