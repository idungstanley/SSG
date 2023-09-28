// Define a type for the options
export type MonthOption = 'same_day' | 'first_day' | 'last_day' | 'days_after' | 'done' | 'completed';

export const IntervalArr = ['daily', 'weekly', 'monthly', 'yearly', 'days_after', 'custom'];

export const statusArr = ['completed', 'done'];

export const weekArr = [
  { title: 'monday', value: 1 },
  { title: 'tuesday', value: 2 },
  { title: 'wednesday', value: 3 },
  { title: 'thursday', value: 4 },
  { title: 'friday', value: 5 },
  { title: 'saturday', value: 6 },
  { title: 'sunday', value: 0 }
];

export const monthOptionsArr = ['same_day', 'first_day', 'last_day'];

export const customTypesArr = ['day', 'week', 'month', 'year'];

export const dataArr = ['on date', 'by week'];

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
