import moment from 'moment';

export function isDateInPast(targetDate: string) {
  const currentDate = moment(Date.now());
  return moment(targetDate).isBefore(currentDate);
}

export function isDateSame(targetDate: string) {
  const currentDate = moment(Date.now());
  return moment(targetDate).isSame(currentDate, 'day');
}
