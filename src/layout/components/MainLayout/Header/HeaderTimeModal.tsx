import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useEffect, useState } from 'react';
import MiniDatePicker from '../../../../components/DatePicker/MiniCalendar';
import { useAppSelector } from '../../../../app/hooks';
import AnalogClock from '../../../../components/DatePicker/AnalogClock';
import { cl } from '../../../../utils';
import Dradnddrop from '../../../../assets/icons/Dradnddrop';
import PinnedIcon from '../../../../assets/icons/PinnedIcon';
import AddProperty from './CalendarPopOut/components/AddProperty';
import Schedules from './CalendarPopOut/components/Schedules';
import ToolTip from '../../../../components/Tooltip/Tooltip';

export default function HeaderTimeModal() {
  dayjs.extend(timezone);
  dayjs.extend(utc);
  const { clock_type, timezone: zone } = useAppSelector((state) => state.userSetting);
  const [clock, setClock] = useState<dayjs.Dayjs>(dayjs().tz(zone));
  const [time, setTime] = useState<string>(clock.format('hh:mm:ss a'));

  const timeUpdateFn = () => window.setInterval(() => setTime(dayjs().format('hh:mm:ss a')), 1000);

  useEffect(() => {
    timeUpdateFn();

    return () => document.addEventListener('visibilitychange', timeUpdateFn);
  }, []);

  return (
    <div
      className="flex flex-col w-80 z-50 bg-alsoit-gray-125 h-4/6 opacity-0 transform transition-transform opacity-100 translate-y-0 delay-700"
      style={{ borderRadius: '5px' }}
    >
      <div className="flex justify-between items-center mx-2 group">
        <div className="w-1/4 opacity-0 group-hover:opacity-100">
          <Dradnddrop />
        </div>
        <div
          className={cl(
            clock_type === 'd' ? 'flex justify-center flex-col w-full' : 'flex justify-center flex-col w-full mx-auto',
            'w-2/4'
          )}
        >
          {clock_type === 'd' ? (
            <span style={{ fontSize: '20px' }} className="w-full flex justify-center">
              {time}
            </span>
          ) : (
            <AnalogClock time={clock} setTime={setClock} zone={zone} />
          )}
          <span className={cl('flex justify-center', clock_type === 'd' ? 'text-left' : 'text-center')}>
            {dayjs().format('dddd, D MMMM')}
          </span>
        </div>
        <div className="flex items-center justify-end w-1/4 opacity-0 group-hover:opacity-100">
          <ToolTip title="Unpin calendar and schedule card" placement="left-end">
            <div className="rotate-45 transform">
              <PinnedIcon dimensions={{ width: 16, height: 16 }} />
            </div>
          </ToolTip>
        </div>
      </div>
      <div className="w-full">
        <MiniDatePicker type="pop-out" />
      </div>
      <div className="w-full">
        <AddProperty />
      </div>
      <div className="w-full">
        <Schedules />
      </div>
    </div>
  );
}
