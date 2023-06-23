import React, { useState } from 'react';

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

  return (
    <div className="rounded-md relative">
      {!editing && (
        <div className="text-xs italic" onClick={handleEdit}>
          {value ? value : 'Set Time'}
        </div>
      )}
      {dropped && !value && (
        <div className="flex flex-col space-y-2" tabIndex={0} onBlur={handleBlur}>
          <span className="text-xs italic">Set Time</span>
          <ul className="absolute top-2 max-h-52 w-24 overflow-y-scroll flex flex-col space-y-2 py-1 bg-white shadow-2xl rounded-md">
            <li className="text-xs italic bg-gray-300 text-white">Select time</li>
            {options.map((option, index) => (
              <li
                onClick={() => handleClick(option)}
                key={index}
                className="text-xs hover:bg-purple-400 hover:text-white px-2 rounded-md"
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
          className="text-xs italic w-24 h-4 rounded-md border-purple-400"
        />
      )}
    </div>
  );
}

export default ReusableSelect;
