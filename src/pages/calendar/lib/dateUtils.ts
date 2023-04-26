import { Dayjs } from 'dayjs';

export const isSameOrBefore = (first: Dayjs, second: Dayjs) =>
  first.isSame(second, 'date') || first.isBefore(second, 'date');

export const isSameOrAfter = (first: Dayjs, second: Dayjs) =>
  first.isSame(second, 'date') || first.isAfter(second, 'date');
