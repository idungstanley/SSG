import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { RecurringIntervals } from './RecuringInterval';
import ArrowUp from '../../../assets/icons/ArrowUp';
import ArrowDown from '../../../assets/icons/ArrowDown';
import { WeekLineOption } from './WeekLineOption';
import { CustomMonthLine } from './RecurMonthLine';
import { YearLineOption } from './YearLineOption';
import { RECUR_STR_CONSTANTS, customTypesArr } from '../../../utils/Constants/DatesConstants';
import { TypeOptionsProps } from '../RecurringTypes';

interface Props {
  setOptions: Dispatch<SetStateAction<TypeOptionsProps | undefined>>;
}
export function CustomRecurOption({ setOptions }: Props) {
  const [dropDown, setDropDown] = useState<{ type: boolean }>({ type: false });
  const [type, setType] = useState<string>('day');

  useEffect(() => {
    setOptions((prev) => ({ ...prev, every_type: type }));
  }, [type]);

  return (
    <div className="flex flex-col space-y-2.5 py-2.5 items-center w-full">
      <div className="flex space-x-1.5 items-center text-alsoit-text-md w-full">
        <span>Every</span>
        <input
          type="number"
          className="no-control-num-input w-10 h-7 px-1.5 rounded-md border-alsoit-gray-75 border text-alsoit-text-md"
          onChange={(e) => setOptions((prev) => ({ ...prev, every_count: Number(e.target.value) }))}
        />
        <div
          className="border-alsoit-gray-75 border rounded-md text-alsoit-text-md h-7 px-1 w-14 relative flex justify-between items-center cursor-pointer"
          onClick={() => setDropDown((prev) => ({ ...prev, type: !prev.type }))}
        >
          <span className="capitalize">{type}</span>
          {dropDown.type ? <ArrowUp /> : <ArrowDown dimensions={{ height: 7, width: 7 }} />}
          {dropDown.type && (
            <RecurringIntervals
              activeItem={type}
              arr={customTypesArr}
              setFn={setType}
              styles="flex flex-col space-y-1 w-36 h-min rounded-md shadow-2xl absolute top-8 left-0 bg-alsoit-gray-50 text-alsoit-gray-200 p-2 z-20"
            />
          )}
        </div>
      </div>
      {type === RECUR_STR_CONSTANTS.week && <WeekLineOption setOptions={setOptions} />}
      {type === RECUR_STR_CONSTANTS.year && <YearLineOption />}
      {type === RECUR_STR_CONSTANTS.month && <CustomMonthLine setOptions={setOptions} />}
    </div>
  );
}
