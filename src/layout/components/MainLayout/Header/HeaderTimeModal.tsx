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
import DefaultPinIcon from '../../../../assets/icons/DefaultPinIcon';

export default function HeaderTimeModal() {
  dayjs.extend(timezone);
  dayjs.extend(utc);
  const { clock_type, timezone: zone } = useAppSelector((state) => state.userSetting);
  const [clock, setClock] = useState<dayjs.Dayjs>(dayjs().tz(zone));
  const [time, setTime] = useState<string>(clock.format('hh:mm:ss a'));
  const [pinCalendar, setPinCalendar] = useState(false);

  const timeUpdateFn = () => window.setInterval(() => setTime(dayjs().format('hh:mm:ss a')), 1000);

  useEffect(() => {
    timeUpdateFn();

    return () => document.addEventListener('visibilitychange', timeUpdateFn);
  }, []);

  return (
    <div
      className="flex flex-col w-80 z-50 bg-alsoit-gray-125 h-4/6 opacity-0 transform transition-transform opacity-100 translate-y-0 delay-700"
      style={{ borderRadius: '5px', maxHeight: '92vh' }}
    >
      <div className="flex justify-between items-center mx-2 group">
        <div className="w-1/4 opacity-0 group-hover:opacity-100 cursor-move">
          <Dradnddrop />
        </div>
        <div
          className={cl(
            clock_type === 'd' ? 'flex gap-2 flex-col w-full' : ' w-full mx-auto',
            'w-2/4 my-2 flex justify-center items-center flex-col'
          )}
        >
          {clock_type === 'd' ? (
            <div className="flex">
              {time.split('').map((time, index) => {
                return (
                  <h2
                    className="font-medium text-center"
                    style={{ width: index === 8 ? '' : '17px', fontSize: '20px', height: '24px' }}
                    key={time + index}
                  >
                    {time}
                  </h2>
                );
              })}
            </div>
          ) : (
            <AnalogClock time={clock} setTime={setClock} zone={zone} />
          )}
          <span
            className={cl(
              'flex justify-center text-alsoit-text-lg tracking-widest',
              clock_type === 'd' ? 'text-left' : 'text-center'
            )}
            style={{ lineHeight: '5.6px' }}
          >
            {dayjs().format('dddd, D MMMM')}
          </span>
        </div>
        <div className="flex items-center justify-end w-1/4 opacity-0 group-hover:opacity-100">
          {pinCalendar ? (
            <ToolTip title="Pin calendar and schedule card" placement="left-end">
              <div
                className="h-5 w-5 flex justify-center rounded items-center hover:bg-alsoit-gray-50 group/parent"
                onClick={() => setPinCalendar(!pinCalendar)}
              >
                <PinnedIcon dimensions={{ width: 16, height: 16 }} className="group-hover/parent:rotate-45 transform" />
              </div>
            </ToolTip>
          ) : (
            <ToolTip title="Pin calendar and schedule card" placement="left-end">
              <div
                className="h-5 w-5 flex justify-center rounded items-center hover:bg-alsoit-gray-50 group/parent"
                onClick={() => setPinCalendar(!pinCalendar)}
              >
                <DefaultPinIcon
                  dimensions={{ width: '16', height: '16' }}
                  className="group-hover/parent:rotate-45 transform hover:text-red-500"
                />
                {/* </span> */}
              </div>
            </ToolTip>
          )}
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
