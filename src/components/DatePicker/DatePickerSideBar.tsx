import dayjs, { Dayjs } from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setHistoryMemory, setTaskSelectedDate } from '../../features/task/taskSlice';
import { setSelectedDate } from '../../features/workspace/workspaceSlice';
import { generateDate, weekends, weeks } from '../../utils/calendar';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useState } from 'react';

interface DatePickerSideBarProp {
  currentDate: dayjs.Dayjs;
}

export function DatePickerSideBar({ currentDate }: DatePickerSideBarProp) {
  const dispatch = useAppDispatch();
  const [showRecurring, setRecurring] = useState<boolean>(false);
  const { HistoryFilterMemory } = useAppSelector((state) => state.task);
  let selectedStartOfWeek: Dayjs | null = null;
  let selectedEndOfWeek: Dayjs | null = null;

  // Function to handle week selection
  const handleWeekButtonClick = (durationCount: number): void => {
    const currentDate: Dayjs = dayjs();
    const nextWeekStart: Dayjs = currentDate.add(durationCount ?? 1, 'week').startOf('week');
    const nextWeekEnd: Dayjs = currentDate.add(durationCount ?? 1, 'week').endOf('week');

    if (!selectedStartOfWeek) {
      // If no start of week is selected, set the next week as the selected week
      selectedStartOfWeek = nextWeekStart;
      selectedEndOfWeek = nextWeekEnd;
      dispatch(setTaskSelectedDate({ from: nextWeekStart, to: nextWeekEnd }));
    } else {
      // If start of week is already selected, reset the selection
      selectedStartOfWeek = null;
      selectedEndOfWeek = null;
      selectedStartOfWeek = nextWeekStart;
      selectedEndOfWeek = nextWeekEnd;
      dispatch(setTaskSelectedDate({ from: nextWeekStart, to: nextWeekEnd }));
    }
  };

  let selectedWeekends: dayjs.Dayjs[] = [];

  // Function to handle weekend selection
  const handleWeekendButtonClick = (durationType: 'weekend' | 'next weekend') => {
    const currentDate = dayjs();
    const nextWeekend = findNextWeekend(currentDate);
    const secondWeekend = findFirstSaturdayOneWeekAfter(currentDate);

    if (nextWeekend && secondWeekend) {
      selectedWeekends = [nextWeekend.date, secondWeekend];
      if (durationType === 'weekend') {
        dispatch(setTaskSelectedDate({ from: selectedWeekends[0], to: selectedWeekends[0] }));
        dispatch(setSelectedDate({ date: selectedWeekends[0] }));
        return selectedWeekends[0];
      } else {
        dispatch(setTaskSelectedDate({ from: selectedWeekends[1], to: selectedWeekends[1] }));
        dispatch(setSelectedDate({ date: selectedWeekends[1] }));
        return selectedWeekends[1];
      }
    } else {
      // If either the next weekend or the 2nd weekend is not found, reset the selection
      selectedWeekends = [];
    }
  };

  const handleDayClick = (type: string) => {
    if (type === 'today') {
      dispatch(
        setTaskSelectedDate({
          from: currentDate
        })
      );
      dispatch(setSelectedDate({ date: currentDate }));
    } else {
      dispatch(
        setTaskSelectedDate({
          from: currentDate.add(1, 'day')
        })
      );
      dispatch(setSelectedDate({ date: currentDate.add(1, 'day') }));
    }
  };

  const handleWeekClick = () => {
    dispatch(setTaskSelectedDate({ from: dayjs().add(8, 'days') }));
    dispatch(setSelectedDate({ date: dayjs().add(8, 'days') }));
  };

  // Function to find the next weekend based on the current date
  const findNextWeekend = (currentDate: dayjs.Dayjs) => {
    const dates = generateDate(); // Generate the date array

    // Find the next weekend after the current date
    const nextWeekend = dates.find((date) => date.isWeekend && date.date.isAfter(currentDate, 'day'));

    return nextWeekend;
  };

  // Function to find the first Saturday one week after the current date
  const findFirstSaturdayOneWeekAfter = (currentDate: dayjs.Dayjs) => {
    let firstSaturday: dayjs.Dayjs | null = null;

    // Find the first Saturday one week after the current date
    const firstSaturdayCandidate = currentDate.day(6).add(1, 'week');
    if (firstSaturdayCandidate.isAfter(currentDate, 'day')) {
      firstSaturday = firstSaturdayCandidate;
    }

    return firstSaturday;
  };

  return (
    <div className="w-56 py-1 space-y-2 border-r text-sm border-gray-200" style={{ height: '250px', fontSize: '12px' }}>
      <div
        className="font-semibold rounded-md hover:bg-gray-200 flex justify-between pr-1 w-full mb-6"
        onClick={() => setRecurring(!showRecurring)}
      >
        <span style={{ fontSize: '10px' }}>Recurring</span>
        {showRecurring ? <IoIosArrowDown /> : <IoIosArrowUp />}
      </div>
      <p
        className="font-semibold rounded-md hover:bg-gray-200 flex justify-between pr-1 w-full"
        onClick={() => handleDayClick('today')}
      >
        <span style={{ fontSize: '10px' }}>Today</span>
        <span style={{ fontSize: '10px' }} className="text-gray-400 text-right">
          {dayjs().format('ddd')}
        </span>
      </p>
      <p
        className="font-semibold rounded-md hover:bg-gray-200 flex justify-between pr-1 w-full"
        onClick={() =>
          dispatch(
            setHistoryMemory({
              ...HistoryFilterMemory,
              time: {
                ...HistoryFilterMemory?.time,
                from: dayjs().add(4, 'hour').format('h:mm A')
              }
            })
          )
        }
      >
        <span style={{ fontSize: '10px' }}>Later</span>
        <span style={{ fontSize: '10px' }} className="text-gray-400 text-right">
          {dayjs().add(4, 'hour').format('h:mm A')}
        </span>
      </p>
      <p
        className="font-semibold rounded-md hover:bg-gray-200 flex justify-between pr-1 w-full"
        onClick={() => handleDayClick('tomorrow')}
      >
        <span style={{ fontSize: '10px' }}>Tomorrow</span>
        <span style={{ fontSize: '10px' }} className="text-gray-400 text-right">
          {dayjs().add(1, 'day').format('ddd')}
        </span>
      </p>
      <p
        className="font-semibold rounded-md hover:bg-gray-200 flex justify-between pr-1 w-full"
        onClick={() => handleWeekendButtonClick('weekend')}
      >
        <span style={{ fontSize: '10px' }}>This Weekend</span>
        <span style={{ fontSize: '10px' }} className="text-gray-400 text-right">
          {dayjs(weekends('weekend')[1]).format('ddd')}
        </span>
      </p>
      <p
        className="font-semibold rounded-md hover:bg-gray-200 flex justify-between pr-1 w-full"
        onClick={() => handleWeekendButtonClick('next weekend')}
      >
        <span style={{ fontSize: '10px' }}>Next Weekend</span>
        <span style={{ fontSize: '10px' }} className="text-gray-400 text-right">
          {dayjs(weekends('nweekend')[1]).format('ddd D')}
        </span>
      </p>
      <p
        className="font-semibold rounded-md hover:bg-gray-200 flex justify-between pr-1 w-full"
        onClick={() => handleWeekClick()}
      >
        <span style={{ fontSize: '10px' }}>Next Week</span>
        <span style={{ fontSize: '10px' }} className="text-gray-400 text-right">
          {dayjs().add(8, 'days').format('ddd D')}
        </span>
      </p>
      <p
        className="font-semibold rounded-md hover:bg-gray-200 flex justify-between pr-1 w-full"
        onClick={() => handleWeekButtonClick(1)}
      >
        <span style={{ fontSize: '10px' }}>Next Work Week</span>
        <span style={{ fontSize: '10px' }} className="text-gray-400 text-right">
          {dayjs(weeks(1)).format('ddd D')}
        </span>
      </p>
      <p
        className="font-semibold rounded-md hover:bg-gray-200 flex justify-between pr-1 w-full"
        onClick={() => handleWeekButtonClick(2)}
      >
        <span style={{ fontSize: '10px' }}>Next 2 Work Weeks</span>
        <span style={{ fontSize: '10px' }} className="text-gray-400 text-right">
          {dayjs(weeks(2)).format('ddd D')}
        </span>
      </p>
    </div>
  );
}
