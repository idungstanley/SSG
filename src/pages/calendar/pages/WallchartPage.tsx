import dayjs, { Dayjs } from 'dayjs';
import { useMemo, useState } from 'react';
import Calendar from '..';
import { useDaysOff } from '../lib/daysOffContext';
import { filterDaysOff } from '../lib/filterDaysOff';
import { getMonth } from '../lib/getDaysInYear';
import MembersList from '../ui/MembersList';
import Month from '../ui/Month/Month';

const currentDate = dayjs();

export default function WallchartPage() {
  const { daysOff, activeMemberId, setNewDayOff, setShowCreateDayOffModal } = useDaysOff();
  const data = filterDaysOff(daysOff, 'approved');

  const [selectedMonth, setSelectedMonth] = useState(currentDate);
  const month = useMemo(() => getMonth(selectedMonth.year(), selectedMonth.month()), [selectedMonth]);

  const handleEvent = ({ start, end }: { start: Dayjs; end: Dayjs }) => {
    setNewDayOff({ start, end });
    setShowCreateDayOffModal(true);
  };

  const currentDaysOff = useMemo(() => data.filter((i) => i.user.id === activeMemberId), [data, activeMemberId]);

  const handleChangeMonth = (action: 'increment' | 'decrement') =>
    setSelectedMonth(action === 'decrement' ? selectedMonth.subtract(1, 'month') : selectedMonth.add(1, 'month'));

  return (
    <div className="p-4 grid grid-cols-2">
      <div>
        <MembersList />
      </div>

      <div className="text-center flex flex-col items-center justify-center">
        {/* change month */}

        <Calendar.Month
          daysOff={currentDaysOff}
          handleEvent={handleEvent}
          month={month}
          title={<Month.Title title={month.name} extended onChange={handleChangeMonth} />}
        />
      </div>
    </div>
  );
}
