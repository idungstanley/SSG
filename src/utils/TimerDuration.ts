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

export function parseAndUpdateTime(timeStr: string | undefined, setDate?: Date): string {
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
  const date = setDate ?? new Date();
  date.setHours(hours, minutes, 0);

  // Format the date as a string (e.g., "2023-06-01T16:45:00")
  const formattedDate = date.toISOString();

  return formattedDate;
}

type TimeUnits = {
  [key: string]: number;
};

export function formatTimeString(inputString: string): string {
  // Split the input string into individual components
  const components = inputString.split(' ');

  // Define a mapping of time units to their corresponding multipliers (e.g., "hours" => 60, "mins" => 1)
  const unitMap: TimeUnits = {
    hours: 60,
    mins: 1
  };

  // Use the reduce method to calculate the total time in minutes
  const totalMinutes = components.reduce((total, component, index, arr) => {
    if (index % 2 === 0) {
      // If it's an even-indexed component (a number), parse it and multiply by the corresponding unit
      return total + parseInt(component) * unitMap[arr[index + 1]];
    }
    // For odd-indexed components (unit strings), return the total as is
    return total;
  }, 0);

  // Calculate hours and minutes from totalMinutes
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  // Format hours and minutes into a valid time string
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

  return formattedTime;
}

export default Duration;
