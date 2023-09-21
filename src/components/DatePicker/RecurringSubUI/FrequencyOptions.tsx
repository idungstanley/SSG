import { useState } from 'react';
import { RecurringIntervals } from '../Recurring';
import ArrowUp from '../../../assets/icons/ArrowUp';
import ArrowDown from '../../../assets/icons/ArrowDown';

export function FrequencyOption() {
  const [frequency, setFrequency] = useState<string>('repeat');
  const [dropdown, setDropDown] = useState<boolean>(false);
  return (
    <div className="flex w-full justify-between items-center space-x-1.5">
      <div
        className="flex justify-between items-center border-alsoit-gray-75 border rounded-md text-alsoit-text-md p-1.5 w-20 relative capitalize"
        onClick={() => setDropDown(!dropdown)}
      >
        <span>{frequency}</span>
        {dropdown ? <ArrowUp /> : <ArrowDown dimensions={{ height: 7, width: 7 }} />}
        {dropdown && (
          <RecurringIntervals
            activeItem={frequency}
            arr={['repeat', 'end on']}
            setFn={setFrequency}
            styles="flex flex-col space-y-1 w-36 h-min rounded-md shadow-2xl absolute top-8 left-0 bg-alsoit-gray-50 p-2 z-20"
          />
        )}
      </div>
      <input
        type="number"
        className="no-control-num-input border-alsoit-gray-75 border rounded-md text-alsoit-text-md p-0.5 px-1.5 w-12"
      />
      <span>times</span>
    </div>
  );
}
