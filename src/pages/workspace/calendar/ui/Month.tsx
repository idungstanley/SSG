import dayjs, { Dayjs } from 'dayjs';
import { useCallback, useState } from 'react';
import { cl } from '../../../../utils';
import { isSameOrAfter, isSameOrBefore } from '../lib/dateUtils';
import { getDatesInRange } from '../lib/getDatesInRange';
import { DayOff, Event, MonthObject } from '../types/calendar';
import Day from './Day';
import Weeks from './Weeks';

interface MonthProps {
  daysOff: Event[];
  month: MonthObject;
  handleEvent: (i: Dayjs[]) => void;
}

const currentDate = dayjs();

export default function Month({ month, handleEvent, daysOff }: MonthProps) {
  const [selectedDates, setSelectedDates] = useState<Dayjs[]>([]);
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
    handleEvent(selectedDates);
    setSelectedDates([]);
  };

  const handleDateMouseOver = useCallback(
    (day: Dayjs) =>
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
        {month.days.map((day, index) => {
          const isHoliday = daysOff.find((event) =>
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
