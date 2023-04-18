import { getDaysInMonth } from './getDaysInMonth';
import dayjs from 'dayjs';

interface MonthObject {
  name: string;
  month: dayjs.Dayjs;
  days: dayjs.Dayjs[];
}

export const getDaysInYear = (year: number): MonthObject[] => {
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
