import { Dispatch, SetStateAction } from 'react';
import RadioWrapper from '../RadioWrapper';

interface RecurringIntervalsProps {
  arr: string[];
  activeItem: string;
  setFn: Dispatch<SetStateAction<string>>;
  styles?: string;
}

export function RecurringIntervals({ arr, setFn, activeItem, styles }: RecurringIntervalsProps) {
  return (
    <div
      className={
        styles ??
        'flex flex-col space-y-1 w-36 h-min rounded-md shadow-2xl absolute top-8 right-0 bg-alsoit-gray-50 text-alsoit-gray-200 p-2 z-20'
      }
    >
      {arr.map((interval, index) => {
        return (
          <div key={index} onClick={() => setFn(interval)}>
            <RadioWrapper
              styles="text-alsoit-text-md p-2 hover:bg-alsoit-purple-50 capitalize cursor-pointer font-semibold flex space-x-1 p-1"
              btnCheckState={activeItem === interval}
            >
              <span>{interval}</span>
            </RadioWrapper>
          </div>
        );
      })}
    </div>
  );
}
