import React, { useEffect, useRef, useState } from 'react';

type Option = string;

interface TimesDropdownProps {
  handleClick: (value: string) => void;
  options: Option[];
  activeValue?: string;
}

export default function TimeDropdown({ handleClick, options, activeValue }: TimesDropdownProps) {
  const [activeItem, setActiveItem] = useState(activeValue);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (listRef.current && activeItem) {
      const activeElement = listRef.current.querySelector(`li[data-value="${activeItem}"]`);
      if (activeElement) {
        activeElement.scrollIntoView({ block: 'center', inline: 'nearest' });
      }
    }
  }, []);

  return (
    <ul className="my-2 overflow-scroll" style={{ height: '372px', width: '120px' }} ref={listRef}>
      {options.map((option, index) => (
        <li
          onClick={() => {
            handleClick(option);
            setActiveItem(option);
          }}
          key={index}
          data-value={option}
          className={`text-alsoit-text-lg font-semibold py-2 flex space-x-2 items-center px-2 rounded-md ${
            activeItem === option ? 'bg-alsoit-purple-50' : 'hover:bg-purple-400 hover:text-white'
          }`}
        >
          <input checked={activeItem === option} type="radio" id="myRadio" name="myRadioGroup" className="hidden" />
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
  );
}
