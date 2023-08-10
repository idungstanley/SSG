import dayjs, { Dayjs } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

export interface DateObject {
  currentMonth: boolean;
  date: dayjs.Dayjs;
  today?: boolean;
  currentWeek?: boolean;
  isWeekend?: boolean; // New key to indicate if the date is a weekend
  dayOfWeek?: number;
}

export const generateDate = (
  month: number = dayjs().month(),
  year: number = dayjs().year(),
  startOfWeek?: dayjs.Dayjs,
  endOfWeek?: dayjs.Dayjs
): DateObject[] => {
  const firstDateOfMonth = dayjs().year(year).month(month).startOf('month');
  const lastDateOfMonth = dayjs().year(year).month(month).endOf('month');
  const currentDate = dayjs();

  const arrayOfDate: DateObject[] = [];

  // Calculate the start and end of the week
  const startDate = startOfWeek || firstDateOfMonth.startOf('month'); // Adjusted to start from the first day of the week
  const endDate = endOfWeek || lastDateOfMonth.endOf('week'); // Adjusted to end on the last day of the week

  // Add dates from the previous month
  const prevMonthLastDate = firstDateOfMonth.subtract(1, 'day');
  const prevMonthStartDate = prevMonthLastDate.startOf('week');

  for (let date = prevMonthStartDate; date.isBefore(firstDateOfMonth); date = date.add(1, 'day')) {
    const isWeekend = date.day() === 0 || date.day() === 6;
    arrayOfDate.push({
      currentMonth: false, // Set currentMonth to false for dates from the previous month
      date,
      today: false,
      currentWeek: false,
      isWeekend,
      dayOfWeek: date.day()
    });
  }

  // Add dates from the current month
  for (let date = startDate; date.isBefore(endDate) || date.isSame(endDate, 'day'); date = date.add(1, 'day')) {
    const isWeekend = date.day() === 0 || date.day() === 6;
    const isCurrentWeek = isInCurrentWeek(date, startOfWeek, endOfWeek);
    arrayOfDate.push({
      currentMonth: true,
      date,
      today: date.toDate().toDateString() === currentDate.toDate().toDateString(),
      currentWeek: isCurrentWeek,
      isWeekend,
      dayOfWeek: date.day()
    });
  }

  // Add dates from the next month
  const nextMonthFirstDate = lastDateOfMonth.add(1, 'day');
  const nextMonthEndDate = nextMonthFirstDate.endOf('week');

  for (let date = nextMonthFirstDate; date.isBefore(nextMonthEndDate); date = date.add(1, 'day')) {
    const isWeekend = date.day() === 0 || date.day() === 6;
    arrayOfDate.push({
      currentMonth: false, // Set currentMonth to false for dates from the next month
      date,
      today: false,
      currentWeek: false,
      isWeekend,
      dayOfWeek: date.day()
    });
  }

  return arrayOfDate;
};

const isInCurrentWeek = (date: dayjs.Dayjs, startOfWeek?: dayjs.Dayjs, endOfWeek?: dayjs.Dayjs): boolean => {
  if (startOfWeek && endOfWeek) {
    return (
      date.isSame(startOfWeek, 'day') ||
      date.isSame(endOfWeek, 'day') ||
      (date.isAfter(startOfWeek, 'day') && date.isBefore(endOfWeek.add(1, 'day'), 'day'))
    );
  }

  // Start of the current week
  const defaultStartOfWeek = dayjs().startOf('week');

  // End of the current week
  const defaultEndOfWeek = dayjs().endOf('week');

  return (
    date.isSame(defaultStartOfWeek, 'day') ||
    date.isSame(defaultEndOfWeek, 'day') ||
    (date.isAfter(defaultStartOfWeek, 'day') && date.isBefore(defaultEndOfWeek.add(1, 'day'), 'day'))
  );
};

export const groupDatesByDayOfWeek = (
  dates: DateObject[]
): {
  [dayOfWeek: number]: { dates: DateObject[]; additionalData: { currentMonth: boolean } };
} => {
  const groupedDates: {
    [dayOfWeek: number]: { dates: DateObject[]; additionalData: { currentMonth: boolean } };
  } = {};

  dates.forEach((date) => {
    const dayOfWeek = date.date.day();
    if (dayOfWeek in groupedDates) {
      groupedDates[dayOfWeek].dates.push(date);
    } else {
      groupedDates[dayOfWeek] = {
        dates: [date],
        additionalData: { currentMonth: date.currentMonth }
      };
    }
  });

  return groupedDates;
};

