import moment from 'moment-timezone';

interface DurationProps {
  dateString: {
    start_date: string;
  };
  timezone?: string;
}

const Duration = ({ dateString, timezone }: DurationProps) => {
  const givenDate = moment(dateString?.start_date, 'YYYY-MM-DD HH:mm:ss', timezone);
  const currentDate = moment();
  const duration = moment.duration(currentDate.diff(givenDate));
  return {
    hours: duration.hours() - 1,
    minutes: duration.minutes(),
    seconds: duration.seconds()
  };
};

export default Duration;
