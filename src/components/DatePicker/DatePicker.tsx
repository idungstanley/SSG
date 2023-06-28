import dayjs, { Dayjs } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React, { useEffect, useRef, useState } from 'react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setHistoryMemory, setTaskSelectedDate } from '../../features/task/taskSlice';
import { Button, Modal } from '@mui/material';
import { DatePickerSideBar } from './DatePickerSideBar';
import { DatePickerManualDates } from './DatePickerManualDate';
import { setSelectedDate } from '../../features/workspace/workspaceSlice';
import { generateDate, groupDatesByDayOfWeek, months } from '../../utils/calendar';
import cn from '../../utils/cn';

interface DatePickerProps {
  styles?: string;
  range?: boolean;
  toggleFn?: React.Dispatch<React.SetStateAction<boolean>>;
}

export type DateString = {
  start?: string;
  due?: string;
};
export default function DatePicker({ styles, range, toggleFn }: DatePickerProps) {
  dayjs.extend(timezone);
  dayjs.extend(utc);
  const dispatch = useAppDispatch();
  const days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const { selectedDate } = useAppSelector((state) => state.workspace);
  const { timezone: zone } = useAppSelector((state) => state.userSetting);
  const { selectedDate: taskTime, HistoryFilterMemory } = useAppSelector((state) => state.task);
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredDate, setHovered] = useState<Dayjs | null | undefined>(HistoryFilterMemory?.hoveredDate);
  const [time, setTime] = useState<string>(dayjs().tz(zone).format('ddd, DD MMM YYYY h:mm A'));

  const closeDateModal = () => {
    if (toggleFn) {
      toggleFn(false);
    }
  };

  const calendarTime = () => setInterval(() => setTime(dayjs().format('ddd, DD MMM YYYY h:mm A')), 60000);

  const handleClick = (date: dayjs.Dayjs) => {
    if (!selectedDate?.dateType) {
      dispatch(setSelectedDate({ date: date, dateType: 'due' }));
      dispatch(setTaskSelectedDate({ from: date }));
      dispatch(setHistoryMemory({ ...HistoryFilterMemory, timePoint: 'due' }));
    }

    if (HistoryFilterMemory?.timePoint && HistoryFilterMemory.timePoint === 'due') {
      dispatch(setSelectedDate({ date: date, dateType: 'start' }));
      dispatch(setTaskSelectedDate({ ...taskTime, to: date }));
      dispatch(setHistoryMemory({ ...HistoryFilterMemory, timePoint: 'start' }));
    }

    if (HistoryFilterMemory?.timePoint && HistoryFilterMemory.timePoint === 'start') {
      dispatch(setSelectedDate({ date: date, dateType: 'due' }));
      dispatch(setTaskSelectedDate({ from: date }));
      dispatch(setHistoryMemory({ ...HistoryFilterMemory, timePoint: 'due' }));
    }
  };

  const handleHover = (date?: dayjs.Dayjs) => {
    if (date) {
      setHovered(date);
      setHistoryMemory({ ...HistoryFilterMemory, hoveredDate: date });
    }
  };

  const dates = generateDate(today.month());
  const groupedDates = groupDatesByDayOfWeek(dates);
  const startDay = 0; // Wednesday (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const sortedKeys = Object.keys(groupedDates).sort((a, b) => {
    const numericDayOfWeekA = parseInt(a, 10);
    const numericDayOfWeekB = parseInt(b, 10);
    const adjustedDayOfWeekA = (numericDayOfWeekA - startDay + 7) % 7;
    const adjustedDayOfWeekB = (numericDayOfWeekB - startDay + 7) % 7;
    return adjustedDayOfWeekA - adjustedDayOfWeekB;
  });

  useEffect(() => {
    calendarTime();
    return () => document.addEventListener('visibilitychange', calendarTime);
  }, []);

  return (
    <Modal open={true} hideBackdrop>
      <section
        onClick={(e) => e.stopPropagation()}
        ref={sectionRef}
        className={
          styles ??
          'absolute z-50 mt-1 shadow-2xl bg-white rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none top-56 right-12'
        }
        style={{ height: '380px', width: '510px' }}
      >
        <DatePickerManualDates range={range} />
        <div className="flex items-center justify-center px-3 border-b" style={{ height: '295px' }}>
          <DatePickerSideBar currentDate={currentDate} />

          <div className="p-1 " style={{ height: '290px' }}>
            <div className="flex items-center justify-between">
              <h1 className="select-none" style={{ fontSize: '14px', fontWeight: '500' }}>
                {months[today.month()]}, {today.year()}
              </h1>
              <div className="flex items-center gap-3">
                <GrFormPrevious
                  className="w-5 h-5 transition-all cursor-pointer hover:scale-105"
                  onClick={() => {
                    setToday(today.month(today.month() - 1));
                  }}
                />
                <h1
                  className="p-2 transition-all rounded-md cursor-pointer hover:scale-105 hover:bg-gray-200"
                  onClick={() => {
                    setToday(currentDate);
                  }}
                >
                  Today
                </h1>
                <GrFormNext
                  className="w-5 h-5 transition-all cursor-pointer hover:scale-105"
                  onClick={() => {
                    setToday(today.month(today.month() + 1));
                  }}
                />
              </div>
            </div>
            <div className="flex h-10 space-x-6 text-center">
              {sortedKeys.map((dayOfWeek) => {
                const numericDayOfWeek = parseInt(dayOfWeek, 10); // Convert dayOfWeek to a number
                const sortedDates = groupedDates[numericDayOfWeek].dates.sort((a, b) => {
                  if (a.date.isSame(b.date, 'day')) {
                    return 0;
                  }
                  return a.date.isBefore(b.date) ? -1 : 1;
                });
                return (
                  <div key={numericDayOfWeek} className="flex flex-col space-y-5">
                    <h3>{days[numericDayOfWeek]}</h3>
                    <div className="">
                      <ul className="text-center grid place-content-center text-sm border-t p-0.5 space-y-5">
                        {sortedDates.map((date) => {
                          const isBlocked =
                            (taskTime?.from &&
                              taskTime?.to &&
                              (date.date.isSame(taskTime.from, 'day') || date.date.isAfter(taskTime.from, 'day')) &&
                              date.date.isBefore(taskTime.to, 'day')) ||
                            date.date.isSame(taskTime?.to, 'day');

                          const isHoverBlocked =
                            hoveredDate &&
                            taskTime?.from &&
                            (date.date.isSame(taskTime.from, 'day') || date.date.isAfter(taskTime.from, 'day')) &&
                            date.date.isBefore(hoveredDate, 'day');

                          const isBlockedOrHoverBlocked = isBlocked || isHoverBlocked;

                          const isSelected =
                            selectedDate?.date &&
                            date.date.isSame(selectedDate.date, 'day') && // Compare full date, including month and year
                            date.date.month() === today.month() && // Compare month
                            date.date.year() === today.year(); // Compare year

                          return (
                            <li
                              key={date.date.toISOString()}
                              className={cn(
                                'h-6 w-6 rounded-full grid place-content-center hover:bg-purple-300 hover:text-white transition-all cursor-pointer select-none',
                                date.currentMonth ? '' : 'text-gray-300',
                                date.today ? 'bg-red-400 text-white rounded-full' : '',
                                isSelected ? 'bg-purple-400 text-white' : '',
                                isBlockedOrHoverBlocked ? 'bg-purple-400 text-white rounded-none w-full' : ''
                              )}
                              onClick={() => handleClick(date.date)}
                              onMouseEnter={() => handleHover(date.date)}
                              onMouseLeave={() => setHovered(null)}
                            >
                              {date.date.format('DD')}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end w-full">
          <div className="flex space-x-2">
            <div className="flex items-center">
              <span className="text-xs italic font-semibold">{time}</span>
            </div>
            <div className="flex space-x-1">
              <Button
                onClick={closeDateModal}
                variant="contained"
                className="hover:bg-purple-600"
                size={'small'}
                sx={{
                  background: '#d559ff',
                  ':hover': { background: '#c128f5' },
                  height: '32px',
                  fontSize: '10px',
                  borderRadius: '0 0 0 0'
                }}
              >
                Confirm
              </Button>
              <Button
                onClick={closeDateModal}
                variant="contained"
                className="hover:bg-purple-600"
                size={'small'}
                sx={{
                  background: '#d559aa',
                  ':hover': { background: '#c128a9' },
                  height: '32px',
                  fontSize: '10px',
                  borderRadius: '0 0 6px 0'
                }}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Modal>
  );
}
