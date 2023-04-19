import { Dayjs } from 'dayjs';
import { useMemo, useState } from 'react';
import { getDaysInYear } from '../lib/getDaysInYear';
import { DayOff, Event } from '../types/calendar';
import CreateEventModal from './CreateEventModal';
import Month from './Month';

interface YearCalendarProps {
  year: number;
}

const events: Event[] = [
  {
    id: '1',
    user: {
      id: '1',
      name: 'Snanislau'
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
      name: 'John'
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
  const [daysOff, setDaysOff] = useState(events);
  const [showModal, setShowModal] = useState(false);
  const [newEventDates, setNewEventDates] = useState<Dayjs[]>([]);
  const months = useMemo(() => getDaysInYear(year), [year]);

  const handleEvent = (i: Dayjs[]) => {
    setNewEventDates(i);
    setShowModal(true);
  };

  const handleSubmit = ({ type, reason }: { type: { id: number; title: string }; reason: string }) => {
    const newDayOff: DayOff = {
      id: Date.now().toString(),
      reason,
      type: type.title,
      start: newEventDates[0].format('YYYY-MM-DD'),
      end: newEventDates.at(-1)?.format('YYYY-MM-DD') ?? ''
    };

    setDaysOff((prev) => [
      ...prev.map((i) => (i.user.id === activeUserId ? { ...i, daysOff: [...i.daysOff, newDayOff] } : i))
    ]);

    setNewEventDates([]);
  };

  return (
    <section className="mx-auto grid max-w-3xl grid-cols-1 gap-x-8 gap-y-16 px-4 py-16 sm:grid-cols-2 sm:px-6 xl:max-w-none xl:grid-cols-3 xl:px-8 2xl:grid-cols-4">
      {months.map((month) => (
        <Month daysOff={daysOff} handleEvent={handleEvent} key={month.name} month={month} />
      ))}

      <CreateEventModal onSubmit={handleSubmit} newEventDates={newEventDates} show={showModal} setShow={setShowModal} />
    </section>
  );
}
