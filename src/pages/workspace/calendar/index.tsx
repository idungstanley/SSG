import { Outlet } from 'react-router-dom';
import { DaysOffProvider } from './lib/daysOffContext';
import CreateEventModal from './ui/CreateEventModal';
import Header from './ui/Header';

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

export default Calendar;
