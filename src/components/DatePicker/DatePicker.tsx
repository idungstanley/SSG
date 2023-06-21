import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { MdOutlineDateRange } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setTaskSelectedDate } from '../../features/task/taskSlice';
import { Button, Modal } from '@mui/material';
import { DatePickerSideBar } from './DatePickerSideBar';
import { DatePickerManualDates } from './DatePickerManualDate';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
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
  const dispatch = useAppDispatch();
  const days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [showRecurring, setRecurring] = useState<boolean>(false);
  const { selectedDate } = useAppSelector((state) => state.workspace);
  const { selectedDate: taskTime } = useAppSelector((state) => state.task);
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredDate, setHovered] = useState<Dayjs | null>(null);

  const closeDateModal = () => {
    if (toggleFn) {
      toggleFn(false);
    }
  };

  const dates = generateDate();
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
    if (!selectedDate?.date?.isSame(today, 'day')) {
      if (taskTime?.from) {
        dispatch(setTaskSelectedDate({ from: taskTime.from, to: selectedDate?.date }));
      } else {
        dispatch(setTaskSelectedDate({ from: selectedDate?.date }));
      }

      if (taskTime?.to != undefined) {
        dispatch(setTaskSelectedDate(null));
      }
    }
  }, [selectedDate?.date]);

  return (
    <Modal open={true} hideBackdrop>
      <section
        onClick={(e) => e.stopPropagation()}
        ref={sectionRef}
        className={
          styles ??
          'absolute z-50 mt-1 shadow-2xl bg-white rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none top-56 right-12'
        }
        style={{ height: '359px', width: '500px' }}
      >
        <DatePickerManualDates range={range} />
        {/* Dynamic Dates section */}
        <div className="flex items-center justify-between w-full h-10 px-2 py-4 space-x-2 border border-gray-200">
          <div className="flex space-x-2 items-center">
            <MdOutlineDateRange className="w-4 h-4 font-light" />
            <p className="font-semibold">
              {dayjs(selectedDate?.date.toDate().toISOString()).format('ddd, MMM DD, YYYY')}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center px-3 border-b" style={{ height: '250px' }}>
          {!showRecurring ? (
            <DatePickerSideBar currentDate={currentDate} />
          ) : (
            <div className="grid place-content-center text-sm font-semibold w-40 border-r h-full border-gray-200">
              Coming soon!!!
            </div>
          )}

          <div className="p-2" style={{ height: '280px' }}>
            <div className="flex items-center justify-between">
              <h1 className="select-none" style={{ fontSize: '14px', fontWeight: '500' }}>
                {months[today.month()]}, {today.year()}
              </h1>
              <div className="flex items-center gap-3 ">
                <GrFormPrevious
                  className="w-5 h-5 transition-all cursor-pointer hover:scale-105"
                  onClick={() => {
                    setToday(today.month(today.month() - 1));
                  }}
                />
                <h1
                  className="p-2 transition-all rounded-md cursor-pointer  hover:scale-105 hover:bg-gray-200"
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
            <div className="flex text-center h-10 space-x-6">
              {sortedKeys.map((dayOfWeek) => {
                const numericDayOfWeek = parseInt(dayOfWeek, 10); // Convert dayOfWeek to a number
                const sortedDates = groupedDates[numericDayOfWeek].dates.sort((a, b) => {
                  if (a.date.isSame(b.date, 'day')) {
                    return 0;
                  }
                  return a.date.isBefore(b.date) ? -1 : 1;
                });
                return (
                  <div key={numericDayOfWeek} className="flex flex-col space-y-3">
                    <h3>{days[numericDayOfWeek]}</h3>
                    <ul className="text-center grid place-content-center text-sm border-t p-0.5 space-y-4">
                      {sortedDates.map((date) => {
                        const isBlocked =
                          taskTime?.from &&
                          taskTime.to &&
                          (date.date.isSame(taskTime.from, 'day') || date.date.isAfter(taskTime.from, 'day')) &&
                          date.date.isBefore(taskTime.to, 'day');

                        const isHoverBlocked =
                          taskTime?.from &&
                          hoveredDate &&
                          (date.date.isSame(taskTime.from, 'day') || date.date.isAfter(taskTime.from, 'day')) &&
                          date.date.isBefore(hoveredDate, 'day');

                        const isBlockedOrHoverBlocked = isBlocked || isHoverBlocked;

                        return (
                          <li
                            key={date.date.toISOString()}
                            className={cn(
                              'h-6 w-6 rounded-full grid place-content-center hover:bg-purple-300 hover:text-white transition-all cursor-pointer select-none',
                              date.currentMonth ? '' : 'text-gray-500',
                              date.today ? 'bg-red-400 text-white' : '',
                              date.currentWeek ? 'bg-gray-300 text-white' : '',
                              selectedDate?.date.date() === date.date.date()
                                ? 'bg-purple-400 text-white brightness-150'
                                : '',
                              isBlockedOrHoverBlocked ? 'bg-purple-400 text-white rounded-none' : ''
                            )}
                            onClick={() => {
                              dispatch(setSelectedDate({ date: date.date, dateType: 'from' }));
                            }}
                            onMouseEnter={() => setHovered(date.date)}
                            onMouseLeave={() => setHovered(null)}
                          >
                            {date.date.format('DD')}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center w-full">
          <div
            className="flex items-center justify-between px-1 border h-8 cursor-pointer w-32"
            style={{ width: '133px' }}
            onClick={() => setRecurring(!showRecurring)}
          >
            <span className="ml-2 text-xs font-semibold" style={{ fontSize: '10px' }}>
              Recurring
            </span>
            {showRecurring ? <IoIosArrowDown /> : <IoIosArrowUp />}
          </div>
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
              borderRadius: '0 0 6px 0'
            }}
          >
            Close
          </Button>
        </div>
      </section>
    </Modal>
  );
}
