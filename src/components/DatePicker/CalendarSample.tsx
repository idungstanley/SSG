import React from 'react';
import { Dayjs } from 'dayjs';

interface DateObject {
  currentMonth: boolean;
  date: Dayjs;
  today?: boolean;
  currentWeek?: boolean;
  isWeekend?: boolean;
}

interface GroupedDates {
  [dayOfWeek: string]: DateObject[];
}

interface CalendarProps {
  dates: DateObject[];
  groupedDates: GroupedDates;
}

function Calendar({ dates, groupedDates }: CalendarProps) {
  return (
    <div className="flex space-x-11 w-full">
      {Object.keys(groupedDates).map((dayOfWeek) => (
        <div key={dayOfWeek} className="flex flex-col space-y-4">
          <h3>{dayOfWeek}</h3>
          <ul className="flex flex-col space-y-2">
            {groupedDates[dayOfWeek].map((date) => (
              <li key={date.date.toISOString()}>{date.date.format('DD')}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Calendar;
