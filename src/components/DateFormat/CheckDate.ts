import moment from 'moment';

export function isDateInPast(targetDate: string) {
  const currentDate = moment(Date.now());
  return moment(targetDate).isBefore(currentDate);
}
