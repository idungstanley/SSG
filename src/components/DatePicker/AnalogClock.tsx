import { useEffect, Dispatch, SetStateAction } from 'react';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

interface Props {
  time: dayjs.Dayjs;
  setTime: Dispatch<SetStateAction<dayjs.Dayjs>>;
  zone: string | undefined;
}

function AnalogClock({ time, setTime, zone }: Props) {
  dayjs.extend(timezone);
  dayjs.extend(utc);

  useEffect(() => {
    const interval = setInterval(() => {
      zone ? setTime(dayjs().tz(zone)) : setTime(dayjs());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const secondsDeg = (time.second() / 60) * 360;
  const minutesDeg = ((time.minute() + time.second() / 60) / 60) * 360;
  const hoursDeg = (((time.hour() % 12) + time.minute() / 60) / 12) * 360;

  return (
    <div className="clock w-8/12 mx-auto">
      <div className="disc" />
      <div className="hand second" style={{ transform: `rotate(${secondsDeg}deg)` }} />
      <div className="hand minute" style={{ transform: `rotate(${minutesDeg}deg)` }} />
      <div className="hand hour" style={{ transform: `rotate(${hoursDeg}deg)` }} />
    </div>
  );
}

export default AnalogClock;
