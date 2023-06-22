import { useEffect, useState } from 'react';
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
  const [dateType, setDateType] = useState<'from' | 'to' | undefined>();
  const [dateString, setString] = useState<DateString | null>(null);
  const dispatch = useAppDispatch();

  const handleFilterDateDispatch = (type: 'start' | 'due') => {
    const dateObject =
      type === 'start' ? moment(dateString?.start, 'DD/MM/YYYY') : moment(dateString?.due, 'DD/MM/YYYY');

    dateObject.isValid() ? dispatch(setSelectedDate({ date: dayjs(dateObject.toDate()), dateType })) : null;
  };

  const clearDatesFilter = (point: 'from' | 'to') => {
    if (point === 'from') {
      dispatch(setTaskSelectedDate({ to: selectedDate?.date }));
      setString((prev) => ({ ...prev, due: prev?.due }));
    }
    if (point === 'to') {
      dispatch(setTaskSelectedDate({ from: taskTime?.from }));
      setString((prev) => ({ ...prev, start: prev?.start }));
    }
    dispatch(setSelectedDate(null));
  };

  useEffect(() => {
    setString({ start: taskTime?.from?.format('DD/MM/YYYY'), due: taskTime?.to?.format('DD/MM/YYYY') });
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
                value={dateString?.start ?? undefined}
                onClick={() => setDateType('from')}
                onChange={(e) => setString({ ...dateString, start: e.target.value })}
                onBlur={() => handleFilterDateDispatch('start')}
              />
              {selectedDate?.dateType === 'from' && <CloseBtn clearFn={() => clearDatesFilter('from')} />}
            </div>
            {selectedDate?.date && selectedDate.dateType === 'from' ? (
              <ReusableSelect
                menuMaxHeight="300px"
                options={createDynamicTimeComponent(15)}
                placeholder="Select time"
                value={HistoryFilterMemory?.time?.from || ''}
                styles="h-4 w-11/12"
                onChange={(e) => {
                  dispatch(
                    setHistoryMemory({
                      ...HistoryFilterMemory,
                      time: { ...HistoryFilterMemory?.time, from: e.target.value }
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
                value={dateString?.due ?? undefined}
                onClick={() => setDateType('to')}
                onChange={(e) => setString({ ...dateString, due: e.target.value })}
                onBlur={() => handleFilterDateDispatch('due')}
              />
              {selectedDate?.dateType === 'to' && <CloseBtn clearFn={() => clearDatesFilter('to')} />}
            </div>
            {selectedDate?.date && selectedDate?.dateType === 'to' ? (
              <ReusableSelect
                menuMaxHeight="300px"
                options={createDynamicTimeComponent(15)}
                placeholder="Select time"
                value={HistoryFilterMemory?.time?.from || ''}
                styles="h-4 w-11/12"
                onChange={(e) => {
                  dispatch(
                    setHistoryMemory({
                      ...HistoryFilterMemory,
                      time: { ...HistoryFilterMemory?.time, to: e.target.value }
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
