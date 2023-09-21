import { Dispatch, SetStateAction, useState } from 'react';
import ArrowDown from '../../assets/icons/ArrowDown';
import ArrowUp from '../../assets/icons/ArrowUp';
import RadioWrapper from './RadioWrapper';
import FileIcon from '../../assets/icons/FileIcon';
import { CreateTaskOptions } from './RecurringSubUI/CreateTaskOptions';
import { FrequencyOption } from './RecurringSubUI/FrequencyOptions';

const IntervalArr = ['daily', 'weekly', 'fortnightly', 'monthly', 'yearly', 'days after', 'custom'];
const statusArr = ['When Complete', 'When Done'];

export default function Recurring() {
  const [recuringInterval, setRecurringInterval] = useState<string>('daily');
  const [statusInterval, setStatusInterval] = useState<string>('When Complete');
  const [dropRecurring, setDropRecurring] = useState<{
    recurringInterval: boolean;
    statusInterval: boolean;
    createTaskOption: boolean;
  }>({
    recurringInterval: false,
    statusInterval: false,
    createTaskOption: false
  });
  const [btnCheckStatus, setbtnCheck] = useState<{ [key: string]: boolean }>({
    frequency: true,
    status: false,
    task: false
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
          {dropRecurring.recurringInterval && (
            <RecurringIntervals setFn={setRecurringInterval} arr={IntervalArr} activeItem={recuringInterval} />
          )}
        </div>
        <div
          onClick={() => setDropRecurring((prev) => ({ ...prev, statusInterval: !prev.statusInterval }))}
          className="border-alsoit-gray-75 border rounded-md text-alsoit-text-md p-2 relative flex justify-between items-center"
        >
          <span className="capitalize">{statusInterval}</span>
          {dropRecurring.statusInterval ? <ArrowUp /> : <ArrowDown dimensions={{ height: 7, width: 7 }} />}
          {dropRecurring.statusInterval && (
            <RecurringIntervals setFn={setStatusInterval} arr={statusArr} activeItem={statusInterval} />
          )}
        </div>
      </label>
      <div className="px-3 flex flex-col space-y-4">
        <div className="flex justify-between w-full relative">
          <RadioWrapper btnCheckState={btnCheckStatus['task']} checkStateFn={setbtnCheck} stateValue="task">
            <span className="text-alsoit-text-md font-semibold">Create Task</span>
          </RadioWrapper>
          {btnCheckStatus['task'] && (
            <span
              className="text-alsoit-gray-75 cursor-pointer"
              onClick={() => setDropRecurring((prev) => ({ ...prev, createTaskOption: !prev.createTaskOption }))}
            >
              Options
            </span>
          )}
          {dropRecurring.createTaskOption && <CreateTaskOptions />}
        </div>
        <RadioWrapper btnCheckState={btnCheckStatus['frequency']} checkStateFn={setbtnCheck} stateValue="frequency">
          <span className="text-alsoit-text-md font-semibold">Recur Forever</span>
        </RadioWrapper>
        <div className="flex flex-col space-y-1">
          <RadioWrapper btnCheckState={btnCheckStatus['status']} checkStateFn={setbtnCheck} stateValue="status">
            <span className="text-alsoit-text-md font-semibold">Update Status to:</span>
          </RadioWrapper>
          <div className="bg-alsoit-gray-75 w-20 rounded-md cursor-pointer py-1 mx-6 flex space-x-1 items-center">
            <FileIcon active={false} />
            <span className="uppercase font-semibold text-alsoit-text-md text-alsoit-gray-50">Todo</span>
          </div>
        </div>
        {!btnCheckStatus['frequency'] && <FrequencyOption />}
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
  activeItem: string;
  setFn: Dispatch<SetStateAction<string>>;
  styles?: string;
}

export function RecurringIntervals({ arr, setFn, activeItem, styles }: RecurringIntervalsProps) {
  return (
    <div
      className={
        styles ??
        'flex flex-col space-y-1 w-36 h-min rounded-md shadow-2xl absolute top-8 right-0 bg-alsoit-gray-50 p-2 z-20'
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
