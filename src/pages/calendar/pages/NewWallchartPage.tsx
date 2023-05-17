import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { useGetTeamMembers } from '../../../features/settings/teamMembers/teamMemberService';
import { cl } from '../../../utils';
import { getCurrentDaysInMonth } from '../lib/getDaysInMonth';
import { isSameOrBefore } from '../lib/dateUtils';
import { selectCalendar } from '../../../features/calendar/slice/calendarSlice';
import { useAppSelector } from '../../../app/hooks';
import { AvatarWithInitials } from '../../../components';

const currentDate = dayjs();

const generateWeekDays = (startDay: string, datesInMonth: number): string[] => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const startIndex = daysOfWeek.indexOf(startDay);
  const slicedDays = daysOfWeek.slice(startIndex).concat(daysOfWeek.slice(0, startIndex));
  const daysInMonth = [...Array(datesInMonth).keys()].map((n) => n + 1);
  return daysInMonth.map((day) => slicedDays[(day - 1) % slicedDays.length]);
};

export const getDatesInRange = (startDate: ExtendedDate, endDate: ExtendedDate): ExtendedDate[] => {
  if (startDate.part === endDate.part && startDate.day.day() === endDate.day.day()) {
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
    dates.push({ day: endDate.day, part: 'start' }, endDate);
  }

  return dates;
};

function isDateInRange(date: ExtendedDate, range: DayOff) {
  const { day, part } = date;
  const { start, end } = range;

  const dates = [
    ...getDatesInRange({ day: dayjs(start.day), part: start.part }, { day: dayjs(end.day), part: end.part })
  ];

  return dates.some((i) => day.isSame(i.day, 'date') && part === i.part);
}

interface Day {
  day: string;
  part: Part;
}

interface DayOff {
  start: Day;
  end: Day;
  user: {
    id: string;
  };
}

const init: DayOff[] = [
  {
    user: {
      id: '394be745-6391-4117-ab19-a942b3c79a38'
    },
    start: { day: '2023-05-03', part: 'end' },
    end: { day: '2023-05-06', part: 'start' }
  }
];

export default function NewWallchart() {
  const { blacklistIds } = useAppSelector(selectCalendar);
  const { data } = useGetTeamMembers({ page: 1, query: '' });

  const days = getCurrentDaysInMonth(currentDate);
  const firstDay = days[0].format('ddd');
  const weeks = generateWeekDays(firstDay, days[0].daysInMonth());
  const members = data?.data.team_members ?? [];

  const filteredMembers = members.filter((i) => !blacklistIds.includes(i.id));

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
        {filteredMembers.map((i) => (
          <div key={i.id} className="grid grid-cols-autoFr items-center">
            <div className="w-72 bg-gray-50 p-2 flex space-x-2 items-center">
              <AvatarWithInitials initials={i.user.initials} />

              <div className="space-y-3 w-56">
                <h3 className="truncate text-sm font-medium text-gray-900">{i.user.name}</h3>
                <p className="mt-1 truncate text-sm text-gray-500">{i.user.email}</p>
              </div>
            </div>
            <Month userId={i.user.id} />
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

interface MonthProps {
  userId: string;
}

function Month({ userId }: MonthProps) {
  const [daysOff, setDaysOff] = useState<DayOff[]>(init);
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

    if (end) {
      const newDayOff: DayOff = {
        start: {
          day: start.day.format('YYYY-MM-DD'),
          part: start.part
        },
        end: {
          day: end.day.format('YYYY-MM-DD'),
          part: end.part
        },
        user: { id: userId }
      };

      setDaysOff((prev) => [...prev, newDayOff]);
      setSelectedDates([]);
    }
  };

  return (
    <div
      className="flex"
      onMouseLeave={
        isMouseDown
          ? () => {
              setIsMouseDown(false);
              setSelectedDates([]);
            }
          : undefined
      }
    >
      {days.map((day) => {
        const isSelectedStart = !!selectedDates.find((i) => i.day.isSame(day, 'date') && i.part === 'start');
        const isSelectedEnd = !!selectedDates.find((i) => i.day.isSame(day, 'date') && i.part === 'end');
        const isDayOffStart = daysOff.some(
          (range) => isDateInRange({ day, part: 'start' }, range) && range.user.id === userId
        );
        const isDayOffEnd = daysOff.some(
          (range) => isDateInRange({ day, part: 'end' }, range) && range.user.id === userId
        );

        return (
          <div
            onMouseUp={isMouseDown ? () => handleDateMouseUp() : undefined}
            className="relative p-2 border w-10 h-10 flex items-center justify-center"
            key={day.format()}
          >
            <div className="top-0 left-0 w-10 h-10 absolute grid grid-cols-2">
              <span
                onMouseOver={isMouseDown ? () => handleDateMouseOver(day, 'start') : undefined}
                onMouseDown={() => handleDateMouseDown(day, 'start')}
                className={cl(
                  'hover:bg-gray-200',
                  isSelectedStart && 'bg-gray-200',
                  isDayOffStart && 'bg-primary-500 opacity-50 hover:bg-primary-500'
                )}
              ></span>

              <span
                onMouseOver={isMouseDown ? () => handleDateMouseOver(day, 'end') : undefined}
                onMouseDown={() => handleDateMouseDown(day, 'end')}
                className={cl(
                  'hover:bg-gray-200',
                  isSelectedEnd && 'bg-gray-200',
                  isDayOffEnd && 'bg-primary-500 opacity-50 hover:bg-primary-500'
                )}
              ></span>
            </div>
            <span className="select-none">{day.date()}</span>
          </div>
        );
      })}
    </div>
  );
}
