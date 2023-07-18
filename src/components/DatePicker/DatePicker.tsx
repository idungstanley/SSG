import dayjs, { Dayjs } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setHistoryMemory, setTaskSelectedDate } from '../../features/task/taskSlice';
import { Button, Modal } from '@mui/material';
import { DatePickerSideBar } from './DatePickerSideBar';
import { DatePickerManualDates } from './DatePickerManualDate';
import { setSelectedDate } from '../../features/workspace/workspaceSlice';
import { DateObject } from '../../utils/calendar';
import cn from '../../utils/cn';
import { ISelectedDate } from '../../features/task/interface.tasks';
import MiniDatePicker from './MiniCalendar';

interface DatePickerProps {
  styles?: string;
  range?: boolean;
  height?: string;
  width?: string;
  toggleFn?: React.Dispatch<React.SetStateAction<boolean>>;
}

export type DateString = {
  start?: string;
  due?: string;
};
export default function DatePicker({ styles, width, height, range, toggleFn }: DatePickerProps) {
  dayjs.extend(timezone);
  dayjs.extend(utc);
  const dispatch = useAppDispatch();
  const currentDate = dayjs();
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
        style={{ height: height ?? '425px', width: width ?? '540px' }}
      >
        <DatePickerManualDates range={range} />
        <div className="flex border-b" style={{ height: '340px' }}>
          <div className="w-1/3">
            <DatePickerSideBar currentDate={currentDate} />
          </div>
          <div>
            <MiniDatePicker />
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

interface TimePickerprops {
  sortedDates: DateObject[];
  taskTime: ISelectedDate | null;
  today: dayjs.Dayjs;
}

function TimePicker({ sortedDates, taskTime, today }: TimePickerprops) {
  const dispatch = useAppDispatch();
  const { HistoryFilterMemory } = useAppSelector((state) => state.task);
  const { selectedDate } = useAppSelector((state) => state.workspace);
  const [hoveredDate, setHovered] = useState<Dayjs | null | undefined>(HistoryFilterMemory?.hoveredDate);
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
  return (
    <>
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
              'rounded-full p-0.5 hover:bg-purple-300 hover:text-white transition-all cursor-pointer select-none font-bold',
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
    </>
  );
}
