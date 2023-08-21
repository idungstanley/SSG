import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useEffect, useState } from 'react';
import MiniDatePicker from '../../../../components/DatePicker/MiniCalendar';
import { useAppSelector } from '../../../../app/hooks';
import AnalogClock from '../../../../components/DatePicker/AnalogClock';
// import Agenda from '../../../../components/Pilot/components/Calendar/Agenda';

export default function HeaderTimeModal() {
  dayjs.extend(timezone);
  dayjs.extend(utc);
  const { clock_type, timezone: zone } = useAppSelector((state) => state.userSetting);
  const [clock, setClock] = useState<dayjs.Dayjs>(dayjs().tz(zone));
  const [time, setTime] = useState<string>(clock.format('hh:mm:ss a'));
  // const { listId } = useParams();
  // const { filterTaskByAssigneeIds } = useAppSelector((state) => state.task);

  // const { data } = getTaskListService({ listId, assigneeUserId: filterTaskByAssigneeIds });

  // const entityTaskData = useMemo(() => data?.pages.flatMap((page) => page.data.tasks), [data]);

  const timeUpdateFn = () => window.setInterval(() => setTime(dayjs().format('hh:mm:ss a')), 1000);

  useEffect(() => {
    timeUpdateFn();

    return () => document.addEventListener('visibilitychange', timeUpdateFn);
  }, []);
  return (
    <div className="flex flex-col space-y-4 w-80 z-50 bg-alsoit-gray-50 h-4/6 opacity-0 transform transition-transform opacity-100 translate-y-0 delay-700">
      <div
        className={
          clock_type === 'd'
            ? 'flex justify-start flex-col space-y-1 w-full border-b border-alsoit-gray-300 px-4 py-6'
            : 'flex justify-center flex-col space-y-2 w-full mx-auto border-b border-alsoit-gray-300 px-4 py-6'
        }
      >
        {clock_type === 'd' ? (
          <span style={{ fontSize: '35px', padding: '0 0 8px 0' }}>{time}</span>
        ) : (
          <AnalogClock time={clock} setTime={setClock} zone={zone} />
        )}
        <span className={clock_type === 'd' ? 'text-left' : 'text-center'}>{dayjs().format('dddd MMMM D, YYYY')}</span>
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
        {/* {entityTaskData?.length && <Agenda entityTaskData={entityTaskData} />} */}
        {/* <span className="italic text-alsoit-text-md font-semibold">No activity found for the selected time</span> */}
      </div>
    </div>
  );
}
