import { Dayjs } from 'dayjs';
import { useMemo } from 'react';
import Calendar from '..';
import { useDaysOff } from '../lib/daysOffContext';
import { filterDaysOff } from '../lib/filterDaysOff';
import { getYear } from '../lib/getDaysInYear';
import Month from './Month/Month';

interface YearProps {
  year: number;
}

export default function Year({ year }: YearProps) {
  const { daysOff, setShowCreateDayOffModal, setNewDayOff, activeMemberId } = useDaysOff();
  const months = useMemo(() => getYear(year), [year]);

  const data = filterDaysOff(daysOff, 'approved');

  const handleEvent = ({ start, end }: { start: Dayjs; end: Dayjs }) => {
    setNewDayOff({ start, end });
    setShowCreateDayOffModal(true);
  };

  const currentDaysOff = useMemo(() => data.filter((i) => i.user.id === activeMemberId), [data, activeMemberId]);

  return (
    <section className="flex justify-center flex-wrap mx-auto max-w-3xl gap-x-8 gap-y-16 px-4 py-16 xl:max-w-none">
      {months.map((month) => (
        <Calendar.Month
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
