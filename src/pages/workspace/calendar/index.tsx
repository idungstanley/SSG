import { Outlet } from 'react-router-dom';
import { DaysOffProvider } from './lib/daysOffContext';
import CreateEventModal from './ui/CreateEventModal';
import { Tabs } from './ui/Tabs';

function Calendar() {
  return (
    <DaysOffProvider>
      <div className="w-full h-full overflow-y-scroll pb-20">
        {/* header */}
        <section className="px-4 flex justify-between items-center border-b border-gray-200 w-full">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Stanislau</h1>
          <Tabs />
        </section>

        <Outlet />
      </div>

      <CreateEventModal />
    </DaysOffProvider>
  );
}

export default Calendar;
