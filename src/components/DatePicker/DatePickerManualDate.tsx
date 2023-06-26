import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { DateString } from './DatePicker';
import moment from 'moment';
import { setSelectedDate } from '../../features/workspace/workspaceSlice';
import { setHistoryMemory, setTaskSelectedDate } from '../../features/task/taskSlice';
import { BsCalendarEvent } from 'react-icons/bs';
import dayjs from 'dayjs';
import ReusableSelect from '../../utils/TimeDropDown';
import { createDynamicTimeComponent } from '../../utils/calendar';
import { CloseBtn } from '../Buttons/CloseButton';

interface DatePickerManualDatesProps {
  range?: boolean;
}

export function DatePickerManualDates({ range }: DatePickerManualDatesProps) {
  const { HistoryFilterMemory, selectedDate: taskTime } = useAppSelector((state) => state.task);
  const { selectedDate } = useAppSelector((state) => state.workspace);
  const { date_format, timezone } = useAppSelector((state) => state.userSetting);
  const [dateType, setDateType] = useState<string | undefined>();
  const [dateString, setString] = useState<DateString | null>(null);
  const dispatch = useAppDispatch();

  const handleFilterDateDispatch = (event: ChangeEvent<HTMLDivElement>) => {
    const type = (selectedDate?.dateType && selectedDate.dateType) ?? 'start';
    const dateObject =
      type === 'start'
        ? moment(dateString?.start, date_format?.toUpperCase())
        : moment(dateString?.due, date_format?.toUpperCase());
    type === 'start'
      ? dispatch(setHistoryMemory({ ...HistoryFilterMemory, timePoint: 'start' }))
      : dispatch(setHistoryMemory({ ...HistoryFilterMemory, timePoint: 'due' }));

    dateObject.isValid() ? dispatch(setSelectedDate({ date: dayjs(dateObject.toDate()), dateType })) : null;
  };

  const clearDatesFilter = (point: 'start' | 'due') => {
    if (point === 'start') {
      dispatch(setTaskSelectedDate({ to: taskTime?.to }));
      dispatch(setHistoryMemory({ ...HistoryFilterMemory, timePoint: 'due' }));
      setString((prev) => ({ ...prev, start: undefined }));
      dispatch(setSelectedDate({ ...selectedDate, date: taskTime?.to ?? dayjs() }));
    }
    if (point === 'due') {
      dispatch(setTaskSelectedDate({ from: taskTime?.from }));
      dispatch(setHistoryMemory({ ...HistoryFilterMemory, timePoint: 'start' }));
      setString((prev) => ({ ...prev, due: undefined }));
    }
  };
  // const clearFiltertimes = (point: 'from' | 'to') => {
  //   point == 'to'
  //     ? setHistoryMemory({
  //         ...HistoryFilterMemory,
  //         time: { ...HistoryFilterMemory?.time, from: HistoryFilterMemory?.time?.from }
  //       })
  //     : setHistoryMemory({
  //         ...HistoryFilterMemory,
  //         time: { ...HistoryFilterMemory?.time, to: HistoryFilterMemory?.time?.to }
  //       });
  // };

  useEffect(() => {
    if (taskTime) {
      setString({
        start: taskTime?.from?.format(date_format?.toUpperCase()),
        due: taskTime?.to?.format(date_format?.toUpperCase())
      });
    }
    if (selectedDate?.dateType) {
      setDateType(selectedDate.dateType);
    }
  }, [taskTime, selectedDate]);

  return (
    <div className="flex justify-between items-center px-2 py-4">
      {range ? (
        <div className="w-full grid grid-cols-2 place-self-center">
          {/* et Start Date Selection */}
          <label htmlFor="from" className="flex space-y-1 space-x-1 text-xs items-center">
            <BsCalendarEvent />
            <div className="relative">
              <div
                className="w-28 h-4 px-1 text-xs"
                contentEditable
                onBlur={() => handleFilterDateDispatch}
                onClick={() => dispatch(setHistoryMemory({ ...HistoryFilterMemory, timePoint: 'start' }))}
              >
                {(taskTime?.from && dayjs(taskTime?.from).format(date_format?.toUpperCase())) ?? 'Start Date'}
              </div>
              {/* <input
                type="text"
                placeholder="Start Date"
                className="w-28 h-4 rounded-md px-1 text-xs border-0 focus:outline-none custom-input"
                value={dateString?.start ?? undefined}
                onClick={() => setDateType('from')}
                onChange={(e) => setString({ ...dateString, start: e.target.value })}
                onBlur={() => handleFilterDateDispatch('start')}
              /> */}
              {selectedDate?.dateType === 'from' ||
                (HistoryFilterMemory?.timePoint === 'from' && <CloseBtn clearFn={() => clearDatesFilter('start')} />)}
            </div>
            {selectedDate?.date && selectedDate?.dateType === 'from' ? (
              <ReusableSelect
                options={createDynamicTimeComponent(15, timezone)}
                value={HistoryFilterMemory?.time?.from || ''}
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
              (HistoryFilterMemory?.time?.from && `@${HistoryFilterMemory?.time?.from}`) ?? undefined
            )}
          </label>
          {/* Set Due Date selection */}
          <label htmlFor="from" className="flex space-y-1 space-x-1 text-xs items-center">
            <BsCalendarEvent />
            <div className="relative">
              <div className="w-28 h-4 px-1 text-xs" contentEditable onBlur={() => handleFilterDateDispatch}>
                {dateString?.due ?? 'Due Date'}
              </div>
              {/* <input
                type="text"
                placeholder="Due Date"
                className="w-28 h-4 rounded-md px-1 text-xs border-0 focus:outline-none custom-input"
                value={dateString?.due ?? undefined}
                onClick={() => setDateType('to')}
                onChange={(e) => setString({ ...dateString, due: e.target.value })}
                onBlur={() => handleFilterDateDispatch('due')}
              /> */}
              {HistoryFilterMemory?.timePoint === 'to' && <CloseBtn clearFn={() => clearDatesFilter('due')} />}
            </div>
            {selectedDate?.date && HistoryFilterMemory?.timePoint === 'to' ? (
              <ReusableSelect
                options={createDynamicTimeComponent(15, timezone)}
                value={HistoryFilterMemory?.time?.to || ''}
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
              (HistoryFilterMemory?.time?.to && `@${HistoryFilterMemory?.time?.to}`) ?? undefined
            )}
          </label>{' '}
        </div>
      ) : (
        // Default Set date
        <label htmlFor="from" className="flex space-y-1 space-x-1 text-xs items-center">
          <BsCalendarEvent />
          <input
            type="text"
            placeholder="Set Date"
            className="w-28 h-4 rounded-md px-1 text-xs border-0 focus:outline-none custom-input"
          />
        </label>
      )}
    </div>
  );
}
