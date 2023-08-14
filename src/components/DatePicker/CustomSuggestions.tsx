import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCustomSuggetionsField } from '../../features/task/taskSlice';
import ArrowDown from '../../assets/icons/ArrowDown';
import { setTimeInterval } from '../../features/calendar/slice/calendarSlice';

interface CustomSuggestionProps {
  setCustomSuggestion?: Dispatch<SetStateAction<boolean>>;
}

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
          <Interval />
        </div>
      </div>
    </div>
  );
}

function Interval() {
  const dispatch = useAppDispatch();
  const [timeIntervalValue, setIntervalValue] = useState<15 | 30>(15);
  const [intervalTypeArr, setTypeArr] = useState<string>('minutes');
  const [dropDownToggle, setDropDownToggle] = useState<{ time: boolean; type: boolean }>({
    time: false,
    type: false
  });
  const { intervalType, timeInterval } = useAppSelector((state) => state.calendar);

  useEffect(() => {
    dispatch(setTimeInterval(timeIntervalValue));
  }, [timeIntervalValue]);

  return (
    <div className="flex space-x-2 items-center">
      <div
        onClick={() => setDropDownToggle((prev) => ({ ...prev, type: !prev.type }))}
        className="flex items-center space-x-2 w-min bg-alsoit-gray-75 text-center p-1 rounded-md text-white capitalize cursor-pointer relative"
      >
        <span className="">{intervalType}</span>
        <ArrowDown active={false} />
        {dropDownToggle.type && (
          <ul className="w-20 p-1 rounded-md flex flex-col space-y-2 absolute bg-alsoit-gray-75 shadow-2xl top-8 -left-2">
            <li className="hover:bg-alsoit-gray-50 hover:text-alsoit-gray-300">Minutes</li>
          </ul>
        )}
      </div>
      <div
        onClick={() => setDropDownToggle((prev) => ({ ...prev, time: !prev.time }))}
        className="flex items-center space-x-2 w-min bg-alsoit-gray-75 text-center p-1 rounded-md text-white capitalize cursor-pointer relative"
      >
        <span className="">{timeInterval}</span>
        <ArrowDown active={false} />
        {dropDownToggle.time && (
          <ul className="w-20 p-1 rounded-md flex flex-col space-y-2 absolute bg-alsoit-gray-75 shadow-2xl top-8 -left-2">
            <li onClick={() => setIntervalValue(15)} className="hover:bg-alsoit-gray-50 hover:text-alsoit-gray-300">
              15
            </li>
            <li onClick={() => setIntervalValue(30)} className="hover:bg-alsoit-gray-50 hover:text-alsoit-gray-300">
              30
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
