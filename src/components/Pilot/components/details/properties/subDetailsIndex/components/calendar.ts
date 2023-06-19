/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import dayjs from 'dayjs';

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
  const startDate = startOfWeek || firstDateOfMonth.startOf('week');
  const endDate = endOfWeek || lastDateOfMonth.endOf('week');

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
