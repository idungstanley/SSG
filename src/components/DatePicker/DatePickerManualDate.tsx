import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { DateString } from './DatePicker';
import { setSelectedDate } from '../../features/workspace/workspaceSlice';
import { setHistoryMemory, setTaskSelectedDate } from '../../features/task/taskSlice';
import dayjs from 'dayjs';
import ReusableSelect from '../../utils/TimeDropDown';
import { createDynamicTimeComponent } from '../../utils/calendar';
import CalendarIcon from '../../assets/icons/CalendarIcon';
import CancelIcon from '../../assets/icons/Cancel';

interface DatePickerManualDatesProps {
  range?: boolean;
}

export function DatePickerManualDates({ range }: DatePickerManualDatesProps) {
  const { HistoryFilterMemory, selectedDate: taskTime } = useAppSelector((state) => state.task);
  const { selectedDate } = useAppSelector((state) => state.workspace);
  const { date_format, timezone } = useAppSelector((state) => state.userSetting);
  const [dateType, setDateType] = useState<string | undefined>('start');
  const [dateString, setString] = useState<DateString | null>({
    start: 'Start',
    due: 'Due'
  });
  const [iconToggle] = useState<{ startIcon: boolean; dueIcon: boolean }>({
    dueIcon: false,
    startIcon: false
  });
  const { timeInterval } = useAppSelector((state) => state.calendar);
  const dispatch = useAppDispatch();

  const handleFilterDateDispatch = (point: 'start' | 'due') => {
    const dateFormat = date_format?.toUpperCase();

    const startDate = dateString?.start ? dayjs(dateString.start, dateFormat) : undefined;
    const dueDate = dateString?.due ? dayjs(dateString.due, dateFormat) : undefined;

    const dateObject = point === 'start' ? startDate : dueDate;

    if (dateObject && dateObject.isValid()) {
      if (point === 'start') {
        dispatch(setHistoryMemory({ ...HistoryFilterMemory, timePoint: 'due' }));
        setDateType('due');
        dispatch(setTaskSelectedDate({ ...taskTime, from: dateObject }));
      }

      if (point === 'due') {
        dispatch(setHistoryMemory({ ...HistoryFilterMemory, timePoint: 'start' }));
        dispatch(setTaskSelectedDate({ ...taskTime, to: dateObject }));
      }
      dispatch(setSelectedDate({ date: dateObject && dateObject, dateType }));
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>, point: string) => {
    const inputData = event.target;
    const allowedChars = inputData.getAttribute('data-allowed-chars');
    const currentValue = inputData.value; // Use .value instead of .textContent

    // Define a regular expression pattern based on the allowed characters
    const pattern = new RegExp(`^[${allowedChars}]*$`);

    // Check if the input matches the pattern
    if (currentValue) {
      if (!pattern.test(currentValue)) {
        // If it doesn't match, remove invalid characters
        inputData.value = currentValue.replace(new RegExp(`[^${allowedChars}]`, 'g'), '');
      }
    }

    if (point === 'from') {
      setString((prev) => ({ ...prev, start: inputData.value as string }));
    } else {
      setString((prev) => ({ ...prev, due: inputData.value as string }));
    }
  };

  const clearDatesFilter = (point: 'start' | 'due') => {
    if (point === 'start') {
      dispatch(setTaskSelectedDate({ to: taskTime?.to }));
      dispatch(setHistoryMemory({ ...HistoryFilterMemory, timePoint: 'due' }));
      setString((prev) => ({ ...prev, start: 'Start' }));
      dispatch(setSelectedDate({ ...selectedDate, date: taskTime?.to ?? dayjs() }));
    }
    if (point === 'due') {
      dispatch(setTaskSelectedDate({ from: taskTime?.from }));
      dispatch(setHistoryMemory({ ...HistoryFilterMemory, timePoint: 'start' }));
      setString((prev) => ({ ...prev, due: 'Due' }));
    }
  };

  const handleClearTime = (point: string) => {
    if (point === 'start') {
      dispatch(setHistoryMemory({ ...HistoryFilterMemory, time: { ...HistoryFilterMemory?.time, from: undefined } }));
    }

    if (point === 'due') {
      dispatch(setHistoryMemory({ ...HistoryFilterMemory, time: { ...HistoryFilterMemory?.time, to: undefined } }));
    }
  };

  useEffect(() => {
    if (taskTime?.from) {
      setString({
        ...dateString,
        start: taskTime?.from?.format(date_format?.toUpperCase())
      });
    }

    if (taskTime?.to) {
      setString({
        ...dateString,
        due: taskTime?.to?.format(date_format?.toUpperCase())
      });
    }
  }, [taskTime, selectedDate]);

  return (
    <div className="flex items-center justify-between py-1">
      {range ? (
        <div className="w-full grid grid-cols-2 place-self-center space-x-1">
          {/* Set Start Date Selection */}
          <div className="relative">
            {taskTime?.from && (
              <div className="absolute bg-white w-max px-1 -top-1.5 left-3 text-alsoit-text-sm z-20">Start Date</div>
            )}
            <input
              type="text"
              className="w-40 h-10 border border-alsoit-purple-300 rounded-md py-1.5 px-8 relative text-alsoit-text-sm font-semibold"
              onBlur={() => handleFilterDateDispatch('start')}
              value={dateString?.start}
              data-allowed-chars="0123456789/-"
              onChange={(e) => handleChange(e, 'from')}
            />
            <div className="bg-alsoit-purple-300 rounded-md p-1 flex items-center w-6 h-6 absolute top-2 left-1">
              <CalendarIcon active={iconToggle.startIcon} fixed />
            </div>
            {taskTime?.from && (
              <div className="pt-1.5 absolute top-1.5 left-20" onClick={() => clearDatesFilter('start')}>
                <CancelIcon active dimensions={{ height: 20, width: 20 }} />
              </div>
            )}
            <div className="absolute top-5 left-24">
              {selectedDate?.date && taskTime?.from ? (
                <ReusableSelect
                  options={createDynamicTimeComponent(timeInterval, timezone)}
                  value={HistoryFilterMemory?.time?.from || ''}
                  style="top-3"
                  onclick={(e: string) => {
                    dispatch(
                      setHistoryMemory({
                        ...HistoryFilterMemory,
                        time: {
                          ...HistoryFilterMemory?.time,
                          from: e
                        }
                      })
                    );
                  }}
                />
              ) : (
                <span className="w-1/3 text-alsoit-text-sm">
                  {(HistoryFilterMemory?.time?.from && `${HistoryFilterMemory?.time?.from}`) ?? undefined}
                </span>
              )}
              {HistoryFilterMemory?.time?.from && (
                <div className="pt-1.5 absolute -top-3.5 left-10" onClick={() => handleClearTime('start')}>
                  <CancelIcon active dimensions={{ height: 20, width: 20 }} />
                </div>
              )}
            </div>
          </div>
          {/* set Due date Selection */}
          <div className="relative">
            {taskTime?.to && (
              <div className="absolute bg-white w-max px-1 -top-1.5 left-3 text-alsoit-text-sm z-20">Due Date</div>
            )}
            <input
              type="text"
              className="w-40 h-10 border border-alsoit-purple-300 rounded-md py-1.5 px-8 relative text-alsoit-text-sm font-semibold"
              onBlur={() => handleFilterDateDispatch('due')}
              value={dateString?.due}
              data-allowed-chars="0123456789/-"
              onInput={(e: ChangeEvent<HTMLInputElement>) => setString({ ...dateString, due: e.target.value })}
            />
            <div className="bg-alsoit-purple-300 rounded-md p-1 flex items-center w-6 h-6 absolute top-2 left-1">
              <CalendarIcon active={iconToggle.startIcon} fixed />
            </div>
            {taskTime?.to && (
              <div className="pt-1.5 absolute top-1.5 left-20" onClick={() => clearDatesFilter('due')}>
                <CancelIcon active dimensions={{ height: 20, width: 20 }} />
              </div>
            )}
            <div className="absolute top-5 left-24">
              {selectedDate?.date && taskTime?.to ? (
                <ReusableSelect
                  options={createDynamicTimeComponent(timeInterval, timezone)}
                  value={HistoryFilterMemory?.time?.to || ''}
                  style="top-3"
                  onclick={(e: string) => {
                    dispatch(
                      setHistoryMemory({
                        ...HistoryFilterMemory,
                        time: {
                          ...HistoryFilterMemory?.time,
                          to: e
                        }
                      })
                    );
                  }}
                />
              ) : (
                <span className="w-1/3 text-alsoit-text-sm">
                  {(HistoryFilterMemory?.time?.to && `${HistoryFilterMemory?.time?.to}`) ?? undefined}
                </span>
              )}
              {HistoryFilterMemory?.time?.to && (
                <div className="pt-1.5 absolute -top-3.5 left-10" onClick={() => handleClearTime('due')}>
                  <CancelIcon active dimensions={{ height: 20, width: 20 }} />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        // Default Set date
        <label
          htmlFor="from"
          className="flex items-center w-48 p-1 space-x-1 space-y-1 text-xs border rounded-md border-alsoit-purple-300"
        >
          <div className="p-1 rounded-md bg-alsoit-purple-300">
            <CalendarIcon active={iconToggle.startIcon} fixed />
          </div>
          <div className="relative">
            <div
              className="h-4 px-1 font-semibold w-28 text-alsoit-text-lg"
              contentEditable
              suppressContentEditableWarning
              onBlur={() => handleFilterDateDispatch('start')}
              onClick={() => dispatch(setHistoryMemory({ ...HistoryFilterMemory, timePoint: 'start' }))}
              onInput={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'due')}
            >
              {(taskTime?.from && dayjs(taskTime?.from).format(date_format?.toUpperCase())) ?? 'Start Date'}
            </div>
            {taskTime?.from && (
              <div onClick={() => clearDatesFilter('start')}>
                <CancelIcon active dimensions={{ height: 2, width: 2 }} />
              </div>
            )}
          </div>
        </label>
      )}
    </div>
  );
}
