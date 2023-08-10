import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

function AnalogClock() {
  const [time, setTime] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs());
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
