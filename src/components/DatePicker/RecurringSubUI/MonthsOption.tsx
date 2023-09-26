import { useState } from 'react';
import ArrowUp from '../../../assets/icons/ArrowUp';
import ArrowDown from '../../../assets/icons/ArrowDown';

const monthOptionsArr = ['same_day', 'second_monday', 'first_day', 'last_day'];

export function MonthsOption() {
  const [value, setValue] = useState<string>('same day');
  const [dropDown, setDropDown] = useState<boolean>(false);
  return (
    <div className="w-full">
      <div
        className="border-alsoit-gray-75 border rounded-md text-alsoit-text-md h-7 px-1 w-full relative flex justify-between items-center cursor-pointer"
        onClick={() => setDropDown(!dropDown)}
      >
        <span>{value}</span>
        {dropDown ? <ArrowUp /> : <ArrowDown dimensions={{ height: 7, width: 7 }} />}
      </div>
    </div>
  );
}
