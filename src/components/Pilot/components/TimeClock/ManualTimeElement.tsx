import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { IEntries } from '../../../../features/task/interface.tasks';
import { ActiveUsersTimer } from './ActiveUsersTimer';
import { createDynamicTimeComponent } from '../../../../utils/calendar';
import { findNearestTime } from '../../../../utils/FindNearesttime';
import dayjs from 'dayjs';
import { VerticalScroll } from '../../../ScrollableContainer/VerticalScroll';
import ArrowDownFilled from '../../../../assets/icons/ArrowDownFilled';
import { parseAndUpdateTime } from '../../../../utils/TimerDuration';
import { createManualTimeEntry } from '../../../../features/task/taskService';
import { PoundsIcon } from '../../../../assets/icons/PoundsIcon';
import TagIcon from '../../../../assets/icons/TagIcon';

interface Props {
  activeTrackers: IEntries[] | undefined;
}

export function ManualTimeElement({ activeTrackers }: Props) {
  const [value, setValue] = useState<{ start?: string; end?: string; description?: string; isBillable?: 0 | 1 }>({
    start: '00:00',
    end: '00:00',
    description: '',
    isBillable: 0
  });
  const [dropped, setDropped] = useState<{ container: boolean; start: boolean; end: boolean }>({
    container: false,
    start: false,
    end: false
  });

  const { timeInterval } = useAppSelector((state) => state.calendar);
  const { timezone } = useAppSelector((state) => state.userSetting);
  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);

  const { mutateAsync, isSuccess } = createManualTimeEntry();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    mutateAsync({
      end_date: parseAndUpdateTime(value.end),
      start_date: parseAndUpdateTime(value.start),
      id: activeItemId,
      type: activeItemType,
      description: value.description,
      isBillable: value.isBillable === 1 ? true : false
    });
  };

  useEffect(() => {
    if (isSuccess) setValue({ end: '00:00', start: '00:00', description: '' });
  }, [isSuccess]);

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-col space-y-1.5">
        <input
          type="text"
          placeholder="Enter time e.g. 3hrs 20mins"
          className="w-11/12 px-2 py-0.5 mx-auto rounded-lg text-alsoit-text-md"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-11/12 px-2 py-0.5 mx-auto rounded-lg text-alsoit-text-md"
        />
      </div>
      <div className="w-11/12 flex flex-col space-y-2 mx-auto">
        <div
          className="cursor-pointer bg-alsoit-purple-50 p-2.5 rounded-sm flex items-center justify-center space-x-0.5 w-28"
          onClick={() => setDropped((prev) => ({ ...prev, container: !prev.container }))}
        >
          <span className="text-alsoit-xi">Set time</span>
          <ArrowDownFilled active={dropped.container} />
        </div>
        {dropped.container && (
          <div className="flex space-x-2 items-center">
            {/* start time Entry */}
            <div className="flex flex-col space-y-1 items-center w-20">
              <span className="text-alsoit-text-md uppercase">Start time</span>
              <input
                onChange={handleChange}
                onClick={() => setDropped((prev) => ({ ...prev, start: !prev.start }))}
                name="start"
                value={value.start}
                type="text"
                className="border-none px-1 py-0.5 text-center text-alsoit-text-md bg-white rounded-md w-full"
              />

              {dropped.start && (
                <TimeDropDown
                  setValue={setValue}
                  timeArr={createDynamicTimeComponent(timeInterval, timezone)}
                  value={value.start}
                  type="start"
                  closeModal={() => setDropped((prev) => ({ ...prev, start: false }))}
                />
              )}
            </div>
            {/* End time Entry */}
            <div className="flex flex-col space-y-1 items-center w-20">
              <span className="text-alsoit-text-md uppercase">end time</span>
              <input
                onChange={handleChange}
                onClick={() => setDropped((prev) => ({ ...prev, end: !prev.end }))}
                name="end"
                value={value.end}
                type="text"
                className="border-none px-1 py-0.5 text-center text-alsoit-text-md bg-white rounded-md w-full"
              />

              {dropped.end && (
                <TimeDropDown
                  setValue={setValue}
                  timeArr={createDynamicTimeComponent(timeInterval, timezone)}
                  value={value.end}
                  closeModal={() => setDropped((prev) => ({ ...prev, end: false }))}
                  type="end"
                />
              )}
            </div>
            {/* Action Buttons */}
            <div className="flex space-x-2 items-baseline mt-5 pl-5">
              <button
                onClick={() => setValue({ end: '00:00', start: '00:00', description: '' })}
                className="bg-alsoit-gray-75 py-0.5 px-2.5 rounded-md text-alsoit-gray-50"
              >
                Reset
              </button>
              <button onClick={handleClick} className="bg-alsoit-success py-0.5 px-2.5 rounded-md text-alsoit-gray-50">
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-between">
        <ActiveUsersTimer activeTrackers={activeTrackers} />
        <div className="flex items-center">
          <div
            onClick={() =>
              value.isBillable === 0
                ? setValue((prev) => ({ ...prev, isBillable: 1 }))
                : setValue((prev) => ({ ...prev, isBillable: 0 }))
            }
            className="flex space-x-0.5 p-0.5 bg-white rounded-full"
          >
            <PoundsIcon active={value.isBillable === 1 && true} />
          </div>
          <span className="flex items-center justify-center">
            <TagIcon />
          </span>
        </div>
      </div>
    </div>
  );
}

