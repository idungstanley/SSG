import { Outlet } from 'react-router-dom';
import Page from '../../components/Page';
import { FaHandsHelping } from 'react-icons/fa';
import { ExtendedBar } from '../calendar/ui/ExtendedBar/ExtendedBar';
import Header from '../calendar/ui/Header';
import CreateDayOffModal from '../calendar/ui/CreateDayOffModal';

function AlsoHr() {
  return (
    <Page
      header={<Header />}
      extendedBar={{ children: <ExtendedBar />, name: 'Also HR', icon: <FaHandsHelping className="w-4 h-4" /> }}
    >
      <div className="w-full h-full overflow-y-scroll">
        <Outlet />
      </div>

      <CreateDayOffModal />
    </Page>
  );
}

export default AlsoHr;
