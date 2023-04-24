import { Dayjs } from 'dayjs';
import { useMemo, useState } from 'react';
import { getYear } from '../lib/getDaysInYear';
import { Member, DayOff } from '../types/calendar';
import CreateEventModal from './CreateEventModal';
import Month from './Month';

interface YearCalendarProps {
  year: number;
}

const members: Member[] = [
  {
    id: '1',
    user: {
      id: '1',
      name: 'Snanislau',
      email: 'lorderetik@gmail.com'
    },
    daysOff: [
      {
        id: '1',
        start: '2023-04-19',
        end: '2023-04-23',
        type: 'sick leave',
        reason: 'Blah blah blah'
      },
      {
        id: '2',
        start: '2023-04-25',
        end: '2023-04-26',
        type: 'holiday',
        reason: 'Blah blah blah blah'
      }
    ]
  },
  {
    id: '2',
    user: {
      id: '2',
      name: 'John',
      email: 'john@gmail.com'
    },
    daysOff: [
      {
        id: '1',
        start: '2023-04-28',
        end: '2023-04-29',
        type: 'sick leave',
        reason: 'Blah blah blah'
      },
      {
        id: '2',
        start: '2023-05-01',
        end: '2023-05-01',
        type: 'sick leave',
        reason: 'Blah blah blah'
      }
    ]
  }
];

const activeUserId = '1';

export default function YearCalendar({ year }: YearCalendarProps) {
  const [daysOff, setDaysOff] = useState(members);
  const [showModal, setShowModal] = useState(false);
  const [newDayOff, setNewDayOff] = useState<{ start: Dayjs; end: Dayjs } | null>(null);
  const months = useMemo(() => getYear(year), [year]);

  const handleEvent = ({ start, end }: { start: Dayjs; end: Dayjs }) => {
    setNewDayOff({ start, end });
    setShowModal(true);
  };

  const handleSubmit = ({ type, reason }: { type: { id: number; title: string }; reason: string }) => {
    if (!newDayOff) {
      return;
    }

    const dayOff: DayOff = {
      id: Date.now().toString(),
      reason,
      type: type.title,
      start: newDayOff.start.format('YYYY-MM-DD'),
      end: newDayOff.end.format('YYYY-MM-DD')
    };

    setDaysOff((prev) => [
      ...prev.map((i) => (i.user.id === activeUserId ? { ...i, daysOff: [...i.daysOff, dayOff] } : i))
    ]);

    setNewDayOff(null);
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setNewDayOff(null);
    setShowModal(false);
  };

  return (
    <section className="mx-auto grid max-w-3xl grid-cols-1 gap-x-8 gap-y-16 px-4 py-16 sm:grid-cols-2 xl:max-w-none xl:grid-cols-3 2xl:grid-cols-4">
      {months.map((month) => (
        <Month
          daysOff={daysOff}
          handleEvent={handleEvent}
          key={month.name}
          month={month}
          title={<Month.Title title={month.name} />}
        />
      ))}

      <CreateEventModal onSubmit={handleSubmit} dayOff={newDayOff} show={showModal} setShow={handleCloseModal} />
    </section>
  );
}
