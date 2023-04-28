import { getDaysInMonth } from './getDaysInMonth';
import dayjs from 'dayjs';
import { MonthObject } from '../types/calendar';

export const getYear = (year: number): MonthObject[] => {
  const allMonths: MonthObject[] = [];

  for (let month = 0; month < 12; month++) {
    const date = dayjs().year(year).month(month);

    const monthObj: MonthObject = {
      name: date.format('MMMM'),
      month: date,
      days: getDaysInMonth(date)
    };
    allMonths.push(monthObj);
  }

  return allMonths;
};

export const getMonth = (year: number, month: number): MonthObject => {
  const date = dayjs().year(year).month(month);

  const monthObj: MonthObject = {
    name: date.format('MMMM'),
    month: date,
    days: getDaysInMonth(date)
  };

  return monthObj;
};
