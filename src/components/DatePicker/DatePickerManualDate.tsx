import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { DateString } from './DatePicker';
import moment from 'moment';
import { setSelectedDate } from '../../features/workspace/workspaceSlice';
import { setFilterDateString, setHistoryMemory, setTaskSelectedDate } from '../../features/task/taskSlice';
import { BsCalendarEvent } from 'react-icons/bs';
import dayjs from 'dayjs';
import ReusableSelect from '../../utils/TimeDropDown';
import { createDynamicTimeComponent } from '../../utils/calendar';
import { CloseBtn } from '../Buttons/CloseButton';

interface DatePickerManualDatesProps {
  range?: boolean;
}

export function DatePickerManualDates({ range }: DatePickerManualDatesProps) {
  const { HistoryFilterMemory, selectedDate: taskTime, FilterDateString } = useAppSelector((state) => state.task);
  const { selectedDate } = useAppSelector((state) => state.workspace);
  const { date_format } = useAppSelector((state) => state.userSetting);
  const [dateType, setDateType] = useState<'from' | 'to' | undefined>();
  const [dateString, setString] = useState<DateString | null>(null);
  const dispatch = useAppDispatch();

  const handleFilterDateDispatch = (type: 'start' | 'due') => {
    const dateObject = type === 'start' ? moment(dateString?.start, date_format) : moment(dateString?.due, date_format);
    type === 'start'
      ? dispatch(setHistoryMemory({ ...HistoryFilterMemory, timePoint: 'from' }))
      : dispatch(setHistoryMemory({ ...HistoryFilterMemory, timePoint: 'to' }));

    dateObject.isValid() ? dispatch(setSelectedDate({ date: dayjs(dateObject.toDate()), dateType })) : null;
  };

  const clearDatesFilter = (point: 'from' | 'to') => {
    if (point === 'from') {
      dispatch(setTaskSelectedDate({ to: taskTime?.to }));
      setFilterDateString({ ...FilterDateString, start: undefined });
    }
    if (point === 'to') {
      dispatch(setTaskSelectedDate({ from: taskTime?.from }));
      setString((prev) => ({ ...prev, due: undefined }));
    }
    dispatch(setSelectedDate(null));
  };
  const clearFiltertimes = (point: 'from' | 'to') => {
    point == 'to'
      ? setHistoryMemory({
          ...HistoryFilterMemory,
          time: { ...HistoryFilterMemory?.time, from: HistoryFilterMemory?.time?.from }
        })
      : setHistoryMemory({
          ...HistoryFilterMemory,
          time: { ...HistoryFilterMemory?.time, to: HistoryFilterMemory?.time?.to }
        });
  };

  useEffect(() => {
    setString({ start: taskTime?.from?.format(date_format), due: taskTime?.to?.format(date_format) });
  }, [taskTime]);

  return (
    <div className="flex justify-between items-center p-2">
      {range ? (
        <div className="w-full grid grid-cols-2 place-self-center">
          {/* et Start Date Selection */}
          <label htmlFor="from" className="flex space-y-1 space-x-1 text-xs items-center">
            <BsCalendarEvent />
            <div className="relative">
              <input
                type="text"
                placeholder="Start Date"
                className="w-28 h-4 rounded-md px-1 text-xs border-0 focus:outline-none custom-input"
                value={FilterDateString?.start ?? undefined}
                onClick={() => setDateType('from')}
                onChange={(e) => setFilterDateString({ ...FilterDateString, start: e.target.value })}
                onBlur={() => handleFilterDateDispatch('start')}
              />
              {selectedDate?.dateType === 'from' && <CloseBtn clearFn={() => clearDatesFilter('from')} />}
            </div>
            {selectedDate?.date && selectedDate?.dateType === 'from' ? (
              <ReusableSelect
                options={createDynamicTimeComponent(15)}
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
              <input
                type="text"
                placeholder="Due Date"
                className="w-28 h-4 rounded-md px-1 text-xs border-0 focus:outline-none custom-input"
                value={FilterDateString?.due ?? undefined}
                onClick={() => setDateType('to')}
                onChange={(e) => setFilterDateString({ ...FilterDateString, due: e.target.value })}
                onBlur={() => handleFilterDateDispatch('due')}
              />
              {HistoryFilterMemory?.timePoint === 'to' && <CloseBtn clearFn={() => clearDatesFilter('to')} />}
            </div>
            {selectedDate?.date && HistoryFilterMemory?.timePoint === 'to' ? (
              <ReusableSelect
                options={createDynamicTimeComponent(15)}
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
