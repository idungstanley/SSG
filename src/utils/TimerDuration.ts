import moment from 'moment-timezone';

interface DurationProps {
  dateString: {
    start_date: string;
  };
  timezone?: string;
}

function Duration({ dateString }: DurationProps) {
  const currentDate = moment();
  const givenDate = moment.utc(dateString.start_date);
  const duration = moment.duration(currentDate.diff(givenDate));

  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  return { hours, minutes, seconds };
}

type TimeFormat = '12-hour' | '24-hour';

export function parseAndUpdateTime(timeStr: string | undefined): string {
  if (!timeStr) {
    return ''; // Return an empty string for undefined timeStr
  }

  const [time, ampm] = timeStr.split(' ');
  const [hoursStr, minutesStr] = time.split(':');
  let hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);
  const format: TimeFormat = ampm === 'AM' || ampm === 'PM' ? '12-hour' : '24-hour';

  if (format === '12-hour') {
    if (ampm === 'PM' && hours !== 12) {
      hours += 12;
    } else if (ampm === 'AM' && hours === 12) {
      hours = 0;
    }
  }

  // Create a new Date object with the parsed time
  const date = new Date();
  date.setHours(hours, minutes, 0);

  // Format the date as a string (e.g., "2023-06-01T16:45:00")
  const formattedDate = date.toISOString();

  return formattedDate;
}
export default Duration;
