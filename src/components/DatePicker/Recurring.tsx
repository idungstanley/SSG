import { Dispatch, SetStateAction, useState } from 'react';
import ArrowDown from '../../assets/icons/ArrowDown';
import ArrowUp from '../../assets/icons/ArrowUp';
import RadioWrapper from './RadioWrapper';
import FileIcon from '../../assets/icons/FileIcon';

const IntervalArr = ['daily', 'weekly', 'fortnightly', 'monthly', 'days after', 'custom'];
const statusArr = ['When Complete'];

export default function Recurring() {
  const [recuringInterval, setRecurringInterval] = useState<string>('daily');
  const [statusInterval, setStatusInterval] = useState<string>('When Complete');
  const [dropRecurring, setDropRecurring] = useState<{ recurringInterval: boolean; statusInterval: boolean }>({
    recurringInterval: false,
    statusInterval: false
  });

  return (
    <div className="flex flex-col space-y-2 p-2">
      <label htmlFor="recur" className="flex flex-col space-y-1">
        <span className="text-alsoit-text-lg font-bold">Recur</span>
        <div
          onClick={() => setDropRecurring((prev) => ({ ...prev, recurringInterval: !prev.recurringInterval }))}
          className="border-alsoit-gray-75 border rounded-md text-alsoit-text-md p-2 relative flex justify-between items-center"
        >
          <span className="capitalize">{recuringInterval}</span>
          {dropRecurring.recurringInterval ? <ArrowUp /> : <ArrowDown dimensions={{ height: 7, width: 7 }} />}
          {dropRecurring.recurringInterval && <RecurringIntervals setFn={setRecurringInterval} arr={IntervalArr} />}
        </div>
        <div
          onClick={() => setDropRecurring((prev) => ({ ...prev, statusInterval: !prev.statusInterval }))}
          className="border-alsoit-gray-75 border rounded-md text-alsoit-text-md p-2 relative flex justify-between items-center"
        >
          <span className="capitalize">{statusInterval}</span>
          {dropRecurring.statusInterval ? <ArrowUp /> : <ArrowDown dimensions={{ height: 7, width: 7 }} />}
          {dropRecurring.statusInterval && <RecurringIntervals setFn={setStatusInterval} arr={statusArr} />}
        </div>
      </label>
      <div className="px-3 flex flex-col space-y-4">
        <RadioWrapper>
          <span className="text-alsoit-text-md font-semibold">Create Task</span>
        </RadioWrapper>
        <RadioWrapper>
          <span className="text-alsoit-text-md font-semibold">Recur Forever</span>
        </RadioWrapper>
        <div className="flex flex-col space-y-1">
          <RadioWrapper>
            <span className="text-alsoit-text-md font-semibold">Update Status to:</span>
          </RadioWrapper>
          <div className="bg-alsoit-gray-75 w-16 rounded-md cursor-pointer py-1 mx-6 flex space-x-1 items-center">
            <FileIcon active={false} />
            <span className="uppercase font-semibold text-alsoit-text-md">Todo</span>
          </div>
        </div>
      </div>
      <div className="flex justify-end space-x-1">
        <button className="border p-1 rounded-md text-alsoit-text-md font-semibold border-alsoit-danger text-alsoit-danger w-16 h-8">
          Cancel
        </button>
        <button className="border p-1 rounded-md text-alsoit-text-md font-semibold text-white bg-alsoit-success w-16 h-8 border-none">
          Save
        </button>
      </div>
    </div>
  );
}

interface RecurringIntervalsProps {
  arr: string[];
  setFn: Dispatch<SetStateAction<string>>;
}

function RecurringIntervals({ arr, setFn }: RecurringIntervalsProps) {
  return (
    <div className="flex flex-col space-y-1 w-36 h-min rounded-md shadow-2xl absolute top-8 right-0 bg-alsoit-gray-50 p-2 z-20">
      {arr.map((interval, index) => {
        return (
          <div key={index} onClick={() => setFn(interval)}>
            <RadioWrapper styles="text-alsoit-text-md p-2 hover:bg-alsoit-purple-50 capitalize cursor-pointer font-semibold flex space-x-1 p-1">
              <span>{interval}</span>
            </RadioWrapper>
          </div>
        );
      })}
    </div>
  );
}
