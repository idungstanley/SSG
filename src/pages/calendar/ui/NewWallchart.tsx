import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { useGetTeamMembers } from '../../../features/settings/teamMembers/teamMemberService';
import { cl } from '../../../utils';
import { getCurrentDaysInMonth } from '../lib/getDaysInMonth';
import { isSameOrBefore } from '../lib/dateUtils';

const currentDate = dayjs();

const generateWeekDays = (startDay: string, datesInMonth: number): string[] => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const startIndex = daysOfWeek.indexOf(startDay);
  const slicedDays = daysOfWeek.slice(startIndex).concat(daysOfWeek.slice(0, startIndex));
  const daysInMonth = [...Array(datesInMonth).keys()].map((n) => n + 1);
  return daysInMonth.map((day) => slicedDays[(day - 1) % slicedDays.length]);
};

export const getDatesInRange = (startDate: ExtendedDate, endDate: ExtendedDate): ExtendedDate[] => {
  if (startDate.part === endDate.part) {
    return [startDate];
  }

  if (startDate.day.day() === endDate.day.day()) {
    return [startDate, endDate];
  }

  const dates: ExtendedDate[] = [];

  if (startDate.part === 'end') {
    dates.push(startDate);
  } else {
    dates.push(startDate, { day: startDate.day, part: 'end' });
  }

  const start = startDate.day.add(1, 'day');

  const end = endDate.day.subtract(1, 'day');

  let current = start;
  while (isSameOrBefore(current, end)) {
    dates.push({ day: current, part: 'start' });
    dates.push({ day: current, part: 'end' });
    current = current.add(1, 'day');
  }

  if (endDate.part === 'start') {
    dates.push(endDate);
  } else {
    dates.push(endDate, { day: endDate.day, part: 'start' });
  }

  return dates;
};

export default function NewWallchart() {
  const { data } = useGetTeamMembers({ page: 1, query: '' });
  // const { activeMemberId } = useDaysOff();
  const days = getCurrentDaysInMonth(currentDate);
  const firstDay = days[0].format('ddd');
  const weeks = generateWeekDays(firstDay, days[0].daysInMonth());
  const members = data?.data.team_members ?? [];

  return (
    <section>
      {/* weeks */}
      <div className="ml-80 flex">
        {weeks.map((i, index) => (
          <p className="p-2 w-10 h-10" key={index}>
            {i}
          </p>
        ))}
      </div>

      {/* members */}
      <div className="w-full space-y-6">
        {members.map((i) => (
          <div key={i.id} className="flex">
            <div className="w-80">
              <h1>{i.user.name}</h1>
              <p>{i.user.email}</p>
            </div>
            <Month />
          </div>
        ))}
      </div>
    </section>
  );
}

export type Part = 'start' | 'end';

export interface ExtendedDate {
  day: Dayjs;
  part: Part;
}

function Month() {
  const [selectedDates, setSelectedDates] = useState<ExtendedDate[]>([]);
  const days = getCurrentDaysInMonth(currentDate);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleDateMouseDown = (day: Dayjs, part: Part) => {
    setIsMouseDown(true);
    const date = {
      day,
      part
    };

    setSelectedDates([date]);
  };

  const handleDateMouseOver = (day: Dayjs, part: Part) =>
    setSelectedDates((prev) => {
      const startDate = prev[0];
      const endDate = { day, part };

      const datesInRange = [...getDatesInRange(startDate, endDate)];
      return [...datesInRange];
    });

  const handleDateMouseUp = () => {
    setIsMouseDown(false);
    const start = selectedDates[0];
    const end = selectedDates.at(-1);
    // const end = selectedDates[selectedDates.length - 1];

    console.log({ start, end });
    setSelectedDates([]);
  };

  return (
    <div className="flex" onMouseUp={isMouseDown ? () => handleDateMouseUp() : undefined}>
      {days.map((day) => {
        const isSelectedStart = !!selectedDates.find((i) => i.day.isSame(day, 'date') && i.part === 'start');
        const isSelectedEnd = !!selectedDates.find((i) => i.day.isSame(day, 'date') && i.part === 'end');

        return (
          <div className="relative p-2 border w-10 h-10 flex items-center justify-center" key={day.format()}>
            <div className="top-0 left-0 w-10 h-10 absolute grid grid-cols-2">
              <span
                onMouseOver={isMouseDown ? () => handleDateMouseOver(day, 'start') : undefined}
                onMouseDown={() => handleDateMouseDown(day, 'start')}
                className={cl('hover:bg-gray-200', isSelectedStart && 'bg-gray-200')}
              ></span>

              <span
                onMouseOver={isMouseDown ? () => handleDateMouseOver(day, 'end') : undefined}
                onMouseDown={() => handleDateMouseDown(day, 'end')}
                className={cl('hover:bg-gray-200', isSelectedEnd && 'bg-gray-200')}
              ></span>
            </div>
            <span className="select-none">{day.date()}</span>
          </div>
        );
      })}
    </div>
  );
}
