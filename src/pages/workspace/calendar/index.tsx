import { Outlet } from 'react-router-dom';
import { Tabs } from './ui/Tabs';

function Calendar() {
  return (
    <div className="w-full h-full overflow-y-scroll pb-20">
      <Tabs />

      <Outlet />
    </div>
  );
}

export default Calendar;
