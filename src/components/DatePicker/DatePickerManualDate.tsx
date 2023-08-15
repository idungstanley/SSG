import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { DateString } from './DatePicker';
import { setSelectedDate } from '../../features/workspace/workspaceSlice';
import { setHistoryMemory, setTaskSelectedDate } from '../../features/task/taskSlice';
import dayjs from 'dayjs';
import ReusableSelect from '../../utils/TimeDropDown';
import { createDynamicTimeComponent } from '../../utils/calendar';
import { CloseBtn } from '../Buttons/CloseButton';
import CalendarIcon from '../../assets/icons/CalendarIcon';
import CancelIcon from '../../assets/icons/Cancel';

interface DatePickerManualDatesProps {
  range?: boolean;
}

export function DatePickerManualDates({ range }: DatePickerManualDatesProps) {
  const { HistoryFilterMemory, selectedDate: taskTime } = useAppSelector((state) => state.task);
  const { selectedDate } = useAppSelector((state) => state.workspace);
  const { date_format, timezone } = useAppSelector((state) => state.userSetting);
  const [dateType, setDateType] = useState<string | undefined>();
  const [dateString, setString] = useState<DateString | null>(null);
  const [iconToggle] = useState<{ startIcon: boolean; dueIcon: boolean }>({
    dueIcon: false,
    startIcon: false
  });
  const dispatch = useAppDispatch();

  const handleFilterDateDispatch = () => {
    const type = (selectedDate?.dateType && selectedDate.dateType) ?? 'start';
    const dateFormat = date_format?.toUpperCase();

    const startDate = dateString?.start ? dayjs(dateString.start, dateFormat) : null;
    const dueDate = dateString?.due ? dayjs(dateString.due, dateFormat) : null;

    const dateObject = type === 'start' ? startDate : dueDate;

    if (dateObject && dateObject.isValid()) {
      type === 'start'
        ? dispatch(setHistoryMemory({ ...HistoryFilterMemory, timePoint: 'due' }))
        : dispatch(setHistoryMemory({ ...HistoryFilterMemory, timePoint: 'start' }));

      dispatch(setSelectedDate({ date: dateObject, dateType }));
    }
  };

  const handleChange = (event: ChangeEvent<HTMLDivElement>, point: string) => {
    if (point === 'from') {
      setString((prev) => ({ ...prev, start: event.target.textContent as string }));
    } else {
      setString((prev) => ({ ...prev, due: event.target.textContent as string }));
    }
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
    <div className="flex items-center justify-between py-1">
      {range ? (
        <div className="grid w-full grid-cols-2 space-x-2 place-self-center">
          {/* Set Start Date Selection */}
          <label
            htmlFor="from"
            className="flex space-y-1 space-x-4 text-xs items-center w-36 border border-alsoit-purple-300 rounded-md p-0.5"
          >
            <div className="flex items-center space-x-1">
              <div className="p-1 rounded-md bg-alsoit-purple-300">
                <CalendarIcon active={iconToggle.startIcon} fixed />
              </div>
              <div className="relative flex">
                <div
                  className="h-4 px-1 font-semibold text-alsoit-text-sm"
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={handleFilterDateDispatch}
                  onClick={() => dispatch(setHistoryMemory({ ...HistoryFilterMemory, timePoint: 'start' }))}
                  onInput={(e: ChangeEvent<HTMLDivElement>) => handleChange(e, 'from')}
                >
                  {(taskTime?.from && dayjs(taskTime?.from).format(date_format?.toUpperCase())) ?? 'Start'}
                </div>
                {taskTime?.from && <CloseBtn clearFn={() => clearDatesFilter('start')} />}
              </div>
            </div>
            {selectedDate?.date && taskTime?.from ? (
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
              <span className="w-1/3 text-alsoit-text-sm">
                {(HistoryFilterMemory?.time?.from && `${HistoryFilterMemory?.time?.from}`) ?? undefined}
              </span>
            )}
          </label>
          {/* Set Due Date selection */}
          <label
            htmlFor="to"
            className="flex items-center p-1 space-x-4 space-y-1 text-xs border rounded-md border-alsoit-purple-300 w-36"
          >
            <div className="flex items-center space-x-1">
              <div className="p-1 rounded-md bg-alsoit-purple-300">
                <CalendarIcon active={iconToggle.dueIcon} fixed />
              </div>
              <div className="relative">
                <div
                  className="h-4 px-1 font-semibold text-alsoit-text-sm"
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={handleFilterDateDispatch}
                  onClick={() => dispatch(setHistoryMemory({ ...HistoryFilterMemory, timePoint: 'start' }))}
                  onInput={(e: ChangeEvent<HTMLDivElement>) => handleChange(e, 'to')}
                >
                  {(taskTime?.to && taskTime.to.format(date_format?.toUpperCase())) ?? 'Due'}
                </div>
                {taskTime?.to && (
                  <div onClick={() => clearDatesFilter('due')}>
                    <CloseBtn clearFn={() => clearDatesFilter('due')} />
                  </div>
                )}
              </div>
            </div>
            {selectedDate?.date && taskTime?.to ? (
              <ReusableSelect
                options={createDynamicTimeComponent(15, timezone)}
                value={HistoryFilterMemory?.time?.to || ''}
                style="-left-44 top-2"
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
          </label>{' '}
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
              onBlur={handleFilterDateDispatch}
              onClick={() => dispatch(setHistoryMemory({ ...HistoryFilterMemory, timePoint: 'start' }))}
              onInput={(e: ChangeEvent<HTMLDivElement>) => handleChange(e, 'from')}
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
