import { MonthOption } from '../../components/DatePicker/RecurringTypes';

export const RECUR_STR_CONSTANTS = {
  week: 'week',
  month: 'month',
  year: 'year',
  day: 'day',
  daysAfter: 'days_after',
  custom: 'custom',
  byWeek: 'by week',
  onDate: 'on date',
  monthly: 'monthly',
  daily: 'daily',
  weekly: 'weekly',
  yearly: 'yearly',
  repeat: 'repeat',
  endOn: 'end on',
  done: 'done',
  completed: 'completed',
  sameDay: 'same_day',
  lastDay: 'last_day',
  firstDay: 'first_day'
};

export const IntervalArr = [
  RECUR_STR_CONSTANTS.daily,
  RECUR_STR_CONSTANTS.weekly,
  RECUR_STR_CONSTANTS.monthly,
  RECUR_STR_CONSTANTS.yearly,
  RECUR_STR_CONSTANTS.daysAfter,
  RECUR_STR_CONSTANTS.custom
];

export const statusArr = [RECUR_STR_CONSTANTS.completed, RECUR_STR_CONSTANTS.done];

export const weekArr = [
  { title: 'monday', value: 1 },
  { title: 'tuesday', value: 2 },
  { title: 'wednesday', value: 3 },
  { title: 'thursday', value: 4 },
  { title: 'friday', value: 5 },
  { title: 'saturday', value: 6 },
  { title: 'sunday', value: 0 }
];

export const monthOptionsArr = [RECUR_STR_CONSTANTS.sameDay, RECUR_STR_CONSTANTS.firstDay, RECUR_STR_CONSTANTS.lastDay];

export const customTypesArr = [
  RECUR_STR_CONSTANTS.day,
  RECUR_STR_CONSTANTS.week,
  RECUR_STR_CONSTANTS.month,
  RECUR_STR_CONSTANTS.year
];

export const dataArr = [RECUR_STR_CONSTANTS.onDate, RECUR_STR_CONSTANTS.byWeek];

// Define the option-to-string mapping
const optionMap: Record<MonthOption, string> = {
  same_day: 'same day each month',
  first_day: 'first day of the month',
  last_day: 'last day of the month',
  days_after: 'days after',
  completed: 'when complete',
  done: 'when done'
};

// Define the function with type annotations
export function getMonthOptionString(option: MonthOption): string {
  return optionMap[option] || '';
}

type WordToNumberMap = {
  first: 1;
  second: 2;
  third: 3;
  fourth: 4;
  fifth: 5;
  sixth: 6;
  seventh: 7;
};

export type Word = keyof WordToNumberMap;

export function wordToNumber(word: Word): number | null {
  const wordsToNumbers: WordToNumberMap = {
    first: 1,
    second: 2,
    third: 3,
    fourth: 4,
    fifth: 5,
    sixth: 6,
    seventh: 7
  };

  return wordsToNumbers[word] || null; // Return null for unknown words
}
