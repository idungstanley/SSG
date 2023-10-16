import React, { useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import CalenderIcon from '../../../assets/icons/CalenderIcon';
import MiniDatePicker from '../../../components/DatePicker/MiniCalendar';
import dayjs from 'dayjs';

export default function DayDatePicker() {
  const [showDataPicker, setShowDatePicker] = useState<boolean>(false);
  const { selectedDate } = useAppSelector((state) => state.workspace);
  const currentDate = selectedDate?.date ? dayjs(selectedDate.date).format('DD/MM/YYYY') : '';

  const handleClick = () => {
    setShowDatePicker(!showDataPicker);
  };

  return (
    <div onClick={(e) => handleClick()}>
      <div className={'text-sm font-medium text-gray-400'}>
        <div className="flex items-center cursor-pointer group/parent">
          <CalenderIcon />
          <span className="pl-2">{currentDate}</span>
        </div>
      </div>
      {showDataPicker && (
        <div className="absolute left-0 w-96 h-50 z-10 mt-1 shadow-2xl bg-white rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none flex justify-center">
          <MiniDatePicker range={false} miniMode={true} fullCalendar={true} />
        </div>
      )}
    </div>
  );
}
