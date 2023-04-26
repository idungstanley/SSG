import dayjs from 'dayjs';
import { useState } from 'react';
import ChangeYear from '../ChangeYear';
import YearCalendar from '../YearCalendar';

const currentDate = dayjs();

export default function YearPage() {
  const [year, setYear] = useState<number>(currentDate.year());

  return (
    <>
      <section className="flex items-center justify-between p-4">
        <ChangeYear year={year} setYear={setYear} />
      </section>

      <YearCalendar year={year} />
    </>
  );
}
