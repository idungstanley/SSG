import React, { useState } from 'react';
import dayjs from 'dayjs';

type Option = string; // Change this type to match the type of your options

interface ReusableSelectProps {
  value?: string;
  onclick: (option: string) => void;
  options: Option[];
}

function ReusableSelect({ value, onclick, options }: ReusableSelectProps) {
  const [dropped, setDrop] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);

  const handleClick = (option: string) => {
    onclick(option);
    setEditing(false);
  };

  const handleEdit = () => {
    if (value) {
      setEditing(true);
      setDrop(true);
    } else {
      setDrop(true);
    }
  };

  const handleBlur = () => {
    setEditing(false);
    setDrop(false);
  };

  const currentOrFutureTime = value || dayjs().add(5, 'minutes').format('h:mm A');

  return (
    <div className="rounded-md relative">
      {!editing && (
        <div className="text-alsoit-text-sm italic" onClick={handleEdit}>
          {value ? value : 'Set Time'}
        </div>
      )}
      {dropped && !value && (
        <div className="flex flex-col space-y-2" tabIndex={0} onBlur={handleBlur}>
          <span className="text-alsoit-text-sm italic">Set Time</span>
          <ul className="absolute top-2 max-h-52 w-28 overflow-y-scroll flex flex-col space-y-2 py-1 bg-white shadow-2xl rounded-md">
            <li className="text-xs italic bg-alsoit-gray-200 text-white">Select time</li>
            {options.map((option, index) => (
              <li
                onClick={() => handleClick(option)}
                key={index}
                className={`text-alsoit-text-sm px-2 rounded-md ${
                  currentOrFutureTime === option ? 'bg-yellow-200' : 'hover:bg-purple-400 hover:text-white'
                }`}
              >
                {option}
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
