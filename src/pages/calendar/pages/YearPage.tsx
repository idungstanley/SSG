import dayjs from 'dayjs';
import { useState } from 'react';
import Calendar from '..';
import ChangeYear from '../ui/ChangeYear';

const currentDate = dayjs();

export default function YearPage() {
  const [year, setYear] = useState<number>(currentDate.year());

  return (
    <>
      <section className="flex items-center justify-between p-4">
        <ChangeYear year={year} setYear={setYear} />
      </section>

      <Calendar.Year year={year} />
    </>
  );
}
