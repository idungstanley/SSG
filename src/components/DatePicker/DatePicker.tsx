import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { DatePickerSideBar } from './DatePickerSideBar';
import { DatePickerManualDates } from './DatePickerManualDate';
import MiniDatePicker from './MiniCalendar';
import LeftPanelOpen from '../../assets/icons/LeftPanelOpen';
import DatePickerFooter from './DatePickerFooter';
import { useGetUserSettingsData } from '../../features/task/taskService';
import { setHistoryMemory, setTaskSelectedDate } from '../../features/task/taskSlice';
import { IUserCalendarParams } from '../../features/task/interface.tasks';
import { setPickedDateState } from '../../features/workspace/workspaceSlice';
import AlsoitMenuDropdown from '../DropDowns';
import { pilotTabs } from '../../app/constants/pilotTabs';

interface DatePickerProps {
  styles?: string;
  range?: boolean;
  setShowDatePickerOption?: boolean;
  height?: string;
  anchorEl?: null | HTMLElement;
  width?: string;
  toggleFn?: Dispatch<SetStateAction<boolean>>;
  handleClose?: () => void;
}

export type DateString = {
  start?: string;
  due?: string;
};
export default function DatePicker({
  styles,
  width,
  height,
  range,
  anchorEl,
  setShowDatePickerOption,
  toggleFn,
  handleClose
}: DatePickerProps) {
  dayjs.extend(timezone);
  dayjs.extend(utc);
  const dispatch = useAppDispatch();
  const currentDate = dayjs();
  const userTimeZoneFromLS: string | null = localStorage.getItem('userTimeZone');
  const { timezone: zone, time_format } = useAppSelector((state) => state.userSetting);

  const sectionRef = useRef<HTMLElement>(null);
  const [time, setTime] = useState<string>(
    dayjs()
      .tz(userTimeZoneFromLS ?? zone)
      .format(time_format === '1' ? 'ddd, DD MMM YYYY HH:mm' : 'ddd, DD MMM YYYY h:mm A')
  );
  const [openSideBar, setOpenSideBar] = useState<boolean>(false);
  const { data } = useGetUserSettingsData({ keys: pilotTabs.CALENDAR });

  function isIUserCalendarParams(value: unknown): value is IUserCalendarParams {
    if (typeof value === 'object' && value !== null) {
      const userCalendarParams = value as IUserCalendarParams;
      return 'selectedDate' in userCalendarParams && 'HistoryFilterMemory' in userCalendarParams;
    }
    return false;
  }

  useEffect(() => {
    if (data) {
      const { value } = data.data.settings;
      if (isIUserCalendarParams(value)) {
        const { selectedDate, HistoryFilterMemory } = value;
        const from = dayjs(selectedDate?.from);
        const to = dayjs(selectedDate?.to);
        dispatch(setTaskSelectedDate({ from, to }));
        dispatch(setHistoryMemory(HistoryFilterMemory));
      }
    }
  }, [data]);

  const closeDateModal = () => {
    if (toggleFn) toggleFn(false);
    if (handleClose) handleClose();
  };

  const calendarTime = () => setInterval(() => setTime(dayjs().format('ddd, DD MMM YYYY h:mm A')), 60000);

  useEffect(() => {
    calendarTime();
    return () => document.addEventListener('visibilitychange', calendarTime);
  }, []);

  return (
    <AlsoitMenuDropdown handleClose={closeDateModal} anchorEl={anchorEl}>
      <section
        onClick={(e) => e.stopPropagation()}
        ref={sectionRef}
        className={
          styles ??
          'absolute z-50 mt-1 shadow-2xl bg-white rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none top-56 right-12 flex justify-center'
        }
        style={{ height: height ?? '450px', width: openSideBar ? width ?? '570px' : '430px' }}
      >
        {openSideBar && (
          <div className="w-5/12 h-full">
            <DatePickerSideBar setOpenSideBar={setOpenSideBar} currentDate={currentDate} />
          </div>
        )}
        <div
          className={openSideBar ? 'flex flex-col mt-3 px-2 w-7/12' : 'flex flex-col mt-3 px-6 w-full'}
          style={{ height: '340px' }}
        >
          <div className={!openSideBar ? 'flex justify-between items-center' : 'flex justify-end items-center'}>
            {!openSideBar && (
              <div className="cursor-pointer" onClick={() => setOpenSideBar(true)}>
                <LeftPanelOpen active dimensions={{ height: 35, width: 35 }} />
              </div>
            )}
            <DatePickerManualDates range={range} />
          </div>
          <div
            onClick={() => {
              !range && setShowDatePickerOption ? dispatch(setPickedDateState(true)) : null;
            }}
          >
            <MiniDatePicker range={range} miniMode={openSideBar} fullCalendar />
          </div>
          <DatePickerFooter miniMode={openSideBar} closeDateModal={closeDateModal} time={time} />
        </div>
      </section>
    </AlsoitMenuDropdown>
  );
}