interface TimeDropDownProps {
  value?: string;
  timeArr: string[];
  setValue: Dispatch<
    SetStateAction<{
      start?: string | undefined;
      end?: string | undefined;
    }>
  >;
  type: string;
  closeModal: () => void;
}

function TimeDropDown({ value, timeArr, setValue, type, closeModal }: TimeDropDownProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const timeValue = value !== '00:00' && value;

  const nearestTime = timeValue || findNearestTime(dayjs(), timeArr);

  const [activeTime, setActiveTime] = useState<string>(nearestTime);

  const handleClick = (value: string) => {
    type === 'start' ? setValue((prev) => ({ ...prev, start: value })) : setValue((prev) => ({ ...prev, end: value }));
    setActiveTime(value);
  };

  useEffect(() => {
    //  close the modal on click away
    const handleCliskAway = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    };

    // Scroll to show the active item
    if (listRef.current && activeTime) {
      const activeElement = listRef.current.querySelector(`li[data-value="${activeTime}"]`);
      if (activeElement) {
        activeElement.scrollIntoView({ block: 'center', inline: 'nearest' });
      }
    }

    document.addEventListener('mousedown', handleCliskAway);

    return () => document.removeEventListener('mousedown', handleCliskAway);
  }, [activeTime]);

  return (
    <div className="flex flex-col space-y-2 absolute top-0 shadow z-30 bg-alsoit-gray-50 h-56 w-44" ref={modalRef}>
      <VerticalScroll>
        <ul className="flex flex-col space-x-1.5" ref={listRef}>
          {timeArr.map((item, index) => (
            <li
              onClick={() => handleClick(item)}
              key={index}
              data-value={item}
              className={`text-alsoit-text-lg font-semibold py-2 flex space-x-2 items-center px-2 rounded-md ${
                activeTime === item ? 'bg-alsoit-purple-50' : 'hover:bg-purple-400 hover:text-white'
              }`}
            >
              <input checked={activeTime === item} type="radio" id="myRadio" name="myRadioGroup" className="hidden" />
              <label
                htmlFor="myRadio"
                className={
                  activeTime === item
                    ? 'bg-alsoit-purple-300 inline-block p-2 border border-alsoit-purple-300 rounded-full cursor-pointer text-purple-600'
                    : 'inline-block p-2 border border-alsoit-purple-300 rounded-full cursor-pointer text-purple-600'
                }
              ></label>
              <span className="font-semibold">{item}</span>
            </li>
          ))}
        </ul>
      </VerticalScroll>
    </div>
  );
}
