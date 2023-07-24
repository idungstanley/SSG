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

export default Duration;
