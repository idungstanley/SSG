import dayjs from 'dayjs';

// Define a type for the options
export type MonthOption = 'same_day' | 'second_monday' | 'first_day' | 'last_day' | 'days_after';

export const IntervalArr = ['daily', 'weekly', 'monthly', 'yearly', 'days_after', 'custom'];

export const statusArr = ['When Complete', 'When Done'];

export const weekArr = [
  { title: 'monday', value: 1 },
  { title: 'tuesday', value: 2 },
  { title: 'wednesday', value: 3 },
  { title: 'thursday', value: 4 },
  { title: 'friday', value: 5 },
  { title: 'saturday', value: 6 },
  { title: 'sunday', value: 0 }
];

export const monthOptionsArr = ['same_day', 'second_monday', 'first_day', 'last_day'];

export const customTypesArr = ['day', 'week', 'month', 'year'];

export const dataArr = ['on date', 'by week'];

// Define the option-to-string mapping
const optionMap: Record<MonthOption, string> = {
  same_day: 'same day each month',
  second_monday: `Last ${dayjs().format('dddd')}`,
  first_day: 'first day of the month',
  last_day: 'last day of the month',
  days_after: 'days after'
};

// Define the function with type annotations
export function getMonthOptionString(option: MonthOption): string {
  return optionMap[option] || '';
}
