import dayjs from 'dayjs';

export const getDaysInMonth = (date: dayjs.Dayjs): dayjs.Dayjs[] => {
  const daysInMonth = [];
  const monthStart = date.startOf('month');
  const monthEnd = date.endOf('month');
  const prevMonthEnd = monthStart.subtract(1, 'day');
  const nextMonthStart = monthEnd.add(1, 'day');

  // Previous month dates
  const prevMonthDays = prevMonthEnd.date() + 1;
  const numDaysFromPrevMonth = (monthStart.day() + 6) % 7; // Calculate number of days to add from previous month
  for (let i = prevMonthDays - numDaysFromPrevMonth; i < prevMonthDays; i++) {
    daysInMonth.push(prevMonthEnd.date(i));
  }

  // Current month dates
  for (let i = 1; i <= monthEnd.date(); i++) {
    daysInMonth.push(monthStart.date(i));
  }

  // Next month dates
  let daysAdded = daysInMonth.length; // Track number of days added so far
  for (let i = nextMonthStart.date(); daysAdded < 42; i++) {
    daysInMonth.push(nextMonthStart.date(i));
    daysAdded++;
  }

  return daysInMonth;
};
