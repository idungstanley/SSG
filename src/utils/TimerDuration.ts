import moment from 'moment-timezone';

interface DurationProps {
  dateString: {
    start_date: string;
  };
  timezone?: string;
}

const Duration = ({ dateString, timezone }: DurationProps): moment.Duration => {
  const givenDate = moment(dateString?.start_date, 'YYYY-MM-DD HH:mm:ss', timezone);
  const currentDate = moment();
  return moment.duration(currentDate.diff(givenDate));
};

export default Duration;
