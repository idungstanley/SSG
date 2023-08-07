import { Dispatch, SetStateAction, useState } from 'react';
import ArrowDown from '../../assets/icons/ArrowDown';
import ArrowUp from '../../assets/icons/ArrowUp';

const IntervalArr = ['daily', 'weekly', 'fortnightly', 'monthly', 'days after', 'custom'];

export default function Recurring() {
  const [recuringInterval, setRecurringInterval] = useState<string>('daily');
  const [dropRecurring, setDropRecurring] = useState<boolean>(false);
  return (
    <div className="flex flex-col space-y-2 p-2">
      <label htmlFor="recur" className="flex flex-col space-y-1">
        <span className="text-alsoit-text-lg font-bold">Recur</span>
        <div
          onClick={() => setDropRecurring(!dropRecurring)}
          className="border-alsoit-gray-75 border rounded-md text-alsoit-text-md p-2 relative flex justify-between items-center"
        >
          <span className="capitalize">{recuringInterval}</span>
          {dropRecurring ? <ArrowUp /> : <ArrowDown dimensions={{ height: 7, width: 7 }} />}
          {dropRecurring && <RecurringIntervals setFn={setRecurringInterval} arr={IntervalArr} />}
        </div>
        <select className="border-alsoit-gray-75 border rounded-md text-alsoit-text-md py-0.5">
          <option value="">When Complete</option>
        </select>
      </label>
      <div className="px-3 flex flex-col space-y-4">
        <label htmlFor="radio" className="flex space-x-2 items-center">
          <input type="radio" />
          <span className="text-alsoit-text-md font-semibold">Create Task</span>
        </label>
        <label htmlFor="radio" className="flex space-x-2 items-center">
          <input type="radio" />
          <span className="text-alsoit-text-md font-semibold">Recur Forever</span>
        </label>
        <label htmlFor="radio" className="flex space-x-2 items-center">
          <input type="radio" />
          <span className="text-alsoit-text-md font-semibold">Update Status to:</span>
        </label>
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
    <div className="flex flex-col space-y-1 w-32 h-min rounded-md shadow-2xl absolute top-8 right-0 bg-alsoit-gray-50 p-2">
      {arr.map((interval, index) => {
        return (
          <span
            key={index}
            onClick={() => setFn(interval)}
            className="text-alsoit-text-md p-1 hover:bg-alsoit-purple-50 capitalize cursor-pointer font-semibold"
          >
            {interval}
          </span>
        );
      })}
    </div>
  );
}
