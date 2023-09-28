import { useEffect, useState } from 'react';
import ArrowDown from '../../assets/icons/ArrowDown';
import ArrowUp from '../../assets/icons/ArrowUp';
import RadioWrapper from './RadioWrapper';
import FileIcon from '../../assets/icons/FileIcon';
import { CreateTaskOptions } from './RecurringSubUI/CreateTaskOptions';
import { FrequencyOption } from './RecurringSubUI/FrequencyOptions';
import { RecurringIntervals } from './RecurringSubUI/RecuringInterval';
import { useAppSelector } from '../../app/hooks';
import { DaysAfterOption } from './RecurringSubUI/DaysAfterOption';
import { CustomRecurOption } from './RecurringSubUI/CustomRecurOption';
import { MonthsOption } from './RecurringSubUI/MonthsOption';
import { IntervalArr, MonthOption, getMonthOptionString, statusArr } from '../../utils/Constants/DatesConstants';
import { useCreateTaskRecuring } from '../../features/task/taskService';
import { useParams } from 'react-router-dom';
import { DropProps, RecurFrequency, TypeOptionsProps } from './RecurringTypes';

export default function Recurring() {
  const { taskId } = useParams();
  const { spaceStatuses } = useAppSelector((state) => state.hub);

  const [recuringInterval, setRecurringInterval] = useState<string>('daily');
  const [statusInterval, setStatusInterval] = useState<string>('completed');
  const [dropRecurring, setDropRecurring] = useState<DropProps>({
    recurringInterval: false,
    statusInterval: false,
    createTaskOption: false,
    statusUpdate: false
  });
  const [btnCheckStatus, setbtnCheck] = useState<{ [key: string]: boolean }>({
    frequency: true,
    status: false,
    task: false
  });
  const [statusData, setStatusData] = useState<string[]>([]);
  const [statusStr, setStatus] = useState<string>('to do');
  const [taskColumns, setColumns] = useState<string[] | 'everything'>([]);
  const [repeat, setRepeat] = useState<RecurFrequency>();
  const [options, setOptions] = useState<TypeOptionsProps>();

  const { mutateAsync } = useCreateTaskRecuring();

  const handleSubmit = () => {
    mutateAsync({
      type: recuringInterval,
      execution_type: statusInterval,
      taskId,
      new_task: taskColumns,
      recur_options: repeat,
      type_options: options
    });
  };

  useEffect(() => {
    if (spaceStatuses) {
      spaceStatuses.map((status) => setStatusData((prev) => [...prev, status.name]));
    }
  }, [spaceStatuses]);

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
        {recuringInterval === 'custom' && <CustomRecurOption setOptions={setOptions} />}
        {recuringInterval === 'days_after' && <DaysAfterOption setOptions={setOptions} />}
        {recuringInterval === 'monthly' && <MonthsOption setOptions={setOptions} />}
        <div
          onClick={() => setDropRecurring((prev) => ({ ...prev, statusInterval: !prev.statusInterval }))}
          className="border-alsoit-gray-75 border rounded-md text-alsoit-text-md p-2 relative flex justify-between items-center"
        >
          <span className="capitalize">{getMonthOptionString(statusInterval as MonthOption)}</span>
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
          {dropRecurring.createTaskOption && (
            <CreateTaskOptions
              setColumns={setColumns}
              closeFn={() => setDropRecurring((prev) => ({ ...prev, createTaskOption: !prev.createTaskOption }))}
              parentBtnFn={setbtnCheck}
              parentBtnState="task"
            />
          )}
        </div>
        <RadioWrapper btnCheckState={btnCheckStatus['frequency']} checkStateFn={setbtnCheck} stateValue="frequency">
          <span className="text-alsoit-text-md font-semibold">Recur Forever</span>
        </RadioWrapper>
        <div className="flex flex-col space-y-1">
          <RadioWrapper btnCheckState={btnCheckStatus['status']} checkStateFn={setbtnCheck} stateValue="status">
            <span className="text-alsoit-text-md font-semibold">Update Status to:</span>
          </RadioWrapper>
          <div
            className={`${
              btnCheckStatus['status']
                ? 'bg-alsoit-gray-75 text-alsoit-gray-50'
                : 'bg-alsoit-gray-50 text-alsoit-gray-75'
            } w-20 rounded-md cursor-pointer py-1 mx-6 flex space-x-1 items-center relative`}
            onClick={() => setDropRecurring((prev) => ({ ...prev, statusUpdate: !prev.statusUpdate }))}
          >
            <FileIcon active={false} />
            <div className="uppercase font-semibold text-alsoit-text-sm">
              <span>{statusStr}</span>
            </div>
            {dropRecurring.statusUpdate && btnCheckStatus['status'] && (
              <RecurringIntervals
                activeItem={statusStr}
                arr={statusData}
                setFn={setStatus}
                styles="flex flex-col space-y-1 w-36 h-min rounded-md shadow-2xl absolute top-8 left-0 bg-alsoit-gray-50 text-alsoit-gray-200 p-2 z-20"
              />
            )}
          </div>
        </div>
        {!btnCheckStatus['frequency'] && <FrequencyOption setRepeat={setRepeat} />}
      </div>
      <div className="flex justify-end space-x-1">
        <button className="border p-1 rounded-md text-alsoit-text-md font-semibold border-alsoit-danger text-alsoit-danger w-16 h-8">
          Cancel
        </button>
        <button
          className="border p-1 rounded-md text-alsoit-text-md font-semibold text-white bg-alsoit-success w-16 h-8 border-none"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
}
