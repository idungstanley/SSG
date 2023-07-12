import moment, { Moment } from 'moment-timezone';

interface DateStringFixProps {
  timeStamp: string;
  timeString?: string;
  timeZone?: string;
}

export default function DateStringFix({ timeStamp, timeString, timeZone }: DateStringFixProps): string {
  const timestamp: Moment = moment(timeStamp, 'DD/MM/YYYY');

  if (timeString) {
    const [time, period] = timeString.split(' ');
    const [hoursStr, minutesStr] = time.split(':');
    let hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);

    const periodOffset: { [key: string]: number } = {
      AM: 0,
      PM: 12
    };

    hours = (hours + periodOffset[period]) % 24;

    timestamp.hours(hours).minutes(minutes).seconds(0).milliseconds(0);
  }

  if (timeZone) {
    timestamp.tz(timeZone);
  }

  return timestamp.format('YYYY-MM-DD HH:mm:ss');
}
