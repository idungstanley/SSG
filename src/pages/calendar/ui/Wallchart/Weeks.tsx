import dayjs from 'dayjs';
import { generateWeekDays } from '../../lib';
import { getCurrentDaysInMonth } from '../../lib';

const currentDate = dayjs();

export function Weeks() {
  const days = getCurrentDaysInMonth(currentDate);
  const firstDay = days[0].format('ddd');
  const weeks = generateWeekDays(firstDay, days[0].daysInMonth());

  return (
    <div className="ml-72 flex">
      {weeks.map((i, index) => (
        <p className="p-2 w-10 h-10" key={index}>
          {i}
        </p>
      ))}
    </div>
  );
}
