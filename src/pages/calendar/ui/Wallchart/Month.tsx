import { Menu, Transition } from '@headlessui/react';
import dayjs, { Dayjs } from 'dayjs';
import { Fragment, useState } from 'react';
import { useAppDispatch } from '../../../../app/hooks';
import { useDaysOff } from '../../../../features/calendar/api/daysOffApi';
import { setNewDayOff } from '../../../../features/calendar/slice/calendarSlice';
import { DayOff } from '../../../../features/calendar/types/daysOff';
import { getCurrentDaysInMonth, isSameOrAfter, isSameOrBefore } from '../../lib';
import { getDatesInRange } from '../../lib';
import { MOCKED_HUB_ID } from '../DisapprovedDaysOffList';
import { Day } from './Day';

interface MonthProps {
  userId: string;
}

const currentDate = dayjs();

export function Month({ userId }: MonthProps) {
  const dispatch = useAppDispatch();
  const { data } = useDaysOff(MOCKED_HUB_ID);
  const daysOff = data?.find((i) => i.team_member.id === userId);

  const [highlightedDates, setHighlightedDates] = useState<string[]>([]);
  const [selectedDates, setSelectedDates] = useState<Dayjs[]>([]);
  const days = getCurrentDaysInMonth(currentDate);
  const [isMouseDown, setIsMouseDown] = useState(false);

  // the user clicked on date
  const handleDateMouseDown = (day: Dayjs) => {
    setIsMouseDown(true);
    setSelectedDates([day]);
  };

  // the user hover date
  const handleDateMouseOver = (day: Dayjs) =>
    setSelectedDates((prev) => {
      const startDate = prev[0];
      const endDate = day;

      const datesInRange = [...getDatesInRange(startDate, endDate)];
      return [...datesInRange];
    });

  // the user stopped selecting dates
  const handleDateMouseUp = () => {
    setIsMouseDown(false);
    const start_date = selectedDates[0].format('YYYY-MM-DD');
    const end_date = selectedDates[selectedDates.length - 1].format('YYYY-MM-DD');

    dispatch(setNewDayOff({ start_date, end_date, userId }));

    // reset
    setSelectedDates([]);
  };

  // mouse leave from wallchart
  const handleMouseLeave = isMouseDown
    ? () => {
        setIsMouseDown(false);
        setSelectedDates([]);
      }
    : undefined;

  const handleDateMouseEnter = (event?: DayOff) => {
    if (!event) {
      return;
    }

    const { start_date, end_date } = event;
    const startDate = dayjs(start_date);
    const endDate = dayjs(end_date);

    const datesArray = [...Array(endDate.diff(startDate, 'day') + 1)].map((_, index) =>
      startDate.add(index, 'day').format('YYYY-MM-DD')
    );

    setHighlightedDates(datesArray);
  };

  const handleDateMouseLeave = () => setHighlightedDates([]);

  return (
    <div className="flex border border-gray-100" onMouseLeave={handleMouseLeave}>
      {days.map((day) => {
        const isSelected = !!selectedDates.find((i) => i.isSame(day, 'date'));
        const isDayOff = daysOff?.day_offs.find(
          (dayOff) => isSameOrBefore(day, dayjs(dayOff.end_date)) && isSameOrAfter(day, dayjs(dayOff.start_date))
        );

        return (
          <Day
            isHighlighted={highlightedDates.includes(day.format('YYYY-MM-DD'))}
            leaveType={isDayOff?.leave_type}
            isDayOff={!!isDayOff}
            onMouseUp={isMouseDown ? () => handleDateMouseUp() : undefined}
            onMouseDown={!isDayOff ? () => handleDateMouseDown(day) : undefined}
            onMouseOver={isMouseDown ? () => handleDateMouseOver(day) : undefined}
            day={day}
            key={day.format()}
            isCurrentDay={currentDate.isSame(day, 'date')}
            isSelected={isSelected}
            // for highlight
            onMouseEnter={isDayOff ? () => handleDateMouseEnter(isDayOff) : undefined}
            onMouseLeave={isDayOff ? handleDateMouseLeave : undefined}
          >
            {isDayOff ? (
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
                      {daysOff?.team_member.user.name}
                    </p>
                    <p className="text-sm text-left w-32 text-gray-500">{isDayOff.reason}</p>
                  </div>

                  <span className="whitespace-nowrap rounded-lg px-2.5 py-1 border text-gray-600 text-sm font-semibold shadow-sm hover:bg-gray-50">
                    {isDayOff.leave_type.name}
                  </span>
                </Menu.Items>
              </Transition>
            ) : null}
          </Day>
        );
      })}
    </div>
  );
}
