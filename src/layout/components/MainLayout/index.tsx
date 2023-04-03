import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import Sidebar from './Sidebar';
import { cl } from '../../../utils';
import Header from './Header';
import { useAppSelector } from '../../../app/hooks';
import ExpandedNav from './extendedNavigation/ExpandedNav';
import OpenExtBtn from './extendedNavigation/components/extendBtn/OpenExtBtn';

function MainLayout() {
  const [allowSelect, setAllowSelect] = useState(true);
  const { showExtendedBar } = useAppSelector((state) => state.workspace);

  return (
    <div className={cl('h-full flex flex-col', !allowSelect && 'select-none')}>
      <ProgressBar />
      {/* <TopMenu /> */}
      <div className="flex h-full">
        <div className="flex flex-row w-full h-full overflow-hidden">
          <div className="relative flex grow">
            {/* show extended navigation button */}
            <OpenExtBtn />
            <Sidebar allowSelect={allowSelect} setAllowSelect={setAllowSelect} />
          </div>
          <div className="flex flex-1 grow">
            {/* show the extended side navigation component*/}
            {showExtendedBar && <ExpandedNav />}
            <div className="flex flex-col flex-1 w-full">
              <AdditionalHeader />
              <Header />
              <div className="w-full h-full">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;

function AdditionalHeader() {
  return (
    <div className="w-full h-13 border-b p-2" style={{ height: '50px' }}>
      <h1 className="text-center" style={{ height: '50px' }}>
        Header
      </h1>
    </div>
  );
}
