import dayjs, { Dayjs } from 'dayjs';
import { ButtonHTMLAttributes, useCallback, useMemo, useState } from 'react';
import { cl } from '../../../../utils';
import { isSameOrAfter, isSameOrBefore } from '../lib/dateUtils';
import { getDatesInRange } from '../lib/getDatesInRange';
import { getDaysInYear } from '../lib/getDaysInYear';
import { DayOff, Event, MonthObject } from '../types/calendar';

interface YearCalendarProps {
  year: number;
}

const events: Event[] = [
  {
    id: '1',
    user: {
      name: 'Snanislau'
    },
    daysOff: [
      {
        id: '1',
        start: '2023-04-19',
        end: '2023-04-23',
        type: 'sick leave',
        reason: 'Blah blah blah'
      },
      {
        id: '2',
        start: '2023-04-25',
        end: '2023-04-26',
        type: 'holiday',
        reason: 'Blah blah blah blah'
      }
    ]
  },
  {
    id: '2',
    user: {
      name: 'John'
    },
    daysOff: [
      {
        id: '1',
        start: '2023-04-28',
        end: '2023-04-29',
        type: 'sick leave',
        reason: 'Blah blah blah'
      },
      {
        id: '2',
        start: '2023-05-01',
        end: '2023-05-01',
        type: 'sick leave',
        reason: 'Blah blah blah'
      }
    ]
  }
];

const currentDate = dayjs();

const WEEKS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function YearCalendar({ year }: YearCalendarProps) {
  const months = useMemo(() => getDaysInYear(year), [year]);

  return (
    <section className="mx-auto grid max-w-3xl grid-cols-1 gap-x-8 gap-y-16 px-4 py-16 sm:grid-cols-2 sm:px-6 xl:max-w-none xl:grid-cols-3 xl:px-8 2xl:grid-cols-4">
      {months.map((month) => (
        <Month key={month.name} month={month} />
      ))}
    </section>
  );
}

interface MonthProps {
  month: MonthObject;
}

function Month({ month }: MonthProps) {
  const [selectedDates, setSelectedDates] = useState<dayjs.Dayjs[]>([]);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [highlightedDates, setHighlightedDates] = useState<string[]>([]);

  const handleDateMouseEnter = useCallback((event?: DayOff) => {
    if (!event) {
      return;
    }

    const { start, end } = event;
    const startDate = dayjs(start);
    const endDate = dayjs(end);

    const datesArray = [...Array(endDate.diff(startDate, 'day') + 1)].map((_, index) =>
      startDate.add(index, 'day').format('YYYY-MM-DD')
    );

    setHighlightedDates(datesArray);
  }, []);

  const handleDateMouseLeave = () => setHighlightedDates([]);

  const handleDateMouseDown = (day: dayjs.Dayjs) => {
    setIsMouseDown(true);
    setSelectedDates([day]);
  };

  const handleDateMouseUp = () => {
    setIsMouseDown(false);
    console.log(selectedDates);
    setSelectedDates([]);
  };

  const handleDateMouseOver = useCallback(
    (day: dayjs.Dayjs) =>
      setSelectedDates((prev) => {
        const startDate = prev[0];
        const endDate = day;

        const datesInRange = [...getDatesInRange(startDate, endDate)];
        return [...datesInRange];
      }),
    []
  );

  return (
    <div onMouseUp={() => handleDateMouseUp()} key={month.name} className="text-center">
      <h2 className="text-sm font-semibold text-gray-900">{month.name}</h2>
      <Weeks />

      <div
        className={cl(
          'isolate mt-2 grid grid-cols-7 gap-px rounded-lg border bg-gray-200 text-sm shadow',
          month.month.isSame(currentDate, 'month') && 'border-primary-400'
        )}
      >
        {/* {month.days.map((day, dayIdx) => {
          const isHoliday = events.find((event) =>
            event.daysOff.find(
              (dayOff) => isSameOrBefore(day, dayjs(dayOff.end)) && isSameOrAfter(day, dayjs(dayOff.start))
            )
          );

          return (
            <button
              onMouseEnter={() =>
                handleDateMouseEnter(
                  isHoliday?.daysOff.find(
                    (dayOff) => isSameOrBefore(day, dayjs(dayOff.end)) && isSameOrAfter(day, dayjs(dayOff.start))
                  )
                )
              }
              onMouseLeave={handleDateMouseLeave}
              key={day.format()}
              type="button"
              className={cl(
                day.isSame(month.month, 'month') ? 'bg-white font-medium text-gray-900' : 'bg-gray-50 text-gray-400',
                dayIdx === 0 && 'rounded-tl-lg',
                dayIdx === 6 && 'rounded-tr-lg',
                (Number(day.format('d')) === 0 || Number(day.format('d')) === 6) && 'bg-gray-100',
                dayIdx === month.days.length - 7 && 'rounded-bl-lg',
                dayIdx === month.days.length - 1 && 'rounded-br-lg',
                selectedDates.map((i) => i.format('YYYY-MM-DD')).includes(day.format('YYYY-MM-DD'))
                  ? 'bg-blue-500'
                  : '',
                isMouseDown && 'hover:bg-blue-500',
                isHoliday && 'bg-red-500',
                'py-1.5 hover:bg-gray-100 focus:z-10 flex justify-center items-center',
                highlightedDates.includes(day.format('YYYY-MM-DD')) && 'bg-yellow-200 hover:bg-yellow-200'
              )}
            >
              <time
                onMouseDown={() => handleDateMouseDown(day)}
                onMouseOver={isMouseDown ? () => handleDateMouseOver(day) : undefined}
                dateTime={String(day.format())}
                className={cl(
                  day.format('YYYY-MM-DD') === currentDate.format('YYYY-MM-DD') && 'bg-indigo-600 text-white',
                  'w-7 h-7 flex items-center justify-center rounded-full'
                )}
              >
                {isHoliday ? isHoliday.id : day.date()}
              </time>
            </button>
          );
        })} */}

        {month.days.map((day, index) => {
          const isHoliday = events.find((event) =>
            event.daysOff.find(
              (dayOff) => isSameOrBefore(day, dayjs(dayOff.end)) && isSameOrAfter(day, dayjs(dayOff.start))
            )
          );

          return (
            <Day
              key={day.format()}
              isCurrentDate={currentDate.isSame(day, 'date')}
              isActiveDate={day.isSame(month.month, 'month')}
              rounded={{
                tl: index === 0,
                tr: index === 6,
                bl: index === month.days.length - 7,
                br: index === month.days.length - 1
              }}
              isDayOff={Number(day.format('d')) === 0 || Number(day.format('d')) === 6}
              day={day}
              isHighlighted={highlightedDates.includes(day.format('YYYY-MM-DD'))}
              isSelected={!!selectedDates.find((i) => i.isSame(day, 'date'))} //.format('YYYY-MM-DD')).includes(day.format('YYYY-MM-DD'))
              isHoliday={!!isHoliday}
              // for event
              onMouseEnter={
                isHoliday
                  ? () =>
                      handleDateMouseEnter(
                        isHoliday?.daysOff.find(
                          (dayOff) => isSameOrBefore(day, dayjs(dayOff.end)) && isSameOrAfter(day, dayjs(dayOff.start))
                        )
                      )
                  : undefined
              }
              onMouseLeave={isHoliday ? handleDateMouseLeave : undefined}
              // for selection
              onMouseDown={() => handleDateMouseDown(day)}
              onMouseOver={isMouseDown ? () => handleDateMouseOver(day) : undefined}
            />
          );
        })}
      </div>
    </div>
  );
}

