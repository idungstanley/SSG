import { useState, useRef, useEffect } from 'react';
import dayjs from 'dayjs';
import ArrowCaretDown from '../assets/icons/ArrowCaretDown';

type Option = string; // Change this type to match the type of your options

interface ReusableSelectProps {
  value?: string;
  onclick: (option: string) => void;
  options: Option[];
}

function ReusableSelect({ value, onclick, options }: ReusableSelectProps) {
  const [dropped, setDrop] = useState<{ container: boolean; timeInterval: boolean }>({
    container: false,
    timeInterval: false
  });
  const [editing, setEditing] = useState<boolean>(false);
  const [timeInterval, setTimeInterval] = useState<15 | 30>(15);
  const currentOrFutureTime = value || findNearestTime(dayjs(), options);
  const [activeItem, setActiveItem] = useState<string | null>(currentOrFutureTime);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    // Scroll to show the active item
    if (listRef.current && activeItem) {
      const activeElement = listRef.current.querySelector(`li[data-value="${activeItem}"]`);
      if (activeElement) {
        activeElement.scrollIntoView({ block: 'center', inline: 'nearest' });
      }
    }
  }, [dropped, activeItem]);

  const handleClick = (option: string) => {
    onclick(option);
    setActiveItem(option);
    setEditing(false);
  };

  const handleEdit = () => {
    if (value) {
      setEditing(true);
      setDrop((prev) => ({ ...prev, container: true }));
    } else {
      setDrop((prev) => ({ ...prev, container: true }));
    }
  };

  const handleBlur = () => {
    setEditing(false);
    setDrop((prev) => ({ ...prev, container: false }));
  };

  const handleCloseModal = (value?: 15 | 30) => {
    if (value) {
      setTimeInterval(value);
      setDrop((prev) => ({ ...prev, timeInterval: !prev.timeInterval }));
    }
  };

  function findNearestTime(currentTime: dayjs.Dayjs, timeOptions: Option[]): string {
    const currentTimeMoment = dayjs(currentTime);
    const currentDateString = currentTimeMoment.format('YYYY-MM-DD');
    const currentTimeMinutes = currentTimeMoment.diff(dayjs().startOf('day'), 'minutes');

    let nearestTime = timeOptions[0];
    let nearestDiff = Math.abs(
      currentTimeMinutes - dayjs(currentDateString + ' ' + nearestTime).diff(dayjs().startOf('day'), 'minutes')
    );

    for (const option of timeOptions) {
      const optionMinutes = dayjs(currentDateString + ' ' + option).diff(dayjs().startOf('day'), 'minutes');
      const diff = Math.abs(currentTimeMinutes - optionMinutes);
      if (diff < nearestDiff) {
        nearestTime = option;
        nearestDiff = diff;
      }
    }

    return nearestTime;
  }

  return (
    <div className="rounded-md relative">
      {!editing && (
        <div className="text-alsoit-text-sm italic" onClick={handleEdit}>
          {value ? value : 'Set Time'}
        </div>
      )}
      {dropped.container && !value && (
        <div className="flex flex-col space-y-2 w-60" tabIndex={0} onBlur={handleBlur}>
          <span className="text-alsoit-text-sm italic">Set Time</span>
          <ul
            className="absolute top-2 max-h-72 w-11/12 overflow-y-scroll flex flex-col space-y-2 p-4 bg-white shadow-2xl rounded-md"
            ref={listRef}
          >
            <li className="flex justify-between items-center relative">
              <span className="font-semibold">Time Interval</span>
              <div
                className="w-max flex items-center bg-alsoit-gray-50 p-2 rounded-lg"
                onClick={() => setDrop((prev) => ({ ...prev, timeInterval: !prev.timeInterval }))}
              >
                <span>{timeInterval} mins</span>
                <ArrowCaretDown active />
              </div>
              {dropped.timeInterval && (
                <div className="bg-alsoit-gray-50 flex flex-col space-y-2 shadow-lg w-20 p-1 absolute top-8 right-0">
                  <span
                    onClick={() => handleCloseModal(15)}
                    className="w-full cursor-pointer rounded bg-alsoit-gray-50 shadow font-semibold p-1 hover:bg-alsoit-gray-75 hover:text-white text-alsoit-gray-200"
                  >
                    15 Mins
                  </span>
                  <span
                    onClick={() => handleCloseModal(30)}
                    className="w-full cursor-pointer rounded bg-alsoit-gray-50 shadow font-semibold p-1 hover:bg-alsoit-gray-75 hover:text-white text-alsoit-gray-200"
                  >
                    30 Mins
                  </span>
                </div>
              )}
            </li>
            {options.map((option, index) => (
              <li
                onClick={() => handleClick(option)}
                key={index}
                data-value={option}
                className={`text-alsoit-text-lg font-semibold py-2 flex space-x-2 items-center px-2 rounded-md ${
                  activeItem === option ? 'bg-alsoit-purple-50' : 'hover:bg-purple-400 hover:text-white'
                }`}
              >
                <input
                  checked={activeItem === option}
                  type="radio"
                  id="myRadio"
                  name="myRadioGroup"
                  className="hidden"
                />
                <label
                  htmlFor="myRadio"
                  className={
                    activeItem === option
                      ? 'bg-alsoit-purple-300 inline-block p-2 border border-alsoit-purple-300 rounded-full cursor-pointer text-purple-600'
                      : 'inline-block p-2 border border-alsoit-purple-300 rounded-full cursor-pointer text-purple-600'
                  }
                ></label>
                <span className="font-semibold">{option}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {editing && (
        <input
          type="text"
          value={value}
          onBlur={handleBlur}
          onChange={(e) => onclick(e.target.value)}
          className="text-alsoit-text-sm italic w-16 h-4 rounded-md border-alsoit-purple-300"
        />
      )}
    </div>
  );
}

export default ReusableSelect;
