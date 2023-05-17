interface MonthProps {
  userId: string;
}

export function Month({ userId }: MonthProps) {
  // const [daysOff, setDaysOff] = useState<DayOff[]>(init);
  const [selectedDates, setSelectedDates] = useState<ExtendedDate[]>([]);
  const days = getCurrentDaysInMonth(currentDate);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleDateMouseDown = (day: Dayjs, part: Part) => {
    setIsMouseDown(true);
    const date = {
      day,
      part
    };

    setSelectedDates([date]);
  };

  const handleDateMouseOver = (day: Dayjs, part: Part) =>
    setSelectedDates((prev) => {
      const startDate = prev[0];
      const endDate = { day, part };

      const datesInRange = [...getDatesInRange(startDate, endDate)];
      return [...datesInRange];
    });

  const handleDateMouseUp = () => {
    setIsMouseDown(false);
    const start = selectedDates[0];
    const end = selectedDates.at(-1);

    if (end) {
      const newDayOff: DayOff = {
        start: {
          day: start.day.format('YYYY-MM-DD'),
          part: start.part
        },
        end: {
          day: end.day.format('YYYY-MM-DD'),
          part: end.part
        },
        user: { id: userId }
      };

      setDaysOff((prev) => [...prev, newDayOff]);
      setSelectedDates([]);
    }
  };

  return (
    <div
      className="flex"
      onMouseLeave={
        isMouseDown
          ? () => {
              setIsMouseDown(false);
              setSelectedDates([]);
            }
          : undefined
      }
    >
      {days.map((day) => {
        const isSelectedStart = !!selectedDates.find((i) => i.day.isSame(day, 'date') && i.part === 'start');
        const isSelectedEnd = !!selectedDates.find((i) => i.day.isSame(day, 'date') && i.part === 'end');
        const isDayOffStart = daysOff.some(
          (range) => isDateInRange({ day, part: 'start' }, range) && range.user.id === userId
        );
        const isDayOffEnd = daysOff.some(
          (range) => isDateInRange({ day, part: 'end' }, range) && range.user.id === userId
        );

        return (
          <div
            onMouseUp={isMouseDown ? () => handleDateMouseUp() : undefined}
            className="relative p-2 border w-10 h-10 flex items-center justify-center"
            key={day.format()}
          >
            <div className="top-0 left-0 w-10 h-10 absolute grid grid-cols-2">
              <span
                onMouseOver={isMouseDown ? () => handleDateMouseOver(day, 'start') : undefined}
                onMouseDown={() => handleDateMouseDown(day, 'start')}
                className={cl(
                  'hover:bg-gray-200',
                  isSelectedStart && 'bg-gray-200',
                  isDayOffStart && 'bg-primary-500 opacity-50 hover:bg-primary-500'
                )}
              ></span>

              <span
                onMouseOver={isMouseDown ? () => handleDateMouseOver(day, 'end') : undefined}
                onMouseDown={() => handleDateMouseDown(day, 'end')}
                className={cl(
                  'hover:bg-gray-200',
                  isSelectedEnd && 'bg-gray-200',
                  isDayOffEnd && 'bg-primary-500 opacity-50 hover:bg-primary-500'
                )}
              ></span>
            </div>
            <span className="select-none">{day.date()}</span>
          </div>
        );
      })}
    </div>
  );
}
