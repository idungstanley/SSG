import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { changeDateMonth, getCalendarRows, getWeekNumbersForMonth } from '../../utils/calendar';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setActivityFilterDate, setSelectedDate } from '../../features/workspace/workspaceSlice';
import { setHistoryMemory, setTaskSelectedDate } from '../../features/task/taskSlice';
import CircleArrowLeft from '../../assets/icons/CircleArrowLeft';
import CircleArrowRight from '../../assets/icons/CircleArrowRight';
import RecurringIcon from '../../assets/icons/Recurring';
import { FilterListIcon } from '../../assets/icons/FilterListIcon';
import CollapseItems from '../CollapseItems';
import ArrowLeft from '../../assets/icons/ArrowLeft';
import ArrowRight from '../../assets/icons/ArrowRight';
import { cl } from '../../utils';
import ThreeDotIcon from '../../assets/icons/ThreeDotIcon';
import ToolTip from '../Tooltip/Tooltip';

type Props = {
  range?: boolean;
  miniMode?: boolean;
  fullCalendar?: boolean;
  dateFilter?: boolean;
  type?: string;
};

export default function MiniDatePicker({ range, miniMode, fullCalendar, dateFilter, type }: Props) {
  const dispatch = useAppDispatch();
  const [today] = useState(dayjs());
  const [shownDate, setShownDate] = useState<dayjs.Dayjs>(today);
  const [iconToggle, setIconToggle] = useState<{ rightIcon: boolean; leftIcon: boolean }>({
    rightIcon: true,
    leftIcon: true
  });
  const [hoveredDate, setHoveredDate] = useState<dayjs.Dayjs | null>(null);

  const { HistoryFilterMemory, selectedDate: taskTime } = useAppSelector((state) => state.task);
  const { selectedDate, activityFilterDate } = useAppSelector((state) => state.workspace);
  const { start_week } = useAppSelector((state) => state.userSetting);

  const handleClick = (date: dayjs.Dayjs) => {
    if (dateFilter && dayjs.isDayjs(activityFilterDate?.start) && dayjs.isDayjs(activityFilterDate?.end))
      return dispatch(setActivityFilterDate({ start: date }));

    if (
      dateFilter &&
      activityFilterDate !== null &&
      dayjs.isDayjs(activityFilterDate?.start) &&
      !activityFilterDate.end
    ) {
      return dispatch(setActivityFilterDate({ start: activityFilterDate?.start as Dayjs, end: date }));
    } else if (
      dateFilter &&
      (activityFilterDate === null || (activityFilterDate !== null && dayjs.isDayjs(activityFilterDate?.end)))
    ) {
      return dispatch(setActivityFilterDate({ start: date, end: activityFilterDate?.end as Dayjs }));
    }

    if (!selectedDate?.dateType || (taskTime?.from && !range)) {
      dispatch(setSelectedDate({ date: date, dateType: 'due' }));
      dispatch(setTaskSelectedDate({ from: date }));
      dispatch(setHistoryMemory({ ...HistoryFilterMemory, timePoint: 'due' }));
    }

    if (HistoryFilterMemory?.timePoint && HistoryFilterMemory.timePoint === 'due' && range) {
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
    if (!taskTime?.from || !selectedDate?.date) {
      return false;
    }
    return value.isSame(taskTime.from, 'day') || value.isSame(selectedDate.date, 'day');
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

  const rows = useMemo(() => getCalendarRows(shownDate, Number(start_week)), [shownDate]);

  const handleIconClick = (isNextMonth: boolean) => {
    setShownDate(changeDateMonth(shownDate, isNextMonth));
  };

  const filterFloat = () => (
    <div className="absolute -top-2 right-0 w-3 h-3">
      <FilterListIcon />
    </div>
  );

  const sideWeekNumber = () => (
    <div className="flex flex-col space-y-3.5">
      <span className="font-semibold px-1 pt-2 rounded-md uppercase text-alsoit-text-md">Week</span>
      {getWeekNumbersForMonth(dayjs().month(), dayjs().year()).map((week, index) => (
        <div key={index} className="px-4 py-1 text-alsoit-text-xi text-alsoit-gray-200 font-semibold flex items-end">
          {week.slice(0, 1)}
        </div>
      ))}
    </div>
  );

  useEffect(() => {
    if (taskTime?.from) {
      setShownDate(taskTime.from);
    }
  }, [taskTime]);

  return (
    <div className="w-full flex flex-col space-y-4">
      <div className="flex flex-col space-y-2 w-full ">
        <div className={cl(' w-full', !miniMode && range ? 'flex justify-between w-full' : 'flex justify-end w-full')}>
          {!miniMode && range && (
            <div className="font-extrabold text-alsoit-text-lg cursor-pointer flex items-center space-x-2">
              <RecurringIcon active />
              <span>Set Recurring</span>
            </div>
          )}
          {type === 'pop-out' && (
            <CollapseItems
              headerBg="bg-alsoit-gray-75"
              header="calendar"
              headerText="text-white"
              menuButton={<ThreeDotIcon className="hover:text-alsoit-purple-300" />}
            >
              <div className="w-full">
                <div
                  className="flex items-center justify-between h-8 w-full mx-auto text-alsoit-text-md"
                  style={{ width: '95%' }}
                >
                  <ToolTip title="Return to today" placement="right">
                    <button className="h-6 rounded px-1 bg-alsoit-purple-100 text-white">Today</button>
                  </ToolTip>
                  <div className="flex items-center gap-2">
                    <span className="text-alsoit-text-md">{shownDate.format('MMMM YYYY')}</span>
                    <div className="flex items-center gap-4 mr-2">
                      <ToolTip title="Previous Month" placement="left">
                        <button
                          className="cursor-pointer"
                          onClick={() => handleIconClick(false)}
                          onMouseEnter={() => setIconToggle((prev) => ({ ...prev, leftIcon: true }))}
                          onMouseLeave={() => setIconToggle((prev) => ({ ...prev, leftIcon: false }))}
                        >
                          <ArrowLeft color="#919191" />
                        </button>
                      </ToolTip>
                      <ToolTip title="Next Month" placement="left">
                        <button
                          className="cursor-pointer"
                          onClick={() => handleIconClick(true)}
                          onMouseEnter={() => setIconToggle((prev) => ({ ...prev, rightIcon: true }))}
                          onMouseLeave={() => setIconToggle((prev) => ({ ...prev, rightIcon: false }))}
                        >
                          <ArrowRight color="#919191" />
                        </button>
                      </ToolTip>
                    </div>
                  </div>
                </div>
                <div className="bg-white mx-auto py-2" style={{ width: '90%' }}>
                  <div className={cl('w-full flex justify-center space-x-2')}>
                    {rows[0].map(({ value }, i) => (
                      <ToolTip title={value.format('ddd')} placement="top" key={i}>
                        <div
                          style={{ height: '15px', padding: '1px' }}
                          className="bg-alsoit-gray-50 rounded w-8 flex justify-center items-center text-alsoit-text-md uppercase text-alsoit-gray-100 font-semibold"
                        >
                          {value.format('ddd')}
                        </div>
                      </ToolTip>
                    ))}
                  </div>
                  <div className="flex flex-col w-full mx-auto">
                    {rows.map((cells, rowIndex) => (
                      <div key={rowIndex} className={cl('flex justify-center my-1 space-x-2')}>
                        {cells.map(({ text, value }, i) => (
                          <ToolTip title="Select date" placement="top" key={i}>
                            <div
                              key={`${text}-${i}`}
                              className={`w-8 h-8 flex justify-center items-center text-alsoit-text-md font-semibold cursor-pointer relative  ${
                                isStartDate(value)
                                  ? 'bg-blue-600 text-white hover:bg-blue-600'
                                  : isEndDate(value) && range
                                  ? 'bg-blue-600 text-white hover:bg-blue-600'
                                  : isDateInRange(value) && range
                                  ? 'bg-blue-600 text-white hover:bg-blue-600'
                                  : hoveredDate && value.isSame(hoveredDate, 'day') && !taskTime?.to
                                  ? 'bg-blue-200 hover:bg-alsoit-gray-50'
                                  : ''
                              } ${
                                value.month() !== today.month()
                                  ? 'text-alsoit-gray-75 hover:bg-alsoit-gray-50'
                                  : 'text-alsoit-gray-200 hover:bg-alsoit-gray-50'
                              } ${
                                today.date() === value.date() && today.month() === value.month()
                                  ? 'bg-alsoit-purple-300 text-white rounded-full hover:bg-alsoit-purple-300'
                                  : 'rounded hover:bg-alsoit-gray-50'
                              }`}
                              onClick={() => handleClick(value)}
                              onMouseEnter={() => handleHoverDate(value)}
                              onMouseLeave={() => setHoveredDate(null)}
                            >
                              {text}
                              {value == activityFilterDate?.start
                                ? filterFloat()
                                : value == activityFilterDate?.end
                                ? filterFloat()
                                : null}
                            </div>
                          </ToolTip>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CollapseItems>
          )}
          {type !== 'pop-out' && (
            <div className="flex space-x-2 items-center">
              <span>{shownDate.format('MMMM')}</span>
              <span
                className="font-bold text-xs cursor-pointer hover:bg-alsoit-purple-50 rounded-md p-1"
                onClick={() => handleIconClick(false)}
                onMouseEnter={() => setIconToggle((prev) => ({ ...prev, leftIcon: true }))}
                onMouseLeave={() => setIconToggle((prev) => ({ ...prev, leftIcon: false }))}
              >
                <CircleArrowLeft active={iconToggle.leftIcon} />
              </span>
              <span
                className="font-bold text-xs cursor-pointer hover:bg-alsoit-purple-50 rounded-md p-1"
                onClick={() => handleIconClick(true)}
                onMouseEnter={() => setIconToggle((prev) => ({ ...prev, rightIcon: true }))}
                onMouseLeave={() => setIconToggle((prev) => ({ ...prev, rightIcon: false }))}
              >
                <CircleArrowRight active={iconToggle.rightIcon} />
              </span>
            </div>
          )}
        </div>
        {type !== 'pop-out' && (
          <div className="flex space-x-1">
            {sideWeekNumber()}
            <div>
              <div
                className={
                  fullCalendar && !miniMode
                    ? 'w-full flex justify-center space-x-5'
                    : 'w-full flex justify-center space-x-2'
                }
              >
                {rows[0].map(({ value }, i) => (
                  <div key={i} className="px-1.5 bg-alsoit-gray-50 rounded-md p-1">
                    {value.format('ddd')}
                  </div>
                ))}
              </div>
              <div className="flex flex-col w-full mx-auto">
                {rows.map((cells, rowIndex) => (
                  <div
                    key={rowIndex}
                    className={
                      fullCalendar && !miniMode
                        ? 'flex justify-center space-x-6 my-1'
                        : 'flex justify-center space-x-3 my-1'
                    }
                  >
                    {cells.map(({ text, value }, i) => (
                      <div
                        key={`${text}-${i}`}
                        className={`w-5 h-5 flex justify-center items-center rounded-md p-4 text-alsoit-text-lg font-semibold cursor-pointer relative ${
                          isStartDate(value)
                            ? 'bg-blue-600 text-white'
                            : isEndDate(value) && range
                            ? 'bg-blue-600 text-white'
                            : isDateInRange(value) && range
                            ? 'bg-blue-600 text-white'
                            : hoveredDate && value.isSame(hoveredDate, 'day') && !taskTime?.to
                            ? 'bg-blue-200'
                            : ''
                        } ${value.month() !== today.month() ? 'text-alsoit-gray-75' : 'text-alsoit-gray-200'} ${
                          today.date() === value.date() &&
                          today.month() === value.month() &&
                          'bg-alsoit-purple-300 text-white'
                        }`}
                        onClick={() => handleClick(value)}
                        onMouseEnter={() => handleHoverDate(value)}
                        onMouseLeave={() => setHoveredDate(null)}
                      >
                        {text}
                        {value == activityFilterDate?.start
                          ? filterFloat()
                          : value == activityFilterDate?.end
                          ? filterFloat()
                          : null}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
