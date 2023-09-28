import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import RadioWrapper from '../RadioWrapper';
import { WeekLineOption } from './WeekLineOption';
import dayjs from 'dayjs';
import { getDaysOfMonthWithSuffix, getWeekNumbersForMonth, weekNumberToOrdinal } from '../../../utils/calendar';
import ArrowUp from '../../../assets/icons/ArrowUp';
import ArrowDown from '../../../assets/icons/ArrowDown';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { VerticalScroll } from '../../ScrollableContainer/VerticalScroll';
import { STR_CONSTANTS, Word, dataArr, wordToNumber } from '../../../utils/Constants/DatesConstants';
import { TypeOptionsProps } from '../RecurringTypes';

interface Props {
  setOptions: Dispatch<SetStateAction<TypeOptionsProps | undefined>>;
}

dayjs.extend(advancedFormat);

export function CustomMonthLine({ setOptions }: Props) {
  const currentDate = dayjs();

  const listRef = useRef<HTMLDivElement | null>(null);

  const [value, setValue] = useState<string>('on date');
  const [ordinalDay, setOrdinalDay] = useState<string>(currentDate.format('Do'));
  const [dropDown, setDropDown] = useState<{ [key: string]: boolean }>({
    ordinalDays: false,
    ordinalWeeks: false
  });
  const [ordinalWeek, setOrdinalWeek] = useState<string>(
    weekNumberToOrdinal(getWeekNumbersForMonth(dayjs().month() + 1, dayjs().year()))[0]
  );

  const handleCloseModal = ({
    value,
    valueFn,
    target
  }: {
    value: string;
    valueFn: (value: string) => void;
    target: string;
  }) => {
    valueFn(value);
    setDropDown((prev) => ({ ...prev, [target]: !prev[target] }));
  };

  const ordinalDaysList = () => {
    return (
      <div className="absolute bg-alsoit-gray-50 shadow-2xl z-30 px-2 h-44 overflow-auto" ref={listRef}>
        <VerticalScroll>
          {getDaysOfMonthWithSuffix(dayjs().month() + 1, dayjs().year()).map((day, index) => (
            <div
              key={index}
              className="flex flex-col py-1.5 cursor-pointer"
              onClick={() => handleCloseModal({ value: day, valueFn: setOrdinalDay, target: 'ordinalDays' })}
            >
              <RadioWrapper
                key={index}
                btnCheckState={ordinalDay === day}
                checkStateFn={() => setOrdinalDay(day)}
                stateValue=" "
              >
                <span data-value={day}>{day}</span>
              </RadioWrapper>
            </div>
          ))}
        </VerticalScroll>
      </div>
    );
  };

  const ordinalWeeksList = () => {
    return (
      <div className="absolute bg-alsoit-gray-50 shadow-2xl z-30 px-2 py-2.5 h-44" ref={listRef}>
        <VerticalScroll>
          {weekNumberToOrdinal(getWeekNumbersForMonth(dayjs().month() + 1, dayjs().year())).map((week, index) => (
            <div
              key={index}
              className="flex flex-col py-1.5 cursor-pointer"
              onClick={() => handleCloseModal({ value: week, valueFn: setOrdinalWeek, target: 'ordinalWeeks' })}
            >
              <RadioWrapper
                btnCheckState={ordinalWeek === week}
                checkStateFn={() => setOrdinalWeek(week)}
                stateValue=" "
              >
                <span data-value={week}>{week}</span>
              </RadioWrapper>
            </div>
          ))}
        </VerticalScroll>
      </div>
    );
  };

  useEffect(() => {
    if (listRef) {
      const activeItem = listRef.current?.querySelector(`span[data-value="${ordinalDay}"]`);

      if (activeItem) activeItem.scrollIntoView({ block: 'center', inline: 'nearest' });
    }
  }, [dropDown.ordinalDays]);

  useEffect(() => {
    const numericPart = ordinalDay.match(/\d+/);
    const weekNumber = wordToNumber(ordinalWeek as Word);
    numericPart &&
      weekNumber &&
      setOptions((prev) => ({ ...prev, monthly_day_number: numericPart[0], monthly_week_number: `${weekNumber}` }));
  }, [ordinalDay, ordinalWeek]);

  return (
    <div className="flex flex-col space-y-2 w-full">
      <div className="flex justify-between w-full">
        {dataArr.map((item) => (
          <RadioWrapper key={item} btnCheckState={value === item} checkStateFn={() => setValue(item)} stateValue={item}>
            <span>{item}</span>
          </RadioWrapper>
        ))}
      </div>
      {value === STR_CONSTANTS.onDate && (
        <div className="relative">
          <div
            className="border-alsoit-gray-75 border rounded-md text-alsoit-text-md h-7 px-1 w-full relative flex justify-between items-center cursor-pointer"
            onClick={() => setDropDown((prev) => ({ ...prev, ordinalDays: !prev.ordinalDays }))}
          >
            <span>{ordinalDay}</span>
            {dropDown.ordinalDays ? <ArrowUp /> : <ArrowDown dimensions={{ height: 7, width: 7 }} />}
          </div>
          {dropDown.ordinalDays && ordinalDaysList()}
        </div>
      )}
      {value === STR_CONSTANTS.byWeek && (
        <div className="flex flex-col space-y-1.5">
          <div
            className="border-alsoit-gray-75 border rounded-md text-alsoit-text-md h-7 px-1 w-full relative flex justify-between items-center cursor-pointer"
            onClick={() => setDropDown((prev) => ({ ...prev, ordinalWeeks: !prev.ordinalWeeks }))}
          >
            <span>{ordinalWeek}</span>
            {dropDown.ordinalWeeks ? <ArrowUp /> : <ArrowDown dimensions={{ height: 7, width: 7 }} />}
          </div>
          {dropDown.ordinalWeeks && ordinalWeeksList()}
          <WeekLineOption extended={true} setOptions={setOptions} />
        </div>
      )}
    </div>
  );
}
