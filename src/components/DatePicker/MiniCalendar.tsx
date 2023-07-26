import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { changeDateMonth, getCalendarRows } from '../../utils/calendar';
import ArrowRight from '../../assets/icons/ArrowRight';
import ArrowLeft from '../../assets/icons/ArrowLeft';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setSelectedDate } from '../../features/workspace/workspaceSlice';
import { setHistoryMemory, setTaskSelectedDate } from '../../features/task/taskSlice';

export default function MiniDatePicker() {
  const dispatch = useAppDispatch();
  const [today] = useState(dayjs());
  const [shownDate, setShownDate] = useState<dayjs.Dayjs>(today);
  const [iconToggle, setIconToggle] = useState<{ rightIcon: boolean; leftIcon: boolean }>({
    rightIcon: false,
    leftIcon: false
  });
  const [hoveredDate, setHoveredDate] = useState<dayjs.Dayjs | null>(null);
  const { HistoryFilterMemory, selectedDate: taskTime } = useAppSelector((state) => state.task);
  const { selectedDate } = useAppSelector((state) => state.workspace);

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

  const handleHoverDate = (value: dayjs.Dayjs) => {
    if (taskTime?.from && !taskTime?.to) {
      if (value.isSame(taskTime?.from) || value.isAfter(taskTime?.from)) {
        setHoveredDate(value);
      } else {
        setHoveredDate(null);
      }
    } else if (taskTime?.from && taskTime?.to && value.isAfter(taskTime?.from) && value.isBefore(taskTime?.to)) {
      setHoveredDate(value);
    } else {
      setHoveredDate(null);
    }
  };

  const isStartDate = (value: dayjs.Dayjs) => {
    if (!taskTime?.from) {
      return false;
    }
    return value.isSame(taskTime.from, 'day');
  };

  const isEndDate = (value: dayjs.Dayjs) => {
    if (!taskTime?.to) {
      return false;
    }
    return value.isSame(taskTime?.to, 'day');
  };

  const isDateInRange = (value: dayjs.Dayjs) => {
    if (!taskTime?.from) {
      return false;
    }

    if (taskTime?.to) {
      return (
        (value.isAfter(taskTime?.from) || value.isSame(taskTime?.from, 'day')) &&
        (value.isBefore(taskTime?.to) || value.isSame(taskTime?.to, 'day'))
      );
    }

    if (hoveredDate) {
      return (
        (value.isAfter(taskTime?.from) || value.isSame(taskTime?.from, 'day')) &&
        (value.isBefore(hoveredDate) || value.isSame(hoveredDate, 'day'))
      );
    }

    return false;
  };

  const rows = useMemo(() => getCalendarRows(shownDate), [shownDate]);

  const handleIconClick = (isNextMonth: boolean) => {
    setShownDate(changeDateMonth(shownDate, isNextMonth));
  };

  return (
    <div className="w-full flex flex-col space-y-4 justify-center items-center">
      <div className="flex flex-col space-y-2 w-full justify-center">
        <div className="flex justify-between px-2">
          <span className="text-alsoit-text-lg font-semibold">{today.format('MMMM, YYYY')}</span>
          <div className="flex space-x-4 items-center">
            <span
              className="font-bold text-xs cursor-pointer"
              onClick={() => handleIconClick(false)}
              onMouseEnter={() => setIconToggle((prev) => ({ ...prev, leftIcon: true }))}
              onMouseLeave={() => setIconToggle((prev) => ({ ...prev, leftIcon: false }))}
            >
              <ArrowLeft active={iconToggle.leftIcon} />
            </span>
            <span>{shownDate.format('MMMM')}</span>
            <span
              className="font-bold text-xs cursor-pointer"
              onClick={() => handleIconClick(true)}
              onMouseEnter={() => setIconToggle((prev) => ({ ...prev, rightIcon: true }))}
              onMouseLeave={() => setIconToggle((prev) => ({ ...prev, rightIcon: false }))}
            >
              <ArrowRight active={iconToggle.rightIcon} />
            </span>
          </div>
        </div>
        <div className="w-full flex justify-center space-x-6">
          {rows[0].map(({ value }, i) => (
            <div key={i} className="px-1.5">
              {value.format('dd')}
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center w-96 mx-auto">
          {rows.map((cells, rowIndex) => (
            <div key={rowIndex} className="flex justify-center space-x-5 my-2">
              {cells.map(({ text, value }, i) => (
                <div
                  key={`${text}-${i}`}
                  className={`w-5 h-5 flex justify-center items-center rounded-full p-4 text-alsoit-text-lg font-semibold cursor-pointer ${
                    isStartDate(value)
                      ? 'bg-blue-600 text-white'
                      : isEndDate(value)
                      ? 'bg-blue-600 text-white'
                      : isDateInRange(value)
                      ? 'bg-blue-600 text-white'
                      : hoveredDate && value.isSame(hoveredDate, 'day') && !taskTime?.to
                      ? 'bg-blue-200'
                      : ''
                  } ${value.month() !== today.month() ? 'text-alsoit-gray-75' : 'text-alsoit-gray-200'} ${
                    today.date() === value.date() && today.month() === value.month() && 'bg-blue-400 text-white'
                  }`}
                  onClick={() => handleClick(value)}
                  onMouseEnter={() => handleHoverDate(value)}
                  onMouseLeave={() => setHoveredDate(null)}
                >
                  {text}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
