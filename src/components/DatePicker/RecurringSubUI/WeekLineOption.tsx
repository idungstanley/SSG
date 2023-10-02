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
  const [checkArr, setCheckArr] = useState<number[]>([]);

  const handleClick = (week: { title: string; value: number }) => {
    setValue(`${week.value}`);
    setCheckArr((prev) => Array.from(new Set([...prev, week.value])));
  };

  useEffect(() => {
    setCheckArr((prev) => Array.from(new Set([...prev, Number(weekValue)])));
    if (setOptions) {
      setOptions((prev) => {
        if (!extended) {
          // Update weekly_day_numbers with unique values
          const updatedWeeklyDayNumbers = Array.from(new Set([...(prev?.weekly_day_numbers || []), weekValue]));
          return { ...prev, weekly_day_numbers: updatedWeeklyDayNumbers };
        } else {
          // Update monthly_week_day_number
          return { ...prev, monthly_week_day_number: weekValue };
        }
      });
    }
  }, [weekValue]);

  return (
    <div className="flex w-full">
      {weekArr.map((week) => (
        <span
          key={week.value}
          className={`p-1.5 border border-alsoit-gray-75 cursor-pointer hover:bg-alsoit-gray-75 hover:border-alsoit-gray-50 text-alsoit-text-md hover:text-alsoit-gray-50 capitalize ${
            checkArr.includes(week.value) && 'bg-alsoit-gray-200 text-alsoit-gray-50'
          }`}
          onClick={() => handleClick(week)}
        >
          {week.title.slice(0, 2)}
        </span>
      ))}
    </div>
  );
}
