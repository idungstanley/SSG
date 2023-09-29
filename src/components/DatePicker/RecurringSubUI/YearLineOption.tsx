import dayjs from 'dayjs';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ArrowUp from '../../../assets/icons/ArrowUp';
import ArrowDown from '../../../assets/icons/ArrowDown';
import { generateMonthsInYear } from '../../../utils/calendar';
import RadioWrapper from '../RadioWrapper';
import { TypeOptionsProps } from '../RecurringTypes';

interface Props {
  setOptions: Dispatch<SetStateAction<TypeOptionsProps | undefined>>;
}

export function YearLineOption({ setOptions }: Props) {
  const [value, setValue] = useState<{ [key: string]: string }>({
    day: dayjs().format('D'),
    months: dayjs().format('MMMM')
  });
  const [monthNumber, setMonthNumber] = useState<string>('');
  const [dropDown, setDropDown] = useState<boolean>(false);

  const handleCloseModal = (value: string, target: string, monthNumber: number) => {
    setValue((prev) => ({ ...prev, [target]: value }));
    setMonthNumber(`${monthNumber + 1}`);
    setDropDown(!dropDown);
  };

  useEffect(() => {
    monthNumber &&
      setOptions((prev) => ({
        ...prev,
        yearly_month_day_number: value['day'],
        yearly_month_number: monthNumber
      }));
  }, [value, monthNumber]);

  const yearDropDown = () => {
    return (
      <div className="flex flex-col space-y-1.5 absolute bg-alsoit-gray-50 shadow-2xl z-30 px-2">
        {generateMonthsInYear(dayjs().year()).map((item, index) => {
          return (
            <div
              key={`${item}-data`}
              className="cursor-pointer"
              onClick={() => handleCloseModal(item, 'months', index)}
            >
              <RadioWrapper
                btnCheckState={value.months === item}
                checkStateFn={() => setValue((prev) => ({ ...prev, months: item }))}
                stateValue=" "
              >
                <span>{item}</span>
              </RadioWrapper>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex justify-between space-x-1.5 items-center w-full">
      <div className="flex flex-col space-y-1.5 w-full">
        <div
          className="border-alsoit-gray-75 border rounded-md text-alsoit-text-md h-7 px-1 w-full relative flex justify-between items-center cursor-pointer"
          onClick={() => setDropDown(!dropDown)}
        >
          <span>{value.months}</span>
          {dropDown ? <ArrowUp /> : <ArrowDown dimensions={{ height: 7, width: 7 }} />}
        </div>
        {dropDown && yearDropDown()}
      </div>
      <input
        type="number"
        value={value['day']}
        className="no-control-num-input w-10 h-7 px-1.5 rounded-md border-alsoit-gray-75 border text-alsoit-text-md"
        onChange={(e) => setValue((prev) => ({ ...prev, ['day']: e.target.value }))}
      />
    </div>
  );
}
