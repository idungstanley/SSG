export const generateWeekDays = (startDay: string, datesInMonth: number): string[] => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const startIndex = daysOfWeek.indexOf(startDay);
  const slicedDays = daysOfWeek.slice(startIndex).concat(daysOfWeek.slice(0, startIndex));
  const daysInMonth = [...Array(datesInMonth).keys()].map((n) => n + 1);
  return daysInMonth.map((day) => slicedDays[(day - 1) % slicedDays.length]);
};
