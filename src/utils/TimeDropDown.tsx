import { useState, useRef, useEffect } from 'react';
import dayjs from 'dayjs';
import { useAppSelector } from '../app/hooks';
import { findNearestTime } from './FindNearesttime';

type Option = string;

interface ReusableSelectProps {
  value?: string;
  onclick: (option: string) => void;
  options: Option[];
  style?: string;
}

function ReusableSelect({ value, onclick, options, style }: ReusableSelectProps) {
  const [dropped, setDrop] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);
  const currentOrFutureTime = value || findNearestTime(dayjs(), options);
  const [activeItem, setActiveItem] = useState<string | null>(currentOrFutureTime);
  const { timeInterval } = useAppSelector((state) => state.calendar);
  const listRef = useRef<HTMLUListElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickAway = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setDrop(false);
      }
    };
    // Scroll to show the active item
    if (listRef.current && activeItem) {
      const activeElement = listRef.current.querySelector(`li[data-value="${activeItem}"]`);
      if (activeElement) {
        activeElement.scrollIntoView({ block: 'center', inline: 'nearest' });
      }
    }

    document.addEventListener('mousedown', handleClickAway);

    return () => {
      document.removeEventListener('mousedown', handleClickAway);
    };
  }, [dropped, activeItem]);

  const handleClick = (option: string) => {
    onclick(option);
    setActiveItem(option);
    setEditing(false);
    setDrop(false);
  };

  const handleEdit = () => {
    setEditing(true);
    setDrop(!dropped);
  };

  const handleBlur = () => {
    setEditing(false);
    setDrop(false);
  };

  return (
    <div className="rounded-md relative">
      {!editing && (
        <div className="text-alsoit-text-sm flex items-center -mt-1.5" onClick={handleEdit}>
          {value ? `| ${value}` : 'Set Time'}
        </div>
      )}
      {dropped && (
        <div className={`relative flex flex-col space-y-2 w-60 ${style}`} tabIndex={0} ref={modalRef}>
          <ul
            className="absolute top-2 max-h-72 w-11/12 overflow-y-scroll flex flex-col space-y-2 p-4 bg-white shadow-2xl rounded-md"
            ref={listRef}
          >
            <li className="flex justify-between items-center relative">
              <span className="font-semibold">Time Interval</span>
              <div className="w-max flex items-center bg-alsoit-gray-50 p-2 rounded-lg">
                <span>{timeInterval} mins</span>
              </div>
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
      {editing && value && (
        <input
          type="text"
          value={value}
          onBlur={handleBlur}
          onChange={(e) => onclick(e.target.value)}
          className="text-alsoit-text-sm italic w-16 h-4 rounded-md border-alsoit-purple-300 flex items-center absolute -top-2.5"
        />
      )}
    </div>
  );
}

export default ReusableSelect;
