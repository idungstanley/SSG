import { Dayjs } from 'dayjs';

export const getDatesInRange = (startDate: Dayjs, endDate: Dayjs): Dayjs[] => {
  const dates = [];

  let currentDate = startDate;

  while (currentDate <= endDate) {
    dates.push(currentDate);
    currentDate = currentDate.add(1, 'day');
  }

  return dates;
};
