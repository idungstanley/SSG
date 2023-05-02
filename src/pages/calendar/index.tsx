import { Outlet } from 'react-router-dom';
import { DaysOffProvider } from './lib/daysOffContext';
import CreateDayOffModal from './ui/CreateDayOffModal';
import Day from './ui/Day';
import Header from './ui/Header';
import Month from './ui/Month';
import Year from './ui/Year';

function Calendar() {
  return (
    <DaysOffProvider>
      <div className="w-full h-full overflow-y-scroll pb-20">
        {/* header */}
        <Header />

        <Outlet />
      </div>

      <CreateDayOffModal />
    </DaysOffProvider>
  );
}

Calendar.Year = Year;
Calendar.Month = Month;
Calendar.Day = Day;

export default Calendar;
