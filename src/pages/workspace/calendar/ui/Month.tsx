import { Menu, Transition } from '@headlessui/react';
import dayjs, { Dayjs } from 'dayjs';
import { Fragment, useCallback, useState } from 'react';
import { cl } from '../../../../utils';
import { isSameOrAfter, isSameOrBefore } from '../lib/dateUtils';
import { getDatesInRange } from '../lib/getDatesInRange';
import { DayOff, Member, MonthObject } from '../types/calendar';
import Day from './Day';
import MonthTitle from './MonthTitle';
import Weeks from './Weeks';

interface MonthProps {
  daysOff: Member[];
  month: MonthObject;
  handleEvent: ({ start, end }: { start: Dayjs; end: Dayjs }) => void;
  title: JSX.Element;
}

const currentDate = dayjs();

export default function Month({ month, handleEvent, daysOff, title }: MonthProps) {
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
    const start = selectedDates[0];
    const end = selectedDates[selectedDates.length - 1];

    handleEvent({ start, end });
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
    <div
      onMouseUp={isMouseDown ? () => handleDateMouseUp() : undefined}
      key={month.name}
      className="text-center relative"
    >
      {title}
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

          const isDayOff = Number(day.format('d')) === 0 || Number(day.format('d')) === 6;
          const isSelected = !!selectedDates.find((i) => i.isSame(day, 'date'));
          const isActiveDate = day.isSame(month.month, 'month');

          return (
            <Day
              key={day.format()}
              isCurrentDate={currentDate.isSame(day, 'date')}
              isActiveDate={isActiveDate}
              rounded={{
                tl: index === 0,
                tr: index === 6,
                bl: index === month.days.length - 7,
                br: index === month.days.length - 1
              }}
              isDayOff={isDayOff}
              day={day}
              isHighlighted={highlightedDates.includes(day.format('YYYY-MM-DD'))}
              isSelected={isSelected} //.format('YYYY-MM-DD')).includes(day.format('YYYY-MM-DD'))
              isHoliday={!!isHoliday}
              // for event
              onMouseEnter={
                isActiveDate && !isDayOff && isHoliday
                  ? () =>
                      handleDateMouseEnter(
                        isHoliday?.daysOff.find(
                          (dayOff) => isSameOrBefore(day, dayjs(dayOff.end)) && isSameOrAfter(day, dayjs(dayOff.start))
                        )
                      )
                  : undefined
              }
              onMouseLeave={isActiveDate && !isDayOff && isHoliday ? handleDateMouseLeave : undefined}
              // for selection
              onMouseDown={isActiveDate && !isDayOff && !isHoliday ? () => handleDateMouseDown(day) : undefined}
              onMouseOver={isActiveDate && !isDayOff && isMouseDown ? () => handleDateMouseOver(day) : undefined}
            >
              {isHoliday ? (
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute p-2 gap-20 flex border justify-between items-start right-0 top-10 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="flex flex-col gap-2">
                      <p className="whitespace-nowrap text-left text-sm font-medium text-gray-900">
                        {isHoliday.user.name}
                      </p>
                      <p className="text-sm text-left w-32 text-gray-500">
                        {
                          isHoliday?.daysOff.find(
                            (dayOff) =>
                              isSameOrBefore(day, dayjs(dayOff.end)) && isSameOrAfter(day, dayjs(dayOff.start))
                          )?.reason
                        }
                      </p>
                    </div>

                    <span className="whitespace-nowrap rounded-lg px-2.5 py-1 border text-gray-600 text-sm font-semibold shadow-sm hover:bg-gray-50">
                      {
                        isHoliday?.daysOff.find(
                          (dayOff) => isSameOrBefore(day, dayjs(dayOff.end)) && isSameOrAfter(day, dayjs(dayOff.start))
                        )?.type
                      }
                    </span>
                  </Menu.Items>
                </Transition>
              ) : null}
            </Day>
          );
        })}
      </div>
    </div>
  );
}

Month.Title = MonthTitle;
