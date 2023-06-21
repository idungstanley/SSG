import dayjs from 'dayjs';
import React, { useState } from 'react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { MdOutlineDateRange } from 'react-icons/md';
import { generateDate, months } from '../../../../../../../utils/calendar';
import cn from '../../../../../../../utils/cn';

export default function DatePicker() {
  const days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  return (
    <section
      className="absolute z-50 w-5/6 mt-1 origin-top-right bg-white rounded-md shadow-lg  ring-1 ring-black ring-opacity-5 focus:outline-none right-14 bottom-2"
      style={{ height: '280px' }}
    >
      <div className="flex items-center justify-start w-full h-10 p-2 space-x-2 border border-gray-200">
        <MdOutlineDateRange className="w-4 h-4 font-light" />
        <p className="font-semibold">{selectDate.toDate().toDateString()}</p>
      </div>
      <div className="flex items-center justify-center px-3" style={{ height: '250px' }}>
        <div className="w-40 pt-1 space-y-2 border-r border-gray-200" style={{ height: '250px', fontSize: '12px' }}>
          <p className="px-1 font-semibold rounded-md hover:bg-gray-200">Today </p>
          <p className="px-1 font-semibold rounded-md hover:bg-gray-200">Later</p>
          <p className="px-1 font-semibold rounded-md hover:bg-gray-200">Tomorrow</p>
          <p className="px-1 font-semibold rounded-md hover:bg-gray-200">This Weekend</p>
          <p className="px-1 font-semibold rounded-md hover:bg-gray-200">Next Week</p>
          <p className="px-1 font-semibold rounded-md hover:bg-gray-200">Next Weekend</p>
          <p className="px-1 font-semibold rounded-md hover:bg-gray-200">2 Weeks</p>
          <p className="px-1 font-semibold rounded-md hover:bg-gray-200">4 Weeks</p>
        </div>
        <div className="p-2" style={{ height: '280px' }}>
          <div className="flex items-center justify-between">
            <h1 className="select-none" style={{ fontSize: '14px', fontWeight: '500' }}>
              {months[today.month()]}, {today.year()}
            </h1>
            <div className="flex items-center gap-3 ">
              <GrFormPrevious
                className="w-5 h-5 transition-all cursor-pointer hover:scale-105"
                onClick={() => {
                  setToday(today.month(today.month() - 1));
                }}
              />
              <h1
                className="p-2 transition-all rounded-md cursor-pointer  hover:scale-105 hover:bg-gray-200"
                onClick={() => {
                  setToday(currentDate);
                }}
              >
                Today
              </h1>
              <GrFormNext
                className="w-5 h-5 transition-all cursor-pointer hover:scale-105"
                onClick={() => {
                  setToday(today.month(today.month() + 1));
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-7 text-left">
            {days.map((day, index) => {
              return (
                <h1
                  key={index}
                  className="grid p-2 text-xs font-extrabold text-gray-400 select-none w-14 place-content-center"
                >
                  {day}
                </h1>
              );
            })}
          </div>

          <div className="grid h-10 grid-cols-7 ">
            {generateDate(today.month(), today.year()).map(({ date, currentMonth, today }, index) => {
              return (
                <div key={index} className="text-center grid place-content-center text-sm border-t p-0.5">
                  <h1
                    className={cn(
                      currentMonth ? '' : 'text-gray-400',
                      today ? 'bg-red-400 text-white' : '',
                      selectDate.toDate().toDateString() === date.toDate().toDateString()
                        ? 'bg-purple-500 text-white'
                        : '',
                      'h-5 w-5 rounded-full grid place-content-center hover:bg-purple-300 hover:text-white transition-all cursor-pointer select-none'
                    )}
                    onClick={() => {
                      setSelectDate(date);
                    }}
                  >
                    {date.date()}
                  </h1>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
