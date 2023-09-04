import dayjs from 'dayjs';

export function findNearestTime(currentTime: dayjs.Dayjs, timeOptions: string[]): string {
  const currentTimeMoment = dayjs(currentTime);
  const currentDateString = currentTimeMoment.format('YYYY-MM-DD');
  const currentTimeMinutes = currentTimeMoment.diff(dayjs().startOf('day'), 'minutes');

  let nearestTime = timeOptions[0];
  let nearestDiff = Math.abs(
    currentTimeMinutes - dayjs(currentDateString + ' ' + nearestTime).diff(dayjs().startOf('day'), 'minutes')
  );

  for (const option of timeOptions) {
    const optionMinutes = dayjs(currentDateString + ' ' + option).diff(dayjs().startOf('day'), 'minutes');
    const diff = Math.abs(currentTimeMinutes - optionMinutes);
    if (diff < nearestDiff) {
      nearestTime = option;
      nearestDiff = diff;
    }
  }

  return nearestTime;
}
