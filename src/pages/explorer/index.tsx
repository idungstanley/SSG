import Header from './components/Header';
import BreadcrumbSection from './components/Breadcrumb';
import Main from './components/Main';
import CreateOrRenameItemSlideOver from './components/sideOvers/CreateOrRenameItemSlideOver';
import ShareItemModal from '../../components/ShareItemModal';
import DragContext from './components/DragContext';
import Page from '../../components/Page';
import PilotSection, { pilotConfig } from './components/PilotSection';
import ExtendedBar from './components/Sidebar';
import { BiCabinet } from 'react-icons/bi';

export default function ExplorerPage() {
  const extendedObj = {
    name: 'Cabinet',
    children: <ExtendedBar />,
    icon: <BiCabinet className="h-4 mr-4" />
  };
  return (
    <>
      <PilotSection />
      <Page
        pilotConfig={pilotConfig}
        header={<Header />}
        additional={
          <>
            <CreateOrRenameItemSlideOver />
            <ShareItemModal />
          </>
        }
        extendedBar={extendedObj}
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
      </Page>
    </>
  );
}