interface DayProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  day: Dayjs;
  // isHoliday: Event | null;
  isCurrentDate: boolean;
  isActiveDate: boolean; // date from this month or from previous / next
  rounded?: {
    bl: boolean;
    br: boolean;
    tl: boolean;
    tr: boolean;
  };
  isDayOff: boolean; // Sat or Sun
  // isMouseDown: boolean;
  isHighlighted: boolean;
  isSelected: boolean;
  isHoliday: boolean;
}

function Day({
  isCurrentDate,
  isActiveDate,
  rounded,
  isDayOff,
  // isMouseDown,
  day,
  isHighlighted,
  isSelected,
  isHoliday,
  ...props
}: DayProps) {
  return (
    <button
      {...props}
      type="button"
      className={cl(
        isActiveDate
          ? cl(
              'bg-white cursor-pointer font-medium text-gray-900',
              isDayOff && 'bg-gray-100 text-red-500',
              isSelected && 'bg-primary-600 hover:bg-primary-600',
              isHoliday && 'bg-primary-100 hover:bg-primary-100'
            )
          : 'bg-gray-50 text-gray-400',
        'py-1.5 hover:bg-gray-100 focus:z-10 flex justify-center items-center ',

        rounded?.tl && 'rounded-tl-lg',
        rounded?.tr && 'rounded-tr-lg',
        rounded?.bl && 'rounded-bl-lg',
        rounded?.br && 'rounded-br-lg'
        // isHighlighted && 'bg-yellow-200 hover:bg-yellow-200',
        // isMouseDown && 'hover:bg-blue-500',
      )}
    >
      <time
        dateTime={String(day.format())}
        className={cl(
          isCurrentDate && 'bg-primary-500 text-white',
          'w-7 h-7 flex items-center justify-center rounded-full'
        )}
      >
        {isCurrentDate ? day.date() : isHoliday ? (isHighlighted ? day.date() : '+') : day.date()}
      </time>
    </button>
  );
}

function Weeks() {
  return (
    <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
      {WEEKS.map((week) => (
        <div key={week}>{week}</div>
      ))}
    </div>
  );
}
