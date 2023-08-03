import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useAppSelector } from '../../app/hooks';
import { Button, Modal } from '@mui/material';
import { DatePickerSideBar } from './DatePickerSideBar';
import { DatePickerManualDates } from './DatePickerManualDate';
import MiniDatePicker from './MiniCalendar';

interface DatePickerProps {
  styles?: string;
  range?: boolean;
  height?: string;
  width?: string;
  toggleFn?: React.Dispatch<React.SetStateAction<boolean>>;
}

export type DateString = {
  start?: string;
  due?: string;
};
export default function DatePicker({ styles, width, height, range, toggleFn }: DatePickerProps) {
  dayjs.extend(timezone);
  dayjs.extend(utc);
  const currentDate = dayjs();
  const { timezone: zone } = useAppSelector((state) => state.userSetting);
  const sectionRef = useRef<HTMLElement>(null);
  const [time, setTime] = useState<string>(dayjs().tz(zone).format('ddd, DD MMM YYYY h:mm A'));

  const closeDateModal = () => {
    if (toggleFn) {
      toggleFn(false);
    }
  };

  const calendarTime = () => setInterval(() => setTime(dayjs().format('ddd, DD MMM YYYY h:mm A')), 60000);

  useEffect(() => {
    calendarTime();
    return () => document.addEventListener('visibilitychange', calendarTime);
  }, []);

  return (
    <Modal open={true} hideBackdrop>
      <section
        onClick={(e) => e.stopPropagation()}
        ref={sectionRef}
        className={
          styles ??
          'absolute z-50 mt-1 shadow-2xl bg-white rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none top-56 right-12 flex'
        }
        style={{ height: height ?? '425px', width: width ?? '550px' }}
      >
        <div className="w-5/12 h-full">
          <DatePickerSideBar currentDate={currentDate} />
        </div>
        <div className="flex flex-col mt-3" style={{ height: '340px' }}>
          <div className="flex justify-end">
            <DatePickerManualDates range={range} />
          </div>
          <div>
            <MiniDatePicker range={range} />
          </div>
          <DatePickerFooter closeDateModal={closeDateModal} time={time} />
        </div>
      </section>
    </Modal>
  );
}

interface DatePickerFooterProps {
  time: string;
  closeDateModal: () => void;
}

function DatePickerFooter({ closeDateModal, time }: DatePickerFooterProps) {
  return (
    <div className="flex items-center justify-end w-full">
      <div className="flex space-x-2">
        <div className="flex items-center">
          <span className="text-xs italic font-semibold">{time}</span>
        </div>
        <div className="flex space-x-1">
          <Button
            onClick={closeDateModal}
            variant="outlined"
            className="bg-alsoit-purple-300"
            size={'small'}
            sx={{
              ':hover': { background: 'black', color: 'white' },
              height: '32px',
              fontSize: '10px',
              borderRadius: '8px'
            }}
          >
            Close
          </Button>
          <Button
            onClick={closeDateModal}
            variant="contained"
            size={'small'}
            disableElevation={true}
            sx={{
              background: '#008000',
              ':hover': { background: '#c128f5' },
              height: '32px',
              fontSize: '10px',
              borderRadius: '8px'
            }}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}
