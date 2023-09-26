import dayjs from 'dayjs';
import { useState } from 'react';
import { weekArr } from '../../../utils/Constants/DatesConstants';

export function WeekLineOption() {
  const [weekValue, setValue] = useState<number[]>([]);
  const [activeDay, setActiveDay] = useState<string>(dayjs().format('ddd'));

  const handleClick = (week: { title: string; value: number }) => {
    setActiveDay(week.title.slice(0, 3));
    setValue([week.value]);
  };

  return (
    <div className="flex w-full">
      {weekArr.map((week) => (
        <span
          key={week.value}
          className={`p-1.5 border border-alsoit-gray-75 cursor-pointer hover:bg-alsoit-gray-75 hover:border-alsoit-gray-50 text-alsoit-text-md hover:text-alsoit-gray-50 capitalize ${
            activeDay.toLowerCase() === week.title.slice(0, 3) && 'bg-alsoit-gray-200 text-alsoit-gray-50'
          }`}
          onClick={() => handleClick(week)}
        >
          {week.title.slice(0, 2)}
        </span>
      ))}
    </div>
  );
}
