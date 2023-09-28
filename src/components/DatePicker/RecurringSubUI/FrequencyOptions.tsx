import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ArrowUp from '../../../assets/icons/ArrowUp';
import ArrowDown from '../../../assets/icons/ArrowDown';
import { RecurringIntervals } from './RecuringInterval';
import dayjs from 'dayjs';
import { useAppSelector } from '../../../app/hooks';
import { RecurFrequency } from '../RecurringTypes';
import { STR_CONSTANTS } from '../../../utils/Constants/DatesConstants';

interface Props {
  setRepeat: Dispatch<SetStateAction<RecurFrequency | undefined>>;
}

type frequencyProps = {
  repeat?: number;
  end_on?: string;
};

export function FrequencyOption({ setRepeat }: Props) {
  const { date_format } = useAppSelector((state) => state.userSetting);
  const [frequency, setFrequency] = useState<frequencyProps>({
    repeat: 1,
    end_on: dayjs().format(date_format?.toUpperCase() ?? 'D/M/YY')
  });
  const [value, setValue] = useState<string>(STR_CONSTANTS.repeat);
  const [dropdown, setDropDown] = useState<boolean>(false);

  useEffect(() => {
    setRepeat(frequency);
  }, [frequency]);

  return (
    <div className="flex w-full justify-between items-center space-x-1.5">
      <div
        className="w-5/12 flex justify-between items-center border-alsoit-gray-75 border rounded-md text-alsoit-text-md p-1.5 relative capitalize"
        onClick={() => setDropDown(!dropdown)}
      >
        <span>{value}</span>
        {dropdown ? <ArrowUp /> : <ArrowDown dimensions={{ height: 7, width: 7 }} />}
        {dropdown && (
          <RecurringIntervals
            activeItem={value}
            arr={[STR_CONSTANTS.repeat, STR_CONSTANTS.endOn]}
            setFn={() => setValue(value === STR_CONSTANTS.repeat ? STR_CONSTANTS.endOn : STR_CONSTANTS.repeat)}
            styles="flex flex-col space-y-1 w-36 h-min rounded-md shadow-2xl absolute top-8 left-0 bg-alsoit-gray-50 p-2 z-20"
          />
        )}
      </div>
      {value === STR_CONSTANTS.repeat && (
        <>
          <input
            type="number"
            value={frequency.repeat}
            onChange={(e) => setFrequency((prev) => ({ ...prev, repeat: Number(e.target.value) }))}
            className="no-control-num-input border-alsoit-gray-75 border rounded-md text-alsoit-text-md p-0.5 px-1.5 w-12"
          />
          <span>times</span>
        </>
      )}
      {value === STR_CONSTANTS.endOn && (
        <input
          type="text"
          className=" w-6/12 text-alsoit-text-md ring-0 focus:ring-0 border-none"
          value={frequency.end_on}
          onChange={(e) => setFrequency((prev) => ({ ...prev, end_on: e.target.value }))}
        />
      )}
    </div>
  );
}
