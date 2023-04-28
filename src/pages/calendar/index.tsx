import { Outlet } from 'react-router-dom';
import { DaysOffProvider } from './lib/daysOffContext';
import CreateEventModal from './ui/CreateEventModal';
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

      <CreateEventModal />
    </DaysOffProvider>
  );
}

Calendar.Year = Year;
Calendar.Month = Month;
Calendar.Day = Day;

export default Calendar;
