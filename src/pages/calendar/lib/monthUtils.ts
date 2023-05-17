import { Dayjs } from 'dayjs';

export const generateWeekDays = (startDay: string, datesInMonth: number): string[] => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const startIndex = daysOfWeek.indexOf(startDay);
  const slicedDays = daysOfWeek.slice(startIndex).concat(daysOfWeek.slice(0, startIndex));
  const daysInMonth = [...Array(datesInMonth).keys()].map((n) => n + 1);
  return daysInMonth.map((day) => slicedDays[(day - 1) % slicedDays.length]);
};

export const getCurrentDaysInMonth = (date: Dayjs): Dayjs[] => {
  const daysInMonth = [];
  const monthStart = date.startOf('month');
  const monthEnd = date.endOf('month');

  // Current month dates
  for (let i = 1; i <= monthEnd.date(); i++) {
    daysInMonth.push(monthStart.date(i));
  }

  return daysInMonth;
};

export const getDatesInRange = (startDate: Dayjs, endDate: Dayjs): Dayjs[] => {
  const dates = [];

  let currentDate = startDate;

  while (currentDate <= endDate) {
    dates.push(currentDate);
    currentDate = currentDate.add(1, 'day');
  }

  return dates;
};

export const isSameOrBefore = (first: Dayjs, second: Dayjs) =>
  first.isSame(second, 'date') || first.isBefore(second, 'date');

export const isSameOrAfter = (first: Dayjs, second: Dayjs) =>
  first.isSame(second, 'date') || first.isAfter(second, 'date');
