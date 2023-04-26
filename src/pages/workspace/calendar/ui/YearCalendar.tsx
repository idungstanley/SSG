import { Dayjs } from 'dayjs';
import { useMemo } from 'react';
import { useDaysOff } from '../lib/daysOffContext';
import { getYear } from '../lib/getDaysInYear';
import Month from './Month';

interface YearCalendarProps {
  year: number;
}

export default function YearCalendar({ year }: YearCalendarProps) {
  const { daysOff, setShowCreateDayOffModal, setNewDayOff, activeMemberId } = useDaysOff();
  const months = useMemo(() => getYear(year), [year]);

  const handleEvent = ({ start, end }: { start: Dayjs; end: Dayjs }) => {
    setNewDayOff({ start, end });
    setShowCreateDayOffModal(true);
  };

  const currentDaysOff = useMemo(() => daysOff.filter((i) => i.user.id === activeMemberId), [daysOff, activeMemberId]);

  return (
    <section className="flex justify-center flex-wrap mx-auto max-w-3xl gap-x-8 gap-y-16 px-4 py-16 xl:max-w-none">
      {months.map((month) => (
        <Month
          daysOff={currentDaysOff}
          handleEvent={handleEvent}
          key={month.name}
          month={month}
          title={<Month.Title title={month.name} />}
        />
      ))}
    </section>
  );
}
