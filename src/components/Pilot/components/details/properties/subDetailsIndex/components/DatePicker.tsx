import dayjs from 'dayjs';
import React, { useState } from 'react';
import { generateDate, months } from './calendar';
import cn from './cn';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { MdOutlineDateRange } from 'react-icons/md';

export default function DatePicker() {
  const days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  return (
    <section
      className=" mt-1 w-5/6  origin-top-right absolute z-50 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none right-14 bottom-2"
      style={{ height: '280px' }}
    >
      <div className="border border-gray-200 w-full p-2 h-10 flex justify-start items-center space-x-2">
        <MdOutlineDateRange className="w-4 h-4 font-light" />
        <p className="font-semibold">{selectDate.toDate().toDateString()}</p>
      </div>
      <div className="flex justify-center items-center px-3" style={{ height: '250px' }}>
        <div className="w-40 space-y-2 pt-1 border-r border-gray-200" style={{ height: '250px', fontSize: '12px' }}>
          <p className="hover:bg-gray-200 px-1 rounded-md font-semibold">Today </p>
          <p className="hover:bg-gray-200 px-1 rounded-md font-semibold">Later</p>
          <p className="hover:bg-gray-200 px-1 rounded-md font-semibold">Tomorrow</p>
          <p className="hover:bg-gray-200 px-1 rounded-md font-semibold">This Weekend</p>
          <p className="hover:bg-gray-200 px-1 rounded-md font-semibold">Next Week</p>
          <p className="hover:bg-gray-200 px-1 rounded-md font-semibold">Next Weekend</p>
          <p className="hover:bg-gray-200 px-1 rounded-md font-semibold">2 Weeks</p>
          <p className="hover:bg-gray-200 px-1 rounded-md font-semibold">4 Weeks</p>
        </div>
        <div className="p-2" style={{ height: '280px' }}>
          <div className="flex justify-between items-center">
            <h1 className="select-none" style={{ fontSize: '14px', fontWeight: '500' }}>
              {months[today.month()]}, {today.year()}
            </h1>
            <div className="flex gap-3 items-center ">
              <GrFormPrevious
                className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
                onClick={() => {
                  setToday(today.month(today.month() - 1));
                }}
              />
              <h1
                className=" cursor-pointer hover:scale-105 hover:bg-gray-200 p-2 rounded-md transition-all"
                onClick={() => {
                  setToday(currentDate);
                }}
              >
                Today
              </h1>
              <GrFormNext
                className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
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
                  className="p-2 text-xs font-extrabold  w-14 grid place-content-center text-gray-400 select-none"
                >
                  {day}
                </h1>
              );
            })}
          </div>

          <div className=" grid grid-cols-7 h-10">
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
