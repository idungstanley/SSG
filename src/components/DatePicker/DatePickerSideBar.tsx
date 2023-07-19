import dayjs, { Dayjs } from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setHistoryMemory, setTaskSelectedDate } from '../../features/task/taskSlice';
import { setSelectedDate } from '../../features/workspace/workspaceSlice';
import { generateDate, weekends, weeks } from '../../utils/calendar';
import { useState } from 'react';
import ThreeDotIcon from '../../assets/icons/ThreeDotIcon';

interface DatePickerSideBarProp {
  currentDate: dayjs.Dayjs;
}

type extraFields = {
  label: string;
  type: string;
  depth: number;
};

export function DatePickerSideBar({ currentDate }: DatePickerSideBarProp) {
  const dispatch = useAppDispatch();
  const customSuggestionField: extraFields[] = [];
  const [iconToggle, setIconToggle] = useState<{ threeDotIcon: boolean }>({
    threeDotIcon: false
  });
  const [showRecurring, setRecurring] = useState<boolean>(false);
  const { HistoryFilterMemory } = useAppSelector((state) => state.task);
  let selectedStartOfWeek: Dayjs | null = null;
  let selectedEndOfWeek: Dayjs | null = null;

  const customSuggestion = (field: extraFields) => {
    if (field.type === 'week') {
      return (
        <p
          className="font-extrabold rounded-md hover:bg-alsoit-gray-75 hover:text-white text-xl flex justify-between px-2 py-0.5 w-full"
          onClick={() => handleWeekButtonClick(field.depth)}
        >
          <span>`Next ${field.depth} weeks`</span>
          <span>{dayjs(weeks(field.depth)).format('ddd D')}</span>
        </p>
      );
    }

    if (field.type === 'month') {
      return (
        <p
          className="font-extrabold rounded-md hover:bg-alsoit-gray-75 hover:text-white text-xl flex justify-between px-2 py-0.5 w-full"
          onClick={() => handleWeekButtonClick(field.depth * 4)}
        >
          <span>`Next ${field.depth} months`</span>
          <span>{dayjs(weeks(field.depth)).format('ddd D, MMM')}</span>
        </p>
      );
    }
  };

  // Function to handle week selection
  const handleWeekButtonClick = (durationCount: number): void => {
    const currentDate: Dayjs = dayjs();
    const nextWeekStart: Dayjs = currentDate.add(durationCount ?? 1, 'week').startOf('week');
    const nextWeekEnd: Dayjs = currentDate.add(durationCount ?? 1, 'week').endOf('week');

    if (!selectedStartOfWeek) {
      // If no start of week is selected, set the next week as the selected week
      selectedStartOfWeek = nextWeekStart;
      selectedEndOfWeek = nextWeekEnd;
      dispatch(setTaskSelectedDate({ from: nextWeekStart, to: nextWeekEnd }));
    } else {
      // If start of week is already selected, reset the selection
      selectedStartOfWeek = null;
      selectedEndOfWeek = null;
      selectedStartOfWeek = nextWeekStart;
      selectedEndOfWeek = nextWeekEnd;
      dispatch(setTaskSelectedDate({ from: nextWeekStart, to: nextWeekEnd }));
    }
  };

  let selectedWeekends: dayjs.Dayjs[] = [];

  // Function to handle weekend selection
  const handleWeekendButtonClick = (durationType: 'weekend' | 'next weekend') => {
    const currentDate = dayjs();
    const nextWeekend = findNextWeekend(currentDate);
    const secondWeekend = findFirstSaturdayOneWeekAfter(currentDate);

    if (nextWeekend && secondWeekend) {
      selectedWeekends = [nextWeekend.date, secondWeekend];
      if (durationType === 'weekend') {
        dispatch(setTaskSelectedDate({ from: selectedWeekends[0], to: selectedWeekends[1] }));
        dispatch(setSelectedDate({ date: selectedWeekends[0] }));
        return selectedWeekends[0];
      } else {
        dispatch(setTaskSelectedDate({ from: selectedWeekends[1], to: selectedWeekends[1] }));
        dispatch(setSelectedDate({ date: selectedWeekends[1] }));
        return selectedWeekends[1];
      }
    } else {
      // If either the next weekend or the 2nd weekend is not found, reset the selection
      selectedWeekends = [];
    }
  };

  const handleDayClick = (type: string) => {
    if (type === 'today') {
      dispatch(
        setTaskSelectedDate({
          from: currentDate
        })
      );
      dispatch(setSelectedDate({ date: currentDate }));
    } else {
      dispatch(
        setTaskSelectedDate({
          from: currentDate.add(1, 'day')
        })
      );
      dispatch(setSelectedDate({ date: currentDate.add(1, 'day') }));
    }
  };

  const handleWeekClick = () => {
    dispatch(setTaskSelectedDate({ from: dayjs().add(8, 'days') }));
    dispatch(setSelectedDate({ date: dayjs().add(8, 'days') }));
  };

  // Function to find the next weekend based on the current date
  const findNextWeekend = (currentDate: dayjs.Dayjs) => {
    const dates = generateDate(); // Generate the date array

    // Find the next weekend after the current date
    const nextWeekend = dates.find((date) => date.isWeekend && date.date.isAfter(currentDate, 'day'));

    return nextWeekend;
  };

  // Function to find the first Saturday one week after the current date
  const findFirstSaturdayOneWeekAfter = (currentDate: dayjs.Dayjs) => {
    let firstSaturday: dayjs.Dayjs | null = null;

    // Find the first Saturday one week after the current date
    const firstSaturdayCandidate = currentDate.day(6).add(1, 'week');
    if (firstSaturdayCandidate.isAfter(currentDate, 'day')) {
      firstSaturday = firstSaturdayCandidate;
    }

    return firstSaturday;
  };

  return (
    <div className="border-r text-sm border-gray-200">
      <div className="flex justify-between w-full px-2">
        <span className="font-extrabold text-alsoit-text-lg">Recurring</span>
        <div
          onClick={() => setRecurring(!showRecurring)}
          className="cursor-pointer"
          onMouseEnter={() => setIconToggle((prev) => ({ ...prev, threeDotIcon: true }))}
          onMouseLeave={() => setIconToggle((prev) => ({ ...prev, threeDotIcon: false }))}
        >
          <ThreeDotIcon active={iconToggle.threeDotIcon} />
        </div>
      </div>
      {showRecurring ? (
        <CustomSuggestion />
      ) : (
        <div className="flex flex-col space-y-2">
          <p
            className="font-extrabold rounded-md hover:bg-alsoit-gray-75 hover:text-white text-xl flex justify-between px-2 py-0.5 w-full"
            onClick={() => handleDayClick('today')}
          >
            <span className="text-alsoit-text-md font-extrabold">Today</span>
            <span className="text-gray-400 text-right text-alsoit-text-md">{dayjs().format('ddd')}</span>
          </p>
          <p
            className="font-extrabold rounded-md hover:bg-alsoit-gray-75 hover:text-white text-xl flex justify-between px-2 py-0.5 w-full"
            onClick={() =>
              dispatch(
                setHistoryMemory({
                  ...HistoryFilterMemory,
                  time: {
                    ...HistoryFilterMemory?.time,
                    from: dayjs().add(4, 'hour').format('h:mm A')
                  }
                })
              )
            }
          >
            <span className="text-alsoit-text-md font-extrabold">Later</span>
            <span className="text-gray-400 text-right text-alsoit-text-md">
              {dayjs().add(4, 'hour').format('h:mm A')}
            </span>
          </p>
          <p
            className="font-extrabold rounded-md hover:bg-alsoit-gray-75 hover:text-white text-xl flex justify-between px-2 py-0.5 w-full"
            onClick={() => handleDayClick('tomorrow')}
          >
            <span className="text-alsoit-text-md font-extrabold">Tomorrow</span>
            <span className="text-gray-400 text-right text-alsoit-text-md">{dayjs().add(1, 'day').format('ddd')}</span>
          </p>
          <p
            className="font-extrabold rounded-md hover:bg-alsoit-gray-75 hover:text-white text-xl flex justify-between px-2 py-0.5 w-full"
            onClick={() => handleWeekendButtonClick('weekend')}
          >
            <span className="text-alsoit-text-md font-extrabold">This Weekend</span>
            <span className="text-gray-400 text-right text-alsoit-text-md">
              {dayjs(weekends('weekend')[1]).format('ddd')}
            </span>
          </p>
          <p
            className="font-extrabold rounded-md hover:bg-alsoit-gray-75 hover:text-white text-xl flex justify-between px-2 py-0.5 w-full"
            onClick={() => handleWeekendButtonClick('next weekend')}
          >
            <span className="text-alsoit-text-md font-extrabold">Next Weekend</span>
            <span className="text-gray-400 text-right text-alsoit-text-md">
              {dayjs(weekends('nweekend')[1]).format('ddd D')}
            </span>
          </p>
          <p
            className="font-extrabold rounded-md hover:bg-alsoit-gray-75 hover:text-white text-xl flex justify-between px-2 py-0.5 w-full"
            onClick={() => handleWeekClick()}
          >
            <span className="text-alsoit-text-md font-extrabold">Next Week</span>
            <span className="text-gray-400 text-right text-alsoit-text-md">
              {dayjs().add(8, 'days').format('ddd D')}
            </span>
          </p>
          <p
            className="font-extrabold rounded-md hover:bg-alsoit-gray-75 hover:text-white text-xl flex justify-between px-2 py-0.5 w-full"
            onClick={() => handleWeekButtonClick(1)}
          >
            <span className="text-alsoit-text-md font-extrabold">Next Work Week</span>
            <span className="text-gray-400 text-right text-alsoit-text-md">{dayjs(weeks(1)).format('ddd D')}</span>
          </p>
          <p
            className="font-extrabold rounded-md hover:bg-alsoit-gray-75 hover:text-white text-xl flex justify-between px-2 py-0.5 w-full"
            onClick={() => handleWeekButtonClick(2)}
          >
            <span className="text-alsoit-text-md font-extrabold">Next 2 Work Weeks</span>
            <span className="text-gray-400 text-right text-alsoit-text-md">{dayjs(weeks(2)).format('ddd D')}</span>
          </p>
          {customSuggestionField.map((field) => customSuggestion(field))}
        </div>
      )}
    </div>
  );
}

function CustomSuggestion() {
  const [value, setValue] = useState<{ [key: string]: string | number }>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  console.log(value);

  return (
    <div className="flex flex-col space-y-4 my-6 items-center justify-center">
      <label htmlFor="type" className="text-alsoit-text-lg px-2 text-left font-semibold">
        Type of field
        <select
          name="type"
          id="type"
          className="w-36 h-8 rounded-md border-none text-alsoit-text-md"
          onChange={handleChange}
        >
          <option value="">Type of field</option>
          <option value="month">Months</option>
          <option value="week">Weeks</option>
        </select>
      </label>
      <label htmlFor="depth" className="text-alsoit-text-lg px-2 text-left font-semibold">
        Depth of Addition
        <input
          type="number"
          id="depth"
          name="depth"
          className="w-36 h-7 rounded-md text-alsoit-text-md"
          placeholder="2 for 2 weeks"
          onChange={handleChange}
        />
      </label>
      <div>
        <button className="p-1 text-white bg-alsoit-purple-300 hover:bg-purple-700 rounded-md">Create</button>
      </div>
    </div>
  );
}
