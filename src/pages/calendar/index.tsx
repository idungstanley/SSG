import { Outlet } from 'react-router-dom';
import CreateDayOffModal from './ui/CreateDayOffModal';
import Header from './ui/Header';
import Page from '../../components/Page';
import { ExtendedBar } from './ui/ExtendedBar/ExtendedBar';
import { FaHandsHelping } from 'react-icons/fa';

function Calendar() {
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

export default Calendar;