export const createDynamicTimeComponent = (intervalInMinutes: number, zone?: string) => {
  // Calculate the number of time elements to create
  const totalElements = (24 * 60) / intervalInMinutes;

  // Create an array to hold the time elements
  const timeElements = [];

  // Start with 12 midnight
  let currentTime = dayjs().tz(zone).set('hour', 0).set('minute', 0);

  // Generate the time elements
  for (let i = 0; i < totalElements; i++) {
    const formattedTime = currentTime.format('h:mm A');
    timeElements.push(formattedTime);

    // Increment the time by the given interval
    currentTime = currentTime.add(intervalInMinutes, 'minute');
  }

  // Return the array of time elements
  return timeElements;
};

export const weekends = (duration: string): dayjs.Dayjs[] => {
  const currentDate = duration === 'weekend' ? dayjs() : dayjs().add(1, 'week');
  const startOfWeek = currentDate.startOf('week');
  const endOfWeek = currentDate.endOf('week');

  const weekendDays = [];

  for (let i = startOfWeek.day(); i <= endOfWeek.day(); i++) {
    const day = currentDate.day(i);
    if (day.day() === 0 || day.day() === 6) {
      weekendDays.push(day);
    }
  } // Array of Day.js objects representing weekend days
  return weekendDays;
};

export const weeks = (number: number) => dayjs().set('day', 2).add(number, 'week').startOf('week');

export const months: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

// our interface for a single cell
export interface ICalendarCell {
  text: string;
  value: Dayjs;
}

export function changeDateMonth(date: Dayjs, isNextMonth: boolean): Dayjs {
  // should decrease year
  if (date.month() === 0 && !isNextMonth) {
    return date.set('year', date.year() - 1).set('month', 11);
  }

  // should increase year
  if (date.month() === 11 && isNextMonth) {
    return date.set('year', date.year() + 1).set('month', 0);
  }

  // add or subtract
  return date.add(isNextMonth ? 1 : -1, 'month');
}

export function getCalendarCells(
  date: Dayjs,
  startOfWeek = 0 // Default to Sunday as the start of the week (0 for Sunday, 1 for Monday, and so on)
): ICalendarCell[] {
  const daysInMonth = date.daysInMonth();
  const startOfMonth = date.startOf('month');
  const startDayOfWeek = startOfMonth.day();
  const offset = (startDayOfWeek - startOfWeek + 7) % 7; // Calculate the offset based on the start of the week
  const calendarCells: ICalendarCell[] = [];

  const prepareCell = (date: Dayjs, dayNumber: number) => {
    return {
      text: String(dayNumber),
      value: date.clone().set('date', dayNumber)
    };
  };

  // Add empty cells for the days before the start of the month
  for (let i = 0; i < offset; i++) {
    const prevMonth = startOfMonth.subtract(1, 'month');
    const prevMonthDays = prevMonth.daysInMonth();
    const dayNumber = prevMonthDays - offset + i + 1;
    calendarCells.push(prepareCell(prevMonth, dayNumber));
  }

  // Add cells for the days in the current month
  for (let i = 0; i < daysInMonth; i++) {
    calendarCells.push(prepareCell(startOfMonth, i + 1));
    startOfMonth.add(1, 'day');
  }

  // Calculate the remaining cells needed to fill the rows
  const remainingCells = 7 - (calendarCells.length % 7);

  // Add cells for the days in the next month
  if (remainingCells < 7) {
    const nextMonth = startOfMonth.clone().add(1, 'month');
    for (let i = 0; i < remainingCells; i++) {
      calendarCells.push(prepareCell(nextMonth, i + 1));
      nextMonth.add(1, 'day');
    }
  }

  return calendarCells;
}

export function getCalendarRows(
  date: Dayjs,
  startOfWeek = 0 // Default to Sunday as the start of the week (0 for Sunday, 1 for Monday, and so on)
): Array<ICalendarCell[]> {
  const cells = getCalendarCells(date, startOfWeek);
  const rows: Array<ICalendarCell[]> = [];

  // split one array into chunks
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(cells.slice(i, i + 7));
  }

  return rows;
}
