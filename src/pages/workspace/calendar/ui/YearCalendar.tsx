import dayjs from 'dayjs';
import { cl } from '../../../../utils';
import { getDaysInYear } from '../lib/getDaysInYear';

interface YearCalendarProps {
  year: number;
}

const currentDate = dayjs();

const WEEKS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function YearCalendar({ year }: YearCalendarProps) {
  const months = getDaysInYear(year);

  // console.log(months[1].days[7].format('d'));

  return (
    <section className="mx-auto grid max-w-3xl grid-cols-1 gap-x-8 gap-y-16 px-4 py-16 sm:grid-cols-2 sm:px-6 xl:max-w-none xl:grid-cols-3 xl:px-8 2xl:grid-cols-4">
      {months.map((month) => (
        <div key={month.name} className="text-center">
          <h2 className="text-sm font-semibold text-gray-900">{month.name}</h2>
          <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
            {WEEKS.map((week) => (
              <div key={week}>{week}</div>
            ))}
          </div>

          <div
            className={cl(
              'isolate mt-2 grid grid-cols-7 gap-px rounded-lg border bg-gray-200 text-sm shadow',
              month.month.isSame(currentDate, 'month') && 'border-indigo-400'
            )}
          >
            {month.days.map((day, dayIdx) => (
              <button
                key={day.format()}
                type="button"
                className={cl(
                  day.isSame(month.month, 'month') ? 'bg-white font-medium text-gray-900' : 'bg-gray-50 text-gray-400',
                  dayIdx === 0 && 'rounded-tl-lg',
                  dayIdx === 6 && 'rounded-tr-lg',
                  (Number(day.format('d')) === 0 || Number(day.format('d')) === 6) && 'bg-gray-100',
                  dayIdx === month.days.length - 7 && 'rounded-bl-lg',
                  dayIdx === month.days.length - 1 && 'rounded-br-lg',
                  'py-1.5 hover:bg-gray-100 focus:z-10 flex justify-center items-center'
                )}
              >
                <time
                  dateTime={String(day.format())}
                  className={cl(
                    day.format('YYYY-MM-DD') === currentDate.format('YYYY-MM-DD') && 'bg-indigo-600 text-white',
                    'w-7 h-7 flex items-center justify-center rounded-full'
                  )}
                >
                  {day.date()}
                </time>
              </button>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
