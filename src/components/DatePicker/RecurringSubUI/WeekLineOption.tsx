import dayjs from 'dayjs';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { weekArr } from '../../../utils/Constants/DatesConstants';
import { TypeOptionsProps } from '../RecurringTypes';

interface Props {
  setOptions?: Dispatch<SetStateAction<TypeOptionsProps | undefined>>;
  extended?: boolean;
}
export function WeekLineOption({ setOptions, extended }: Props) {
  const [weekValue, setValue] = useState<string>(`${dayjs().day()}`);
  const [activeDay, setActiveDay] = useState<string>(dayjs().format('ddd'));

  const handleClick = (week: { title: string; value: number }) => {
    setActiveDay(week.title.slice(0, 3));
    setValue(`${week.value}`);
  };

  useEffect(() => {
    setOptions && !extended
      ? setOptions((prev) => ({ ...prev, weekly_day_numbers: [...(prev?.weekly_day_numbers || []), weekValue] }))
      : extended && setOptions && setOptions((prev) => ({ ...prev, monthly_week_day_number: weekValue }));
  }, [weekValue]);

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
