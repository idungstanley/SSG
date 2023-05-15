import { Outlet } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import Sidebar from './Sidebar';
import { cl } from '../../../utils';
import Header from './Header';
import { useAppSelector } from '../../../app/hooks';
// import ExpandedNav from './extendedNavigation/ExpandedNav';
// import OpenExtBtn from './extendedNavigation/components/extendBtn/OpenExtBtn';
import AddFileModal from '../../../components/Pilot/components/details/properties/attachments/AddFileModal';
import { InvalidateQueryFilters } from '@tanstack/react-query';

function MainLayout() {
  const { showExtendedBar, activeItemType, activeItemId } = useAppSelector((state) => state.workspace);

  return (
    <div className={cl('h-full flex flex-col')}>
      <ProgressBar />
      {/* <TopMenu /> */}
      <div className="flex h-full">
        <div className="grid w-full h-full grid-rows-1 overflow-hidden grid-cols-autoFr">
          <div className="relative h-full">
            {/* show extended navigation button */}
            {/* <OpenExtBtn /> */}
            <Sidebar />
          </div>
          <div className={cl('grid h-full', !showExtendedBar ? 'grid-cols-1' : 'grid-cols-autoFr')}>
            {/* show the extended side navigation component*/}
            {/* {showExtendedBar && <ExpandedNav />} */}
            <div className="w-full">
              {/* <AdditionalHeader /> */}
              <Header />
              <div className="w-full h-full">
                <Outlet />
              </div>
              <AddFileModal
                endpoint={`attachments?id=${activeItemId}?type=${activeItemType}`}
                // endpoint={`attachments/${folderId || ''}`}
                // activeItemId={activeItemId}
                // activeType={activeItemType}
                invalidateQuery={['attachments'] as InvalidateQueryFilters<unknown>}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
