import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import MiniDatePicker from '../../../../components/DatePicker/MiniCalendar';

export default function HeaderTimeModal() {
  const [time, setTime] = useState<string>(dayjs().format('hh:mm:ss a'));

  const timeUpdateFn = () => window.setInterval(() => setTime(dayjs().format('hh:mm:ss a')), 1000);

  useEffect(() => {
    timeUpdateFn();

    return () => document.addEventListener('visibilitychange', timeUpdateFn);
  }, []);
  return (
    <div className="flex flex-col space-y-4 w-134 z-50 bg-alsoit-gray-50 h-screen transition-transform opacity-100 transform translate-y-0 delay-700">
      <div className="flex justify-start flex-col space-y-2 w-full border-b border-alsoit-gray-300 px-4 py-6">
        <span style={{ fontSize: '35px', padding: '0 0 8px 0' }}>{time}</span>
        {dayjs().format('dddd MMMM D, YYYY')}
      </div>
      <div className="border-b border-alsoit-gray-300 px-4 py-6">
        <MiniDatePicker />
      </div>
      <div className="w-full flex flex-col space-y-2 px-4 py-6">
        <span className="font-semibold text-alsoit-text-lg">Schedule</span>
        <input
          type="text"
          className="w-72 h-6 text-alsoit-text-md rounded border-alsoit-border-base px-1"
          placeholder="search..."
        />
        <span className="italic text-alsoit-text-md font-semibold">No activity found for the selected time</span>
      </div>
    </div>
  );
}
