import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCustomSuggetionsField } from '../../features/task/taskSlice';
import { setReminderInterval, setRemindertype, setTimeInterval } from '../../features/calendar/slice/calendarSlice';
import Interval from './CalendarSettingsInterval';

interface CustomSuggestionProps {
  setCustomSuggestion?: Dispatch<SetStateAction<boolean>>;
}

const reminderTypeArr = ['minutes', 'hours', 'days', 'weeks', 'months'];
const reminderValueArr = [1, 2, 5, 10, 15, 20, 30];
const timeIntervalArr = [15, 20, 30];
const intervalTypeArr = ['minutes'];

export default function CustomSuggestion({ setCustomSuggestion }: CustomSuggestionProps) {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<{ [key: string]: string | number }>({
    depth: 0,
    type: ''
  });
  const [error, setError] = useState<{ monthErr: string; weekErr: string; numberErr?: string }>({
    monthErr: '',
    weekErr: ''
  });
  const [timeIntervalValue, setIntervalValue] = useState<string | number>(15);
  const [timeIntervalType, setTimeIntervaltype] = useState<string | number>('minutes');
  const [reminderIntervalValue, setReminderIntervalValue] = useState<string | number>(10);
  const [reminderTypeValue, setReminderType] = useState<string | number>('minutes');
  const [timeToggle, setTimeToggle] = useState(false);
  const [timeTypeToggle, setTimeTypeToggle] = useState(false);
  const [reminderToggle, setReminderToggle] = useState(false);
  const [reminderTypeToggle, setReminderTypeToggle] = useState(false);
  const { reminderInterval, reminderType, timeInterval, intervalType } = useAppSelector((state) => state.calendar);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    const { type, depth } = value as { type: string; depth: number };
    if (!Number(depth)) return setError((prev) => ({ ...prev, numberErr: 'Only number values allowed for depth' }));
    if ((type === 'month' && depth > 0) || (type === 'week' && depth > 0)) {
      dispatch(setCustomSuggetionsField({ depth, type, label: `${depth} ${type}}` }));
      setError({ monthErr: '', weekErr: '' });
      setCustomSuggestion && setCustomSuggestion(false);
    } else {
      type === 'month'
        ? setError({ ...error, monthErr: 'Months depth can not be less than 1' })
        : setError({ ...error, weekErr: 'Week depth can not be less than 1' });
    }
  };

  const handleReminder = ({ value, type }: { value?: number; type?: string }) => {
    value && dispatch(setReminderInterval(value));
    type && dispatch(setRemindertype(type));
  };

  useEffect(() => {
    dispatch(setTimeInterval(timeIntervalValue));
    dispatch(setReminderInterval(reminderIntervalValue));
    dispatch(setRemindertype(reminderTypeValue));
  }, [timeIntervalValue, reminderIntervalValue, reminderTypeValue]);

  return (
    <div className="w-full px-2 flex flex-col space-y-4 my-6">
      <span className="text-left font-semibold text-alsoit-text-lg">Calendar Settings</span>
      <div className="w-11/12 mx-auto flex flex-col space-y-2 rounded-md p-2 bg-alsoit-gray-50">
        {/* Calendar Quick Selections */}
        <div className="w-11/12 mx-auto pb-2 flex flex-col space-y-2 border-b-2">
          <span className="text-left font-semibold text-alsoit-text-lg">Add Calendar Quick Selection</span>
          <label htmlFor="type" className="text-alsoit-text-md text-left font-semibold flex flex-col space-y-2">
            <span>Type of field</span>
            <select
              name="type"
              id="type"
              className="py-0.5 rounded-md border border-alsoit-gray-75 text-alsoit-text-sm"
              onChange={handleChange}
            >
              <option value="">Type of field</option>
              <option value="month">Months</option>
              <option value="week">Weeks</option>
            </select>
          </label>
          <label htmlFor="depth" className="text-alsoit-text-md text-left font-semibold flex flex-col space-y-2">
            <span>Depth of Addition</span>
            <input
              type="tel"
              id="depth"
              name="depth"
              className="h-7 rounded-md border border-alsoit-gray-75 text-alsoit-text-sm"
              placeholder={value['type'] === 'week' ? '2 for 2 weeks' : '2 for 2 months'}
              onChange={(e) => handleChange(e)}
            />
          </label>
          {error.monthErr && (
            <span className="text-alsoit-text-sm text-alsoit-danger text-center">{error.monthErr}</span>
          )}
          {error.weekErr && <span className="text-alsoit-text-sm text-alsoit-danger text-center">{error.weekErr}</span>}
          {error.numberErr && (
            <span className="text-alsoit-text-sm text-alsoit-danger text-center">{error.numberErr}</span>
          )}
          <div className="flex space-x-2">
            {/* <button
            className="border p-1 rounded-md text-alsoit-text-md font-semibold border-alsoit-danger text-alsoit-danger w-16 h-8"
            onClick={() => setCustomSuggestion && setCustomSuggestion(false)}
          >
            Cancel
          </button> */}
            <button
              className="border p-1 rounded-md text-alsoit-text-md font-semibold text-white bg-alsoit-success w-16 h-8 border-none"
              onClick={() => handleClick()}
            >
              Create
            </button>
          </div>
        </div>
        {/* Time Selection Interval */}
        <div className="w-11/12 mx-auto flex space-x-2 items-center">
          <span className="font-semibold text-alsoit-text-lg text-left">Set Time Interval</span>
          <Interval
            data={intervalType}
            toggle={timeTypeToggle}
            toggleFn={setTimeTypeToggle}
            valueArr={intervalTypeArr}
            valueFn={setTimeIntervaltype}
          />
          <Interval
            data={timeInterval}
            toggle={timeToggle}
            toggleFn={setTimeToggle}
            valueArr={timeIntervalArr}
            valueFn={setIntervalValue}
          />
        </div>
        {/* Reminder settings */}
        <div className="w-11/12 mx-auto flex space-x-2 items-center">
          <span className="font-semibold text-alsoit-text-lg text-left">Remind me</span>
          <Interval
            data={reminderInterval}
            toggle={reminderToggle}
            toggleFn={setReminderToggle}
            valueArr={reminderValueArr}
            valueFn={setReminderIntervalValue}
          />
          <Interval
            data={reminderType}
            toggle={reminderTypeToggle}
            toggleFn={setReminderTypeToggle}
            valueArr={reminderTypeArr}
            valueFn={setReminderType}
          />
          <span>Before</span>
        </div>
      </div>
    </div>
  );
}
