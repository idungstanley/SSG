import { useState } from 'react';
import ArrowUp from '../../../assets/icons/ArrowUp';
import ArrowDown from '../../../assets/icons/ArrowDown';
import dayjs from 'dayjs';
import RadioWrapper from '../RadioWrapper';
import { monthOptionsArr } from '../../../utils/Constants/DatesConstants';

export function MonthsOption() {
  const [value, setValue] = useState<string>('same day each month');
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [requestValue, setRequestValue] = useState<string>('');

  const handleClick = (value: string, title: string) => {
    setRequestValue(value);
    setValue(title);
  };

  const monthlyList = () => {
    return (
      <div className="flex flex-col space-y-1.5 absolute bg-alsoit-gray-50 shadow-2xl z-30 px-2">
        {monthOptionsArr.map((option) => {
          let monthValue = '';

          option === 'same_day'
            ? (monthValue = 'same day each month')
            : option === 'second_monday'
            ? (monthValue = `Last ${dayjs().format('dddd')}`)
            : option === 'first_day'
            ? (monthValue = 'first day of the month')
            : (monthValue = 'last day of the month');
          return (
            <div
              key={`${option}-data`}
              className="cursor-pointer py-1.5"
              onClick={() => handleClick(option, monthValue)}
            >
              <RadioWrapper
                btnCheckState={value === monthValue}
                checkStateFn={() => setValue(monthValue)}
                stateValue=" "
              >
                <span className="capitalize">{monthValue}</span>
              </RadioWrapper>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full">
      <div
        className="border-alsoit-gray-75 border rounded-md text-alsoit-text-md h-7 px-1 w-full relative flex justify-between items-center cursor-pointer"
        onClick={() => setDropDown(!dropDown)}
      >
        <span className="capitalize">{value}</span>
        {dropDown ? <ArrowUp /> : <ArrowDown dimensions={{ height: 7, width: 7 }} />}
        {dropDown && monthlyList()}
      </div>
    </div>
  );
}
