import moment from 'moment-timezone';

interface DurationProps {
  dateString: {
    start_date: string;
  };
  timezone?: string;
}

function Duration({ dateString }: DurationProps) {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const givenDate = moment.tz(dateString?.start_date, 'YYYY-MM-DD HH:mm:ss', timezone);
  const currentDate = moment().tz(timezone);
  const duration = moment.duration(currentDate.diff(givenDate));
  return {
    hours: duration.hours() - 1,
    minutes: duration.minutes(),
    seconds: duration.seconds()
  };
}

export default Duration;
