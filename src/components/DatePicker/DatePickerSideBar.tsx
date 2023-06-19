import dayjs, { Dayjs } from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setHistoryMemory, setTaskSelectedDate } from '../../features/task/taskSlice';
import { generateDate } from '../Pilot/components/details/properties/subDetailsIndex/components/calendar';

interface DatePickerSideBarProp {
  currentDate: dayjs.Dayjs;
}

export function DatePickerSideBar({ currentDate }: DatePickerSideBarProp) {
  const dispatch = useAppDispatch();
  const { HistoryFilterMemory } = useAppSelector((state) => state.task);
  let selectedStartOfWeek: Dayjs | null = null;
  let selectedEndOfWeek: Dayjs | null = null;

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
        dispatch(setTaskSelectedDate({ from: selectedWeekends[0], to: selectedWeekends[0] }));
        return selectedWeekends[0];
      } else {
        dispatch(setTaskSelectedDate({ from: selectedWeekends[1], to: selectedWeekends[1] }));
        return selectedWeekends[1];
      }
    } else {
      // If either the next weekend or the 2nd weekend is not found, reset the selection
      selectedWeekends = [];
    }
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

  // useEffect(() => {
  //   handleWeekendButtonClick('weekend');
  //   handleWeekendButtonClick('next weekend');
  // }, []);

  return (
    <div className="w-40 pt-1 space-y-4 border-r text-sm border-gray-200" style={{ height: '250px', fontSize: '12px' }}>
      <p
        className="px-1 font-semibold rounded-md hover:bg-gray-200"
        onClick={() =>
          dispatch(
            setTaskSelectedDate({
              from: currentDate
            })
          )
        }
      >
        <span>Today </span>
      </p>
      <p
        className="px-1 font-semibold rounded-md hover:bg-gray-200"
        onClick={() =>
          dispatch(
            setHistoryMemory({
              ...HistoryFilterMemory,
              time: {
                ...HistoryFilterMemory?.time,
                from: dayjs().add(1, 'hour').format('HH:mm')
              }
            })
          )
        }
      >
        Later
      </p>
      <p
        className="px-1 font-semibold rounded-md hover:bg-gray-200"
        onClick={() =>
          dispatch(
            setTaskSelectedDate({
              from: currentDate.add(1, 'days')
            })
          )
        }
      >
        Tomorrow
      </p>
      <p
        className="px-1 font-semibold rounded-md hover:bg-gray-200"
        onClick={() => handleWeekendButtonClick('weekend')}
      >
        This Weekend
      </p>
      <p
        className="px-1 font-semibold rounded-md hover:bg-gray-200"
        onClick={() => handleWeekendButtonClick('next weekend')}
      >
        Next Weekend
      </p>
      <p className="px-1 font-semibold rounded-md hover:bg-gray-200" onClick={() => handleWeekButtonClick(1)}>
        Next Week
      </p>
      <p className="px-1 font-semibold rounded-md hover:bg-gray-200" onClick={() => handleWeekButtonClick(2)}>
        2 Weeks
      </p>
    </div>
  );
}
