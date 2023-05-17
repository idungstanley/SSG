import { Outlet } from 'react-router-dom';
import { DaysOffProvider } from './lib/daysOffContext';
import CreateDayOffModal from './ui/CreateDayOffModal';
import Day from './ui/Month/Day';
import Header from './ui/Header';
import Month from './ui/Month/Month';
import Year from './ui/Year';
import Page from '../../components/Page';
import { ExtendedBar } from './ui/ExtendedBar/ExtendedBar';
import { FaHandsHelping } from 'react-icons/fa';

function Calendar() {
  return (
    <Page
      header={<Header />}
      extendedBar={{ children: <ExtendedBar />, name: 'Also HR', icon: <FaHandsHelping className="w-4 h-4" /> }}
    >
      <DaysOffProvider>
        <div className="w-full h-full overflow-y-scroll">
          <Outlet />
        </div>

        <CreateDayOffModal />
      </DaysOffProvider>
    </Page>
  );
}

Calendar.Year = Year;
Calendar.Month = Month;
Calendar.Day = Day;

export default Calendar;
