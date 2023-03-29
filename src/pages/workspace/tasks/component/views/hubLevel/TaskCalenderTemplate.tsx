import React from 'react';
import FullCalendar from '@fullcalendar/react';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

function TaskCalenderTemplate() {
  const events: EventInput[] = [
    {
      id: '1',
      title: 'Event 1',
      start: '2023-03-15T09:00:00',
      end: '2023-03-15T10:00:00'
    },
    {
      id: '2',
      title: 'Event 2',
      start: '2023-03-17T13:00:00',
      end: '2023-03-17T14:00:00'
    },
    {
      id: '3',
      title: 'Event 3',
      start: '2023-03-20T10:00:00',
      end: '2023-03-20T12:00:00'
    }
  ];

  return (
    <div>
      <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" events={events} />
    </div>
  );
}

export default TaskCalenderTemplate;
